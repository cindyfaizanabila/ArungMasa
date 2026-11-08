import React, { useState } from 'react';
import { Bab, MateriProgress, MateriStatus, ScreenType } from '../types';
import { COURSE } from '../data/course';

interface BerandaScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenMateri: (id: string) => void;
  isMateriUnlocked: (id: string) => boolean;
  userName: string;
  progress: MateriProgress;
  babList: Bab[];
  materiStatus: MateriStatus;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  onNavigate,
  onOpenMateri,
  isMateriUnlocked,
  userName,
  progress,
  babList,
  materiStatus,
}) => {
  const [showObjectives, setShowObjectives] = useState(false);
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

          <button
            onClick={() => setShowObjectives(!showObjectives)}
            aria-expanded={showObjectives}
            className="mt-3 w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#f9f3e7] border border-[#e8e2d6] text-left hover:bg-[#f3ede1] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#502408]">
              <span className="material-symbols-outlined text-[16px] text-[#855300]">target</span>
              Tujuan Pembelajaran
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#85746b]">
              {showObjectives ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {showObjectives && (
            <ol className="mt-2 flex flex-col gap-1.5 animate-fadeIn">
              {COURSE.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#f3ede1] border border-[#e8e2d6] text-[#502408] text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[13px] text-[#1d1c14] leading-relaxed">{obj}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

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
          Subbab pertama setiap bab sudah terbuka. Selesaikan secara berurutan untuk membuka subbab berikutnya.
        </p>
      )}

      {materiStatus !== 'ready' && (
        <p className="rounded-xl bg-[#f9f3e7] border border-dashed border-[#d7c2b9] p-6 text-center text-[14px] text-[#52443d]">
          {materiStatus === 'loading'
            ? 'Memuat daftar bab...'
            : 'Daftar bab gagal dimuat. Muat ulang halaman untuk mencoba lagi.'}
        </p>
      )}

      <div className="grid gap-3 md:grid-cols-2 md:gap-4 items-start">
        {babList.map((bab) => {
          const isOpen = openBabId === bab.id;
          const babDone = bab.subbab.filter((s) => progress[s.id]).length;
          return (
            <article
              key={bab.id}
              className="w-full rounded-xl overflow-hidden bg-[#fffcf6] border border-[#e7dcc8] shadow-[0_2px_10px_rgba(42,30,20,0.04)]"
            >
              <button
                onClick={() => setOpenBabId(isOpen ? null : bab.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-[#f9f3e7] transition-colors cursor-pointer"
              >
                <span className="w-9 h-9 rounded-full bg-[#ffb960] text-[#2a1700] text-[13px] font-bold flex items-center justify-center shrink-0">
                  {bab.id}
                </span>
                <span className="flex flex-col flex-1 min-w-0">
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
                    return (
                      <li key={subbab.id} className="border-b border-[#f3ede1] last:border-b-0">
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
                            className={`text-[13px] leading-snug ${
                              isLocked ? 'text-[#6f6158]' : 'text-[#1d1c14]'
                            }`}
                          >
                            {subbab.judul}
                            {isLocked && <span className="sr-only"> (terkunci)</span>}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </article>
          );
        })}
      </div>

      {/* Evaluasi */}
      <section className="mt-5 w-full md:max-w-sm md:mx-auto">
        <button
          onClick={() => onNavigate('kuis')}
          className="w-full h-[52px] rounded-xl bg-[#6b3a1c] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md hover:bg-[#502408] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">quiz</span>
          <span>Kerjakan Evaluasi Pembelajaran</span>
        </button>
      </section>
    </div>
  );
};
