import { QuizQuestion, UserProfile } from '../types';

export const ASSET_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPG9N2_CAvQlZxCjEsEWycXbQmvw-yCzVsqOwP18g6hgLVAP-GBBdn6924p6XBWn6hsgU8tUh66VgWvTRcGGQI1EAB7w56YOsQQq2MYp1EmGQ1uVR5KeT_rVcb6_UG2rlONjWRN8WSjqCEjb6OLGSsjOIx0jJRXQRqch-Mk3eFbDGmTSwJ4F-rn14rcXpNGx1SKSd0EEcglB00hBIxPHoVghoqsQ5UWjbNfRszG5pbatd3VXIddk-s0g',
  registerHero:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBcxTZCjoRJhTtDgFv1PTXRhMA97ji0dTvTjWjpSOLoSNyojRbaJKiWkqECn8ea_sZglKI3aUwAJlI90Eab-o2v3TEn4_qQpxkrgVAztRos_SRNY_2_WvbjJECgTAZZX1ap1ZeC41TzVUdiO0RCl65JR4uDTsuatwuQN1kGYAzrWYu7L6D71TZYZgN2vOqyYZ52gfiZAYOV5wheQ0-rBzgzVldnXtFAUQGV_WXv9WJFbqyNDODaOEE1Dg',
  dianaAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC1AMSp0CH553qXyxoE-TkMxz-NeWmTzH3CUijW7uJr8-aQUHEu2Hi4w7nTiPQhILOHjZUEWpcoOH52kb4Lq5S0YpeKfQuZNs1cUQvH4iLkfKi310JaOaOX-NtgglEfbPNm0WRdf1vAEwZRi7UdQD54-5GNqyyNwQCx7RzjzSeFv0J-_6rQO0SoZp41gqVzeIO92MVW0ChSZ2bA15jfnzVOlKcK94bRnF4QsGHcePGvmcKXMM6VpClewA',
};

export const INITIAL_USER: UserProfile = {
  name: 'Diana Kartika',
  nisn: '0072918402',
  school: 'SMAN 1 Jakarta',
  grade: 'Kelas 11',
  registrationCode: 'REG. 1945-JKT',
  avatarUrl: ASSET_IMAGES.dianaAvatar,
  rank: 'Madya',
  isVerifiedBelajarId: true,
  dailyTargetMinutes: 10,
  reminderEnabled: true,
  reminderTime: '19.30 WIB',
};

