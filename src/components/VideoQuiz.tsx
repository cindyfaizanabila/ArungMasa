import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubbabVideo } from '../types';

/* Pemutar video yang berhenti di detik tertentu untuk menampilkan pertanyaan.
   Video baru berlanjut setelah pertanyaan dijawab benar; jawaban salah boleh
   diulang sampai benar. Mendukung YouTube dan berkas video langsung. */

declare global {
  interface Window {
    // API YouTube dimuat dari skrip luar, jadi tipenya tidak tersedia.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface PlayerApi {
  getCurrentTime: () => number;
  isPlaying: () => boolean;
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
}

const POLL_MS = 250;
/** Lompatan lebih dari ini dianggap melewati pertanyaan, lalu video dikembalikan. */
const SKIP_TOLERANCE_S = 1;

let youTubeApiPromise: Promise<void> | null = null;
const loadYouTubeApi = (): Promise<void> => {
  if (window.YT?.Player) return Promise.resolve();
  if (!youTubeApiPromise) {
    youTubeApiPromise = new Promise<void>((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onerror = () => {
        youTubeApiPromise = null;
        reject(new Error('Gagal memuat pemutar YouTube'));
      };
      document.head.appendChild(script);
    });
  }
  return youTubeApiPromise;
};

const getYouTubeId = (url: string): string | null => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/
  );
  if (match) return match[1];
  return /^[\w-]{11}$/.test(url.trim()) ? url.trim() : null;
};

interface VideoQuizProps {
  video: SubbabVideo;
  /** Dipanggil saat video selesai diputar dan semua pertanyaannya terjawab benar. */
  onCompleted: () => void;
}

