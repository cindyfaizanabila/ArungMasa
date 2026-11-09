-- Evaluasi sekarang per bab. Jalankan sekali di SQL Editor Supabase
-- SEBELUM aplikasi versi baru dipakai, agar hasil evaluasi bisa disimpan.

alter table public.quiz_results
  add column if not exists bab_id integer references public.bab (id) on delete set null;
