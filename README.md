# Bookshelf App

Aplikasi web sederhana dan responsif untuk mengatur koleksi buku Anda. Aplikasi ini memungkinkan Anda untuk menambah, melihat, mengedit, mencari, memfilter, dan mengurutkan buku, serta mengkategorikannya ke dalam bagian "Belum Dibaca" dan "Selesai Dibaca".

**Silahkan jalankan**:https://24781065-argaabiyyu-bookshelfapp.netlify.app/

## Fitur

- **Tambah Buku**: Mudah menambahkan buku baru dengan judul, penulis, tahun terbit, dan status dibaca/belum dibaca.
- **Daftar Buku Dinamis**: Buku-buku ditampilkan secara terpisah dalam dua kategori: "Belum Dibaca" dan "Selesai Dibaca".
- **Edit Buku**: Modifikasi detail buku yang sudah ada.
- **Hapus Buku**: Hapus buku dengan konfirmasi modal untuk mencegah penghapusan yang tidak disengaja.
- **Pencarian**: Cari buku berdasarkan judul, penulis, atau tahun.
- **Filter Status**: Saring buku berdasarkan status "Semua", "Sudah Dibaca", atau "Belum Dibaca".
- **Sortir**: Urutkan buku berdasarkan judul (A-Z) atau tahun terbit (Terbaru).
- **Mode Gelap/Terang**: Alihkan tema visual aplikasi sesuai preferensi.
- **Penyimpanan Lokal**: Data buku disimpan di browser pengguna menggunakan Web Storage API (LocalStorage atau SessionStorage).
- **Responsif**: Tampilan aplikasi dioptimalkan untuk berbagai ukuran layar (desktop, tablet, mobile).

## Struktur Proyek

```text
bookshelf-app/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       └── main1.js
└── README.md
```

## File yang Digunakan

### `index.html`
File HTML utama yang membangun struktur halaman web. Ini mencakup:
- Link ke Bootstrap CSS dan Bootstrap Icons untuk styling dan ikon.
- Link ke `styles.css` untuk gaya kustom aplikasi.
- Link ke `main.js` (atau `main1.js`, tergantung preferensi penyimpanan) untuk fungsionalitas JavaScript.
- Header aplikasi.
- Bar atas dengan form pencarian, tombol tambah buku, tombol toggle tema, dropdown filter status, dan dropdown sortir.
- Bagian utama (`books-display`) untuk menampilkan daftar buku yang secara dinamis diisi oleh JavaScript, terbagi menjadi "Belum Dibaca" dan "Selesai Dibaca".
- Modal untuk menambah/mengedit detail buku.
- Modal konfirmasi untuk penghapusan buku, memastikan pengguna mengonfirmasi sebelum menghapus.
- Footer aplikasi dengan informasi hak cipta.
- Skrip inline sederhana untuk mengelola toggle tema dan tampilan/penutupan modal secara dasar.

### `assets/css/styles.css`
File CSS yang mengatur tampilan dan nuansa aplikasi. Ini mendefinisikan:
- Variabel CSS untuk tema terang dan gelap, memungkinkan perubahan tema yang mudah.
- Gaya global untuk body dan kontainer utama.
- Gaya untuk header, bar atas, dan berbagai tombol aksi.
- Layout responsif dua kolom untuk daftar buku menggunakan Flexbox untuk memisahkan buku "Belum Dibaca" dan "Selesai Dibaca" pada layar yang lebih besar, dan menumpuknya pada layar kecil.
- Styling detail untuk kartu buku (`book-card`), termasuk ikon, metadata, dan tombol aksi (edit, tandai selesai, hapus).
- Gaya untuk modal kustom (modal tambah/edit dan modal konfirmasi hapus).
- Transisi halus untuk interaksi pengguna seperti hover pada kartu dan tombol, serta animasi saat elemen muncul.

### `assets/js/main.js`
File JavaScript utama yang mengelola semua logika fungsional aplikasi. Versi ini dikonfigurasi untuk menggunakan SessionStorage.

#### Fungsionalitas Utama:
- Mengelola array `books` yang menyimpan semua data buku dalam memori.
- Menginisialisasi variabel `isEditing` dan `editingBookId` untuk mengelola status pengeditan buku.
- Menggunakan `bookToDeleteId` untuk menyimpan ID buku yang akan dihapus sementara saat modal konfirmasi ditampilkan.
- `loadBooksFromSession()`: Memuat data buku dari `sessionStorage` saat aplikasi dimuat.
- `saveToSession()`: Menyimpan data buku ke `sessionStorage` setiap kali ada perubahan.
- `renderBooks(filter = "")`: Fungsi inti yang bertanggung jawab untuk memfilter dan menyortir array `books` serta membuat dua bagian terpisah ("Belum Dibaca" dan "Selesai Dibaca").
- `createBookElement(book, highlight = "")`: Membuat elemen HTML (kartu buku) untuk setiap objek buku.
- Mengelola interaksi form tambah/edit buku, termasuk reset form dan pembaruan judul modal.
- Menangani event listener untuk pencarian, filter, dan sortir.
- Mengelola tampilan dan penutupan modal tambah/edit.
- Menangani logika modal konfirmasi hapus.

### `assets/js/main1.js`
File JavaScript ini adalah alternatif dari `main.js`, dikonfigurasi untuk menggunakan LocalStorage.

#### Perbedaan Utama dari `main.js`:
- `loadBooksFromLocalStorage()`: Memuat data buku dari `localStorage`.
- `saveToLocalStorage()`: Menyimpan data buku ke `localStorage`.

## Cara Menjalankan Aplikasi

1. **Kloning atau Unduh Repositori**:
   ```bash
   git clone <URL_REPOSITORI_ANDA>
   # atau unduh file ZIP dari repositori
