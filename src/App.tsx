import { useEffect, useState } from 'react';
import {
  Bab,
  MateriProgress,
  MateriSection,
  MateriStatus,
  QuizResult,
  ScreenType,
  UserProfile,
} from './types';
import { INITIAL_USER } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { useScrollReveal } from './hooks/useScrollReveal';
import { LandingScreen } from './screens/LandingScreen';
import { BerandaScreen } from './screens/BerandaScreen';
import { MateriScreen } from './screens/MateriScreen';
import { KuisScreen } from './screens/KuisScreen';
import { RiwayatScreen } from './screens/RiwayatScreen';
import { AkunScreen } from './screens/AkunScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { supabase } from './lib/supabase';

const scrollAppToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const GUEST_USER: UserProfile = {
  ...INITIAL_USER,
  name: 'Penjelajah', nisn: '', school: '', grade: '',
  registrationCode: '', avatarUrl: '', rank: 'Pemula',
  isVerifiedBelajarId: false, reminderEnabled: false,
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [user, setUser] = useState<UserProfile>(GUEST_USER);
  const [userId, setUserId] = useState<string | null>(null);
  const [babList, setBabList] = useState<Bab[]>([]);
  const [materiStatus, setMateriStatus] = useState<MateriStatus>('loading');
  const [activeMateriId, setActiveMateriId] = useState<string>('');
  /** id materi -> ISO timestamp saat ditandai selesai. */
  const [progress, setProgress] = useState<MateriProgress>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useScrollReveal();

  // Mengambil daftar bab dan subbab; terbuka juga untuk tamu.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('bab')
        .select('id, judul, subbab(id, urutan, judul, isi)')
        .order('id')
        .order('urutan', { referencedTable: 'subbab' });
      if (cancelled) return;

      if (error) {
        setMateriStatus('error');
        return;
      }
      setBabList(
        data.map((bab) => ({
          id: bab.id,
          judul: bab.judul,
          subbab: bab.subbab.map((s) => ({
            id: s.id,
            judul: s.judul,
            isi: s.isi as MateriSection[],
            babJudul: bab.judul,
          })),
        }))
      );
      setMateriStatus('ready');
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Memantau status login.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user.id ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Mengambil data siswa setelah login; data tamu dipakai bila belum login.
  useEffect(() => {
    if (!userId) {
      setUser(GUEST_USER);
      setProgress({});
      setQuizResult(null);
      return;
    }

    let cancelled = false;
    (async () => {
      const [profile, materi, quiz] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('materi_progress').select('materi_id, completed_at'),
        supabase
          .from('quiz_results')
          .select('*')
          .order('completed_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);
      if (cancelled) return;

      if (profile.error || materi.error || quiz.error) {
        alert('Data akun gagal dimuat. Muat ulang halaman untuk mencoba lagi.');
        return;
      }

      const p = profile.data;
      setUser({
        name: p.name,
        nisn: p.nisn ?? '',
        school: p.school ?? '',
        grade: p.grade ?? '',
        registrationCode: p.registration_code ?? '',
        avatarUrl: p.avatar_url ?? '',
        rank: p.rank,
        isVerifiedBelajarId: p.is_verified_belajar_id,
        dailyTargetMinutes: p.daily_target_minutes,
        reminderEnabled: p.reminder_enabled,
        reminderTime: `${p.reminder_time.slice(0, 5).replace(':', '.')} WIB`,
      });
      setProgress(Object.fromEntries(materi.data.map((m) => [m.materi_id, m.completed_at])));
      setQuizResult(
        quiz.data && {
          score: quiz.data.score,
          xp: quiz.data.xp,
          correctCount: quiz.data.correct_count,
          totalQuestions: quiz.data.total_questions,
          completedAt: quiz.data.completed_at,
        }
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const materiList = babList.flatMap((bab) => bab.subbab);
  // Subbab pertama setiap bab selalu terbuka; subbab lain terbuka setelah
  // semua subbab sebelumnya di bab yang sama selesai.
  const isMateriUnlocked = (id: string) => {
    for (const bab of babList) {
      const index = bab.subbab.findIndex((s) => s.id === id);
      if (index !== -1) {
        return bab.subbab.slice(0, index).every((s) => progress[s.id]);
      }
    }
    return false;
  };
  const activeMateri = isMateriUnlocked(activeMateriId)
    ? materiList.find((m) => m.id === activeMateriId)
    : materiList[0];
  const isActiveMateriDone = Boolean(activeMateri && progress[activeMateri.id]);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    scrollAppToTop();
  };

  const handleOpenMateri = (id: string) => {
    if (!isMateriUnlocked(id)) return;
    setActiveMateriId(id);
    setCurrentScreen('materi');
    scrollAppToTop();
  };

  const handleToggleMateriComplete = async () => {
    if (!activeMateri) return;
    const materiId = activeMateri.id;
    const wasDone = Boolean(progress[materiId]);
    const completedAt = new Date().toISOString();
    setProgress((prev) => {
      const next = { ...prev };
      if (wasDone) {
        delete next[materiId];
      } else {
        next[materiId] = completedAt;
      }
      return next;
    });
    if (!userId) return;

    const { error } = wasDone
      ? await supabase
          .from('materi_progress')
          .delete()
          .eq('user_id', userId)
          .eq('materi_id', materiId)
      : await supabase
          .from('materi_progress')
          .insert({ user_id: userId, materi_id: materiId, completed_at: completedAt });
    if (error) alert('Progres gagal disimpan. Coba lagi.');
  };

  const handleUpdateUser = async (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    if (!userId) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        daily_target_minutes: updated.dailyTargetMinutes,
        reminder_enabled: updated.reminderEnabled,
      })
      .eq('id', userId);
    if (error) alert('Pengaturan gagal disimpan. Coba lagi.');
  };

  const handleCompleteQuiz = async (result: QuizResult) => {
    setQuizResult(result);
    if (!userId) return;

    const { error } = await supabase.from('quiz_results').insert({
      user_id: userId,
      score: result.score,
      xp: result.xp,
      correct_count: result.correctCount,
      total_questions: result.totalQuestions,
      completed_at: result.completedAt,
    });
    if (error) alert('Hasil evaluasi gagal disimpan.');
  };

  const showBackButton = ['materi', 'kuis', 'masuk', 'daftar'].includes(currentScreen);
  const showBottomNav = ['beranda', 'riwayat', 'akun'].includes(currentScreen);

  const getHeaderProps = () => {
    switch (currentScreen) {
      case 'materi':
        return {
          titleOverride: activeMateri?.judul ?? 'Materi',
          subtitleOverride: activeMateri?.babJudul,
          onBack: () => handleNavigate('beranda'),
        };
      case 'kuis':
        return {
          titleOverride: 'Evaluasi Pembelajaran',
          subtitleOverride: 'Lima Peristiwa Penting',
          onBack: () => handleNavigate('beranda'),
        };
      case 'masuk':
        return {
          titleOverride: 'Masuk Akun',
          subtitleOverride: 'Identitas Siswa',
          onBack: () => handleNavigate('landing'),
        };
      case 'daftar':
        return {
          titleOverride: 'Daftar Akun',
          subtitleOverride: 'Buku Ekspedisi',
          onBack: () => handleNavigate('masuk'),
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-app w-full bg-[#f6f0e4] text-[#1d1c14] relative selection:bg-[#ffddb8] selection:text-[#502408] overflow-x-hidden">
      {/* LATAR ARSIP */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden archival-canvas"
      >
        <div className="absolute -top-12 -right-16 w-80 h-80 text-[#855300]/[0.05] pointer-events-none animate-slow-spin">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeDasharray="2 3" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="100,12 104,88 100,100 96,88" />
            <polygon points="100,188 104,112 100,100 96,112" />
            <polygon points="12,100 88,104 100,100 88,96" />
            <polygon points="188,100 112,104 100,100 112,96" />
          </svg>
        </div>

        <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-[#e2a04a]/20 blur-[0.5px]" />
        <div className="absolute top-2/3 right-1/5 w-2.5 h-2.5 rounded-full bg-[#875131]/15 blur-[0.5px]" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#ffb960]/25 blur-[0.3px]" />

        <div className="absolute inset-0 vintage-vignette pointer-events-none" />
      </div>

      {currentScreen !== 'landing' && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          showBackButton={showBackButton}
          rightActions={
            <ScreenSwitcher currentScreen={currentScreen} onNavigate={handleNavigate} />
          }
          {...getHeaderProps()}
        />
      )}

      {currentScreen === 'landing' && (
        <LandingScreen
          onNavigate={handleNavigate}
          babList={babList}
          materiStatus={materiStatus}
        />
      )}

      <main className="relative z-10 w-full flex flex-col items-center">
        {currentScreen === 'beranda' && (
          <BerandaScreen
            onNavigate={handleNavigate}
            onOpenMateri={handleOpenMateri}
            isMateriUnlocked={isMateriUnlocked}
            userName={user.name}
            progress={progress}
            babList={babList}
            materiStatus={materiStatus}
          />
        )}

        {currentScreen === 'materi' && !activeMateri && (
          <p className="pt-header px-4 text-[14px] text-[#52443d] text-center">
            {materiStatus === 'loading' ? 'Memuat materi...' : 'Materi belum tersedia.'}
          </p>
        )}

        {currentScreen === 'materi' && activeMateri && (
          <MateriScreen
            materi={activeMateri}
            materiList={materiList}
            isMateriUnlocked={isMateriUnlocked}
            isCompleted={isActiveMateriDone}
            onToggleComplete={handleToggleMateriComplete}
            onNavigate={handleNavigate}
            onOpenMateri={handleOpenMateri}
          />
        )}

        {currentScreen === 'kuis' && (
          <KuisScreen onNavigate={handleNavigate} onCompleteQuiz={handleCompleteQuiz} />
        )}

        {currentScreen === 'riwayat' && (
          <RiwayatScreen
            onNavigate={handleNavigate}
            onOpenMateri={handleOpenMateri}
            progress={progress}
            quizResult={quizResult}
            materiList={materiList}
            isMateriUnlocked={isMateriUnlocked}
          />
        )}

        {currentScreen === 'akun' && (
          <AkunScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigate={handleNavigate}
            progress={progress}
            quizResult={quizResult}
            materiList={materiList}
            onLogout={async () => {
              await supabase.auth.signOut();
              handleNavigate('masuk');
            }}
          />
        )}

        {currentScreen === 'masuk' && (
          <LoginScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'daftar' && (
          <RegisterScreen onNavigate={handleNavigate} />
        )}
      </main>

      {showBottomNav && <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
    </div>
  );
}
