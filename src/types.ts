export type ScreenType = 'beranda' | 'riwayat' | 'akun' | 'materi' | 'kuis' | 'masuk' | 'daftar';

export interface UserProfile {
  name: string;
  nisn: string;
  school: string;
  grade: string;
  registrationCode: string;
  avatarUrl: string;
  rank: string;
  isVerifiedBelajarId: boolean;
  dailyTargetMinutes: number;
  reminderEnabled: boolean;
  reminderTime: string;
}

/* ============================ MATERI ============================ */

export interface MateriImage {
  src: string;
  alt: string;
  caption: string;
}

/** Satu blok isi di dalam sebuah subbagian materi. */
export type MateriBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'bullets'; items: string[] }
  | { kind: 'numbered'; items: string[] }
  /** Daftar istilah bernilai penting, mis. Sumpah Pemuda atau semboyan revolusi. */
  | { kind: 'callout'; label: string; items: { term: string; meaning: string }[] }
  | { kind: 'people'; items: { name: string; role: string; image?: MateriImage }[] }
  | { kind: 'timeline'; items: { date: string; place: string; points: string[] }[] }
  | { kind: 'figure'; image: MateriImage };

export interface MateriSection {
  id: string;
  heading: string;
  icon: string;
  blocks: MateriBlock[];
}

/**
 * Video pembelajaran di bagian bawah materi. `url` dikosongkan selama
 * videonya belum tersedia; bingkai pemutar tetap tampil sebagai tempat.
 */
export interface MateriVideo {
  title: string;
  description: string;
  /** Kosongkan bila video belum ada. YouTube atau berkas video langsung. */
  url?: string;
  provider?: 'youtube' | 'file';
  duration?: string;
}

export interface Materi {
  id: string;
  number: number;
  era: string;
  scope: 'Sejarah Indonesia' | 'Sejarah Dunia';
  title: string;
  /** Judul pendek bergaya editorial untuk hero, dipecah dua baris. */
  displayTitle: [string, string];
  subtitle: string;
  year: string;
  readingMinutes: number;
  summary: string;
  /** Foto utama. Tidak semua materi punya foto di dokumen sumber. */
  hero?: MateriImage;
  sections: MateriSection[];
  gallery: MateriImage[];
  /** Nilai yang dapat diteladani atau dipelajari dari peristiwa ini. */
  values: string;
  video: MateriVideo;
}

/* ============================ KUIS ============================ */

export interface QuizQuestion {
  id: number;
  materiId: string;
  conceptTag: string;
  difficulty: string;
  question: string;
  sourceDoc: {
    title: string;
    text: string;
  };
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keywords: string[];
}

/* ====================== PERANGKAT PEMBELAJARAN ====================== */

export interface LearningActivity {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

/** Catatan progres satu materi: ISO timestamp saat ditandai selesai. */
export interface MateriProgress {
  [materiId: string]: string;
}

export interface QuizResult {
  score: number;
  xp: number;
  correctCount: number;
  totalQuestions: number;
  completedAt: string;
}
