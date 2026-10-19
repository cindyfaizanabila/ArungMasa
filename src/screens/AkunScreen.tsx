import React, { useState } from 'react';
import { MateriProgress, QuizResult, ScreenType, UserProfile } from '../types';
import { MATERI_LIST } from '../data/materiData';
import { ASSET_IMAGES } from '../data/mockData';

interface AkunScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
  progress: MateriProgress;
  quizResult: QuizResult | null;
}

export const AkunScreen: React.FC<AkunScreenProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  onLogout,
  progress,
  quizResult,
}) => {
  const doneCount = MATERI_LIST.filter((m) => progress[m.id]).length;
  const badges = [
    {
      id: 'perintis',
      label: 'Perintis Persatuan',
      note: 'Selesaikan materi Kongres Pemuda II',
      icon: 'diversity_3',
      unlocked: Boolean(progress['kongres-pemuda-ii']),
    },
    {
      id: 'penelaah',
      label: 'Penelaah Dunia',
      note: 'Selesaikan materi Revolusi Prancis',
      icon: 'public',
      unlocked: Boolean(progress['revolusi-prancis']),
    },
    {
      id: 'kurator',
      label: 'Kurator Kritis',
      note: 'Raih skor evaluasi minimal 80',
      icon: 'history_edu',
      unlocked: Boolean(quizResult && quizResult.score >= 80),
    },
  ];
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleToggleReminder = () => {
    const newState = !user.reminderEnabled;
    onUpdateUser({ reminderEnabled: newState });
    showToast(
      newState
        ? `Pengingat diaktifkan: ${user.reminderTime}`
        : 'Pengingat jadwal belajar dinonaktifkan'
    );
  };

  const handleSelectTarget = (minutes: number) => {
    onUpdateUser({ dailyTargetMinutes: minutes });
    setShowTargetModal(false);
    showToast(`Target belajar harian diperbarui: ${minutes} Menit`);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-28 px-4 min-h-app relative z-10 space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-50 bg-[#333028] text-white text-xs px-3.5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px] text-[#ffddb8]">notifications</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Kartu Identitas Perpustakaan Klasik */}
      <div className="relative w-full rounded-xl bg-[#fffcf6] p-4 shadow-sm border border-[#e8e2d6] overflow-hidden">
        {/* Archival Stamp Watermark */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-4 border-dashed border-[#502408]/15 flex items-center justify-center rotate-12 pointer-events-none select-none">
          <span className="font-serif text-[12px] text-[#502408]/20 uppercase tracking-widest text-center px-2 font-bold leading-tight">
            Arsip Negara • 2024
          </span>
        </div>

        {/* Card Header Label */}
        <div className="flex items-center justify-between pb-2 mb-3 bg-[#f9f3e7] px-3 py-1.5 rounded-lg border border-[#e8e2d6]/70">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[16px] text-[#502408]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_stories
            </span>
            <span className="text-[11px] text-[#52443d] uppercase tracking-wider font-semibold">
              Kartu Induk Penjelajah
            </span>
          </div>
          <span className="text-[11px] text-[#502408] font-bold tracking-wider">
            {user.registrationCode}
          </span>
        </div>

        {/* Student Profile Info */}
        <div className="flex items-start gap-3.5 relative z-10">
          {/* Avatar & Madya Badge */}
          <div className="relative shrink-0 group">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#ede8dc] shadow-inner ring-2 ring-[#502408]/20">
              <img
                src={user.avatarUrl || ASSET_IMAGES.dianaAvatar}
                alt={user.name}
                className="w-full h-full object-cover grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1.5 -right-1 bg-[#502408] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5 whitespace-nowrap">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                military_tech
              </span>
              <span>{user.rank}</span>
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="font-serif font-bold text-[20px] text-[#1d1c14] tracking-tight truncate">
                {user.name}
              </h2>
              {user.isVerifiedBelajarId && (
                <span
                  className="material-symbols-outlined text-[#855300] text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="Siswa Terverifikasi"
                >
                  verified
                </span>
              )}
            </div>
            <p className="text-[12px] text-[#52443d] mt-0.5">NISN: {user.nisn}</p>
            <p className="text-[13px] text-[#52443d] truncate">
              {user.school} • {user.grade}
            </p>

            {user.isVerifiedBelajarId && (
              <div className="mt-2 inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-md bg-[#364d1f] text-[#cfecae] shadow-xs">
                <span className="material-symbols-outlined text-[13px]">school</span>
                <span className="text-[10px] font-semibold tracking-wide">
                  Terverifikasi Belajar.id
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Statistik ringkas dari progres belajar */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 bg-[#f9f3e7] rounded-lg p-2 text-center border border-[#e8e2d6]/60">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#52443d]">Materi</span>
            <span className="font-serif font-bold text-[17px] text-[#502408]">
              {doneCount}/{MATERI_LIST.length}
            </span>
          </div>
          <div className="flex flex-col border-x border-[#e8e2d6]">
            <span className="text-[11px] text-[#52443d]">Skor Evaluasi</span>
            <span className="font-serif font-bold text-[17px] text-[#502408]">
              {quizResult ? quizResult.score : '—'}
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

      {/* Lencana Koleksi Card */}
      <div className="w-full rounded-xl bg-[#fffcf6] p-4 shadow-sm border border-[#e8e2d6] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#502408] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <h3 className="font-serif font-bold text-[17px] text-[#1d1c14]">Lencana Koleksi</h3>
          </div>
          <span className="text-[11px] font-bold text-[#855300]">
            {unlockedCount} / {badges.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {badges.map((badge) => (
            <div
              key={badge.id}
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
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs mb-2 relative ${
                  badge.unlocked ? 'bg-[#ffddb8] text-[#2a1700]' : 'bg-[#ede8dc] text-[#85746b]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {badge.unlocked ? badge.icon : 'lock'}
                </span>
                {badge.unlocked && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#502408] text-white text-[8px] font-bold">
                    &#10003;
                  </span>
                )}
              </div>
              <span
                className={`text-[12px] font-semibold truncate w-full ${
                  badge.unlocked ? 'text-[#1d1c14]' : 'text-[#85746b]'
                }`}
              >
                {badge.label}
              </span>
              <span className="text-[10px] text-[#52443d] mt-0.5 line-clamp-2 leading-tight">
                {badge.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Preferensi Studi & Arsip */}
      <div className="w-full rounded-xl bg-[#fffcf6] p-3 shadow-sm border border-[#e8e2d6] flex flex-col space-y-1">
        <div className="px-2 pt-1 pb-1">
          <span className="text-[11px] font-semibold text-[#52443d] uppercase tracking-wider">
            Preferensi Studi &amp; Arsip
          </span>
        </div>

        {/* Target Belajar Harian */}
        <button
          onClick={() => setShowTargetModal(true)}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f9f3e7] transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#f3ede1] flex items-center justify-center text-[#502408] shrink-0">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#1d1c14] font-medium truncate">
                Target Belajar Harian
              </span>
              <span className="text-[11px] text-[#52443d]">
                {user.dailyTargetMinutes} menit per hari (Aktif)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[12px] text-[#502408] font-bold">
              {user.dailyTargetMinutes} Mnt
            </span>
            <span className="material-symbols-outlined text-[#85746b] text-[18px]">
              chevron_right
            </span>
          </div>
        </button>

        {/* Pengingat Jadwal Belajar (Interactive Toggle) */}
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f9f3e7] transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#f3ede1] flex items-center justify-center text-[#502408] shrink-0">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#1d1c14] font-medium truncate">
                Pengingat Jadwal Belajar
              </span>
              <span className="text-[11px] text-[#52443d]">
                Setiap {user.reminderTime}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleReminder}
            aria-pressed={user.reminderEnabled}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              user.reminderEnabled ? 'bg-[#502408]' : 'bg-[#e8e2d6]'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                user.reminderEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Unduh Catatan Offline */}
        <button
          onClick={() => showToast('3 Modul pembelajaran tersimpan di cache memori lokal!')}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f9f3e7] transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#f3ede1] flex items-center justify-center text-[#502408] shrink-0">
              <span className="material-symbols-outlined text-[20px]">cloud_download</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#1d1c14] font-medium truncate">
                Unduh Catatan Offline
              </span>
              <span className="text-[11px] text-[#52443d]">3 materi tersimpan di memori</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] text-[#855300] bg-[#ffddb8] px-2 py-0.5 rounded-full font-bold">
              3 Modul
            </span>
            <span className="material-symbols-outlined text-[#85746b] text-[18px]">
              chevron_right
            </span>
          </div>
        </button>

        {/* Bantuan & Kurikulum SMA */}
        <button
          onClick={() => setShowCurriculumModal(true)}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f9f3e7] transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#f3ede1] flex items-center justify-center text-[#502408] shrink-0">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#1d1c14] font-medium truncate">
                Bantuan &amp; Kurikulum SMA
              </span>
              <span className="text-[11px] text-[#52443d]">Panduan silabus Kemendikbud</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#85746b] text-[18px]">
            chevron_right
          </span>
        </button>

        {/* Pusat Privasi */}
        <button
          onClick={() => setShowPrivacyModal(true)}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f9f3e7] transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#f3ede1] flex items-center justify-center text-[#502408] shrink-0">
              <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#1d1c14] font-medium truncate">
                Pusat Privasi &amp; Syarat Ketentuan
              </span>
              <span className="text-[11px] text-[#52443d]">Keamanan data pelajar</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#85746b] text-[18px]">
            chevron_right
          </span>
        </button>
      </div>

      {/* Tombol Aksi Keluar */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full min-h-[52px] rounded-xl bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80 active:scale-[0.98] font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-xs border border-[#ba1a1a]/20 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Keluar dari Akun {user.name.split(' ')[0]}</span>
        </button>
      </div>

      {/* Catatan Kaki Versi Aplikasi */}
      <div className="flex flex-col items-center justify-center text-center pt-2 space-y-0.5">
        <div className="flex items-center gap-1.5 text-[#52443d]">
          <span className="material-symbols-outlined text-[14px]">menu_book</span>
          <span className="text-[11px] font-semibold">ArungMasa v1.2.0</span>
        </div>
        <p className="text-[11px] text-[#85746b]">
          Arsip Digital &amp; Modul Interaktif Sejarah Nusantara
        </p>
      </div>

      {/* Target Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 z-50 bg-[#1d1c14]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffcf6] rounded-xl p-5 w-full max-w-sm border border-[#e8e2d6] shadow-xl flex flex-col gap-3 animate-fadeIn">
            <h3 className="font-serif font-bold text-[18px] text-[#502408]">
              Pilih Target Belajar Harian
            </h3>
            <p className="text-[13px] text-[#52443d]">
              Tentukan alokasi waktu membaca modul sejarah setiap hari:
            </p>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[5, 10, 15, 20, 25, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSelectTarget(mins)}
                  className={`py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                    user.dailyTargetMinutes === mins
                      ? 'bg-[#502408] text-white border-[#502408]'
                      : 'bg-[#f9f3e7] text-[#1d1c14] border-[#e8e2d6] hover:bg-[#ede8dc]'
                  }`}
                >
                  {mins} Mnt
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTargetModal(false)}
              className="mt-2 text-center text-xs text-[#85746b] hover:text-[#1d1c14] underline py-1"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Curriculum Modal */}
      {showCurriculumModal && (
        <div className="fixed inset-0 z-50 bg-[#1d1c14]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffcf6] rounded-xl p-5 w-full max-w-sm border border-[#e8e2d6] shadow-xl flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#502408]">
              <span className="material-symbols-outlined text-[22px]">verified</span>
              <h3 className="font-serif font-bold text-[18px]">Kurikulum Merdeka SMA</h3>
            </div>
            <p className="text-[13px] text-[#52443d] leading-relaxed">
              ArungMasa menyajikan materi Sejarah SMA Kelas X&ndash;XII dengan tujuan pembelajaran berikut:
            </p>
            <ul className="text-[12px] text-[#52443d] space-y-1 list-disc pl-4">
              <li>Menjelaskan latar belakang dan proses terjadinya peristiwa sejarah.</li>
              <li>Mengidentifikasi tokoh-tokoh penting dalam setiap peristiwa.</li>
              <li>Menganalisis dampak peristiwa bagi masyarakat Indonesia dan dunia.</li>
            </ul>
            <button
              onClick={() => setShowCurriculumModal(false)}
              className="mt-2 w-full py-2 bg-[#502408] text-white rounded-lg text-xs font-semibold"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-[#1d1c14]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffcf6] rounded-xl p-5 w-full max-w-sm border border-[#e8e2d6] shadow-xl flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#502408]">
              <span className="material-symbols-outlined text-[22px]">security</span>
              <h3 className="font-serif font-bold text-[18px]">Privasi &amp; Data Siswa</h3>
            </div>
            <p className="text-[13px] text-[#52443d] leading-relaxed">
              Data rapor, NISN, dan progres kuis terenkripsi dan hanya disinkronkan dengan akun Single Sign-On resmi belajar.id Kemendikbudristek untuk keperluan evaluasi belajar mandiri.
            </p>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="mt-2 w-full py-2 bg-[#502408] text-white rounded-lg text-xs font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-[#1d1c14]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffcf6] rounded-xl p-5 w-full max-w-sm border border-[#e8e2d6] shadow-xl flex flex-col gap-3 animate-fadeIn text-center">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[26px]">logout</span>
            </div>
            <h3 className="font-serif font-bold text-[18px] text-[#502408]">Keluar dari Akun?</h3>
            <p className="text-[13px] text-[#52443d]">
              Tutup lembar riwayat dan keluar dari akun {user.name}? Kamu dapat masuk kembali kapan saja.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 rounded-lg bg-[#f3ede1] text-[#1d1c14] text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                  onNavigate('masuk');
                }}
                className="py-2.5 rounded-lg bg-[#ba1a1a] text-white text-xs font-semibold"
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
