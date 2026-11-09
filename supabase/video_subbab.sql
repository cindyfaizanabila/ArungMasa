-- Video interaktif per subbab. Jalankan sekali di SQL Editor Supabase.
-- Kolom baru ini hanya terbaca oleh yang sudah login (anon hanya boleh kolom
-- yang ditentukan di isi_butuh_login.sql).

alter table public.subbab
  add column if not exists video jsonb;

-- CONTOH mengisi video untuk satu subbab (ganti id, tautan, dan pertanyaannya).
-- "at" adalah detik: menit 1 lewat 35 detik = 95.
--
-- update public.subbab
-- set video = $video$
-- {
--   "provider": "youtube",
--   "url": "https://www.youtube.com/watch?v=GANTI_DENGAN_ID_VIDEO",
--   "title": "Judul video",
--   "checkpoints": [
--     {
--       "at": 95,
--       "question": "Isi pertanyaan pertama?",
--       "options": [
--         { "key": "A", "text": "Pilihan A" },
--         { "key": "B", "text": "Pilihan B" },
--         { "key": "C", "text": "Pilihan C" },
--         { "key": "D", "text": "Pilihan D" }
--       ],
--       "correctAnswer": "B",
--       "explanation": "Penjelasan yang tampil setelah dijawab benar."
--     }
--   ]
-- }
-- $video$::jsonb
-- where id = '1-1';
