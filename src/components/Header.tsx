import React from 'react';
import { ScreenType } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { NAV_TABS } from './BottomNav';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  titleOverride?: string;
  subtitleOverride?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  titleOverride,
  subtitleOverride,
  showBackButton,
  onBack,
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
      <div className="h-16 px-4 md:px-6 max-w-6xl mx-auto flex items-center justify-between gap-4">
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
              <h1 className="font-serif font-bold text-[18px] text-[#502408] truncate max-w-[200px] md:max-w-[280px]">
                {titleOverride || getScreenSubtitle()}
              </h1>
            </div>
          )}
        </div>

        <nav
          aria-label="Navigasi utama"
          className={`${
            currentScreen === 'masuk' || currentScreen === 'daftar' ? 'hidden' : 'hidden md:flex'
          } items-center gap-1 ml-auto`}
        >
          {NAV_TABS.map((tab) => {
            const isActive = currentScreen === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`h-9 px-3.5 rounded-lg inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#6b3a1c] text-white'
                    : 'text-[#52443d] hover:bg-[#f3ede1] hover:text-[#6b3a1c]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
