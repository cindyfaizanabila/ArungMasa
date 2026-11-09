import React, { useState } from 'react';
import { MateriProgress, QuizResult, Subbab, UserProfile } from '../types';

interface AkunScreenProps {
  user: UserProfile;
  onLogout: () => void;
  progress: MateriProgress;
  quizResults: QuizResult[];
  materiList: Subbab[];
}

export const AkunScreen: React.FC<AkunScreenProps> = ({
  user,
  onLogout,
  progress,
  quizResults,
  materiList,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const doneCount = materiList.filter((m) => progress[m.id]).length;
  const evaluatedBabCount = new Set(quizResults.map((r) => r.babId)).size;
  const badges = [
    {
      id: 'langkah-pertama',
      label: 'Langkah Pertama',
      note: 'Selesaikan 1 subbab',
      icon: 'flag',
      unlocked: doneCount >= 1,
    },
    {
      id: 'penjelajah-tekun',
      label: 'Penjelajah Tekun',
      note: 'Selesaikan 10 subbab',
      icon: 'explore',
      unlocked: doneCount >= 10,
    },
    {
      id: 'kurator-kritis',
      label: 'Kurator Kritis',
      note: 'Raih skor evaluasi minimal 80',
      icon: 'history_edu',
      unlocked: quizResults.some((r) => r.score >= 80),
    },
  ];
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto pt-header pb-28 md:pb-12 px-4 md:px-6 min-h-app relative z-10 space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-50 bg-[#333028] text-white text-xs px-3.5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px] text-[#ffddb8]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Kartu profil */}
      <div className="w-full rounded-xl bg-[#fffcf6] p-4 shadow-sm border border-[#e8e2d6]">
        <div className="flex items-start gap-3.5">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-[#ede8dc] shadow-inner ring-2 ring-[#502408]/20 shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-[#85746b]">
                <span className="material-symbols-outlined text-[40px]">person</span>
              </span>
            )}
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <h1 className="font-serif font-bold text-[20px] text-[#1d1c14] tracking-tight truncate">
              {user.name || 'Penjelajah'}
            </h1>
            {user.grade && <p className="text-[13px] text-[#52443d]">{user.grade}</p>}
            {user.school && <p className="text-[13px] text-[#52443d] truncate">{user.school}</p>}
            {user.nisn && <p className="text-[12px] text-[#52443d]">NISN: {user.nisn}</p>}
          </div>
        </div>

        {/* Statistik ringkas dari progres belajar */}
        <div className="grid grid-cols-3 gap-2 mt-4 bg-[#f9f3e7] rounded-lg p-2 text-center border border-[#e8e2d6]/60">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#52443d]">Subbab</span>
            <span className="font-serif font-bold text-[17px] text-[#502408]">
              {doneCount}/{materiList.length}
            </span>
          </div>
          <div className="flex flex-col border-x border-[#e8e2d6]">
            <span className="text-[11px] text-[#52443d]">Evaluasi</span>
            <span className="font-serif font-bold text-[17px] text-[#502408]">
              {evaluatedBabCount} bab
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#52443d]">Lencana</span>
            <span className="font-serif font-bold text-[17px] text-[#502408]">
              {unlockedCount}/{badges.length}
            </span>
          </div>
        </div>
      </div>

      {/* Lencana */}
      <div className="w-full rounded-xl bg-[#fffcf6] p-4 shadow-sm border border-[#e8e2d6] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#502408] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <h2 className="font-serif font-bold text-[17px] text-[#1d1c14]">Lencana</h2>
          </div>
          <span className="text-[11px] font-bold text-[#855300]">
            {unlockedCount} / {badges.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {badges.map((badge) => (
            <button
              key={badge.id}
              type="button"
              onClick={() =>
                showToast(
                  badge.unlocked
                    ? `Lencana ${badge.label} sudah terbuka!`
                    : `${badge.label}: ${badge.note}.`
                )
              }
              className={`flex flex-col items-center p-2.5 rounded-xl text-center border transition-all cursor-pointer active:scale-95 ${
                badge.unlocked
                  ? 'bg-[#f9f3e7] border-[#e8e2d6] hover:border-[#855300]/40'
                  : 'bg-[#f3ede1] border-[#e8e2d6] opacity-70'
              }`}
            >
              <span
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs mb-2 ${
                  badge.unlocked ? 'bg-[#ffddb8] text-[#2a1700]' : 'bg-[#ede8dc] text-[#85746b]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {badge.unlocked ? badge.icon : 'lock'}
                </span>
              </span>
              <span
                className={`text-[12px] font-semibold w-full ${
                  badge.unlocked ? 'text-[#1d1c14]' : 'text-[#85746b]'
                }`}
              >
                {badge.label}
              </span>
              <span className="text-[10px] text-[#52443d] mt-0.5 leading-tight">{badge.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Privasi */}
      <button
        onClick={() => setShowPrivacyModal(true)}
        className="w-full rounded-xl bg-[#fffcf6] p-3.5 shadow-sm border border-[#e8e2d6] flex items-center justify-between gap-3 text-left hover:bg-[#f9f3e7] transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 rounded-lg bg-[#f3ede1] flex items-center justify-center text-[#502408] shrink-0">
            <span className="material-symbols-outlined text-[20px]">security</span>
          </span>
          <span className="flex flex-col min-w-0">
            <span className="text-[13px] text-[#1d1c14] font-medium">Privasi Data</span>
            <span className="text-[11px] text-[#52443d]">Data apa yang disimpan</span>
          </span>
        </span>
        <span className="material-symbols-outlined text-[#85746b] text-[18px]">chevron_right</span>
      </button>

      {/* Keluar */}
      <button
        type="button"
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full min-h-[52px] rounded-xl bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80 active:scale-[0.98] font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-xs border border-[#ba1a1a]/20 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        <span>Keluar</span>
      </button>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-[#1d1c14]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Privasi Data"
            className="bg-[#fffcf6] rounded-xl p-5 w-full max-w-sm border border-[#e8e2d6] shadow-xl flex flex-col gap-3 animate-fadeIn"
          >
            <div className="flex items-center gap-2 text-[#502408]">
              <span className="material-symbols-outlined text-[22px]">security</span>
              <h2 className="font-serif font-bold text-[18px]">Privasi Data</h2>
            </div>
            <p className="text-[13px] text-[#52443d] leading-relaxed">
              ArungMasa menyimpan nama, kelas, subbab yang sudah kamu selesaikan, dan hasil
              evaluasimu. Data ini hanya dapat dibaca dan diubah oleh akunmu sendiri.
            </p>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="mt-2 w-full py-2.5 bg-[#502408] text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-[#1d1c14]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Keluar dari akun"
            className="bg-[#fffcf6] rounded-xl p-5 w-full max-w-sm border border-[#e8e2d6] shadow-xl flex flex-col gap-3 animate-fadeIn text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[26px]">logout</span>
            </div>
            <h2 className="font-serif font-bold text-[18px] text-[#502408]">Keluar dari akun?</h2>
            <p className="text-[13px] text-[#52443d]">
              Progresmu sudah tersimpan. Kamu bisa masuk kembali kapan saja.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 rounded-lg bg-[#f3ede1] text-[#1d1c14] text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="py-2.5 rounded-lg bg-[#ba1a1a] text-white text-xs font-semibold cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
