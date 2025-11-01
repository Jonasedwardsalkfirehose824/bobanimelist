# Panduan Setup Lokal

Panduan ini akan membantu Anda mengatur dan menjalankan proyek ini secara lokal di mesin Anda.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi terbaru yang direkomendasikan)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/) (terinstal otomatis dengan Node.js)

## Langkah-langkah Setup

### 1. Kloning Repositori

Pertama, kloning repositori proyek ke komputer lokal Anda:

```bash
git clone <URL_REPOSITORI_ANDA>
cd bobanimelist
```

### 2. Instalasi Dependensi

Setelah masuk ke direktori proyek, instal semua dependensi yang diperlukan:

```bash
npm install
```

atau jika Anda menggunakan yarn:

```bash
yarn install
```

### 3. Konfigurasi Lingkungan

Jika proyek ini memerlukan konfigurasi lingkungan tertentu, buat file `.env` di direktori root proyek Anda dan tambahkan variabel lingkungan yang diperlukan. Contoh file `.env`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=bobanimelist
```

### 4. Menjalankan Aplikasi dalam Mode Pengembangan

Untuk menjalankan aplikasi dalam mode pengembangan:

```bash
npm run dev
```

atau jika Anda menggunakan yarn:

```bash
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

### 5. Membangun Aplikasi untuk Produksi

Jika Anda ingin membuat build untuk produksi:

```bash
npm run build
```

atau jika Anda menggunakan yarn:

```bash
yarn build
```

### 6. Menjalankan Server Produksi Lokal

Untuk menjalankan versi production secara lokal:

```bash
npm run preview
```

atau jika Anda menggunakan yarn:

```bash
yarn preview
```

## Skrip NPM Tambahan

Proyek ini juga menyertakan beberapa skrip npm tambahan:

- `npm run lint`: Menjalankan linter untuk memeriksa kode
- `npm run format`: Memformat kode sesuai dengan konfigurasi
- `npm test`: Menjalankan tes (jika ada)

## Bantuan dan Dukungan

Jika Anda mengalami masalah saat mengatur proyek, silakan periksa:

- File `README.md` untuk informasi lebih lanjut
- Dokumentasi framework Vite di [vitejs.dev](https://vitejs.dev/)
- Hubungi tim pengembang jika Anda mengalami masalah teknis

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah setup di atas dan baca panduan kontribusi yang tersedia di file `CONTRIBUTING.md` (jika ada).