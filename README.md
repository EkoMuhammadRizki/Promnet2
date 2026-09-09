# PustakaNusa - Website Perpustakaan Digital

Website Perpustakaan Digital interaktif dan responsive yang dibangun menggunakan **HTML5, CSS3 (Vanilla CSS), dan JavaScript (ES6)** murni tanpa framework tambahan. Siap dan sangat mudah dideploy langsung ke **GitHub Pages**.

---

## 🌟 Fitur Utama

1. **Navigasi Minimalis & Bersih**:
   - Navigation bar hanya memiliki menu **Home** (sesuai instruksi).
   - Dilengkapi tombol cepat *Buku Saya Dipinjam* & *Toggle Dark/Light Mode*.

2. **Katalog Buku & Pencarian Real-Time**:
   - Pencarian berdasarkan judul, penulis, kategori, atau ISBN.
   - Filter kategori (*Teknologi, Fiksi, Sains, Sejarah, Bisnis*).
   - Filter ketersediaan (*Tersedia / Sedang Dipinjam*).
   - Pengurutan (*Judul A-Z, Tahun Terbaru, Rating Tertinggi*).

3. **Simulasi Peminjaman & Pengembalian Buku**:
   - Form peminjaman interaktif dengan kalkulasi otomatis tenggat waktu (3 - 14 hari).
   - Penyimpanan data status peminjaman tersimpan aman di `localStorage` browser.
   - Panel modal *Buku Saya Dipinjam* untuk memantau dan mengembalikan buku secara independen.

4. **Desain Modern & Responsive**:
   - Penggunaan Google Fonts (*Plus Jakarta Sans & Playfair Display*).
   - Animasi card hover, glassmorphism, dan dukungan mode gelap (Dark Mode).
   - Notifikasi Toast interaktif saat peminjaman atau pengembalian dilakukan.

---

## 📁 Struktur File

```
Promnet/
│
├── index.html       # Struktur utama web & elemen HTML
├── style.css        # Sistem desain CSS, tema, & gaya responsive
├── script.js        # Logika aplikasi, pencarian, simulasi peminjaman, & localStorage
├── assets/
│   └── hero.jpg     # Gambar latar belakang header perpustakaan
└── README.md        # Dokumentasi & panduan deployment GitHub Pages
```

---

## 🚀 Panduan Deployment ke GitHub Pages

Ikuti langkah-langkah mudah berikut untuk mengunggah dan mempublikasikan website ini ke GitHub Pages:

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka [GitHub](https://github.com) dan login ke akun Anda.
2. Klik tombol **New Repository** (atau tanda `+` di kanan atas).
3. Beri nama repositori (misal: `perpustakaan-digital`).
4. Pilih akses **Public**.
5. Jangan centang "Add a README file" jika Anda mengunggah dari folder komputer lokal.
6. Klik **Create repository**.

### Langkah 2: Push Kode dari Komputer Lokal ke GitHub
Buka terminal / Command Prompt / Git Bash di folder projek ini (`c:\File Eko\Asdos Promnet\Promnet`), lalu jalankan perintah berikut:

```bash
git init
git add .
git commit -m "Initial commit website perpustakaan digital"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/perpustakaan-digital.git
git push -u origin main
```
> *Catatan: Ganti `USERNAME-ANDA` dan `perpustakaan-digital` sesuai akun GitHub Anda.*

### Langkah 3: Aktifkan GitHub Pages
1. Masuk ke halaman repositori Anda di GitHub.
2. Klik menu **Settings** (di tab bagian atas).
3. Di menu bilah samping kiri, pilih **Pages** (di bagian *Code and automation*).
4. Pada bagian **Build and deployment** -> **Source**, pilih **Deploy from a branch**.
5. Pada bagian **Branch**, pilih `main` dan folder `/ (root)`.
6. Klik **Save**.

### Langkah 4: Akses Website Anda
Tunggu 1–3 menit hingga GitHub selesai memproses build. Alamat website Anda akan muncul di bagian atas halaman Settings Pages, contoh:
```text
https://USERNAME-ANDA.github.io/perpustakaan-digital/
```

---

## 💻 Cara Menjalankan Secara Lokal

Anda tidak memerlukan server khusus untuk menjalankan website ini:
1. Cukup **double-click** file `index.html` di file explorer komputer Anda, ATAU
2. Buka menggunakan extension **Live Server** di Visual Studio Code, ATAU
3. Jalankan via terminal:
   ```bash
   npx serve .
   ```

---
*Dibuat untuk tugas/project Perpustakaan Digital - Siap dipublikasikan di GitHub Pages.*
