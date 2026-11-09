import React from 'react';
import { Bab, MateriProgress, QuizResult, ScreenType, Subbab } from '../types';

interface RiwayatScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenMateri: (id: string) => void;
  onOpenQuiz: (babId: number) => void;
  progress: MateriProgress;
  quizResults: QuizResult[];
  babList: Bab[];
  materiList: Subbab[];
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
  onOpenQuiz,
  progress,
  quizResults,
  babList,
  materiList,
}) => {
  const doneCount = materiList.filter((m) => progress[m.id]).length;
  const percent = materiList.length ? Math.round((doneCount / materiList.length) * 100) : 0;

  // Subbab yang sudah selesai, yang terbaru di atas.
  const completed = materiList
    .filter((m) => progress[m.id])
    .sort((a, b) => progress[b.id].localeCompare(progress[a.id]));

  // Hasil evaluasi terbaru untuk setiap bab (quizResults sudah terurut terbaru dulu).
  const latestByBab = babList
    .map((bab) => ({ bab, result: quizResults.find((r) => r.babId === bab.id) }))
    .filter((item): item is { bab: Bab; result: QuizResult } => Boolean(item.result));

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto pt-header pb-28 md:pb-12 px-4 md:px-6 min-h-app relative z-10">
      {/* Judul */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#6b3a1c]">auto_stories</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#855300]">
            Catatan Belajar
          </span>
        </div>
        <h1 className="font-serif font-bold text-[26px] text-[#502408] tracking-tight">
          Riwayat Belajar
        </h1>
        <p className="text-[14px] text-[#52443d] leading-relaxed">
          Subbab dan evaluasi yang sudah kamu kerjakan.
        </p>
      </div>

      {/* Statistik ringkas */}
      <div className="grid grid-cols-2 gap-3 w-full mt-4">
        <div className="bg-[#f9f3e7] p-3.5 rounded-xl shadow-xs border border-[#e8e2d6] flex flex-col gap-2">
          <span className="text-[11px] text-[#855300] font-semibold">Subbab selesai</span>
          <div className="font-serif font-bold text-[22px] text-[#502408] tracking-tight">
            {doneCount} / {materiList.length}
          </div>
          <div className="w-full bg-[#e8e2d6] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#6b3a1c] h-full rounded-full" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="bg-[#f9f3e7] p-3.5 rounded-xl shadow-xs border border-[#e8e2d6] flex flex-col gap-2">
          <span className="text-[11px] text-[#855300] font-semibold">Bab dievaluasi</span>
          <div className="font-serif font-bold text-[22px] text-[#502408] tracking-tight">
            {latestByBab.length} / {babList.length}
          </div>
          <div className="w-full bg-[#e8e2d6] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#ffb960] h-full rounded-full"
              style={{
                width: `${babList.length ? (latestByBab.length / babList.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Hasil evaluasi */}
      {latestByBab.length > 0 && (
        <section className="mt-6 flex flex-col gap-2.5">
          <h2 className="font-serif font-bold text-[18px] text-[#502408]">Hasil Evaluasi</h2>
          {latestByBab.map(({ bab, result }) => (
            <div
              key={bab.id}
              className="rounded-xl bg-[#fffcf6] border border-[#e8e2d6] p-3.5 flex flex-col gap-2 shadow-xs"
            >
              <div className="flex items-center gap-1 text-[#52443d] text-[12px]">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>{formatStamp(result.completedAt)}</span>
              </div>
              <h3 className="font-serif font-bold text-[16px] text-[#502408] leading-snug">
                Evaluasi Bab {bab.id}: {bab.judul}
              </h3>
              <div className="flex items-center gap-2 pt-1 border-t border-[#f3ede1]">
                <div className="flex items-center gap-1 bg-[#f9f3e7] border border-[#e8e2d6] px-2 py-0.5 rounded-md text-[#502408] font-semibold text-[12px]">
                  <span className="material-symbols-outlined text-[14px] text-[#855300]">verified</span>
                  <span>
                    Skor: {result.score}/100 ({result.correctCount} dari {result.totalQuestions} benar)
                  </span>
                </div>
                <button
                  onClick={() => onOpenQuiz(bab.id)}
                  className="ml-auto text-[12px] font-semibold text-[#502408] hover:text-[#6b3a1c] flex items-center cursor-pointer"
                >
                  <span>Ulangi</span>
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Subbab selesai */}
      <section className="mt-6 flex flex-col gap-2.5">
        <h2 className="font-serif font-bold text-[18px] text-[#502408]">Subbab Selesai</h2>

        {completed.length === 0 && (
          <div className="p-5 rounded-xl bg-[#f9f3e7] border border-dashed border-[#d7c2b9] text-center flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#85746b]">inbox</span>
            <p className="text-[13px] text-[#52443d]">Belum ada subbab yang diselesaikan.</p>
            <button
              onClick={() => onNavigate('beranda')}
              className="h-10 px-4 rounded-lg bg-[#6b3a1c] hover:bg-[#502408] text-white text-[13px] font-semibold transition-colors cursor-pointer"
            >
              Mulai belajar
            </button>
          </div>
        )}

        {completed.map((materi) => (
          <div
            key={materi.id}
            data-reveal
            className="bg-[#fffcf6] p-3.5 rounded-xl shadow-xs border border-[#e8e2d6] flex items-center gap-3"
          >
            <span
              className="material-symbols-outlined text-[22px] text-[#20360a] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-serif font-bold text-[15px] text-[#502408] leading-snug">
                {materi.judul}
              </span>
              <span className="text-[12px] text-[#52443d] truncate">
                {materi.babJudul} · {formatStamp(progress[materi.id])}
              </span>
            </div>
            <button
              onClick={() => onOpenMateri(materi.id)}
              className="shrink-0 h-9 px-3 rounded-lg bg-[#f3ede1] hover:bg-[#ede8dc] text-[#502408] text-[12px] font-semibold transition-colors cursor-pointer"
            >
              Baca ulang
            </button>
          </div>
        ))}
      </section>

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
