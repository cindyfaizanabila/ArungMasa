import React from 'react';
import { Bab, MateriStatus, ScreenType } from '../types';
import { ASSET_IMAGES, QUIZ_QUESTIONS } from '../data/mockData';
import { COURSE } from '../data/course';

interface LandingScreenProps {
  onNavigate: (screen: ScreenType) => void;
  babList: Bab[];
  materiStatus: MateriStatus;
}

const STEPS = [
  {
    icon: 'account_tree',
    title: 'Pilih babnya',
    description: 'Mulai dari masa yang ingin kamu pelajari, lalu buka daftar subbabnya.',
  },
  {
    icon: 'menu_book',
    title: 'Baca subbabnya',
    description: 'Pelajari satu topik setiap kali dan tandai yang sudah selesai.',
  },
  {
    icon: 'quiz',
    title: 'Uji pemahaman',
    description: 'Kerjakan evaluasi pilihan ganda dan baca pembahasan untuk setiap jawaban.',
  },
  {
    icon: 'history',
    title: 'Pantau perjalanan',
    description: 'Subbab yang selesai dan hasil evaluasi tercatat di riwayat belajarmu.',
  },
];

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onNavigate,
  babList,
  materiStatus,
}) => {
  const subbabCount = babList.reduce((sum, b) => sum + b.subbab.length, 0);

  const facts = [
    { value: babList.length, label: 'bab' },
    { value: subbabCount, label: 'subbab' },
    { value: QUIZ_QUESTIONS.length, label: 'soal evaluasi' },
  ];

  return (
    <div className="w-full relative z-10">
      {/* ---------------------- NAVIGASI ---------------------- */}
      <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-[#fff9ed]/90 backdrop-blur-xl border-b border-[#e8e2d6]/70">
        <div className="h-16 px-4 md:px-6 max-w-6xl mx-auto flex items-center justify-between gap-4">
          <a href="#awal" className="flex items-center gap-2">
            <img
              src={ASSET_IMAGES.logo}
              alt=""
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-serif font-bold text-[18px] text-[#502408] tracking-tight">
              ArungMasa
            </span>
          </a>

          <div className="flex items-center gap-1 md:gap-2">
            <nav aria-label="Bagian halaman" className="hidden md:flex items-center gap-1 mr-2">
              <a href="#daftar-bab" className="h-10 px-3 inline-flex items-center rounded-lg text-[14px] font-medium text-[#52443d] hover:bg-[#f3ede1] hover:text-[#6b3a1c] transition-colors">
                Daftar Bab
              </a>
              <a href="#cara-belajar" className="h-10 px-3 inline-flex items-center rounded-lg text-[14px] font-medium text-[#52443d] hover:bg-[#f3ede1] hover:text-[#6b3a1c] transition-colors">
                Cara Belajar
              </a>
            </nav>
            <button
              onClick={() => onNavigate('masuk')}
              className="h-10 px-3 rounded-lg text-[14px] font-semibold text-[#502408] hover:bg-[#f3ede1] transition-colors cursor-pointer"
            >
              Masuk
            </button>
            <button
              onClick={() => onNavigate('beranda')}
              className="h-10 px-4 rounded-lg bg-[#6b3a1c] hover:bg-[#502408] text-white text-[14px] font-semibold transition-colors cursor-pointer"
            >
              Mulai
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ---------------------- HERO ---------------------- */}
        <section id="awal" className="bg-[#1f1710] pt-header">
          <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-14 md:pt-14 md:pb-20 flex flex-col items-start">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#ffb960]">
              {COURSE.level}
            </span>
            <h1 className="font-serif font-bold text-[42px] md:text-[64px] leading-[1.02] tracking-tight text-white mt-4">
              Arungi masa,
              <br />
              <span className="text-[#ffb960]">pahami zamanmu.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-[#e4d4bb] mt-5 max-w-xl">
              Telusuri perjalanan sejarah Indonesia, dari Masa Pra Aksara sampai Masa Reformasi,
              bab demi bab.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => onNavigate('beranda')}
                className="h-[52px] px-6 rounded-xl bg-[#ffb960] hover:bg-[#ffcb88] text-[#2a1700] font-semibold text-[15px] inline-flex items-center gap-2 active:scale-[0.98] transition-all cursor-pointer group"
              >
                Mulai Belajar
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
              <a
                href="#daftar-bab"
                className="h-[52px] px-6 rounded-xl border border-[#e4d4bb]/40 hover:bg-white/10 text-white font-semibold text-[15px] inline-flex items-center transition-colors"
              >
                Lihat Daftar Bab
              </a>
            </div>

            {materiStatus === 'ready' && (
              <dl className="flex gap-8 md:gap-12 mt-10 pt-6 border-t border-[#e4d4bb]/20">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col-reverse">
                    <dt className="text-[12px] text-[#e4d4bb] mt-0.5">{fact.label}</dt>
                    <dd className="font-serif font-bold text-[30px] leading-none text-white">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* ---------------------- DAFTAR BAB ---------------------- */}
        <section id="daftar-bab" className="scroll-mt-16 max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <h2 className="font-serif font-bold text-[30px] md:text-[40px] leading-tight text-[#502408]">
            Dari Pra Aksara sampai Reformasi
          </h2>

          {materiStatus !== 'ready' && (
            <p className="mt-6 text-[15px] text-[#52443d]">
              {materiStatus === 'loading'
                ? 'Memuat daftar bab...'
                : 'Daftar bab gagal dimuat. Muat ulang halaman untuk mencoba lagi.'}
            </p>
          )}

          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {babList.map((bab) => (
              <li key={bab.id} className="flex">
                <button
                  onClick={() => onNavigate('beranda')}
                  className="w-full text-left rounded-xl bg-[#fffcf6] border border-[#e7dcc8] p-4 flex items-start gap-3 hover:border-[#855300]/50 hover:shadow-md transition-all cursor-pointer"
                >
                  <span className="font-serif font-bold text-[28px] leading-none text-[#855300] w-9 shrink-0">
                    {bab.id}
                  </span>
                  <span className="flex flex-col gap-1 min-w-0">
                    <span className="font-serif font-bold text-[17px] leading-snug text-[#502408]">
                      {bab.judul}
                    </span>
                    <span className="text-[13px] text-[#52443d]">{bab.subbab.length} subbab</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------- CARA BELAJAR ---------------------- */}
        <section id="cara-belajar" className="scroll-mt-16 bg-[#f3ede1] border-y border-[#e7dcc8]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <h2 className="font-serif font-bold text-[30px] md:text-[40px] leading-tight text-[#502408]">
              Cara belajarnya
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <li key={step.title} className="flex flex-col gap-2">
                  <span className="material-symbols-outlined text-[28px] text-[#855300]">
                    {step.icon}
                  </span>
                  <h3 className="font-serif font-bold text-[20px] text-[#502408]">{step.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#52443d]">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------- AJAKAN AKHIR ---------------------- */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="rounded-xl bg-[#2a1700] px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-serif font-bold text-[28px] md:text-[36px] leading-tight text-white">
                Siap memulai perjalanan?
              </h2>
              <p className="text-[15px] text-[#e4d4bb] mt-2">
                Buat akun agar progres belajarmu punya tempat.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => onNavigate('daftar')}
                className="h-[52px] px-6 rounded-xl bg-[#ffb960] hover:bg-[#ffcb88] text-[#2a1700] font-semibold text-[15px] transition-colors cursor-pointer"
              >
                Daftar Akun
              </button>
              <button
                onClick={() => onNavigate('masuk')}
                className="h-[52px] px-6 rounded-xl border border-[#e4d4bb]/40 hover:bg-white/10 text-white font-semibold text-[15px] transition-colors cursor-pointer"
              >
                Masuk
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7dcc8]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[13px] text-[#52443d]">
          <span className="font-serif font-bold text-[16px] text-[#502408]">ArungMasa</span>
          <span>{COURSE.title}</span>
        </div>
      </footer>
    </div>
  );
};