/**
 * Evaluasi Pembelajaran — kelima soal dan jawaban benarnya diambil dari bagian
 * "C. Evaluasi Pembelajaran" dan "Kunci Jawaban Singkat" pada dokumen materi.
 *
 * Dokumen sumber berbentuk soal uraian, sehingga tiga pengecoh pada setiap soal
 * disusun ulang dari fakta lain di dokumen yang sama (mis. menukar periode atau
 * membalik fakta) agar sesuai format pilihan ganda.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    materiId: 'kongres-pemuda-ii',
    conceptTag: 'Masa Pergerakan Nasional',
    difficulty: 'Sedang',
    question: 'Apa tujuan utama diselenggarakannya Kongres Pemuda II pada 1928?',
    sourceDoc: {
      title: 'Materi 1 • Kongres Pemuda II (1928)',
      text: '“Kongres Pemuda II diselenggarakan pada 27–28 Oktober 1928 di Batavia, sekarang Jakarta. Kongres ini bertujuan memperkuat persatuan pemuda dari berbagai daerah.”',
    },
    options: [
      {
        key: 'A',
        text: 'Mendirikan Budi Utomo sebagai organisasi pergerakan pertama di Indonesia.',
      },
      {
        key: 'B',
        text: 'Memperkuat persatuan pemuda dari berbagai daerah dan menegaskan identitas kebangsaan Indonesia.',
      },
      {
        key: 'C',
        text: 'Menuntut penghapusan Sistem Tanam Paksa kepada pemerintah kolonial Belanda.',
      },
      {
        key: 'D',
        text: 'Membentuk Komisi Tiga Negara untuk menengahi perselisihan dengan Belanda.',
      },
    ],
    correctAnswer: 'B',
    explanation:
      'Kongres Pemuda II bertujuan memperkuat persatuan pemuda dari berbagai daerah dan menegaskan identitas kebangsaan Indonesia. Sebelumnya organisasi pemuda seperti Jong Java dan Jong Sumatranen Bond masih berorientasi pada daerah masing-masing. Budi Utomo berdiri lebih awal (1908), sedangkan Tanam Paksa dan Komisi Tiga Negara berasal dari periode yang berbeda.',
    keywords: ['27–28 Oktober 1928', 'Persatuan Nasional', 'Identitas Kebangsaan'],
  },
  {
    id: 2,
    materiId: 'revolusi-prancis',
    conceptTag: 'Sejarah Dunia',
    difficulty: 'Mudah',
    question: 'Tiga semboyan Revolusi Prancis beserta maknanya adalah…',
    sourceDoc: {
      title: 'Materi 2 • Revolusi Prancis (1789)',
      text: '“Revolusi Prancis dikenal dengan semboyan: Liberté, Égalité, Fraternité.”',
    },
    options: [
      { key: 'A', text: 'Liberté (kebebasan), Égalité (kesetaraan), dan Fraternité (persaudaraan).' },
      { key: 'B', text: 'Satu tanah air, satu bangsa, dan menjunjung satu bahasa persatuan.' },
      { key: 'C', text: 'Persatuan, nasionalisme, dan kerja sama antarpemuda.' },
      {
        key: 'D',
        text: 'Keadilan sosial, keberanian mengkritik, dan kepedulian terhadap sesama.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Liberté berarti kebebasan, Égalité berarti persamaan atau kesetaraan, dan Fraternité berarti persaudaraan. Pilihan lain merupakan isi Sumpah Pemuda serta nilai-nilai yang dapat dipetik dari materi lain, bukan semboyan Revolusi Prancis.',
    keywords: ['Liberté', 'Égalité', 'Fraternité'],
  },
  {
    id: 3,
    materiId: 'tanam-paksa',
    conceptTag: 'Zaman Kolonial Hindia Belanda',
    difficulty: 'Sedang',
    question: 'Mengapa pemerintah kolonial Belanda menerapkan Sistem Tanam Paksa?',
    sourceDoc: {
      title: 'Materi 3 • Sistem Tanam Paksa (1830)',
      text: '“Kebijakan ini bertujuan meningkatkan pendapatan Belanda, antara lain untuk mengatasi masalah keuangan setelah berbagai peperangan.”',
    },
    options: [
      {
        key: 'A',
        text: 'Untuk menanggapi kritik yang ditulis Multatuli dalam novel Max Havelaar.',
      },
      { key: 'B', text: 'Untuk memenuhi tuntutan Politik Etis pada awal abad ke-20.' },
      {
        key: 'C',
        text: 'Untuk meningkatkan pendapatan pemerintah Belanda dan mengatasi masalah keuangan negara.',
      },
      {
        key: 'D',
        text: 'Untuk memperkuat pertahanan Belanda menghadapi Agresi Militer Belanda I.',
      },
    ],
    correctAnswer: 'C',
    explanation:
      'Sistem Tanam Paksa diterapkan pada 1830 untuk meningkatkan pendapatan pemerintah Belanda dan mengatasi masalah keuangan setelah berbagai peperangan. Max Havelaar baru terbit pada 1860 dan Politik Etis muncul pada awal abad ke-20, sehingga keduanya merupakan akibat, bukan sebab.',
    keywords: ['Cultuurstelsel 1830', 'Van den Bosch', 'Masalah Keuangan'],
  },
  {
    id: 4,
    materiId: 'hiroshima-nagasaki',
    conceptTag: 'Perang Dunia II',
    difficulty: 'Sulit',
    question: 'Bagaimana hubungan kekalahan Jepang dengan Proklamasi Kemerdekaan Indonesia?',
    sourceDoc: {
      title: 'Materi 4 • Pengeboman Atom Hiroshima dan Nagasaki (1945)',
      text: '“Namun, kemerdekaan Indonesia bukan semata-mata akibat pengeboman atom. Peristiwa tersebut menjadi bagian dari rangkaian keadaan yang dimanfaatkan oleh para tokoh dan pejuang Indonesia.”',
    },
    options: [
      {
        key: 'A',
        text: 'Kemerdekaan Indonesia merupakan akibat langsung dan satu-satunya dari pengeboman atom.',
      },
      {
        key: 'B',
        text: 'Sekutu menetapkan kemerdekaan Indonesia sebagai syarat penyerahan Jepang pada 15 Agustus 1945.',
      },
      {
        key: 'C',
        text: 'Jepang menyerahkan kemerdekaan Indonesia secara resmi melalui Perjanjian Renville.',
      },
      {
        key: 'D',
        text: 'Kekalahan Jepang mengubah situasi politik dan membuka kesempatan bagi bangsa Indonesia untuk memproklamasikan kemerdekaan pada 17 Agustus 1945.',
      },
    ],
    correctAnswer: 'D',
    explanation:
      'Kekalahan Jepang menciptakan perubahan kekuasaan yang sering disebut vacuum of power sehingga membuka kesempatan bagi bangsa Indonesia memproklamasikan kemerdekaan pada 17 Agustus 1945. Materi menegaskan kemerdekaan bukan semata-mata akibat pengeboman atom, melainkan rangkaian keadaan yang dimanfaatkan para tokoh dan pejuang Indonesia.',
    keywords: ['Vacuum of Power', '17 Agustus 1945', 'Soekarno–Hatta'],
  },
  {
    id: 5,
    materiId: 'perjanjian-renville',
    conceptTag: 'Masa Mempertahankan Kemerdekaan',
    difficulty: 'Sedang',
    question: 'Apa dampak utama Perjanjian Renville bagi Republik Indonesia?',
    sourceDoc: {
      title: 'Materi 5 • Perjanjian Renville (1948)',
      text: '“Pasukan Republik harus meninggalkan sejumlah wilayah, termasuk dalam peristiwa hijrah Divisi Siliwangi dari Jawa Barat ke Jawa Tengah.”',
    },
    options: [
      {
        key: 'A',
        text: 'Wilayah Republik menjadi terbatas, pasukan harus meninggalkan sejumlah daerah, dan posisi politik serta militer Republik melemah.',
      },
      {
        key: 'B',
        text: 'Konflik Indonesia–Belanda berakhir sepenuhnya setelah perjanjian ditandatangani.',
      },
      {
        key: 'C',
        text: 'Divisi Siliwangi memperoleh tambahan wilayah kekuasaan di Jawa Barat.',
      },
      {
        key: 'D',
        text: 'Belanda mengakui seluruh wilayah bekas Hindia Belanda sebagai wilayah Republik Indonesia.',
      },
    ],
    correctAnswer: 'A',
    explanation:
      'Perjanjian Renville membuat wilayah Republik semakin terbatas, memaksa pasukan meninggalkan sejumlah daerah (termasuk hijrah Divisi Siliwangi dari Jawa Barat ke Jawa Tengah), serta memperlemah posisi politik dan militer Republik. Konflik juga belum berakhir dan kembali meningkat hingga Agresi Militer Belanda II pada Desember 1948.',
    keywords: ['Garis Van Mook', 'Hijrah Siliwangi', '17 Januari 1948'],
  },
];
