import React, { useState } from 'react';
import { MateriProgress, QuizResult, ScreenType } from '../types';
import { MATERI_LIST } from '../data/materiData';

interface RiwayatScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenMateri: (id: string) => void;
  progress: MateriProgress;
  quizResult: QuizResult | null;
}

const formatStamp = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  const time = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  if (sameDay) return `Hari ini, ${time} WIB`;
  return `${d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${time} WIB`;
};

export const RiwayatScreen: React.FC<RiwayatScreenProps> = ({
  onNavigate,
  onOpenMateri,
  progress,
  quizResult,
}) => {
  const [filter, setFilter] = useState<'all' | 'done' | 'todo'>('all');

  const doneCount = MATERI_LIST.filter((m) => progress[m.id]).length;
  const percent = Math.round((doneCount / MATERI_LIST.length) * 100);

  const items = MATERI_LIST.filter((m) => {
    if (filter === 'done') return Boolean(progress[m.id]);
    if (filter === 'todo') return !progress[m.id];
    return true;
  });

  const filters: { id: typeof filter; label: string; icon: string }[] = [
    { id: 'all', label: 'Semua', icon: 'clear_all' },
    { id: 'done', label: 'Selesai', icon: 'task_alt' },
    { id: 'todo', label: 'Belum Dibaca', icon: 'hourglass_top' },
  ];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-28 px-4 min-h-app relative z-10">
      {/* Judul */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#6b3a1c]">auto_stories</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#855300]">
            Catatan Belajar Siswa
          </span>
        </div>
        <h1 className="font-serif font-bold text-[26px] text-[#502408] tracking-tight">
          Jurnal &amp; Riwayat Belajar
        </h1>
        <p className="text-[14px] text-[#52443d] leading-relaxed">
          Rekam jejak materi dan evaluasi yang telah kamu kerjakan.
        </p>
      </div>

      {/* Statistik ringkas */}
      <div className="grid grid-cols-2 gap-3 w-full mt-4">
        <div className="bg-[#f9f3e7] p-3.5 rounded-xl shadow-xs border border-[#e8e2d6] flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#ede8dc] flex items-center justify-center text-[#6b3a1c]">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                history_edu
              </span>
            </div>
            <span className="text-[11px] text-[#855300] font-semibold bg-[#ffddb8]/60 px-2 py-0.5 rounded-full border border-[#ffddb8]">
              Materi
            </span>
          </div>
          <div>
            <div className="font-serif font-bold text-[22px] text-[#502408] tracking-tight">
              {doneCount} / {MATERI_LIST.length}
            </div>
            <p className="text-[12px] text-[#52443d]">Telah dipelajari</p>
          </div>
          <div className="w-full bg-[#e8e2d6] h-1.5 rounded-full overflow-hidden mt-0.5">
            <div className="bg-[#6b3a1c] h-full rounded-full" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="bg-[#f9f3e7] p-3.5 rounded-xl shadow-xs border border-[#e8e2d6] flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#ede8dc] flex items-center justify-center text-[#855300]">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                quizResult
                  ? 'text-[#20360a] bg-[#cfecae]/70 border-[#cfecae]'
                  : 'text-[#52443d] bg-[#ede8dc] border-[#e8e2d6]'
              }`}
            >
              Evaluasi
            </span>
          </div>
          <div>
            <div className="font-serif font-bold text-[22px] text-[#502408] tracking-tight">
              {quizResult ? `${quizResult.score}` : '—'}
            </div>
            <p className="text-[12px] text-[#52443d]">
              {quizResult
                ? `${quizResult.correctCount} dari ${quizResult.totalQuestions} benar`
                : 'Belum dikerjakan'}
            </p>
          </div>
          <div className="w-full bg-[#e8e2d6] h-1.5 rounded-full overflow-hidden mt-0.5">
            <div
              className="bg-[#ffb960] h-full rounded-full"
              style={{ width: `${quizResult ? quizResult.score : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-4 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0 ${
              filter === f.id
                ? 'bg-[#6b3a1c] text-white'
                : 'bg-[#f3ede1] text-[#52443d] hover:bg-[#ede8dc]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Hasil evaluasi */}
      {quizResult && filter !== 'todo' && (
        <div className="mt-4 rounded-xl bg-[#fffcf6] border border-[#e8e2d6] p-3.5 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[#52443d] text-[12px]">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>{formatStamp(quizResult.completedAt)}</span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-[#cfecae] text-[#0e2000] flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              Selesai
            </span>
          </div>
          <h2 className="font-serif font-bold text-[16px] text-[#502408] leading-snug">
            Evaluasi Pembelajaran: Lima Peristiwa Penting
          </h2>
          <div className="flex items-center gap-2 pt-1 border-t border-[#f3ede1]">
            <div className="flex items-center gap-1 bg-[#f9f3e7] border border-[#e8e2d6] px-2 py-0.5 rounded-md text-[#502408] font-semibold text-[12px]">
              <span className="material-symbols-outlined text-[14px] text-[#855300]">verified</span>
              <span>Skor: {quizResult.score}/100</span>
            </div>
            <span className="text-[12px] text-[#52443d]">+{quizResult.xp} Poin</span>
            <button
              onClick={() => onNavigate('kuis')}
              className="ml-auto text-[12px] font-semibold text-[#502408] hover:text-[#6b3a1c] flex items-center cursor-pointer"
            >
              <span>Ulangi</span>
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        </div>
      )}

      {/* Linimasa materi */}
      <div className="flex flex-col gap-3.5 w-full relative mt-4">
        <div className="absolute left-4 top-3 bottom-6 w-0.5 bg-[#e8e2d6] -z-0" />

        {items.map((materi) => {
          const stamp = progress[materi.id];
          const isDone = Boolean(stamp);

          return (
            <div
              key={materi.id}
              data-reveal
              className="w-full pl-8 relative"
            >
              <div
                className={`absolute left-2.5 top-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#fff9ed] flex items-center justify-center shadow-xs ${
                  isDone ? 'bg-[#cfecae]' : 'bg-[#ede8dc]'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-[#20360a]' : 'bg-[#85746b]'}`}
                />
              </div>

              <div className="bg-[#fffcf6] p-3.5 rounded-xl shadow-xs border border-[#e8e2d6] hover:shadow-md transition-all flex flex-col gap-2">
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <div className="flex items-center gap-1 text-[#52443d] text-[12px]">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{isDone ? formatStamp(stamp) : 'Belum dibaca'}</span>
                  </div>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                      isDone ? 'bg-[#cfecae] text-[#0e2000]' : 'bg-[#f3ede1] text-[#52443d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isDone ? 'check_circle' : 'timelapse'}
                    </span>
                    <span>{isDone ? 'Selesai' : 'Belum Selesai'}</span>
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h2 className="font-serif font-bold text-[16px] text-[#502408] leading-snug">
                    Materi {materi.number}: {materi.title}
                  </h2>
                  <p className="text-[12px] text-[#52443d]">{materi.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#f3ede1]">
                  <span className="inline-flex items-center gap-1 text-[#52443d] text-[12px]">
                    <span className="material-symbols-outlined text-[14px]">menu_book</span>
                    <span>{materi.readingMinutes} menit baca</span>
                  </span>
                  <button
                    onClick={() => onOpenMateri(materi.id)}
                    className="bg-[#502408] text-white px-3 py-1 rounded-lg text-[12px] font-semibold hover:bg-[#6b3a1c] transition-colors shadow-xs flex items-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <span>{isDone ? 'Baca Ulang' : 'Mulai Baca'}</span>
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="ml-8 p-4 rounded-xl bg-[#f9f3e7] border border-dashed border-[#d7c2b9] text-center">
            <span className="material-symbols-outlined text-[24px] text-[#85746b]">inbox</span>
            <p className="text-[13px] text-[#52443d] mt-1">
              {filter === 'done'
                ? 'Belum ada materi yang ditandai selesai.'
                : 'Semua materi sudah kamu selesaikan.'}
            </p>
          </div>
        )}
      </div>

      {/* Kutipan */}
      <div className="w-full bg-[#ede8dc]/80 p-4 rounded-xl shadow-xs border border-[#d7c2b9]/60 flex flex-col gap-2 mt-6">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px] text-[#502408]">format_quote</span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#6b3a1c]">
            Amanat Sejarah
          </span>
        </div>
        <blockquote className="font-serif italic text-[17px] text-[#502408] leading-relaxed pl-2.5 border-l-2 border-[#6b3a1c]">
          &ldquo;Jasmerah: Jangan sekali-kali meninggalkan sejarah.&rdquo;
        </blockquote>
        <span className="text-[12px] text-[#52443d] font-medium">
          &mdash; Ir. Soekarno, 17 Agustus 1966
        </span>
      </div>
    </div>
  );
};
