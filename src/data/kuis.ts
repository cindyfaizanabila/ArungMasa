import { QuizQuestion } from '../types';

/**
 * Soal evaluasi per bab; kuncinya adalah id bab di tabel `bab`.
 * Bab yang belum punya soal tampil sebagai "Segera hadir".
 *
 * Soal Bab 1 disusun dari dokumen "Materi Singkat Masa Pra Aksara" dan hanya
 * memakai fakta yang tidak ditandai ragu pada catatan akurasi dokumen itu.
 */
export const QUIZ_BY_BAB: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: 1,
      conceptTag: 'Perkembangan Bumi',
      difficulty: 'Mudah',
      question:
        'Pada masa apakah dinosaurus berjaya sehingga masa ini dikenal sebagai zaman reptil raksasa?',
      options: [
        { key: 'A', text: 'Arkaekum' },
        { key: 'B', text: 'Paleozoikum' },
        { key: 'C', text: 'Mesozoikum' },
        { key: 'D', text: 'Neozoikum' },
      ],
      correctAnswer: 'C',
      explanation:
        'Mesozoikum disebut zaman reptil raksasa karena dinosaurus berjaya. Arkaekum masih terlalu panas dan belum ada kehidupan, Paleozoikum ditandai munculnya kehidupan di laut, dan Neozoikum adalah zaman mamalia.',
      keywords: ['Mesozoikum', 'Dinosaurus'],
    },
    {
      id: 2,
      conceptTag: 'Perkembangan Bumi',
      difficulty: 'Sedang',
      question:
        'Pada kala apakah muka laut turun sehingga Paparan Sunda dan Paparan Sahul terbuka sebagai daratan?',
      options: [
        { key: 'A', text: 'Pleistosen (zaman es)' },
        { key: 'B', text: 'Holosen' },
        { key: 'C', text: 'Arkaekum' },
        { key: 'D', text: 'Paleozoikum' },
      ],
      correctAnswer: 'A',
      explanation:
        'Pada Pleistosen, yang disebut zaman es, muka laut turun dan paparan menjadi daratan. Pada Holosen es mencair dan laut naik, sehingga Indonesia menjadi kepulauan.',
      keywords: ['Pleistosen', 'Paparan Sunda', 'Zaman es'],
    },
    {
      id: 3,
      conceptTag: 'Manusia Purba',
      difficulty: 'Mudah',
      question: 'Siapakah yang menemukan fosil Pithecanthropus erectus di Trinil pada 1891?',
      options: [
        { key: 'A', text: 'G.H.R. von Koenigswald' },
        { key: 'B', text: 'Eugène Dubois' },
        { key: 'C', text: 'Mike Morwood' },
        { key: 'D', text: 'R.P. Soedjono' },
      ],
      correctAnswer: 'B',
      explanation:
        'Eugène Dubois menemukan Pithecanthropus erectus di Trinil. Von Koenigswald meneliti Sangiran, sedangkan Morwood dan Soedjono memimpin penelitian Homo floresiensis di Flores pada 2003.',
      keywords: ['Eugène Dubois', 'Trinil', '1891'],
    },
    {
      id: 4,
      conceptTag: 'Manusia Purba',
      difficulty: 'Sedang',
      question:
        'Manusia purba bertubuh besar dengan rahang sangat kuat yang ditemukan von Koenigswald di Sangiran disebut…',
      options: [
        { key: 'A', text: 'Homo wajakensis' },
        { key: 'B', text: 'Homo soloensis' },
        { key: 'C', text: 'Homo floresiensis' },
        { key: 'D', text: 'Meganthropus paleojavanicus' },
      ],
      correctAnswer: 'D',
      explanation:
        'Meganthropus paleojavanicus ditemukan di Sangiran, Sragen. Homo wajakensis berasal dari Wajak (Tulungagung), Homo soloensis dari Ngandong (Blora), dan Homo floresiensis dari Liang Bua (Flores).',
      keywords: ['Meganthropus', 'Sangiran', 'Rahang kuat'],
    },
    {
      id: 5,
      conceptTag: 'Manusia Purba',
      difficulty: 'Sedang',
      question:
        'Homo floresiensis, "manusia kerdil dari Flores", ditemukan pada 2003 di gua kapur…',
      options: [
        { key: 'A', text: 'Sangiran, Sragen' },
        { key: 'B', text: 'Ngandong, Blora' },
        { key: 'C', text: 'Liang Bua, Ruteng' },
        { key: 'D', text: 'Wajak, Tulungagung' },
      ],
      correctAnswer: 'C',
      explanation:
        'Homo floresiensis ditemukan di gua kapur Liang Bua, Ruteng, Manggarai, Flores. Tingginya sekitar 100 cm dengan berat sekitar 30 kg.',
      keywords: ['Liang Bua', 'Flores', '2003'],
    },
    {
      id: 6,
      conceptTag: 'Zaman Batu',
      difficulty: 'Sedang',
      question: 'Apakah titik balik terbesar pada Zaman Neolitikum?',
      options: [
        { key: 'A', text: 'Manusia mulai membuat nekara dari perunggu.' },
        { key: 'B', text: 'Manusia beralih dari food gathering ke food producing.' },
        { key: 'C', text: 'Manusia mulai berburu dengan kapak genggam kasar.' },
        { key: 'D', text: 'Manusia mulai tinggal di gua-gua tebing pantai.' },
      ],
      correctAnswer: 'B',
      explanation:
        'Pada Neolitikum manusia beralih dari mengumpulkan makanan (food gathering) ke menghasilkan makanan (food producing) lewat bertani dan beternak. Nekara berasal dari zaman perundagian, kapak genggam kasar dari Paleolitikum, dan gua tebing pantai dari Mesolitikum.',
      keywords: ['Food producing', 'Bertani', 'Beternak'],
    },
    {
      id: 7,
      conceptTag: 'Zaman Batu',
      difficulty: 'Sulit',
      question: 'Apakah yang dimaksud dengan kjokkenmoddinger pada zaman Mesolitikum?',
      options: [
        { key: 'A', text: 'Timbunan sampah dapur dari kulit kerang dan siput.' },
        { key: 'B', text: 'Gua-gua tebing pantai tempat tinggal manusia.' },
        { key: 'C', text: 'Bangunan batu besar untuk memuja arwah leluhur.' },
        { key: 'D', text: 'Batu giling untuk menghaluskan makanan dan cat merah.' },
      ],
      correctAnswer: 'A',
      explanation:
        'Kjokkenmoddinger adalah timbunan sampah dapur dari kulit kerang dan siput. Gua tebing pantai disebut abris sous roche, batu giling disebut pipisan, dan bangunan batu besar berasal dari zaman Megalitikum.',
      keywords: ['Kjokkenmoddinger', 'Kulit kerang', 'Mesolitikum'],
    },
    {
      id: 8,
      conceptTag: 'Zaman Logam',
      difficulty: 'Mudah',
      question: 'Nekara dan kapak corong merupakan peninggalan zaman…',
      options: [
        { key: 'A', text: 'Paleolitikum' },
        { key: 'B', text: 'Mesolitikum' },
        { key: 'C', text: 'Neolitikum' },
        { key: 'D', text: 'Perundagian' },
      ],
      correctAnswer: 'D',
      explanation:
        'Nekara dan kapak corong dibuat dari perunggu pada zaman perundagian, yaitu zaman logam yang juga disebut kebudayaan Dongson.',
      keywords: ['Nekara', 'Kapak corong', 'Perundagian'],
    },
  ],
};

export const totalQuizQuestions = () =>
  Object.values(QUIZ_BY_BAB).reduce((sum, questions) => sum + questions.length, 0);
