import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]';
const STAGGER_MS = 70;
/** Batas langkah stagger agar kartu terakhir tidak menunggu terlalu lama. */
const MAX_STAGGER_STEPS = 6;
/** Bagian kartu yang harus terlihat sebelum dianggap masuk. */
const REVEAL_RATIO = 0.12;

/* Ditambahkan saat modul dievaluasi, yaitu sebelum render pertama, supaya
   kartu tidak sempat tampil satu frame lalu disembunyikan (berkedip).
   Selama kelas ini tidak ada, CSS tidak menyembunyikan apa pun — jadi bila
   JavaScript gagal, isi tetap terbaca. */
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js-reveal');
}

/**
 * Memunculkan elemen ber-`data-reveal` saat tergulir masuk ke area pandang,
 * lengkap dengan stagger menurut urutan vertikalnya.
 *
 * Root observer mengikuti elemen yang benar-benar menggulir: di dalam bingkai
 * HP yang menggulir adalah `.phone-screen`, bukan jendela browser. Memakai
 * viewport sebagai root di sana membuat perpotongan tidak pernah terhitung —
 * masalah yang sama yang membuat `loading="lazy"` gagal di dalam bingkai.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.documentElement.classList.remove('js-reveal');
      return;
    }

    const mq = window.matchMedia('(min-width: 768px)');
    let observer: IntersectionObserver | null = null;
    let mutation: MutationObserver | null = null;
    let rafId = 0;

    const setup = () => {
      observer?.disconnect();
      mutation?.disconnect();

      const scroller = document.querySelector<HTMLElement>('[data-app-scroll]');
      const root =
        scroller && getComputedStyle(scroller).overflowY === 'auto' ? scroller : null;

      observer = new IntersectionObserver(
        (entries) => {
          const masuk = entries
            .filter((e) => e.isIntersecting && e.intersectionRatio >= REVEAL_RATIO)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          masuk.forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.animationDelay = `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`;
            el.dataset.revealed = '';
          });

          // Dilepas lagi setelah benar-benar keluar layar, sehingga animasinya
          // terlihat ulang ketika kartu digulir kembali ke dalam.
          entries
            .filter((e) => !e.isIntersecting)
            .forEach((e) => {
              const el = e.target as HTMLElement;
              delete el.dataset.revealed;
              el.style.animationDelay = '';
            });
        },
        { root, threshold: [0, REVEAL_RATIO] }
      );

      const scan = () => {
        document
          .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
          .forEach((el) => observer?.observe(el));
      };
      scan();

      // Kartu bisa menyusul: pindah layar, panel yang dibuka, galeri, dsb.
      mutation = new MutationObserver(() => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(scan);
      });
      mutation.observe(document.body, { childList: true, subtree: true });
    };

    setup();
    mq.addEventListener('change', setup);

    return () => {
      mq.removeEventListener('change', setup);
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      mutation?.disconnect();
    };
  }, []);
};
