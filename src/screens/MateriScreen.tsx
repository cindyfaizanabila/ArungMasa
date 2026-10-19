import React, { useState } from 'react';
import { Materi, MateriBlock, MateriImage, ScreenType } from '../types';
import { MATERI_LIST } from '../data/materiData';
import { VideoFrame } from '../components/VideoFrame';

interface MateriScreenProps {
  materi: Materi;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenMateri: (id: string) => void;
}

/* ----------------------------- Blok isi materi ----------------------------- */

const Figure: React.FC<{ image: MateriImage }> = ({ image }) => (
  <figure className="w-full overflow-hidden rounded-lg border border-[#d7c2b9] bg-[#ede8dc]">
    <img
      src={image.src}
      alt={image.alt}
      decoding="async"
      className="w-full h-auto object-cover grayscale-[0.45] sepia-[0.12] contrast-[1.05]"
    />
    <figcaption className="px-3 py-2 text-[11px] leading-snug text-[#52443d] bg-[#f9f3e7] border-t border-[#e8e2d6]">
      {image.caption}
    </figcaption>
  </figure>
);

const BlockView: React.FC<{ block: MateriBlock; fontLarge: boolean }> = ({ block, fontLarge }) => {
  const body = fontLarge ? 'text-[16px]' : 'text-[14px]';

  switch (block.kind) {
    case 'paragraph':
      return <p className={`${body} text-[#1d1c14] leading-relaxed text-justify`}>{block.text}</p>;

    case 'bullets':
      return (
        <ul className="flex flex-col gap-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#855300] shrink-0" />
              <span className={`${body} text-[#1d1c14] leading-relaxed`}>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'numbered':
      return (
        <ol className="flex flex-col gap-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#f3ede1] border border-[#e8e2d6] text-[#502408] text-[11px] font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className={`${body} text-[#1d1c14] leading-relaxed`}>{item}</span>
            </li>
          ))}
        </ol>
      );

    case 'callout':
      return (
        <div className="rounded-xl bg-[#2a1700] p-3.5 flex flex-col gap-2.5 shadow-[0_8px_20px_-12px_rgba(42,30,20,0.6)]">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffb960]">
            {block.label}
          </span>
          <div className="flex flex-col gap-2">
            {block.items.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="font-serif font-bold text-[15px] text-[#ffb960] leading-snug">
                  {i + 1}.
                </span>
                <p className="text-[13px] leading-snug">
                  <span className="font-semibold text-[#fff9ed]">{item.term}</span>
                  <span className="text-[#e4d4bb]"> &mdash; {item.meaning}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'people':
      return (
        <div className="flex flex-col gap-2.5">
          {block.items.map((person) => (
            <div
              key={person.name}
              className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f9f3e7] border border-[#e8e2d6]"
            >
              {person.image ? (
                <img
                  src={person.image.src}
                  alt={person.image.alt}
                  decoding="async"
                  className="w-14 h-16 rounded-lg object-cover object-top shrink-0 border border-[#d7c2b9] grayscale contrast-[1.1]"
                />
              ) : (
                <div className="w-14 h-16 rounded-lg bg-[#ede8dc] border border-[#d7c2b9] flex items-center justify-center shrink-0 text-[#85746b]">
                  <span className="material-symbols-outlined text-[22px]">person</span>
                </div>
              )}
              <div className="flex flex-col min-w-0 pt-0.5">
                <h4 className="font-serif font-bold text-[15px] text-[#502408] leading-snug">
                  {person.name}
                </h4>
                <p className="text-[12px] text-[#52443d] leading-snug mt-0.5">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case 'timeline':
      return (
        <div className="flex flex-col relative pl-6 gap-4">
          <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-[#e8e2d6]" />
          {block.items.map((item) => (
            <div key={item.date} className="relative flex flex-col gap-1">
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#6b3a1c] ring-4 ring-[#fffcf6]" />
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-bold text-[#855300]">{item.date}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#f3ede1] text-[#52443d] font-semibold shrink-0">
                  {item.place}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {item.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[#85746b] shrink-0" />
                    <span className="text-[13px] text-[#1d1c14] leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case 'figure':
      return <Figure image={block.image} />;
  }
};

/* --------------------------------- Layar --------------------------------- */

export const MateriScreen: React.FC<MateriScreenProps> = ({
  materi,
  isCompleted,
  onToggleComplete,
  onNavigate,
  onOpenMateri,
}) => {
  const [fontLarge, setFontLarge] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const index = MATERI_LIST.findIndex((m) => m.id === materi.id);
  const prev = index > 0 ? MATERI_LIST[index - 1] : null;
  const next = index < MATERI_LIST.length - 1 ? MATERI_LIST[index + 1] : null;

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-32 px-4 min-h-app relative z-10 space-y-5">
      {/* ---------------------- HERO EDITORIAL ---------------------- */}
      <section className="-mx-4 relative">
        <div className="relative h-[232px] overflow-hidden bg-[#1f1710]">
          {materi.hero ? (
            <img
              src={materi.hero.src}
              alt={materi.hero.alt}
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.15] opacity-80"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(135deg,#ffb960_0,#ffb960_1px,transparent_1px,transparent_11px)]"
            />
          )}

          {/* Gradasi gelap agar teks tetap terbaca di atas foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1710] via-[#1f1710]/75 to-[#1f1710]/25" />

          <div className="absolute inset-0 flex flex-col justify-end p-4 gap-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#ffb960] text-[#2a1700] text-[10px] font-bold tracking-wider uppercase">
                Materi {materi.number}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#e4d4bb]">
                {materi.scope}
              </span>
            </div>

            <h1 className="font-serif font-bold text-[30px] leading-[0.95] tracking-tight text-white uppercase">
              {materi.displayTitle[0]}
              <br />
              {materi.displayTitle[1]}
            </h1>

            <p className="text-[12px] font-semibold tracking-wide text-[#ffb960]">
              {materi.era} &bull; {materi.year}
            </p>
            <p className="text-[12px] text-[#e4d4bb] leading-snug max-w-[300px]">
              {materi.subtitle}
            </p>
          </div>
        </div>

        {/* Baris alat baca */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f9f3e7] border-y border-[#e8e2d6]">
          <div className="flex items-center gap-2 text-[11px] text-[#52443d]">
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#855300]">schedule</span>
              {materi.readingMinutes} menit baca
            </span>
            <span className="text-[#d7c2b9]">|</span>
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#855300]">
                {isCompleted ? 'task_alt' : 'radio_button_unchecked'}
              </span>
              {isCompleted ? 'Selesai' : 'Belum selesai'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontLarge(!fontLarge)}
              aria-label="Ubah ukuran teks"
              title="Perbesar / perkecil teks"
              className={`w-8 h-8 rounded-lg border border-[#e8e2d6] flex items-center justify-center transition-colors cursor-pointer ${
                fontLarge
                  ? 'bg-[#6b3a1c] text-white'
                  : 'bg-[#fffcf6] text-[#502408] hover:bg-[#ede8dc]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">text_fields</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Simpan markah"
              className={`w-8 h-8 rounded-lg border border-[#e8e2d6] flex items-center justify-center transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#ffddb8] text-[#855300]'
                  : 'bg-[#fffcf6] text-[#502408] hover:bg-[#ede8dc]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[17px]"
                style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isBookmarked ? 'bookmark' : 'bookmark_add'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------- SUBBAGIAN MATERI ---------------------- */}
      {materi.sections.map((section, i) => (
        <section
          key={section.id}
          data-reveal
          className="w-full rounded-xl bg-[#fffcf6] p-4 shadow-sm border border-[#e8e2d6] flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 pb-1 border-b border-[#e8e2d6]">
            <span className="w-7 h-7 rounded-lg bg-[#f3ede1] border border-[#e8e2d6] flex items-center justify-center text-[#855300] shrink-0">
              <span className="material-symbols-outlined text-[17px]">{section.icon}</span>
            </span>
            <h2 className="font-serif font-bold text-[17px] text-[#502408] leading-snug">
              {String.fromCharCode(97 + i)}. {section.heading}
            </h2>
          </div>

          {section.blocks.map((block, bi) => (
            <BlockView key={bi} block={block} fontLarge={fontLarge} />
          ))}
        </section>
      ))}

      {/* ---------------------- GALERI ARSIP ---------------------- */}
      {materi.gallery.length > 0 && (
        <section className="-mx-4 bg-[#2a1700] py-4 flex flex-col gap-3">
          <div className="px-4 flex items-end justify-between">
            <div className="flex flex-col">
              <h3 className="font-serif font-bold text-[22px] text-white uppercase leading-none tracking-tight">
                Galeri
              </h3>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#ffb960] mt-0.5">
                Arsip Peristiwa
              </span>
            </div>
            <span className="text-[10px] text-[#e4d4bb] flex items-center gap-1 pb-1">
              <span className="material-symbols-outlined text-[13px]">swipe_left</span>
              Geser
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
            {materi.gallery.map((img) => (
              <figure
                key={img.src + img.caption}
                data-reveal
                className="shrink-0 w-[150px] flex flex-col gap-1.5"
              >
                <div className="w-full h-[196px] rounded-xl overflow-hidden bg-[#1f1710] border border-[#ffb960]/25">
                  <img
                    src={img.src}
                    alt={img.alt}
                    decoding="async"
                    className="w-full h-full object-cover object-top grayscale contrast-[1.15] hover:grayscale-0 transition-[filter] duration-500"
                  />
                </div>
                <figcaption className="text-[11px] text-[#e4d4bb] leading-snug">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------- NILAI YANG DIPETIK ---------------------- */}
      <section className="w-full rounded-xl bg-[#f3ede1] border border-[#d7c2b9]/60 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#6b3a1c]">
            volunteer_activism
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b3a1c]">
            Nilai yang Dapat Dipetik
          </span>
        </div>
        <blockquote className="font-serif text-[19px] leading-snug text-[#502408] pl-3 border-l-2 border-[#ffb960]">
          {materi.values}
        </blockquote>
      </section>

      {/* ---------------------- BINGKAI VIDEO ---------------------- */}
      <VideoFrame video={materi.video} />

      {/* ---------------------- AKSI & NAVIGASI ---------------------- */}
      <section className="w-full flex flex-col gap-2">
        <button
          onClick={onToggleComplete}
          className={`w-full h-12 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
            isCompleted
              ? 'bg-[#cfecae] text-[#0e2000] border border-[#20360a]/25'
              : 'bg-[#f9f3e7] text-[#502408] border border-[#e8e2d6] hover:bg-[#ede8dc]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isCompleted ? 'task_alt' : 'check_circle'}
          </span>
          <span>{isCompleted ? 'Materi Telah Diselesaikan' : 'Tandai Selesai Membaca'}</span>
        </button>

        <button
          onClick={() => onNavigate('kuis')}
          className="w-full h-[52px] rounded-xl bg-[#6b3a1c] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md hover:bg-[#502408] active:scale-[0.99] transition-all cursor-pointer group"
        >
          <span>Kerjakan Evaluasi (5 Soal)</span>
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            disabled={!prev}
            onClick={() => prev && onOpenMateri(prev.id)}
            className="h-14 px-3 rounded-xl bg-[#fffcf6] border border-[#e8e2d6] flex items-center gap-2 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-[#f9f3e7] enabled:cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#855300] shrink-0">
              arrow_back
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#85746b] font-semibold">
                Sebelumnya
              </span>
              <span className="text-[12px] font-semibold text-[#502408] truncate">
                {prev ? prev.title : '—'}
              </span>
            </span>
          </button>

          <button
            disabled={!next}
            onClick={() => next && onOpenMateri(next.id)}
            className="h-14 px-3 rounded-xl bg-[#fffcf6] border border-[#e8e2d6] flex items-center gap-2 text-right transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-[#f9f3e7] enabled:cursor-pointer"
          >
            <span className="flex flex-col min-w-0 ml-auto">
              <span className="text-[10px] uppercase tracking-wider text-[#85746b] font-semibold">
                Berikutnya
              </span>
              <span className="text-[12px] font-semibold text-[#502408] truncate">
                {next ? next.title : '—'}
              </span>
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#855300] shrink-0">
              arrow_forward
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