export const VideoQuiz: React.FC<VideoQuizProps> = ({ video, onCompleted }) => {
  const checkpoints = useMemo(
    () => [...(video.checkpoints ?? [])].sort((a, b) => a.at - b.at),
    [video]
  );

  const apiRef = useRef<PlayerApi | null>(null);
  const nativeRef = useRef<HTMLVideoElement>(null);
  const ytHostRef = useRef<HTMLDivElement>(null);
  // Cermin state untuk dibaca pewaktu tanpa membuatnya dibuat ulang.
  const answeredRef = useRef<Set<number>>(new Set());
  const activeRef = useRef<number | null>(null);
  const endedRef = useRef(false);

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [ended, setEnded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const isYouTube = video.provider === 'youtube';
  const youTubeId = isYouTube ? getYouTubeId(video.url) : null;
  const total = checkpoints.length;
  const completed = ended && answeredCount === total;

  const openQuiz = useCallback((idx: number) => {
    apiRef.current?.pause();
    // Layar penuh akan menutupi pertanyaan, jadi dikeluarkan dulu.
    if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
    activeRef.current = idx;
    setActiveIdx(idx);
    setWrongKeys([]);
    setIsCorrect(false);
  }, []);

  const handleEnded = useCallback(() => {
    endedRef.current = true;
    setEnded(true);
    const pending = checkpoints.findIndex((_, i) => !answeredRef.current.has(i));
    if (pending !== -1 && activeRef.current === null) openQuiz(pending);
  }, [checkpoints, openQuiz]);

  const handleEndedRef = useRef(handleEnded);
  useEffect(() => {
    handleEndedRef.current = handleEnded;
  }, [handleEnded]);

  // Pemutar berkas langsung.
  useEffect(() => {
    if (isYouTube) return;
    const el = nativeRef.current;
    if (!el) return;
    apiRef.current = {
      getCurrentTime: () => el.currentTime,
      isPlaying: () => !el.paused && !el.ended,
      play: () => {
        el.play().catch(() => undefined);
      },
      pause: () => el.pause(),
      seekTo: (seconds) => {
        el.currentTime = seconds;
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [isYouTube]);

  // Pemutar YouTube.
  useEffect(() => {
    if (!youTubeId || !ytHostRef.current) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let player: any;
    const element = document.createElement('div');
    ytHostRef.current.appendChild(element);

    loadYouTubeApi()
      .then(() => {
        if (cancelled) return;
        player = new window.YT.Player(element, {
          videoId: youTubeId,
          width: '100%',
          height: '100%',
          playerVars: { rel: 0, modestbranding: 1, playsinline: 1, fs: 0 },
          events: {
            onReady: () => {
              apiRef.current = {
                getCurrentTime: () => player.getCurrentTime?.() ?? 0,
                isPlaying: () => player.getPlayerState?.() === 1,
                play: () => player.playVideo(),
                pause: () => player.pauseVideo(),
                seekTo: (seconds) => player.seekTo(seconds, true),
              };
            },
            onStateChange: (event: { data: number }) => {
              if (event.data === 0) handleEndedRef.current();
            },
          },
        });
      })
      .catch(() => setLoadFailed(true));

    return () => {
      cancelled = true;
      apiRef.current = null;
      try {
        player?.destroy();
      } catch {
        /* pemutar sudah hilang */
      }
      element.remove();
    };
  }, [youTubeId]);

  // Pewaktu: berhenti di pertanyaan berikutnya yang belum dijawab, termasuk bila
  // penonton melompat melewatinya.
  useEffect(() => {
    const timer = window.setInterval(() => {
      const api = apiRef.current;
      if (!api) return;

      if (activeRef.current !== null) {
        if (api.isPlaying()) api.pause();
        return;
      }

      const now = api.getCurrentTime();
      const idx = checkpoints.findIndex((c, i) => !answeredRef.current.has(i) && c.at <= now);
      if (idx === -1) return;

      if (now - checkpoints[idx].at > SKIP_TOLERANCE_S) api.seekTo(checkpoints[idx].at);
      openQuiz(idx);
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [checkpoints, openQuiz]);

  useEffect(() => {
    if (completed) onCompleted();
  }, [completed, onCompleted]);

  const choose = (key: string) => {
    if (activeIdx === null || isCorrect) return;
    if (key === checkpoints[activeIdx].correctAnswer) {
      setIsCorrect(true);
    } else {
      setWrongKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
    }
  };

  const resume = () => {
    if (activeIdx === null) return;
    answeredRef.current.add(activeIdx);
    setAnsweredCount(answeredRef.current.size);
    activeRef.current = null;
    setActiveIdx(null);
    setIsCorrect(false);
    setWrongKeys([]);
    if (!endedRef.current) apiRef.current?.play();
  };

  if ((isYouTube && !youTubeId) || loadFailed) {
    return (
      <section className="w-full rounded-xl bg-[#ffdad6] border border-[#ba1a1a]/20 p-4 text-[13px] text-[#93000a]">
        Video tidak dapat dimuat. Periksa koneksi internetmu, lalu muat ulang halaman.
      </section>
    );
  }

  const active = activeIdx !== null ? checkpoints[activeIdx] : null;

  return (
    <section className="w-full flex flex-col gap-3" aria-label="Video pembelajaran">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[#f3ede1] border border-[#e8e2d6] flex items-center justify-center text-[#855300] shrink-0">
          <span className="material-symbols-outlined text-[17px]">play_circle</span>
        </span>
        <h2 className="font-serif font-bold text-[17px] text-[#502408] leading-snug">
          {video.title || 'Video Pembelajaran'}
        </h2>
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-[#1f1710]">
        {isYouTube ? (
          <div ref={ytHostRef} className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full" />
        ) : (
          <video
            ref={nativeRef}
            src={video.url}
            controls
            controlsList="nodownload nofullscreen"
            playsInline
            preload="metadata"
            onEnded={handleEnded}
            onError={() => setLoadFailed(true)}
            className="absolute inset-0 w-full h-full"
          />
        )}

        {/* Selama pertanyaan tampil, penutup ini mencegah video dimainkan. */}
        {active && (
          <div className="absolute inset-0 z-10 bg-[#1f1710]/80 flex flex-col items-center justify-center gap-1 text-center px-4">
            <span className="material-symbols-outlined text-[32px] text-[#ffb960]">pause_circle</span>
            <p className="text-[13px] font-semibold text-white">Video dijeda</p>
            <p className="text-[12px] text-[#e4d4bb]">Jawab pertanyaan di bawah untuk melanjutkan.</p>
          </div>
        )}
      </div>

      {active ? (
        <div
          role="group"
          aria-label="Pertanyaan video"
          className="rounded-xl bg-[#fffcf6] border border-[#e2a04a]/50 shadow-sm p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#855300]">
              Pertanyaan {activeIdx! + 1} dari {total}
            </span>
          </div>
          <h3 className="font-serif font-bold text-[18px] text-[#502408] leading-snug">
            {active.question}
          </h3>

          <div className="flex flex-col gap-2">
            {active.options.map((option) => {
              const isWrong = wrongKeys.includes(option.key);
              const isRight = isCorrect && option.key === active.correctAnswer;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => choose(option.key)}
                  disabled={isWrong || isCorrect}
                  className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    isRight
                      ? 'bg-[#cfecae] text-[#0e2000] border-[#20360a]/30'
                      : isWrong
                        ? 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/30'
                        : 'bg-[#f9f3e7] text-[#1d1c14] border-[#e8e2d6] hover:bg-[#f3ede1] cursor-pointer'
                  } ${isCorrect && !isRight ? 'opacity-60' : ''} disabled:cursor-not-allowed`}
                >
                  <span
                    className={`w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center shrink-0 ${
                      isRight
                        ? 'bg-[#20360a] text-white'
                        : isWrong
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#ede8dc] text-[#52443d]'
                    }`}
                  >
                    {isRight ? (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    ) : isWrong ? (
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    ) : (
                      option.key
                    )}
                  </span>
                  <span className="text-[14px] leading-snug">{option.text}</span>
                </button>
              );
            })}
          </div>

          <div aria-live="polite">
            {!isCorrect && wrongKeys.length > 0 && (
              <p className="text-[13px] font-semibold text-[#93000a]">
                Jawaban belum tepat. Coba pilih jawaban yang lain.
              </p>
            )}
            {isCorrect && (
              <div className="rounded-lg bg-[#f3ede1] border border-[#e8e2d6] p-3 flex flex-col gap-1.5">
                <p className="text-[13px] font-bold text-[#20360a]">Jawabanmu benar!</p>
                {active.explanation && (
                  <p className="text-[13px] text-[#52443d] leading-relaxed">{active.explanation}</p>
                )}
              </div>
            )}
          </div>

          {isCorrect && (
            <button
              type="button"
              onClick={resume}
              className="w-full h-12 rounded-xl bg-[#6b3a1c] hover:bg-[#502408] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>{ended ? 'Selesai' : 'Lanjutkan video'}</span>
              <span className="material-symbols-outlined text-[20px]">
                {ended ? 'check' : 'play_arrow'}
              </span>
            </button>
          )}
        </div>
      ) : (
        <p
          className={`text-[12px] flex items-center gap-1.5 ${
            completed ? 'text-[#20360a] font-semibold' : 'text-[#52443d]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {completed ? 'task_alt' : 'quiz'}
          </span>
          {completed
            ? 'Video dan semua pertanyaannya selesai.'
            : total > 0
              ? `Video akan berhenti untuk ${total} pertanyaan. Terjawab ${answeredCount} dari ${total}.`
              : 'Tonton video sampai selesai.'}
        </p>
      )}
    </section>
  );
};
