import { LearningActivity, Materi, MateriImage } from '../types';

/**
 * Isi materi diambil dari dokumen "Materi Pembelajaran Sejarah SMA Kelas X–XII —
 * Peristiwa Penting dalam Sejarah Indonesia dan Dunia".
 *
 * Gambar diekstrak dari dokumen yang sama dan disimpan di `public/materi/`.
 * Dokumen hanya memuat foto untuk materi 1 dan 2; materi 3–5 tampil dengan
 * hero tipografis karena tidak ada fotonya di sumber.
 */

export const COURSE = {
  title: 'Peristiwa Penting dalam Sejarah Indonesia dan Dunia',
  level: 'Sejarah SMA Kelas X–XII',
  objectives: [
    'Menjelaskan latar belakang dan proses terjadinya peristiwa sejarah.',
    'Mengidentifikasi tokoh-tokoh penting dalam setiap peristiwa.',
    'Menganalisis dampak peristiwa sejarah bagi masyarakat Indonesia dan dunia.',
    'Menumbuhkan sikap nasionalisme, toleransi, dan penghargaan terhadap perjuangan bangsa.',
    'Menyajikan hasil pemahaman sejarah dalam bentuk peta konsep, diskusi, atau presentasi kelompok.',
  ],
  conclusion: [
    'Kelima peristiwa tersebut menunjukkan bahwa sejarah dibentuk oleh perjuangan, perubahan pemikiran, ketidakadilan, konflik, dan diplomasi. Kongres Pemuda II memperkuat persatuan nasional, Revolusi Prancis menyebarkan gagasan kebebasan dan kesetaraan, kritik Max Havelaar mengungkap penderitaan akibat kolonialisme, pengeboman atom menjadi bagian penting dari akhir Perang Dunia II, sedangkan Perjanjian Renville memperlihatkan tantangan diplomasi Indonesia dalam mempertahankan kemerdekaan.',
    'Dengan mempelajari peristiwa-peristiwa tersebut, peserta didik diharapkan mampu memahami masa lalu secara kritis dan mengambil pelajaran untuk kehidupan masa kini.',
  ],
};

export const CONCEPT_MAP: MateriImage = {
  src: '/materi/peta-konsep.webp',
  alt: 'Peta konsep Peristiwa Penting dalam Sejarah Indonesia dan Dunia',
  caption: 'Peta konsep kelima peristiwa — latar belakang, pelaksanaan, dampak, dan nilai.',
};

export const LEARNING_ACTIVITIES: LearningActivity[] = [
  {
    title: 'Aktivitas 1: Diskusi Kelompok',
    description: 'Bentuklah lima kelompok. Setiap kelompok membahas satu peristiwa sejarah.',
    icon: 'groups',
    items: [
      'Menjelaskan latar belakang peristiwa.',
      'Menyebutkan tokoh-tokoh penting.',
      'Menguraikan kronologi singkat.',
      'Menganalisis dampak peristiwa.',
      'Membuat peta konsep atau knowledge map.',
    ],
  },
  {
    title: 'Aktivitas 2: Analisis Sebab dan Akibat',
    description: 'Diskusikan pertanyaan berikut bersama kelompokmu.',
    icon: 'psychology_alt',
    items: [
      'Mengapa persatuan pemuda penting bagi perjuangan kemerdekaan Indonesia?',
      'Bagaimana Revolusi Prancis mengubah pemikiran politik masyarakat?',
      'Mengapa Sistem Tanam Paksa menimbulkan penderitaan rakyat?',
      'Bagaimana pengeboman atom memengaruhi situasi menjelang kemerdekaan Indonesia?',
      'Mengapa Perjanjian Renville merugikan posisi Republik Indonesia?',
    ],
  },
  {
    title: 'Aktivitas 3: Presentasi',
    description:
      'Setiap kelompok mempresentasikan hasil diskusi selama 5–7 menit. Kelompok lain memberikan pertanyaan atau tanggapan berdasarkan materi yang telah dipelajari.',
    icon: 'co_present',
    items: [],
  },
];

