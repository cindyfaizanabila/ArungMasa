import React, { useCallback, useEffect, useState } from 'react';
import { QuizResult, ScreenType } from '../types';
import { QUIZ_QUESTIONS } from '../data/mockData';

const XP_PER_CORRECT_ANSWER = 10;
const SECONDS_PER_QUESTION = 45;
const QUIZ_DURATION_SECONDS = QUIZ_QUESTIONS.length * SECONDS_PER_QUESTION;
const MASTERY_SCORE = 80;

interface KuisScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onCompleteQuiz: (result: QuizResult) => void;
}

export const KuisScreen: React.FC<KuisScreenProps> = ({
  onNavigate,
  onCompleteQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: 'A' | 'B' | 'C' | 'D' }>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<{ [questionId: number]: boolean }>({});
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_DURATION_SECONDS);
  const [xpEarned, setXpEarned] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Timer Countdown
  useEffect(() => {
    if (isQuizFinished) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isQuizFinished]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = ((currentIdx + 1) / totalQuestions) * 100;

  const finishQuiz = useCallback(() => {
    const correctCount = QUIZ_QUESTIONS.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    setFinalScore(score);
    setIsQuizFinished(true);
    onCompleteQuiz({
      score,
      xp: xpEarned,
      correctCount,
      totalQuestions,
      completedAt: new Date().toISOString(),
    });
  }, [selectedAnswers, totalQuestions, xpEarned, onCompleteQuiz]);

  // Waktu habis: tutup kuis dengan skor yang sudah terkumpul.
  useEffect(() => {
    if (secondsLeft === 0 && !isQuizFinished) {
      finishQuiz();
    }
  }, [secondsLeft, isQuizFinished, finishQuiz]);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerSubmitted[currentQ.id]) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
    setIsAnswerSubmitted((prev) => ({ ...prev, [currentQ.id]: true }));

    if (key === currentQ.correctAnswer) {
      setXpEarned((prev) => prev + XP_PER_CORRECT_ANSWER);
    }
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  // If Quiz is Finished, show Celebration & Scorecard
  if (isQuizFinished) {
    const isMastered = finalScore >= MASTERY_SCORE;
    return (
      <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-28 px-4 min-h-app relative z-10 animate-fadeIn">
        <div className="bg-[#fffcf6] rounded-xl p-6 shadow-md border border-[#e8e2d6] flex flex-col items-center text-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center border-2 shadow-sm ${
              isMastered
                ? 'bg-[#cfecae] text-[#20360a] border-[#20360a]/20'
                : 'bg-[#ffddb8] text-[#502408] border-[#855300]/20'
            }`}
          >
            <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isMastered ? 'workspace_premium' : 'history_edu'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#855300]">
              Hasil Evaluasi Pembelajaran
            </span>
            <h2 className="font-serif font-bold text-[24px] text-[#502408]">
              {isMastered ? 'Kurator Unggul Sejarah' : 'Arsip Perlu Ditelaah Ulang'}
            </h2>
            <p className="text-[13px] text-[#52443d]">
              {isMastered
                ? 'Selamat! Kamu telah memahami latar belakang, tokoh, dan dampak kelima peristiwa penting sejarah Indonesia dan dunia.'
                : 'Sebagian jawaban belum tepat. Baca ulang materinya, lalu kerjakan evaluasi ini lagi.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full my-1">
            <div className="bg-[#f9f3e7] p-3 rounded-lg border border-[#e8e2d6]">
              <span className="text-[11px] text-[#52443d]">Skor Akhir</span>
              <p className="font-serif font-bold text-[24px] text-[#502408]">{finalScore}/100</p>
            </div>
            <div className="bg-[#f9f3e7] p-3 rounded-lg border border-[#e8e2d6]">
              <span className="text-[11px] text-[#52443d]">Poin Diperoleh</span>
              <p className="font-serif font-bold text-[24px] text-[#855300]">+{xpEarned} XP</p>
            </div>
          </div>

          {/* Unlocked Badge Notice */}
          {isMastered && (
          <div className="w-full p-3 rounded-lg bg-[#f3ede1] border border-[#e8e2d6] flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#2a1700] shrink-0">
              <span className="material-symbols-outlined text-[20px]">history_edu</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#502408]">
                Lencana Terbuka: Penelaah Sejarah
              </span>
              <span className="text-[11px] text-[#52443d]">Tersimpan dalam Kartu Induk Siswa</span>
            </div>
          </div>
          )}

          <div className="flex flex-col w-full gap-2 mt-2">
            <button
              onClick={() => onNavigate('riwayat')}
              className="w-full h-12 rounded-xl bg-[#6b3a1c] text-white font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm hover:bg-[#502408] cursor-pointer"
            >
              <span>Lihat Jurnal &amp; Riwayat</span>
              <span className="material-symbols-outlined text-[18px]">history</span>
            </button>
            <button
              onClick={() => onNavigate('beranda')}
              className="w-full h-12 rounded-xl bg-[#f9f3e7] text-[#502408] border border-[#e8e2d6] font-semibold text-[13px] hover:bg-[#ede8dc] cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentSubmitted = !!isAnswerSubmitted[currentQ.id];
  const userChoice = selectedAnswers[currentQ.id];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-header pb-28 px-4 min-h-app relative z-10 space-y-4">
      {/* 1. Header Status Kuis */}
      <header className="flex flex-col gap-2.5 bg-[#f9f3e7]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#e8e2d6] shadow-xs">
        <div className="flex items-center justify-between">
          {/* Tombol Keluar & Subchapter Label */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('beranda')}
              aria-label="Keluar dari evaluasi"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#f3ede1] hover:bg-[#ede8dc] text-[#52443d] transition-colors active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#52443d] font-semibold uppercase tracking-wider">
                Evaluasi Pembelajaran
              </span>
              <span className="text-[13px] text-[#502408] font-bold">
                Lima Peristiwa Penting
              </span>
            </div>
          </div>

          {/* Live Counters */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f3ede1] text-[#502408] text-[12px] font-semibold border border-[#e8e2d6]">
              <span className="material-symbols-outlined text-[15px] text-[#855300]">timer</span>
              <span>{formatTimer(secondsLeft)}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ffddb8] text-[#2a1700] text-[12px] font-bold border border-[#ffb960]">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span>+{xpEarned} Poin</span>
            </div>
          </div>
        </div>

        {/* Progress Track */}
        <div className="flex flex-col gap-1 mt-0.5">
          <div className="flex justify-between items-center text-[#52443d] text-[11px]">
            <span className="font-medium">Progres Uji Materi</span>
            <span className="font-bold text-[#502408]">
              Pertanyaan {currentIdx + 1} dari {totalQuestions}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#e8e2d6] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ffb960] to-[#e2a04a] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* 2. Kartu Soal Kuis (Soal Analisis Sejarah) */}
      <article className="flex flex-col bg-[#fffcf6] rounded-xl p-4 shadow-sm border border-[#e8e2d6] gap-3">
        {/* Badge Kurikulum */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f3ede1] text-[#502408] text-[11px] uppercase tracking-wider font-semibold border border-[#e8e2d6]">
            <span className="material-symbols-outlined text-[14px]">history_edu</span>
            <span>{currentQ.conceptTag}</span>
          </div>
          <span className="text-[11px] text-[#52443d] font-medium">Bobot: {currentQ.difficulty}</span>
        </div>

        {/* Teks Pertanyaan Utama */}
        <h2 className="font-serif font-bold text-[19px] text-[#502408] leading-snug">
          {currentQ.question}
        </h2>

        {/* Sumber Primer Arsip Dokumen Pendukung */}
        <div className="relative bg-[#f9f3e7] border border-[#e8e2d6] rounded-lg p-3 flex flex-col gap-1 overflow-hidden">
          <div className="flex items-center gap-1.5 text-[#855300]">
            <span className="material-symbols-outlined text-[15px]">menu_book</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {currentQ.sourceDoc.title}
            </span>
          </div>
          <p className="text-[13px] text-[#52443d] italic leading-relaxed">
            {currentQ.sourceDoc.text}
          </p>
        </div>

        {/* 3. Pilihan Jawaban Interaktif */}
        <div className="flex flex-col gap-2.5 pt-1">
          {currentQ.options.map((option) => {
            const isSelected = userChoice === option.key;
            const isCorrect = option.key === currentQ.correctAnswer;

            let cardStyle = 'bg-[#f9f3e7] hover:bg-[#f3ede1] text-[#1d1c14] border border-[#e8e2d6]';
            let badgeStyle = 'bg-[#ede8dc] text-[#52443d]';

            if (isCurrentSubmitted) {
              if (isSelected && isCorrect) {
                // Correctly chosen
                cardStyle = 'bg-[#cfecae] text-[#0e2000] border border-[#20360a]/30 shadow-xs';
                badgeStyle = 'bg-[#20360a] text-white';
              } else if (isSelected && !isCorrect) {
                // Incorrect choice
                cardStyle = 'bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30';
                badgeStyle = 'bg-[#ba1a1a] text-white';
              } else if (!isSelected && isCorrect) {
                // Highlight actual correct answer
                cardStyle = 'bg-[#cfecae]/70 text-[#0e2000] border border-[#20360a]/30';
                badgeStyle = 'bg-[#20360a] text-white';
              } else {
                cardStyle = 'bg-[#f9f3e7]/60 text-[#52443d] border border-[#e8e2d6] opacity-60';
              }
            }

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handleSelectOption(option.key)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 active:scale-[0.99] cursor-pointer ${cardStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center shrink-0 transition-colors ${badgeStyle}`}
                >
                  {isCurrentSubmitted && isSelected && isCorrect ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : isCurrentSubmitted && isSelected && !isCorrect ? (
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  ) : (
                    option.key
                  )}
                </div>

                <div className="flex flex-col min-w-0 pr-2">
                  {isCurrentSubmitted && isSelected && isCorrect && (
                    <span className="text-[10px] text-[#20360a] font-bold uppercase tracking-wider mb-0.5">
                      Pilihan Kamu • Benar
                    </span>
                  )}
                  {isCurrentSubmitted && isSelected && !isCorrect && (
                    <span className="text-[10px] text-[#93000a] font-bold uppercase tracking-wider mb-0.5">
                      Pilihan Kamu • Kurang Tepat
                    </span>
                  )}
                  <p className="text-[13px] leading-snug">{option.text}</p>
                </div>

                {isCurrentSubmitted && isCorrect && (
                  <span
                    className="material-symbols-outlined text-[20px] text-[#20360a] ml-auto shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Kartu Ulasan Pembahasan Kurator (Feedback Jawaban) */}
        {isCurrentSubmitted && (
          <section className="mt-1 rounded-xl bg-[#f3ede1] p-3.5 flex flex-col gap-1.5 border border-[#e8e2d6] animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#20360a]">
                <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
                <h3 className="text-[13px] font-bold">
                  {userChoice === currentQ.correctAnswer
                    ? `Jawaban Kamu Benar! (+${XP_PER_CORRECT_ANSWER} XP)`
                    : 'Telaah Pembahasan Soal'}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ede8dc] text-[#52443d] uppercase tracking-wider">
                Telaah Kurator
              </span>
            </div>

            <p className="text-[13px] text-[#52443d] leading-relaxed">
              {currentQ.explanation}
            </p>

            <div className="flex items-center gap-2 pt-1 mt-0.5 bg-[#f9f3e7] rounded-lg p-2 border border-[#e8e2d6]">
              <span className="material-symbols-outlined text-[#855300] text-[16px] shrink-0">
                lightbulb
              </span>
              <span className="text-[11px] text-[#1d1c14] font-medium truncate">
                Kata Kunci: {currentQ.keywords.join(' • ')}
              </span>
            </div>
          </section>
        )}
      </article>

      {/* 5. Kartu Rangkuman Progres Soal Selanjutnya */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#f9f3e7] text-[#52443d] border border-[#e8e2d6]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#855300] text-[18px]">checklist_rtl</span>
          <span className="text-[12px] font-medium">
            {totalQuestions - 1 - currentIdx > 0
              ? `${totalQuestions - 1 - currentIdx} Pertanyaan tersisa sebelum ringkasan nilai evaluasi.`
              : 'Pertanyaan terakhir! Selesaikan untuk melihat hasil evaluasi.'}
          </span>
        </div>
      </div>

      {/* Tombol CTA Utama (Next Question) */}
      <div className="w-full pt-1 pb-4">
        <button
          type="button"
          onClick={handleNext}
          className="w-full h-[52px] px-6 bg-[#6b3a1c] hover:bg-[#502408] text-white rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>
            {currentIdx < totalQuestions - 1
              ? `Lanjut ke Pertanyaan ${currentIdx + 2}`
              : 'Selesaikan & Lihat Nilai'}
          </span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
