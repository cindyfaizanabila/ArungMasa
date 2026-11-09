import React, { useState } from 'react';
import { Bab, MateriProgress, MateriStatus, QuizResult, Subbab } from '../types';
import { COURSE, MASA_BAB } from '../data/course';
import { QUIZ_BY_BAB } from '../data/kuis';

interface BerandaScreenProps {
  onOpenMateri: (id: string) => void;
  isMateriUnlocked: (id: string) => boolean;
  onOpenQuiz: (babId: number) => void;
  userName: string;
  progress: MateriProgress;
  quizResults: QuizResult[];
  babList: Bab[];
  materiStatus: MateriStatus;
  nextMateri: Subbab | undefined;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  onOpenMateri,
  isMateriUnlocked,
  onOpenQuiz,
  userName,
  progress,
  quizResults,
  babList,
  materiStatus,
  nextMateri,
}) => {
  const [openBabId, setOpenBabId] = useState<number | null>(null);

  const allSubbab = babList.flatMap((b) => b.subbab);
  const doneCount = allSubbab.filter((s) => progress[s.id]).length;
  const percent = allSubbab.length ? Math.round((doneCount / allSubbab.length) * 100) : 0;

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pt-header pb-28 md:pb-12 px-4 md:px-6 min-h-app relative z-10">
      <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start">
        {/* Sapaan */}
        <section className="flex flex-col mt-2 md:mt-6">
          <span className="text-[14px] md:text-[16px] text-[#52443d] font-medium">
            Halo, {userName.split(' ')[0]}!
          </span>
          <h1 className="font-serif font-bold text-[26px] md:text-[40px] text-[#6b3a1c] leading-tight mt-0.5">
            Mau belajar apa hari ini?
          </h1>
        </section>

        {/* Kartu progres */}
        <section className="mt-5 md:mt-2 bg-[#fffcf6] rounded-xl p-4 shadow-[0_2px_10px_rgba(42,30,20,0.04)] border border-[#e7dcc8]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#855300]">
            {COURSE.level}
          </span>
          <h2 className="font-serif font-bold text-[17px] text-[#502408] leading-snug mt-0.5">
            {COURSE.title}
          </h2>

          <div className="w-full bg-[#ede8dc] h-2.5 rounded-full mt-3 overflow-hidden p-[1px]">
            <div
              className="bg-gradient-to-r from-[#ffb960] to-[#e2a04a] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[13px]">
            <span className="text-[#52443d]">
              {doneCount} dari {allSubbab.length} subbab selesai
            </span>
            <span className="text-[11px] font-semibold text-[#855300]">{percent}% Selesai</span>
          </div>

          {nextMateri && (
            <button
              onClick={() => onOpenMateri(nextMateri.id)}
              className="mt-3 w-full min-h-12 px-4 py-2 rounded-xl bg-[#6b3a1c] hover:bg-[#502408] text-white flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
            >
              <span className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ffddb8]">
                  {doneCount === 0 ? 'Mulai belajar' : 'Lanjutkan belajar'}
                </span>
                <span className="text-[14px] font-semibold truncate">{nextMateri.judul}</span>
              </span>
              <span className="material-symbols-outlined text-[20px] shrink-0">arrow_forward</span>
            </button>
          )}
        </section>
      </div>

      <div className="w-full">
      {/* Daftar bab */}
      <section className="mt-6 mb-3 flex items-end justify-between">
        <h2 className="font-serif font-bold text-[18px] text-[#502408]">Daftar Bab</h2>
        {babList.length > 0 && (
          <span className="text-[11px] text-[#52443d]">
            {babList.length} bab, {allSubbab.length} subbab
          </span>
        )}
      </section>

      {materiStatus === 'ready' && (
        <p className="-mt-1 mb-3 text-[13px] text-[#52443d]">
          Subbab pertama setiap bab sudah terbuka. Selesaikan secara berurutan untuk membuka
          subbab berikutnya, lalu kerjakan evaluasi di akhir bab.
        </p>
      )}

      {materiStatus !== 'ready' && (
        <p className="rounded-xl bg-[#f9f3e7] border border-dashed border-[#d7c2b9] p-6 text-center text-[14px] text-[#52443d]">
          {materiStatus === 'loading'
            ? 'Memuat daftar bab...'
            : 'Daftar bab gagal dimuat. Muat ulang halaman untuk mencoba lagi.'}
        </p>
      )}

      <ol className="flex flex-col">
        {babList.map((bab, index) => {
          const isOpen = openBabId === bab.id;
          const babDone = bab.subbab.filter((s) => progress[s.id]).length;
          const babComplete = babDone === bab.subbab.length;
          const isStarted = babDone > 0;
          const hasQuiz = (QUIZ_BY_BAB[bab.id]?.length ?? 0) > 0;
          const latestResult = quizResults.find((r) => r.babId === bab.id);
          const isFirst = index === 0;
          const isLast = index === babList.length - 1;
          const lineClass = isFirst && isLast
            ? 'hidden'
            : isFirst
              ? 'top-7 bottom-0'
              : isLast
                ? 'top-0 h-7'
                : 'inset-y-0';

          return (
            <li
              key={bab.id}
              className="grid grid-cols-[4.75rem_1.5rem_minmax(0,1fr)] gap-x-2 md:grid-cols-[8rem_2rem_minmax(0,1fr)] md:gap-x-3"
            >
              {/* Kisaran masa */}
              <div className="pt-[1.2rem] text-right">
                <span className="font-serif font-bold text-[11px] md:text-[14px] leading-tight text-[#855300]">
                  {MASA_BAB[bab.id]}
                </span>
              </div>

              {/* Garis dan lingkaran */}
              <div className="relative flex justify-center">
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-[#d7c2b9] ${lineClass}`}
                />
                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    babComplete
                      ? 'bg-[#20360a] border-[#20360a] text-white'
                      : isStarted
                        ? 'bg-[#ffb960] border-[#6b3a1c]'
                        : 'bg-[#fffcf6] border-[#d7c2b9]'
                  }`}
                >
                  {babComplete && (
                    <span className="material-symbols-outlined text-[15px]">check</span>
                  )}
                </span>
              </div>

              <div className="min-w-0 pb-4">
            <article
              className="w-full rounded-xl overflow-hidden bg-[#fffcf6] border border-[#e7dcc8] shadow-[0_2px_10px_rgba(42,30,20,0.04)]"
            >
              <button
                onClick={() => setOpenBabId(isOpen ? null : bab.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-[#f9f3e7] transition-colors cursor-pointer"
              >
                <span className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#855300]">
                    Bab {bab.id}
                  </span>
                  <span className="font-serif font-bold text-[15px] text-[#502408] leading-snug">
                    {bab.judul}
                  </span>
                  <span className="text-[12px] text-[#52443d]">
                    {babDone} dari {bab.subbab.length} subbab selesai
                  </span>
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#85746b] shrink-0">
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isOpen && (
                <ol className="border-t border-[#e8e2d6] animate-fadeIn">
                  {bab.subbab.map((subbab) => {
                    const isDone = Boolean(progress[subbab.id]);
                    const isLocked = !isMateriUnlocked(subbab.id);
                    const isEmpty = subbab.isi.length === 0 && !subbab.video;
                    return (
                      <li key={subbab.id} className="border-b border-[#f3ede1]">
                        <button
                          onClick={() => onOpenMateri(subbab.id)}
                          disabled={isLocked}
                          title={isLocked ? 'Selesaikan subbab sebelumnya terlebih dahulu' : undefined}
                          className="w-full min-h-12 flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors enabled:hover:bg-[#f9f3e7] enabled:cursor-pointer disabled:cursor-not-allowed"
                        >
                          <span
                            aria-hidden="true"
                            className={`material-symbols-outlined text-[18px] shrink-0 ${
                              isDone ? 'text-[#20360a]' : 'text-[#85746b]'
                            }`}
                          >
                            {isLocked ? 'lock' : isDone ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span
                            className={`text-[13px] leading-snug flex-1 ${
                              isLocked ? 'text-[#6f6158]' : 'text-[#1d1c14]'
                            }`}
                          >
                            {subbab.judul}
                            {isLocked && <span className="sr-only"> (terkunci)</span>}
                          </span>
                          {isEmpty && !isLocked && (
                            <span className="text-[10px] font-semibold text-[#52443d] bg-[#ede8dc] px-2 py-0.5 rounded-full shrink-0">
                              Segera hadir
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}

                  {/* Evaluasi bab */}
                  <li>
                    <button
                      onClick={() => onOpenQuiz(bab.id)}
                      disabled={!hasQuiz || !babComplete}
                      title={
                        hasQuiz && !babComplete
                          ? 'Selesaikan semua subbab untuk membuka evaluasi'
                          : undefined
                      }
                      className="w-full min-h-12 flex items-center gap-2.5 px-3.5 py-2.5 text-left bg-[#f9f3e7] transition-colors enabled:hover:bg-[#f3ede1] enabled:cursor-pointer disabled:cursor-not-allowed"
                    >
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-[18px] shrink-0 text-[#855300]"
                      >
                        {hasQuiz && !babComplete ? 'lock' : 'quiz'}
                      </span>
                      <span
                        className={`text-[13px] font-semibold flex-1 ${
                          hasQuiz && babComplete ? 'text-[#502408]' : 'text-[#6f6158]'
                        }`}
                      >
                        Evaluasi Bab {bab.id}
                      </span>
                      <span className="text-[10px] font-semibold text-[#52443d] bg-[#ede8dc] px-2 py-0.5 rounded-full shrink-0">
                        {!hasQuiz
                          ? 'Segera hadir'
                          : latestResult
                            ? `Skor terakhir ${latestResult.score}`
                            : babComplete
                              ? 'Belum dikerjakan'
                              : 'Terkunci'}
                      </span>
                    </button>
                  </li>
                </ol>
              )}
            </article>
              </div>
            </li>
          );
        })}
      </ol>
      </div>
    </div>
  );
};