export const MATERI_LIST: Materi[] = [
  /* ------------------------------ 1 ------------------------------ */
  {
    id: 'kongres-pemuda-ii',
    number: 1,
    era: 'Masa Pergerakan Nasional',
    scope: 'Sejarah Indonesia',
    title: 'Kongres Pemuda II',
    displayTitle: ['KONGRES', 'PEMUDA II'],
    subtitle: 'Lahirnya Sumpah Pemuda dan identitas kebangsaan Indonesia',
    year: '1928',
    readingMinutes: 5,
    summary:
      'Pemuda dari berbagai daerah menyatukan perjuangan dalam satu tanah air, satu bangsa, dan satu bahasa.',
    hero: {
      src: '/materi/kongres-pemuda-ii.webp',
      alt: 'Suasana sidang Kongres Pemuda II tahun 1928',
      caption: 'Suasana sidang Kongres Pemuda II, 27–28 Oktober 1928 di Batavia.',
    },
    sections: [
      {
        id: 'latar-belakang',
        heading: 'Latar Belakang',
        icon: 'history_edu',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pada awal abad ke-20, organisasi pergerakan mulai berkembang di Indonesia. Setelah berdirinya Budi Utomo pada 1908, muncul organisasi pemuda seperti Jong Java dan Jong Sumatranen Bond. Pada awalnya, organisasi tersebut masih berorientasi pada daerah masing-masing.',
          },
          {
            kind: 'paragraph',
            text: 'Seiring berjalannya waktu, para pemuda menyadari bahwa perjuangan melawan penjajahan akan lebih kuat apabila dilakukan melalui persatuan nasional.',
          },
          {
            kind: 'figure',
            image: {
              src: '/materi/diorama-sumpah-pemuda.webp',
              alt: 'Diorama tokoh-tokoh Kongres Pemuda II',
              caption:
                'Diorama sidang Kongres Pemuda II. W.R. Soepratman tampak berdiri memainkan biola di sisi kiri.',
            },
          },
        ],
      },
      {
        id: 'pelaksanaan',
        heading: 'Pelaksanaan Kongres Pemuda II',
        icon: 'event',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Kongres Pemuda II diselenggarakan pada 27–28 Oktober 1928 di Batavia, sekarang Jakarta. Kongres ini bertujuan memperkuat persatuan pemuda dari berbagai daerah.',
          },
          {
            kind: 'people',
            items: [
              {
                name: 'Soegondo Djojopoespito',
                role: 'Ketua Kongres Pemuda II.',
                image: {
                  src: '/materi/tokoh-soegondo.webp',
                  alt: 'Potret Soegondo Djojopoespito',
                  caption: 'Soegondo Djojopoespito',
                },
              },
              {
                name: 'Mohammad Yamin',
                role: 'Sekretaris kongres dan tokoh penting dalam perumusan ikrar Sumpah Pemuda.',
                image: {
                  src: '/materi/tokoh-yamin.webp',
                  alt: 'Potret Mohammad Yamin',
                  caption: 'Mohammad Yamin',
                },
              },
              {
                name: 'W.R. Soepratman',
                role: 'Memperkenalkan lagu Indonesia Raya dengan biola.',
                image: {
                  src: '/materi/tokoh-soepratman.webp',
                  alt: 'Potret W.R. Soepratman',
                  caption: 'W.R. Soepratman',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'isi-sumpah',
        heading: 'Isi Sumpah Pemuda',
        icon: 'menu_book',
        blocks: [
          { kind: 'paragraph', text: 'Sumpah Pemuda menegaskan tiga identitas persatuan:' },
          {
            kind: 'callout',
            label: 'Tiga Ikrar Persatuan',
            items: [
              { term: 'Satu tanah air', meaning: 'Tanah Air Indonesia.' },
              { term: 'Satu bangsa', meaning: 'Bangsa Indonesia.' },
              { term: 'Menjunjung bahasa persatuan', meaning: 'Bahasa Indonesia.' },
            ],
          },
          {
            kind: 'figure',
            image: {
              src: '/materi/prasasti-sumpah-pemuda.webp',
              alt: 'Prasasti Poetoesan Congres Pemoeda-Pemoeda Indonesia',
              caption:
                'Prasasti "Poetoesan Congres Pemoeda-Pemoeda Indonesia" yang memuat naskah keputusan kongres.',
            },
          },
        ],
      },
      {
        id: 'dampak',
        heading: 'Dampak',
        icon: 'trending_up',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Kongres Pemuda II memperkuat persatuan antarpemuda dan menjadi salah satu tonggak penting perjuangan menuju kemerdekaan Indonesia.',
          },
        ],
      },
    ],
    gallery: [
      {
        src: '/materi/kongres-pemuda-ii.webp',
        alt: 'Suasana sidang Kongres Pemuda II',
        caption: 'Sidang Kongres Pemuda II, Batavia 1928',
      },
      {
        src: '/materi/diorama-sumpah-pemuda.webp',
        alt: 'Diorama Kongres Pemuda II',
        caption: 'Diorama sidang kongres',
      },
      {
        src: '/materi/tokoh-soegondo.webp',
        alt: 'Potret Soegondo Djojopoespito',
        caption: 'Soegondo Djojopoespito',
      },
      {
        src: '/materi/tokoh-yamin.webp',
        alt: 'Potret Mohammad Yamin',
        caption: 'Mohammad Yamin',
      },
      {
        src: '/materi/tokoh-soepratman.webp',
        alt: 'Potret W.R. Soepratman',
        caption: 'W.R. Soepratman',
      },
      {
        src: '/materi/prasasti-sumpah-pemuda.webp',
        alt: 'Prasasti keputusan Kongres Pemuda',
        caption: 'Prasasti Poetoesan Congres',
      },
    ],
    values: 'Persatuan, nasionalisme, kerja sama, dan menghargai keberagaman.',
    video: {
      title: 'Video Pembelajaran: Kongres Pemuda II dan Sumpah Pemuda',
      description:
        'Tayangan pendukung mengenai jalannya kongres, tokoh-tokohnya, dan lahirnya ikrar Sumpah Pemuda.',
      duration: '± 7 menit',
    },
  },

  /* ------------------------------ 2 ------------------------------ */
  {
    id: 'revolusi-prancis',
    number: 2,
    era: 'Sejarah Dunia',
    scope: 'Sejarah Dunia',
    title: 'Revolusi Prancis',
    displayTitle: ['REVOLUSI', 'PRANCIS'],
    subtitle: 'Runtuhnya kekuasaan absolut dan lahirnya gagasan hak warga negara',
    year: '1789',
    readingMinutes: 5,
    summary:
      'Krisis keuangan dan ketimpangan sosial memicu perubahan besar politik Prancis pada akhir abad ke-18.',
    hero: {
      src: '/materi/revolusi-prancis.webp',
      alt: 'Lukisan pertempuran pada masa Revolusi Prancis',
      caption: 'Lukisan suasana pertempuran pada masa Revolusi Prancis.',
    },
    sections: [
      {
        id: 'latar-belakang',
        heading: 'Latar Belakang',
        icon: 'history_edu',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Revolusi Prancis merupakan perubahan besar dalam kehidupan politik dan sosial Prancis pada akhir abad ke-18.',
          },
          { kind: 'paragraph', text: 'Beberapa penyebabnya adalah:' },
          {
            kind: 'bullets',
            items: [
              'Kekuasaan raja yang absolut di bawah Louis XVI.',
              'Krisis keuangan negara dan beban pajak yang tidak merata.',
              'Ketimpangan sosial antara golongan bangsawan, rohaniwan, dan rakyat biasa.',
              'Berkembangnya pemikiran tentang kebebasan dan persamaan hak.',
            ],
          },
          {
            kind: 'figure',
            image: {
              src: '/materi/louis-xvi.webp',
              alt: 'Potret Louis XVI dengan jubah kebesaran',
              caption: 'Louis XVI, raja Prancis yang berkuasa menjelang revolusi.',
            },
          },
        ],
      },
      {
        id: 'peristiwa-penting',
        heading: 'Peristiwa Penting',
        icon: 'local_fire_department',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pada 14 Juli 1789, rakyat menyerbu Penjara Bastille. Peristiwa tersebut menjadi simbol perlawanan terhadap kekuasaan absolut kerajaan.',
          },
        ],
      },
      {
        id: 'semboyan',
        heading: 'Semboyan Revolusi',
        icon: 'flag',
        blocks: [
          { kind: 'paragraph', text: 'Revolusi Prancis dikenal dengan semboyan:' },
          {
            kind: 'callout',
            label: 'Tiga Semboyan Revolusi',
            items: [
              { term: 'Liberté', meaning: 'Kebebasan.' },
              { term: 'Égalité', meaning: 'Persamaan atau kesetaraan.' },
              { term: 'Fraternité', meaning: 'Persaudaraan.' },
            ],
          },
        ],
      },
      {
        id: 'dampak',
        heading: 'Dampak',
        icon: 'trending_up',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Revolusi Prancis mengubah tatanan politik Prancis dan menyebarkan gagasan tentang hak warga negara, demokrasi, serta nasionalisme ke berbagai wilayah dunia.',
          },
        ],
      },
    ],
    gallery: [
      {
        src: '/materi/revolusi-prancis.webp',
        alt: 'Lukisan pertempuran Revolusi Prancis',
        caption: 'Pertempuran masa Revolusi Prancis',
      },
      {
        src: '/materi/louis-xvi.webp',
        alt: 'Potret Louis XVI',
        caption: 'Louis XVI',
      },
    ],
    values: 'Kesetaraan hak, kebebasan yang bertanggung jawab, dan penolakan terhadap ketidakadilan.',
    video: {
      title: 'Video Pembelajaran: Revolusi Prancis 1789',
      description:
        'Tayangan pendukung mengenai sebab-sebab revolusi, penyerbuan Bastille, dan semboyan Liberté, Égalité, Fraternité.',
      duration: '± 7 menit',
    },
  },

  /* ------------------------------ 3 ------------------------------ */
  {
    id: 'tanam-paksa',
    number: 3,
    era: 'Zaman Kolonial Hindia Belanda',
    scope: 'Sejarah Indonesia',
    title: 'Sistem Tanam Paksa dan Kritik Max Havelaar',
    displayTitle: ['SISTEM', 'TANAM PAKSA'],
    subtitle: 'Cultuurstelsel, penderitaan rakyat, dan kritik Multatuli',
    year: '1830',
    readingMinutes: 6,
    summary:
      'Kebijakan tanaman ekspor yang membebani rakyat, lalu dikritik lewat novel Max Havelaar.',
    sections: [
      {
        id: 'latar-belakang',
        heading: 'Latar Belakang',
        icon: 'history_edu',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pada 1830, pemerintah kolonial Belanda menerapkan Sistem Tanam Paksa (Cultuurstelsel) di bawah Gubernur Jenderal Johannes van den Bosch.',
          },
          {
            kind: 'paragraph',
            text: 'Kebijakan ini bertujuan meningkatkan pendapatan Belanda, antara lain untuk mengatasi masalah keuangan setelah berbagai peperangan.',
          },
        ],
      },
      {
        id: 'pelaksanaan',
        heading: 'Pelaksanaan Sistem Tanam Paksa',
        icon: 'agriculture',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Dalam praktiknya, penduduk diwajibkan menyediakan sebagian tanahnya untuk tanaman ekspor, seperti kopi, tebu, dan nila. Pelaksanaannya sering menyimpang dari ketentuan sehingga membebani rakyat.',
          },
          { kind: 'paragraph', text: 'Dampaknya meliputi:' },
          {
            kind: 'bullets',
            items: [
              'Beban kerja dan kewajiban ekonomi yang berat.',
              'Berkurangnya waktu dan lahan untuk menanam kebutuhan pangan.',
              'Kemiskinan serta kelaparan di sejumlah daerah.',
            ],
          },
        ],
      },
      {
        id: 'kritik-sastra',
        heading: 'Kritik melalui Karya Sastra',
        icon: 'auto_stories',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Eduard Douwes Dekker, yang menggunakan nama pena Multatuli, menulis novel Max Havelaar pada 1860. Novel ini mengkritik penyalahgunaan kekuasaan dan penderitaan penduduk di wilayah Lebak, Banten.',
          },
          {
            kind: 'paragraph',
            text: 'Karya tersebut membantu meningkatkan perhatian masyarakat Belanda terhadap persoalan kolonialisme.',
          },
        ],
      },
      {
        id: 'dampak',
        heading: 'Dampak',
        icon: 'trending_up',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Sistem Tanam Paksa secara bertahap dihapuskan, meskipun sejumlah tanaman tertentu masih dipertahankan selama beberapa waktu. Perdebatan mengenai eksploitasi kolonial turut berkembang dan menjadi bagian dari latar belakang perubahan kebijakan kolonial, termasuk munculnya Politik Etis pada awal abad ke-20.',
          },
        ],
      },
    ],
    gallery: [],
    values: 'Keadilan sosial, keberanian mengkritik ketidakadilan, dan kepedulian terhadap sesama.',
    video: {
      title: 'Video Pembelajaran: Cultuurstelsel dan Max Havelaar',
      description:
        'Tayangan pendukung mengenai pelaksanaan Sistem Tanam Paksa dan kritik Multatuli terhadap kolonialisme.',
      duration: '± 8 menit',
    },
  },

  /* ------------------------------ 4 ------------------------------ */
  {
    id: 'hiroshima-nagasaki',
    number: 4,
    era: 'Perang Dunia II',
    scope: 'Sejarah Dunia',
    title: 'Pengeboman Atom Hiroshima dan Nagasaki',
    displayTitle: ['HIROSHIMA', '& NAGASAKI'],
    subtitle: 'Akhir Perang Pasifik dan terbukanya jalan proklamasi',
    year: '1945',
    readingMinutes: 6,
    summary:
      'Dua bom atom mengakhiri perang di Pasifik dan mengubah peta kekuasaan menjelang kemerdekaan Indonesia.',
    sections: [
      {
        id: 'konteks',
        heading: 'Konteks Peristiwa',
        icon: 'public',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pada akhir Perang Dunia II, Jepang masih berperang melawan Sekutu di kawasan Pasifik. Amerika Serikat kemudian menjatuhkan dua bom atom di Jepang.',
          },
          {
            kind: 'paragraph',
            text: 'Keputusan tersebut masih menjadi bahan perdebatan sejarah karena berkaitan dengan upaya mengakhiri perang dan besarnya korban sipil.',
          },
        ],
      },
      {
        id: 'kronologi',
        heading: 'Kronologi Pengeboman',
        icon: 'route',
        blocks: [
          {
            kind: 'timeline',
            items: [
              {
                date: '6 Agustus 1945',
                place: 'Hiroshima',
                points: [
                  'Bom atom bernama Little Boy dijatuhkan dari pesawat B-29 Enola Gay.',
                  'Kota Hiroshima mengalami kehancuran besar dan banyak penduduk sipil menjadi korban.',
                ],
              },
              {
                date: '9 Agustus 1945',
                place: 'Nagasaki',
                points: [
                  'Bom atom bernama Fat Man dijatuhkan dari pesawat B-29 Bockscar.',
                  'Nagasaki mengalami kerusakan parah dan banyak korban jiwa.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dampak',
        heading: 'Dampak Peristiwa',
        icon: 'trending_up',
        blocks: [
          {
            kind: 'bullets',
            items: [
              'Menimbulkan korban jiwa dalam jumlah besar, baik secara langsung maupun akibat radiasi.',
              'Mempercepat berakhirnya perang di kawasan Pasifik.',
              'Jepang mengumumkan penerimaan penyerahan pada 15 Agustus 1945.',
              'Kekalahan Jepang membuka peluang bagi bangsa Indonesia untuk segera memproklamasikan kemerdekaan.',
            ],
          },
        ],
      },
      {
        id: 'hubungan-kemerdekaan',
        heading: 'Hubungan dengan Kemerdekaan Indonesia',
        icon: 'flag',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Kekalahan Jepang menciptakan perubahan kekuasaan dan situasi politik yang sering dijelaskan sebagai vacuum of power. Namun, kemerdekaan Indonesia bukan semata-mata akibat pengeboman atom. Peristiwa tersebut menjadi bagian dari rangkaian keadaan yang dimanfaatkan oleh para tokoh dan pejuang Indonesia.',
          },
          {
            kind: 'paragraph',
            text: 'Soekarno dan Mohammad Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945.',
          },
        ],
      },
    ],
    gallery: [],
    values:
      'Perdamaian, kemanusiaan, dan pentingnya menyelesaikan konflik tanpa mengorbankan warga sipil.',
    video: {
      title: 'Video Pembelajaran: Hiroshima, Nagasaki, dan Akhir Perang Pasifik',
      description:
        'Tayangan pendukung mengenai kronologi pengeboman serta kaitannya dengan proklamasi kemerdekaan Indonesia.',
      duration: '± 8 menit',
    },
  },

  /* ------------------------------ 5 ------------------------------ */
  {
    id: 'perjanjian-renville',
    number: 5,
    era: 'Masa Mempertahankan Kemerdekaan',
    scope: 'Sejarah Indonesia',
    title: 'Perjanjian Renville',
    displayTitle: ['PERJANJIAN', 'RENVILLE'],
    subtitle: 'Diplomasi di atas kapal dan menyempitnya wilayah Republik',
    year: '1948',
    readingMinutes: 6,
    summary:
      'Perundingan yang menghasilkan Garis Van Mook dan memaksa pasukan Republik meninggalkan sejumlah wilayah.',
    sections: [
      {
        id: 'latar-belakang',
        heading: 'Latar Belakang',
        icon: 'history_edu',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Setelah Indonesia memproklamasikan kemerdekaan pada 17 Agustus 1945, Belanda berusaha kembali menguasai Indonesia. Konflik tersebut memuncak dalam Agresi Militer Belanda I pada Juli 1947.',
          },
          {
            kind: 'paragraph',
            text: 'Perserikatan Bangsa-Bangsa (PBB) kemudian mendorong penyelesaian konflik melalui diplomasi. Komisi Tiga Negara (KTN) dibentuk untuk membantu menengahi perselisihan Indonesia dan Belanda.',
          },
        ],
      },
      {
        id: 'pelaksanaan',
        heading: 'Pelaksanaan Perjanjian',
        icon: 'handshake',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Perundingan Renville berlangsung di atas kapal USS Renville yang berlabuh di Jakarta. Perjanjian ditandatangani pada 17 Januari 1948.',
          },
          {
            kind: 'paragraph',
            text: 'Perundingan tersebut melibatkan delegasi Indonesia, Belanda, dan peran mediasi KTN.',
          },
        ],
      },
      {
        id: 'isi',
        heading: 'Isi dan Ketentuan Penting',
        icon: 'gavel',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Beberapa ketentuan penting dalam Perjanjian Renville meliputi:',
          },
          {
            kind: 'bullets',
            items: [
              'Pengakuan garis demarkasi yang dikenal sebagai Garis Van Mook.',
              'Pengaturan wilayah kekuasaan berdasarkan garis tersebut.',
              'Penarikan pasukan Republik Indonesia dari sejumlah daerah yang berada di sisi garis demarkasi menurut ketentuan perjanjian.',
            ],
          },
        ],
      },
      {
        id: 'dampak',
        heading: 'Dampak',
        icon: 'trending_up',
        blocks: [
          {
            kind: 'bullets',
            items: [
              'Wilayah Republik Indonesia menjadi semakin terbatas.',
              'Pasukan Republik harus meninggalkan sejumlah wilayah, termasuk dalam peristiwa hijrah Divisi Siliwangi dari Jawa Barat ke Jawa Tengah.',
              'Perjanjian menimbulkan ketidakpuasan dan memperlemah posisi politik serta militer Republik.',
              'Konflik Indonesia–Belanda belum berakhir dan kembali meningkat hingga Agresi Militer Belanda II pada Desember 1948.',
            ],
          },
        ],
      },
    ],
    gallery: [],
    values:
      'Diplomasi, keteguhan mempertahankan kemerdekaan, dan pentingnya mempertimbangkan kepentingan bangsa dalam perundingan.',
    video: {
      title: 'Video Pembelajaran: Perjanjian Renville 1948',
      description:
        'Tayangan pendukung mengenai latar belakang perundingan, isi perjanjian, dan dampaknya bagi Republik.',
      duration: '± 7 menit',
    },
  },
];

export const getMateriById = (id: string) =>
  MATERI_LIST.find((m) => m.id === id) ?? MATERI_LIST[0];
