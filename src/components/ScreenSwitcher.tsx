import React, { useEffect, useRef, useState } from 'react';
import { ScreenType } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

const SCREENS: { id: ScreenType; label: string; icon: string }[] = [
  { id: 'beranda', label: '1. Beranda', icon: 'cottage' },
  { id: 'materi', label: '2. Materi', icon: 'menu_book' },
  { id: 'kuis', label: '3. Evaluasi', icon: 'quiz' },
  { id: 'riwayat', label: '4. Riwayat Jurnal', icon: 'history' },
  { id: 'akun', label: '5. Akun Siswa', icon: 'account_circle' },
  { id: 'masuk', label: '6. Masuk (Login)', icon: 'login' },
  { id: 'daftar', label: '7. Daftar (Registrasi)', icon: 'person_add' },
];

/**
 * Tombol pratinjau layar untuk peninjauan cepat. Tampil sebagai ikon saja di
 * dalam header, bersebelahan dengan tombol akun.
 */
export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({ currentScreen, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Tutup saat menekan Esc atau mengetuk di luar panel.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Pratinjau layar"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="Pratinjau layar"
        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-95 cursor-pointer ${
          isOpen
            ? 'bg-[#502408] text-white border-[#502408] shadow-xs'
            : 'bg-[#f3ede1] text-[#502408] border-[#e8e2d6] hover:bg-[#ede8dc]'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">layers</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[38px] w-52 bg-[#fffcf6] border border-[#d7c2b9] rounded-xl p-2 shadow-xl flex flex-col gap-0.5 text-left text-xs animate-fadeIn z-50"
        >
          <div className="flex items-center gap-1 px-1.5 pb-1.5 mb-0.5 border-b border-[#e8e2d6]">
            <span className="material-symbols-outlined text-[15px] text-[#855300]">
              auto_stories
            </span>
            <span className="font-semibold text-[#502408] font-serif text-[12px]">
              Pratinjau Layar
            </span>
          </div>

          {SCREENS.map((s) => (
            <button
              key={s.id}
              role="menuitem"
              onClick={() => {
                onNavigate(s.id);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium transition-all cursor-pointer text-left ${
                currentScreen === s.id
                  ? 'bg-[#6b3a1c] text-white shadow-xs'
                  : 'hover:bg-[#f3ede1] text-[#52443d]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
              <span className="truncate">{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
