import React from 'react';
import { MateriVideo } from '../types';

interface VideoFrameProps {
  video: MateriVideo;
}

const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
const VIDEO_FILE = /\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i;

type Playable =
  | { mode: 'embed'; src: string }
  | { mode: 'file'; src: string }
  | { mode: 'empty' };

/** Menentukan cara memutar dari URL, atau menandai bahwa video belum tersedia. */
const resolveVideo = (video: MateriVideo): Playable => {
  const url = video.url?.trim();
  if (!url) return { mode: 'empty' };

  if (video.provider === 'file' || (!video.provider && VIDEO_FILE.test(url))) {
    return { mode: 'file', src: url };
  }

  const yt = url.match(YOUTUBE_ID);
  if (yt) return { mode: 'embed', src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0` };

  // URL lain (mis. Drive atau penyedia lain) diperlakukan sebagai embed apa adanya.
  return { mode: 'embed', src: url };
};

/**
 * Bingkai pemutar video di bagian bawah setiap materi.
 *
 * Selama `video.url` kosong, bingkai tetap tampil sebagai tempat video sehingga
 * tata letak materi tidak berubah ketika videonya nanti ditambahkan.
 */
export const VideoFrame: React.FC<VideoFrameProps> = ({ video }) => {
  const playable = resolveVideo(video);

  return (
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#502408]">
          <span className="material-symbols-outlined text-[20px] text-[#855300]">
            smart_display
          </span>
          <h3 className="font-serif font-bold text-[17px]">Video Pembelajaran</h3>
        </div>
        {video.duration && (
          <span className="text-[11px] text-[#52443d] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {video.duration}
          </span>
        )}
      </div>

      {/* Bingkai 16:9 */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1f1710] border border-[#d7c2b9] shadow-[0_8px_24px_-12px_rgba(42,30,20,0.5)]">
        {playable.mode === 'embed' && (
          <iframe
            src={playable.src}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}

        {playable.mode === 'file' && (
          <video
            src={playable.src}
            title={video.title}
            className="absolute inset-0 w-full h-full object-contain bg-black"
            controls
            playsInline
            preload="metadata"
          />
        )}

        {playable.mode === 'empty' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center px-5">
            {/* Garis film samar di tepi atas & bawah */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-3 bg-[repeating-linear-gradient(90deg,#ffb960_0,#ffb960_6px,transparent_6px,transparent_14px)] opacity-20"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-3 bg-[repeating-linear-gradient(90deg,#ffb960_0,#ffb960_6px,transparent_6px,transparent_14px)] opacity-20"
            />

            <div className="w-14 h-14 rounded-full bg-[#ffb960]/15 border border-[#ffb960]/40 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[30px] text-[#ffb960] translate-x-[1px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffb960]">
                Video Belum Tersedia
              </span>
              <p className="text-[13px] text-[#f1e6d4] leading-snug max-w-[260px]">
                {video.title}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-[12px] text-[#52443d] leading-relaxed">{video.description}</p>
    </section>
  );
};
