import { useState } from 'react';
import { MateriProgress, QuizResult, ScreenType, UserProfile } from './types';
import { INITIAL_USER } from './data/mockData';
import { MATERI_LIST, getMateriById } from './data/materiData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { scrollAppToTop } from './components/PhoneFrame';
import { useScrollReveal } from './hooks/useScrollReveal';
import { BerandaScreen } from './screens/BerandaScreen';
import { MateriScreen } from './screens/MateriScreen';
import { KuisScreen } from './screens/KuisScreen';
import { RiwayatScreen } from './screens/RiwayatScreen';
import { AkunScreen } from './screens/AkunScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('beranda');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeMateriId, setActiveMateriId] = useState<string>(MATERI_LIST[0].id);
  /** id materi -> ISO timestamp saat ditandai selesai. */
  const [progress, setProgress] = useState<MateriProgress>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useScrollReveal();

  const activeMateri = getMateriById(activeMateriId);
  const isActiveMateriDone = Boolean(progress[activeMateriId]);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    scrollAppToTop();
  };

  const handleOpenMateri = (id: string) => {
    setActiveMateriId(id);
    setCurrentScreen('materi');
    scrollAppToTop();
  };

  const handleToggleMateriComplete = () => {
    setProgress((prev) => {
      const next = { ...prev };
      if (next[activeMateriId]) {
        delete next[activeMateriId];
      } else {
        next[activeMateriId] = new Date().toISOString();
      }
      return next;
    });
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleLoginSuccess = (name?: string) => {
    if (name) setUser((prev) => ({ ...prev, name }));
  };

  const handleRegisterSuccess = (name: string, grade: string) => {
    setUser((prev) => ({
      ...prev,
      name: name || prev.name,
      grade: grade || prev.grade,
    }));
  };

  const handleCompleteQuiz = (result: QuizResult) => {
    setQuizResult(result);
  };

  const showBackButton = ['materi', 'kuis', 'masuk', 'daftar'].includes(currentScreen);
  const showBottomNav = ['beranda', 'riwayat', 'akun'].includes(currentScreen);

  const getHeaderProps = () => {
    switch (currentScreen) {
      case 'materi':
        return {
          titleOverride: `Materi ${activeMateri.number}`,
          subtitleOverride: activeMateri.era,
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
          onBack: () => handleNavigate('beranda'),
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

      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        showBackButton={showBackButton}
        rightActions={
          <ScreenSwitcher currentScreen={currentScreen} onNavigate={handleNavigate} />
        }
        {...getHeaderProps()}
      />

      <main className="relative z-10 w-full flex flex-col items-center">
        {currentScreen === 'beranda' && (
          <BerandaScreen
            onNavigate={handleNavigate}
            onOpenMateri={handleOpenMateri}
            userName={user.name}
            progress={progress}
          />
        )}

        {currentScreen === 'materi' && (
          <MateriScreen
            materi={activeMateri}
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
          />
        )}

        {currentScreen === 'akun' && (
          <AkunScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigate={handleNavigate}
            progress={progress}
            quizResult={quizResult}
            onLogout={() => handleNavigate('masuk')}
          />
        )}

        {currentScreen === 'masuk' && (
          <LoginScreen onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
        )}

        {currentScreen === 'daftar' && (
          <RegisterScreen onNavigate={handleNavigate} onRegisterSuccess={handleRegisterSuccess} />
        )}
      </main>

      {showBottomNav && <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
    </div>
  );
}
