export type ScreenType = 'landing' | 'beranda' | 'riwayat' | 'akun' | 'materi' | 'kuis' | 'masuk' | 'daftar';

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

/** Pertanyaan yang menghentikan video pada detik tertentu. */
export interface VideoCheckpoint {
  /** Detik ke berapa video berhenti. */
  at: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  /** Ditampilkan setelah pertanyaan dijawab benar. */
  explanation?: string;
}

/** Video interaktif sebuah subbab, disimpan di kolom `subbab.video`. */
export interface SubbabVideo {
  provider: 'youtube' | 'file';
  /** Tautan YouTube (atau ID-nya), atau tautan berkas video langsung. */
  url: string;
  title?: string;
  checkpoints: VideoCheckpoint[];
}

/** Satu subbab dari tabel `subbab`; `isi` kosong berarti belum ada isinya. */
export interface Subbab {
  id: string;
  judul: string;
  isi: MateriSection[];
  video: SubbabVideo | null;
  babId: number;
  babJudul: string;
}

export interface Bab {
  id: number;
  judul: string;
  subbab: Subbab[];
}

export type MateriStatus = 'loading' | 'ready' | 'error';

/* ============================ KUIS ============================ */

export interface QuizQuestion {
  id: number;
  conceptTag: string;
  difficulty: string;
  question: string;
  sourceDoc?: {
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

/** Catatan progres satu materi: ISO timestamp saat ditandai selesai. */
export interface MateriProgress {
  [materiId: string]: string;
}

export interface QuizResult {
  babId: number;
  score: number;
  xp: number;
  correctCount: number;
  totalQuestions: number;
  completedAt: string;
}
