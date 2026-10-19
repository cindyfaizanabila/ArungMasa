import React from 'react';
import { ScreenType } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  titleOverride?: string;
  subtitleOverride?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightActions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  titleOverride,
  subtitleOverride,
  showBackButton,
  onBack,
  rightActions,
}) => {
  const getScreenSubtitle = () => {
    switch (currentScreen) {
      case 'beranda':
        return 'Beranda';
      case 'riwayat':
        return 'Riwayat';
      case 'akun':
        return 'Akun';
      case 'materi':
        return 'Materi Subbab';
      case 'kuis':
        return 'Kuis Interaktif';
      default:
        return '';
    }
  };

  const isMainTab = ['beranda', 'riwayat', 'akun'].includes(currentScreen);

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 pt-safe bg-[#fff9ed]/90 backdrop-blur-xl border-b border-[#e8e2d6]/70 shadow-[0_1px_8px_rgba(42,30,20,0.04)] transition-all">
      <div className="h-16 px-4 max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <button
              onClick={onBack || (() => onNavigate('beranda'))}
              aria-label="Kembali"
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#502408] hover:bg-[#f3ede1] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          {isMainTab ? (
            <div
              onClick={() => onNavigate('beranda')}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <img
                src={ASSET_IMAGES.logo}
                alt="ArungMasa Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-[18px] text-[#502408] tracking-tight leading-none">
                  ArungMasa
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-[#52443d] -mt-0.5">
                  {subtitleOverride || getScreenSubtitle()}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#52443d]">
                {subtitleOverride || 'Catatan Pembelajaran'}
              </span>
              <h1 className="font-serif font-bold text-[18px] text-[#502408] truncate max-w-[200px]">
                {titleOverride || getScreenSubtitle()}
              </h1>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rightActions}

          {/* User Profile Avatar Pill */}
          <button
            onClick={() => onNavigate('akun')}
            aria-label="Profil Pengguna"
            className="w-8 h-8 rounded-full bg-[#502408] text-white flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
