-- Daftar bab dan subbab materi ArungMasa.
-- Jalankan sekali di SQL Editor Supabase, setelah SQL profil dan progres.

create table public.bab (
  id    integer primary key,
  judul text not null
);

-- id berbentuk "<nomor bab>-<urutan>" dan dipakai oleh materi_progress.materi_id.
-- isi berformat array MateriSection (lihat src/types.ts); kosong = belum ada isi.
create table public.subbab (
  id     text primary key,
  bab_id integer not null references public.bab (id) on delete cascade,
  urutan integer not null,
  judul  text not null,
  isi    jsonb not null default '[]'::jsonb,
  unique (bab_id, urutan)
);

-- Materi boleh dibaca siapa saja, tetapi tidak bisa diubah dari aplikasi.
revoke all on public.bab, public.subbab from anon, authenticated;
grant select on public.bab, public.subbab to anon, authenticated;

alter table public.bab    enable row level security;
alter table public.subbab enable row level security;

create policy "Bab dapat dibaca semua orang"
  on public.bab for select to anon, authenticated using (true);

create policy "Subbab dapat dibaca semua orang"
  on public.subbab for select to anon, authenticated using (true);

insert into public.bab (id, judul) values
  (1,  'Masa Pra Aksara'),
  (2,  'Masa Hindu Buddha'),
  (3,  'Masa Islam'),
  (4,  'Penjajahan Bangsa Barat'),
  (5,  'Organisasi Pergerakan Nasional'),
  (6,  'Penjajahan Bangsa Jepang'),
  (7,  'Masa Kemerdekaan 1945 sampai 1950'),
  (8,  'Mempertahankan Kemerdekaan RI'),
  (9,  'Masa Disintegrasi Bangsa Indonesia'),
  (10, 'Demokrasi Presidensil'),
  (11, 'Masa Demokrasi Liberal (1950-1959) / Demokrasi Parlementer'),
  (12, 'Masa Demokrasi Terpimpin (1959-1965)'),
  (13, 'Masa Orde Baru (1965-1998)'),
  (14, 'Masa Reformasi');

insert into public.subbab (id, bab_id, urutan, judul)
select b.bab_id::text || '-' || s.urutan::text, b.bab_id, s.urutan, s.judul
from (values
  (1, array[
    'Periodisasi Perkembangan Bumi',
    'Manusia Purba di Indonesia',
    'Meganthropus Paleojavanicus',
    'Pithecanthropus Erectus',
    'Pithecanthropus Mojokertensis',
    'Homo Soloensis',
    'Homo Wajakensis',
    'Homo Floresiensis',
    'Periodisasi Zaman Batu',
    'Zaman Paleolithikum',
    'Zaman Mesolithikum',
    'Zaman Megalithikum',
    'Zaman Neolithikum',
    'Zaman Perundagian'
  ]),
  (2, array[
    'Kerajaan Kutai',
    'Kerajaan Tarumanegara',
    'Kerajaan Mataram Kuno',
    'Kerajaan Medang',
    'Kerajaan Sriwijaya',
    'Kerajaan Kediri',
    'Kerajaan Singasari',
    'Kerajaan Majapahit'
  ]),
  (3, array[
    'Teori Masuknya Islam ke Nusantara',
    'Bukti Masuknya Islam di Nusantara',
    'Kerajaan Samudera Pasai',
    'Kesultanan Aceh',
    'Kerajaan Demak',
    'Kerajaan Pajang',
    'Kerajaan Mataram Islam'
  ]),
  (4, array[
    'Sejarah Jalur Sutera',
    'Penjajahan Bangsa Portugis',
    'Penjajahan Bangsa Spanyol',
    'Sejarah VOC',
    'Penjajahan Bangsa Perancis (Republik Bataaf)',
    'Penjajahan Bangsa Inggris',
    'Penjajahan Bangsa Belanda'
  ]),
  (5, array[
    'Budi Utomo',
    'Sarekat Islam',
    'ISDV',
    'Indische Partij',
    'Partai Komunis Indonesia'
  ]),
  (6, array[
    'Penyerangan Pearl Harbour',
    'Tanggapan Tokoh Nasional terhadap Masuknya Bangsa Jepang',
    'Penjajahan Bangsa Jepang di Indonesia',
    'Organisasi – Organisasi Bentukan Jepang'
  ]),
  (7, array[
    'Peristiwa Pengeboman Hiroshima dan Nagasaki',
    'Sejarah BPUPKI',
    'Sejarah PPKI',
    'Peristiwa Rengasdengklok',
    'Peristiwa Proklamasi Kemerdekaan RI',
    'Agresi Militer Belanda I',
    'Agresi Militer Belanda II'
  ]),
  (8, array[
    'Pertempuran 10 November, Surabaya',
    'Pertempuran Lima Hari Semarang',
    'Pertempuran Palagan Ambarawa',
    'Peristiwa Bandung Lautan Api',
    'Peristiwa Puputan Margarana',
    'Peristiwa Medan Area'
  ]),
  (9, array[
    'Pemberontakan PKI Madiun (1948)',
    'Pemberontakan Andi Aziz',
    'Pemberontakan PRRI/Permesta',
    'Pemberontakan DI/TII',
    'Pemberontakan APRA',
    'Peristiwa G30SPKI'
  ]),
  (10, array[
    'Kabinet Syahrir I',
    'Kabinet Syahrir II',
    'Kabinet Syahrir III',
    'Kabinet Amir Syarifuddin I',
    'Kabinet Amir Syarifuddin II',
    'Kabinet Hatta I',
    'Kabinet Hatta II'
  ]),
  (11, array[
    'Demokrasi Liberal',
    'Pemerintahan Parlementer',
    'Kabinet Natsir',
    'Kabinet Sukiman dan Suwirjo',
    'Kabinet Wilopo',
    'Kabinet Ali Sastroamidjojo I',
    'Kabinet Burhanuddin Harahap',
    'Pemilu 1955',
    'Kabinet Djuanda'
  ]),
  (12, array[
    'Sejarah Demokrasi Terpimpin',
    'Peristiwa G30SPKI',
    'Peristiwa Supersemar',
    'Tritura'
  ]),
  (13, array[
    'Sejarah Orde Baru',
    'Partai Politik Pada Masa Orde Baru',
    'Tragedi Trisakti'
  ]),
  (14, array[
    '6 Agenda Reformasi',
    'Pemerintahan BJ Habibie',
    'Pemerintahan Abdurrahman Wahid',
    'Pemerintahan Megawati Soekarno Putri',
    'Pemilu Era Reformasi'
  ])
) as b (bab_id, daftar)
cross join lateral unnest(b.daftar) with ordinality as s (judul, urutan);
