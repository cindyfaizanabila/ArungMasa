import React, { useState } from 'react';
import { ScreenType } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (name?: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('diana.kartika@sman1jkt.sch.id');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ssoToast, setSsoToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(identifier.includes('diana') ? 'Diana Kartika' : 'Penjelajah ArungMasa');
      onNavigate('beranda');
    }, 1000);
  };

  const handleBelajarIdLogin = () => {
    setSsoToast(true);
    setTimeout(() => {
      setSsoToast(false);
      onLoginSuccess('Diana Kartika');
      onNavigate('beranda');
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-12 px-4 min-h-app relative z-10">
      {/* Toast message for SSO */}
      {ssoToast && (
        <div className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto bg-[#333028] text-white p-3.5 rounded-xl shadow-xl flex items-center gap-2.5 z-50 text-xs animate-fadeIn">
          <span className="material-symbols-outlined text-[#ffddb8] text-[20px] animate-spin">sync</span>
          <span>Menghubungkan ke layanan Single Sign-On Kemendikbudristek...</span>
        </div>
      )}

      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#f9f3e7] shadow-sm border border-[#e8e2d6] p-4 flex flex-col items-center text-center mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffddb8] to-[#ffb960]/60 flex items-center justify-center text-[#502408] shadow-sm mb-2 relative animate-pulse-stamp">
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            explore
          </span>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#502408] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[13px]">auto_stories</span>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#855300] uppercase tracking-widest bg-[#ffddb8]/60 border border-[#855300]/15 px-2.5 py-0.5 rounded-full mb-1.5 shadow-xs">
          Jurnal Ekspedisi
        </span>
        <h1 className="font-serif font-bold text-[22px] text-[#1d1c14]">
          Selamat Datang Kembali
        </h1>
        <p className="text-[13px] text-[#52443d] mt-1 max-w-[280px]">
          Buka lembaran catatan dan lanjutkan penjelajahan sejarahmu hari ini.
        </p>

        <div className="mt-3 w-full rounded-lg bg-[#f3ede1]/80 border border-[#d7c2b9]/40 p-2.5 flex items-center gap-2 text-left shadow-xs">
          <span className="material-symbols-outlined text-[#855300] text-[20px] shrink-0">history_edu</span>
          <p className="text-[12px] text-[#52443d] truncate">
            Tema Aktif:{' '}
            <strong className="text-[#1d1c14]">Peristiwa Penting Sejarah Indonesia &amp; Dunia</strong>
          </p>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="bg-[#fffcf6] rounded-xl shadow-md border border-[#e8e2d6] p-4 flex flex-col gap-4 relative">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#502408]"></span>
            <span className="text-[13px] text-[#52443d] font-semibold">Identitas Siswa</span>
          </div>
          <span className="text-[11px] text-[#855300] font-medium">Semester Ganjil</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="block text-[13px] font-semibold text-[#1d1c14]" htmlFor="identifier">
              Email atau NISN
            </label>
            <div className="relative flex items-center group">
              <span className="material-symbols-outlined absolute left-3.5 text-[#85746b] group-focus-within:text-[#502408] transition-colors text-[20px] pointer-events-none">
                badge
              </span>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="contoh: siswa@sekolah.sch.id atau NISN"
                required
                className="w-full h-12 pl-11 pr-4 rounded-lg bg-[#f9f3e7] text-[#1d1c14] placeholder:text-[#85746b] text-[14px] border border-transparent focus:border-[#502408]/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#855300]/15 transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] font-semibold text-[#1d1c14]" htmlFor="password">
              Kata Sandi
            </label>
            <div className="relative flex items-center group">
              <span className="material-symbols-outlined absolute left-3.5 text-[#85746b] group-focus-within:text-[#502408] transition-colors text-[20px] pointer-events-none">
                lock
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                required
                className="w-full h-12 pl-11 pr-12 rounded-lg bg-[#f9f3e7] text-[#1d1c14] placeholder:text-[#85746b] text-[14px] border border-transparent focus:border-[#502408]/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#855300]/15 transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 w-9 h-9 flex items-center justify-center text-[#85746b] hover:text-[#1d1c14] transition-colors focus:outline-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none py-1 group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#f9f3e7] accent-[#502408] cursor-pointer"
              />
              <span className="text-[13px] text-[#52443d] group-hover:text-[#1d1c14] transition-colors">
                Ingat saya
              </span>
            </label>
            <button
              type="button"
              onClick={() => alert('Fitur pemulihan kata sandi telah dikirimkan ke guru pembimbing arsip sekolah.')}
              className="text-[13px] font-semibold text-[#855300] hover:text-[#502408] transition-colors py-1 cursor-pointer"
            >
              Lupa kata sandi?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] rounded-xl bg-gradient-to-r from-[#502408] to-[#6b3a1c] hover:from-[#3e1a06] hover:to-[#502408] text-white font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                <span>Membuka Lembaran...</span>
              </>
            ) : (
              <>
                <span>Masuk ke ArungMasa</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-1">
          <div className="w-full h-[1px] bg-[#ede8dc]"></div>
          <span className="absolute bg-[#fffcf6] px-3 text-[12px] text-[#52443d]">
            atau masuk dengan
          </span>
        </div>

        {/* Belajar.id SSO Button */}
        <button
          type="button"
          onClick={handleBelajarIdLogin}
          className="w-full h-[52px] rounded-xl bg-[#f9f3e7] hover:bg-[#f3ede1] border border-[#d7c2b9]/60 hover:border-[#85746b]/60 text-[#1d1c14] text-[13px] font-medium flex items-center justify-center gap-3 px-4 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
          </svg>
          <span className="text-left">
            Akun <strong className="text-[#502408]">belajar.id</strong>
          </span>
          <span className="material-symbols-outlined text-[#85746b] text-[18px] ml-auto">school</span>
        </button>
      </div>

      {/* Switch to Register & Kurikulum Notice */}
      <div className="text-center space-y-2 mt-4">
        <p className="text-[14px] text-[#52443d]">
          Belum memiliki akun arsip?{' '}
          <button
            onClick={() => onNavigate('daftar')}
            className="text-[14px] text-[#502408] font-bold underline decoration-[#855300] underline-offset-4 hover:text-[#855300] transition-colors cursor-pointer"
          >
            Daftar sekarang
          </button>
        </p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f3ede1] border border-[#ede8dc] text-[#52443d] text-[11px] font-semibold">
          <span className="material-symbols-outlined text-[15px] text-[#20360a]">verified</span>
          <span>Kurikulum Merdeka • Dirancang untuk Siswa SMA</span>
        </div>
      </div>
    </div>
  );
};
