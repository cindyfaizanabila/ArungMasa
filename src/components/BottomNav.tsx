import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: 'beranda' as ScreenType,
      label: 'Beranda',
      icon: 'cottage',
    },
    {
      id: 'riwayat' as ScreenType,
      label: 'Riwayat',
      icon: 'history',
    },
    {
      id: 'akun' as ScreenType,
      label: 'Akun',
      icon: 'account_circle',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 w-full z-50 pb-safe bg-[#fff9ed]/95 backdrop-blur-xl border-t border-[#e8e2d6]/70 shadow-[0_-2px_12px_rgba(42,30,20,0.05)]">
      <div className="h-16 max-w-md mx-auto px-4 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] gap-0.5 transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-[#6b3a1c] font-semibold'
                  : 'text-[#52443d] hover:text-[#6b3a1c]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] font-medium tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
