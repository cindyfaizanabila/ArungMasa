import React, { useState } from 'react';
import { MateriProgress, ScreenType } from '../types';
import { COURSE, CONCEPT_MAP, LEARNING_ACTIVITIES, MATERI_LIST } from '../data/materiData';

interface BerandaScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenMateri: (id: string) => void;
  userName: string;
  progress: MateriProgress;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  onNavigate,
  onOpenMateri,
  userName,
  progress,
}) => {
  const [showObjectives, setShowObjectives] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const doneCount = MATERI_LIST.filter((m) => progress[m.id]).length;
  const percent = Math.round((doneCount / MATERI_LIST.length) * 100);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-28 px-4 min-h-app relative z-10">
      {/* Sapaan */}
      <section className="flex flex-col mt-2">
        <span className="text-[14px] text-[#52443d] font-medium">
          Halo, {userName.split(' ')[0]}!
        </span>
        <h1 className="font-serif font-bold text-[26px] text-[#6b3a1c] leading-tight mt-0.5">
          Mau belajar apa hari ini?
        </h1>
      </section>

      {/* Kartu progres tema */}
      <section className="mt-5 bg-[#fffcf6] rounded-xl p-4 shadow-[0_2px_10px_rgba(42,30,20,0.04)] border border-[#e7dcc8]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#855300]">
              {COURSE.level}
            </span>
            <h2 className="font-serif font-bold text-[17px] text-[#502408] leading-snug mt-0.5">
              {COURSE.title}
            </h2>
          </div>
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] border border-[#e2a04a]/30 shrink-0">
            Aktif
          </span>
        </div>

        <div className="w-full bg-[#ede8dc] h-2.5 rounded-full mt-3 overflow-hidden p-[1px]">
          <div
            className="bg-gradient-to-r from-[#ffb960] to-[#e2a04a] h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-[13px]">
          <span className="text-[#52443d]">
            {doneCount} dari {MATERI_LIST.length} materi selesai
          </span>
          <span className="text-[11px] font-semibold text-[#855300]">{percent}% Selesai</span>
        </div>

        <button
          onClick={() => setShowObjectives(!showObjectives)}
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

      {/* Daftar materi */}
      <section className="mt-6 mb-3 flex items-end justify-between">
        <h2 className="font-serif font-bold text-[18px] text-[#502408]">Daftar Materi</h2>
        <span className="text-[11px] text-[#52443d]">{MATERI_LIST.length} peristiwa</span>
      </section>

      <div className="flex flex-col gap-3">
        {MATERI_LIST.map((materi) => {
          const isDone = Boolean(progress[materi.id]);
          return (
            <article
              key={materi.id}
              data-reveal
              onClick={() => onOpenMateri(materi.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenMateri(materi.id);
                }
              }}
              className="w-full rounded-xl overflow-hidden bg-[#fffcf6] border border-[#e7dcc8] shadow-[0_2px_10px_rgba(42,30,20,0.04)] hover:border-[#d7c2b9] hover:shadow-md active:scale-[0.99] transition-all cursor-pointer select-none group flex"
            >
              {/* Sisi gambar / tipografi */}
              <div className="relative w-[104px] shrink-0 bg-[#1f1710]">
                {materi.hero ? (
                  <img
                    src={materi.hero.src}
                    alt={materi.hero.alt}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.1] brightness-[1.25] group-hover:brightness-[1.4] transition-[filter]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(135deg,#ffb960_0,#ffb960_1px,transparent_1px,transparent_10px)]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1710]/85 via-[#1f1710]/25 to-[#1f1710]/5" />
                <div className="absolute inset-0 flex flex-col justify-between p-2">
                  <span className="w-6 h-6 rounded-full bg-[#ffb960] text-[#2a1700] text-[12px] font-bold flex items-center justify-center">
                    {materi.number}
                  </span>
                  <span className="font-serif font-bold text-[15px] text-white leading-none">
                    {materi.year}
                  </span>
                </div>
              </div>

              {/* Sisi teks */}
              <div className="flex flex-col flex-1 min-w-0 p-3 gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#855300] truncate">
                    {materi.era}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-[15px] text-[#502408] leading-snug group-hover:text-[#6b3a1c] transition-colors">
                  {materi.title}
                </h3>
                <p className="text-[12px] text-[#52443d] leading-snug line-clamp-2">
                  {materi.summary}
                </p>

                <div className="flex items-center gap-2 mt-auto pt-1.5 text-[11px]">
                  <span className="inline-flex items-center gap-1 text-[#52443d]">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    {materi.readingMinutes} mnt
                  </span>
                  {materi.gallery.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[#52443d]">
                      <span className="material-symbols-outlined text-[13px]">photo_library</span>
                      {materi.gallery.length}
                    </span>
                  )}
                  <span
                    className={`ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${
                      isDone ? 'bg-[#cfecae] text-[#0e2000]' : 'bg-[#f3ede1] text-[#52443d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {isDone ? 'check_circle' : 'play_circle'}
                    </span>
                    {isDone ? 'Selesai' : 'Mulai'}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Peta konsep */}
      <section className="mt-5 rounded-xl overflow-hidden bg-[#2a1700] border border-[#d7c2b9]/30">
        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full flex items-center justify-between gap-2 p-3.5 text-left cursor-pointer"
        >
          <span className="flex items-center gap-2 min-w-0">
            <span className="w-9 h-9 rounded-lg bg-[#ffb960]/15 border border-[#ffb960]/40 flex items-center justify-center text-[#ffb960] shrink-0">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-[15px] text-white leading-snug">
                Peta Konsep Lima Peristiwa
              </span>
              <span className="text-[11px] text-[#e4d4bb] truncate">
                Ringkasan visual seluruh materi
              </span>
            </span>
          </span>
          <span className="material-symbols-outlined text-[20px] text-[#ffb960] shrink-0">
            {showMap ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {showMap && (
          <figure className="px-3 pb-3 animate-fadeIn">
            <a
              href={CONCEPT_MAP.src}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg overflow-hidden border border-[#ffb960]/25 bg-white"
            >
              <img src={CONCEPT_MAP.src} alt={CONCEPT_MAP.alt} decoding="async" className="w-full h-auto" />
            </a>
            <figcaption className="text-[11px] text-[#e4d4bb] leading-snug mt-2">
              {CONCEPT_MAP.caption} Ketuk gambar untuk membukanya dalam ukuran penuh.
            </figcaption>
          </figure>
        )}
      </section>

      {/* Aktivitas pembelajaran */}
      <section className="mt-5 flex flex-col gap-2">
        <h2 className="font-serif font-bold text-[18px] text-[#502408]">Aktivitas Pembelajaran</h2>
        {LEARNING_ACTIVITIES.map((act) => (
          <div
            key={act.title}
            data-reveal
            className="rounded-xl bg-[#fffcf6] border border-[#e7dcc8] p-3.5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#f3ede1] border border-[#e8e2d6] flex items-center justify-center text-[#855300] shrink-0">
                <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
              </span>
              <h3 className="font-serif font-bold text-[15px] text-[#502408] leading-snug">
                {act.title}
              </h3>
            </div>
            <p className="text-[12px] text-[#52443d] leading-relaxed">{act.description}</p>
            {act.items.length > 0 && (
              <ul className="flex flex-col gap-1 pl-0.5">
                {act.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#855300] shrink-0" />
                    <span className="text-[12px] text-[#1d1c14] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Evaluasi */}
      <section className="mt-5">
        <button
          onClick={() => onNavigate('kuis')}
          className="w-full h-[52px] rounded-xl bg-[#6b3a1c] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md hover:bg-[#502408] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">quiz</span>
          <span>Kerjakan Evaluasi Pembelajaran</span>
        </button>
      </section>

      {/* Kesimpulan */}
      <section className="mt-5 p-4 rounded-xl bg-[#f3ede1] border border-[#d7c2b9]/60 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#6b3a1c]">
            emoji_objects
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b3a1c]">
            Kesimpulan
          </span>
        </div>
        {COURSE.conclusion.map((text, i) => (
          <p key={i} className="text-[13px] text-[#52443d] leading-relaxed text-justify">
            {text}
          </p>
        ))}
      </section>
    </div>
  );
};
