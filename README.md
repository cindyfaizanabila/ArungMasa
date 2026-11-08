# ArungMasa

Aplikasi *microlearning* sejarah untuk siswa SMA. Dibangun dengan React, TypeScript, Vite, dan Tailwind CSS.

> Prototipe untuk mata kuliah Manajemen Inovasi. Akun dan progres belajar hanya tersimpan di browser perangkat masing-masing.

---

## Yang perlu dipasang dulu

| Alat | Cek di terminal | Unduh |
|---|---|---|
| Node.js versi LTS (18 atau lebih baru) | `node -v` | https://nodejs.org |
| Git | `git --version` | https://git-scm.com |
| VS Code (disarankan) | – | https://code.visualstudio.com |

Kalau perintah di atas tidak dikenali setelah memasang, tutup lalu buka lagi terminal atau VS Code.

---

## Menjalankan di laptop (pertama kali)

**1. Clone repository**

```bash
git clone https://github.com/cindyfaizanabila/ArungMasa.git
cd ArungMasa
```

Simpan proyek di folder tetap seperti `Documents` atau `Projects`, jangan di `Downloads`.

**2. Pasang dependency**

```bash
npm install
```

Proses ini mengunduh folder `node_modules`. Folder itu memang tidak ikut di GitHub, jadi wajib dijalankan setiap kali clone.

**3. Siapkan file environment**

Salin `.env.example` menjadi `.env.local`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env.local

# macOS / Linux
cp .env.example .env.local
```

Isi nilainya kalau aplikasi membutuhkannya, misalnya API key. Minta key ke pemilik proyek **lewat chat pribadi**, jangan lewat grup atau GitHub.

**`.env.local` tidak boleh di-commit.** File itu sudah tercantum di `.gitignore`.

**4. Jalankan**

```bash
npm run dev
```

Buka alamat yang muncul di terminal, misalnya `http://localhost:3000` atau `http://localhost:5173`.

---

## Mencoba di HP

**Lewat Wi-Fi yang sama.** Laptop dan HP harus tersambung ke Wi-Fi yang sama.

```bash
npm run dev -- --host
```

Terminal akan menampilkan alamat **Network**, misalnya `http://192.168.1.10:3000`. Buka alamat itu di browser HP. Kalau tidak terbuka, izinkan Node.js di Windows Firewall (pilih "Private network").

**Lewat tampilan HP di laptop.** Di Chrome, tekan `F12`, lalu `Ctrl+Shift+M`, lalu pilih perangkat seperti Pixel 7.

---

## Alur kerja tim

Ikuti urutan ini setiap kali mengerjakan sesuatu supaya pekerjaan tidak saling menimpa.

**Sebelum mulai kerja, ambil versi terbaru:**

```bash
git pull
npm install
```

`npm install` hanya diperlukan kalau `package.json` berubah, tapi menjalankannya selalu tidak merugikan.

**Buat branch untuk tiap tugas:**

```bash
git checkout -b nama-tugas
```

Contoh nama branch: `materi-bab-2`, `perbaikan-kuis`, `halaman-riwayat`.

**Setelah selesai, simpan dan kirim:**

```bash
git add .
git status          # cek dulu: tidak boleh ada .env.local atau node_modules
git commit -m "Tambah materi Bab 2 subbab 2.1"
git push -u origin nama-tugas
```

Buka repository di GitHub, klik **Compare & pull request**, lalu minta anggota lain meninjau sebelum di-merge ke `main`.

**Aturan:**

- Jangan push langsung ke `main` untuk perubahan besar.
- Jangan pernah memakai `git push --force` di `main`.
- Tulis pesan commit yang menjelaskan apa yang berubah, bukan "update" atau "fix".

---

## Mengedit konten materi dan soal

Konten berada di folder `src/data/`. Setiap perubahan konten sejarah **wajib dicocokkan dengan buku paket** sebelum di-merge. Jangan menempel teks hasil AI tanpa dicek.

---

## Build untuk dibagikan

```bash
npm run build
```

Hasilnya ada di folder `dist/`. Folder ini bisa diunggah ke Netlify, Vercel, atau Firebase Hosting supaya penguji cukup membuka link.

---

## Kalau ada masalah

| Masalah | Solusi |
|---|---|
| `npm` atau `node` tidak dikenali | Pasang Node.js, lalu tutup dan buka ulang terminal |
| Error saat `npm install` | Hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi. Kalau masih gagal, kirim pesan error lengkapnya ke grup |
| Halaman kosong atau error setelah `git pull` | Jalankan `npm install` lagi, lalu `npm run dev` |
| Port sudah dipakai | Tutup terminal lain yang menjalankan `npm run dev`, atau pakai alamat baru yang ditawarkan |
| `Permission denied` saat push | Minta pemilik repo menambahkan akun GitHub-mu sebagai collaborator di **Settings → Collaborators** |
| `rejected ... fetch first` saat push | Jalankan `git pull --rebase`, selesaikan konflik jika ada, lalu push lagi |
| Peringatan `LF will be replaced by CRLF` | Bukan error. Abaikan saja |
| Akun dan progres hilang | Data tersimpan di browser. Membersihkan data browser, mode incognito, atau berganti browser akan memulai dari kosong |
