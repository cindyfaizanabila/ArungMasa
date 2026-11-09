import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { supabase } from '../lib/supabase';

interface RegisterScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('Kelas 11');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim(), grade: selectedGrade } },
    });
    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
    if (!data.session) {
      alert('Cek emailmu untuk konfirmasi akun, lalu masuk.');
      onNavigate('masuk');
    }
    // Bila sesi langsung aktif, App memindahkan pengguna ke Beranda.
  };

  const grades = ['Kelas 10', 'Kelas 11', 'Kelas 12'];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-12 px-4 min-h-app relative z-10">
      {/* Hero Banner with Vintage Desk Image */}
      <div className="relative w-full rounded-xl overflow-hidden mb-4 shadow-sm bg-[#f3ede1] border border-[#e8e2d6]">
        <div
          className="h-32 w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url('${ASSET_IMAGES.registerHero}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#f6f0e4] via-[#f6f0e4]/60 to-transparent"></div>
          <div className="absolute top-3 left-3 bg-[#6b3a1c]/85 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-white">auto_stories</span>
            <span className="text-[11px] font-semibold text-white tracking-wide uppercase">
              Buku Ekspedisi
            </span>
          </div>
        </div>

        <div className="px-4 pb-4 -mt-6 relative z-10">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-[20px] text-[#855300]">history_edu</span>
            <span className="text-[11px] text-[#855300] uppercase tracking-widest font-bold">
              Lembaran Baru
            </span>
          </div>
          <h1 className="font-serif font-bold text-[24px] text-[#502408] tracking-tight leading-snug">
            Mulai Petualangan Sejarah
          </h1>
          <p className="text-[13px] text-[#52443d] mt-1 leading-relaxed">
            Buat akun penjelajahmu dan pelajari peristiwa masa lampau secara ringkas dan seru.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-[#fffcf6] rounded-xl p-4 shadow-sm border border-[#e8e2d6]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#1d1c14] flex items-center justify-between" htmlFor="reg-name">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#52443d]">person</span>
                Nama Lengkap Penjelajah
              </span>
            </label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="cth. Diana Kartika"
              required
              className="w-full h-12 px-3.5 rounded-lg bg-[#f9f3e7] text-[#1d1c14] text-[14px] placeholder:text-[#52443d]/60 border border-transparent focus:border-[#6b3a1c] focus:bg-white focus:outline-none transition-all shadow-xs"
            />
          </div>

          {/* Email / NISN Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#1d1c14] flex items-center justify-between" htmlFor="reg-email">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#52443d]">mail</span>
                Email Siswa
              </span>
            </label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@sekolah.id"
              required
              className="w-full h-12 px-3.5 rounded-lg bg-[#f9f3e7] text-[#1d1c14] text-[14px] placeholder:text-[#52443d]/60 border border-transparent focus:border-[#6b3a1c] focus:bg-white focus:outline-none transition-all shadow-xs"
            />
          </div>

          {/* Grade Level Selection */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-semibold text-[#1d1c14] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#52443d]">school</span>
                Tingkat Jenjang Belajar
              </label>
              <span className="text-[11px] text-[#52443d] opacity-80">SMA/SMK/MA</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-0.5">
              {grades.map((grade) => {
                const isSelected = selectedGrade === grade;
                return (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setSelectedGrade(grade)}
                    className={`h-12 rounded-lg font-semibold text-[13px] flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-[#6b3a1c] text-white shadow-sm'
                        : 'bg-[#f9f3e7] text-[#52443d] hover:bg-[#ede8dc]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isSelected ? 'text-[#ffb960]' : 'opacity-60'
                      }`}
                      style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {isSelected ? 'stars' : 'bookmark'}
                    </span>
                    <span>{grade}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#1d1c14] flex items-center justify-between" htmlFor="reg-password">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#52443d]">lock</span>
                Kata Sandi
              </span>
            </label>
            <div className="relative flex items-center">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                minLength={8}
                autoComplete="new-password"
                required
                className="w-full h-12 pl-3.5 pr-12 rounded-lg bg-[#f9f3e7] text-[#1d1c14] text-[14px] placeholder:text-[#52443d]/60 border border-transparent focus:border-[#6b3a1c] focus:bg-white focus:outline-none transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 w-10 h-10 rounded-full flex items-center justify-center text-[#52443d] hover:text-[#502408] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] mt-1 rounded-xl bg-[#6b3a1c] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md hover:bg-[#502408] active:scale-[0.99] transition-all cursor-pointer"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">explore</span>
                <span>Daftar Akun Baru</span>
              </>
            )}
          </button>
        </form>
      </div>


      {/* Switch to Login */}
      <div className="mt-6 flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-[13px] text-[#52443d]">Sudah punya akun?</p>
        <button
          onClick={() => onNavigate('masuk')}
          className="inline-flex items-center gap-1 text-[13px] text-[#502408] font-bold hover:text-[#855300] transition-colors underline decoration-[#855300] decoration-2 underline-offset-4 cursor-pointer"
        >
          <span>Masuk</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

    </div>
  );
};
