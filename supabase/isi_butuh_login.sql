-- Isi materi hanya bisa dibaca setelah login.
-- Judul bab dan subbab tetap terbuka agar landing page bisa menampilkan daftar bab.
-- Jalankan sekali di SQL Editor Supabase.

revoke select on public.subbab from anon;
grant select (id, bab_id, urutan, judul) on public.subbab to anon;
