import { useEffect, useState } from 'react';
import {
  Bab,
  MateriProgress,
  MateriSection,
  MateriStatus,
  QuizResult,
  ScreenType,
  SubbabVideo,
  UserProfile,
} from './types';
import { INITIAL_USER } from './data/mockData';
import { QUIZ_BY_BAB } from './data/kuis';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
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

/** Layar yang hanya bisa dibuka setelah masuk. */
const PROTECTED_SCREENS: ScreenType[] = ['beranda', 'materi', 'kuis', 'riwayat', 'akun'];

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
  /** Benar setelah status login selesai dibaca dari sesi tersimpan. */
  const [authReady, setAuthReady] = useState(false);
  const [babList, setBabList] = useState<Bab[]>([]);
  const [materiStatus, setMateriStatus] = useState<MateriStatus>('loading');
  const [activeMateriId, setActiveMateriId] = useState<string>('');
  /** id materi -> ISO timestamp saat ditandai selesai. */
  const [progress, setProgress] = useState<MateriProgress>({});
  /** Hasil evaluasi, terbaru lebih dulu. */
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [activeQuizBabId, setActiveQuizBabId] = useState<number | null>(null);

  useScrollReveal();

  // Judul bab dan subbab tampil di landing untuk semua orang; isi subbab hanya
  // diminta setelah login (database juga menolaknya untuk yang belum masuk).
  useEffect(() => {
    if (!authReady) return;

    let cancelled = false;
    setMateriStatus('loading');
    setBabList([]);
    interface SubbabRow {
      id: string;
      judul: string;
      isi?: MateriSection[];
      video?: SubbabVideo | null;
    }
    interface BabRow {
      id: number;
      judul: string;
      subbab: SubbabRow[];
    }
    const fetchBab = (subbabColumns: string) =>
      supabase
        .from('bab')
        .select(`id, judul, subbab(${subbabColumns})`)
        .order('id')
        .order('urutan', { referencedTable: 'subbab' });

    (async () => {
      let result = await fetchBab(userId ? 'id, urutan, judul, isi, video' : 'id, urutan, judul');
      // Kolom `video` baru ada setelah SQL-nya dijalankan; tanpa itu, muat tanpa video.
      if (result.error && userId) result = await fetchBab('id, urutan, judul, isi');
      if (cancelled) return;

      if (result.error) {
        setMateriStatus('error');
        return;
      }
      setBabList(
        (result.data as unknown as BabRow[]).map((bab) => ({
          id: bab.id,
          judul: bab.judul,
          subbab: bab.subbab.map((s) => ({
            id: s.id,
            judul: s.judul,
            isi: s.isi ?? [],
            video: s.video ?? null,
            babId: bab.id,
            babJudul: bab.judul,
          })),
        }))
      );
      setMateriStatus('ready');
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, userId]);

  // Memantau status login.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      setAuthReady(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Berhasil masuk: keluar dari layar masuk/daftar. Belum masuk atau sesi habis:
  // layar yang dilindungi diganti dengan layar masuk.
  useEffect(() => {
    if (!authReady) return;
    if (userId && (currentScreen === 'masuk' || currentScreen === 'daftar')) {
      setCurrentScreen('beranda');
    } else if (!userId && PROTECTED_SCREENS.includes(currentScreen)) {
      setCurrentScreen('masuk');
    }
  }, [authReady, userId, currentScreen]);

  // Mengambil data siswa setelah login; dikosongkan saat keluar.
  useEffect(() => {
    if (!userId) {
      setUser(GUEST_USER);
      setProgress({});
      setQuizResults([]);
      return;
    }

    let cancelled = false;
    (async () => {
      const [profile, materi, quiz] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('materi_progress').select('materi_id, completed_at'),
        // Hasil lama tanpa bab berasal dari evaluasi sebelum per-bab, jadi dilewati.
        supabase
          .from('quiz_results')
          .select('*')
          .not('bab_id', 'is', null)
          .order('completed_at', { ascending: false }),
      ]);
      if (cancelled) return;

      if (profile.error || materi.error) {
        alert('Data akun gagal dimuat. Muat ulang halaman untuk mencoba lagi.');
        return;
      }
      if (quiz.error) console.warn('Hasil evaluasi gagal dimuat:', quiz.error.message);

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
      setQuizResults(
        (quiz.data ?? []).map((r) => ({
          babId: r.bab_id,
          score: r.score,
          xp: r.xp,
          correctCount: r.correct_count,
          totalQuestions: r.total_questions,
          completedAt: r.completed_at,
        }))
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
  const isLoggedIn = Boolean(userId);

  // Subbab pertama yang belum selesai; selalu terbuka karena yang sebelumnya sudah selesai.
  const nextMateri = materiList.find((m) => !progress[m.id]);

  const hasQuiz = (babId: number) => (QUIZ_BY_BAB[babId]?.length ?? 0) > 0;
  const isBabComplete = (babId: number) =>
    Boolean(
      babList.find((b) => b.id === babId)?.subbab.every((s) => progress[s.id])
    );

  // Evaluasi bab terbuka di subbab terakhir, setelah seluruh subbab bab itu selesai.
  const activeBab = babList.find((b) => b.id === activeMateri?.babId);
  const isLastInBab = Boolean(
    activeBab && activeBab.subbab[activeBab.subbab.length - 1].id === activeMateri?.id
  );
  const quizState: 'none' | 'pending' | 'ready' =
    !activeBab || !isLastInBab || !hasQuiz(activeBab.id)
      ? 'none'
      : isBabComplete(activeBab.id)
        ? 'ready'
        : 'pending';

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(PROTECTED_SCREENS.includes(screen) && !isLoggedIn ? 'masuk' : screen);
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

  const handleOpenQuiz = (babId: number) => {
    if (!hasQuiz(babId) || !isBabComplete(babId)) return;
    setActiveQuizBabId(babId);
    setCurrentScreen('kuis');
    scrollAppToTop();
  };

  const handleCompleteQuiz = async (result: QuizResult) => {
    setQuizResults((prev) => [result, ...prev]);
    if (!userId) return;

    const { error } = await supabase.from('quiz_results').insert({
      user_id: userId,
      bab_id: result.babId,
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
          titleOverride: 'Evaluasi Bab',
          subtitleOverride: babList.find((b) => b.id === activeQuizBabId)?.judul,
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
          {...getHeaderProps()}
        />
      )}

      {currentScreen === 'landing' && (
        <LandingScreen
          onNavigate={handleNavigate}
          babList={babList}
          materiStatus={materiStatus}
          isLoggedIn={isLoggedIn}
        />
      )}

      <main className="relative z-10 w-full flex flex-col items-center">
        {currentScreen === 'beranda' && (
          <BerandaScreen
            onOpenMateri={handleOpenMateri}
            isMateriUnlocked={isMateriUnlocked}
            onOpenQuiz={handleOpenQuiz}
            userName={user.name}
            progress={progress}
            quizResults={quizResults}
            babList={babList}
            materiStatus={materiStatus}
            nextMateri={nextMateri}
          />
        )}

        {currentScreen === 'materi' && !activeMateri && (
          <p className="pt-header px-4 text-[14px] text-[#52443d] text-center">
            {materiStatus === 'loading' ? 'Memuat materi...' : 'Materi belum tersedia.'}
          </p>
        )}

        {currentScreen === 'materi' && activeMateri && (
          <MateriScreen
            key={activeMateri.id}
            materi={activeMateri}
            materiList={materiList}
            isMateriUnlocked={isMateriUnlocked}
            isCompleted={isActiveMateriDone}
            onToggleComplete={handleToggleMateriComplete}
            onOpenMateri={handleOpenMateri}
            quizState={quizState}
            onOpenQuiz={() => activeBab && handleOpenQuiz(activeBab.id)}
          />
        )}

        {currentScreen === 'kuis' && activeQuizBabId !== null && hasQuiz(activeQuizBabId) && (
          <KuisScreen
            key={activeQuizBabId}
            babId={activeQuizBabId}
            babJudul={babList.find((b) => b.id === activeQuizBabId)?.judul ?? ''}
            questions={QUIZ_BY_BAB[activeQuizBabId]}
            onNavigate={handleNavigate}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {currentScreen === 'kuis' && (activeQuizBabId === null || !hasQuiz(activeQuizBabId)) && (
          <p className="pt-header px-4 text-[14px] text-[#52443d] text-center">
            Pilih evaluasi dari daftar bab di Beranda.
          </p>
        )}

        {currentScreen === 'riwayat' && (
          <RiwayatScreen
            onNavigate={handleNavigate}
            onOpenMateri={handleOpenMateri}
            onOpenQuiz={handleOpenQuiz}
            progress={progress}
            quizResults={quizResults}
            babList={babList}
            materiList={materiList}
          />
        )}

        {currentScreen === 'akun' && (
          <AkunScreen
            user={user}
            progress={progress}
            quizResults={quizResults}
            materiList={materiList}
            onLogout={async () => {
              await supabase.auth.signOut();
              handleNavigate('landing');
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
