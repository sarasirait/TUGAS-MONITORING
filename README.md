# Sistem Pemantauan Jaringan
## Fitur utama
### Perangkat Status Pemantauan
Aplikasi melakukan ping otomatis ke setiap perangkat setiap 3 detik untuk menentukan status:
Online (warna hijau)
Offline (warna merah)
### Grafik Bandwidth Realtime
Menggunakan Chart.js , aplikasi menampilkan grafik perubahan nilai bandwidth setiap pembaruan data.
### Aktivitas Log
Jika perangkat terdeteksi offline , sistem akan otomatis menyimpan log ke database lokal logs.db.
Log tampil pada halaman web secara real-time.
### Pembaruan Waktu Nyata
Dengan Socket.IO , status perangkat, grafik, dan diperbarui log langsung tanpa memuat ulang halaman.

# Struktur Folder
project-folder/
│
├── server.js
├── package.json
├── logs.db
│
└── public/
    ├── index.html
    └── main.js

# Instalasi
## Kloning atau unduh proyek
git clone <repository-url>
cd project-folder
## Instal depensi
git clone <repository-url>
cd project-folder
## Jalankan server
node server.js
## Buka halaman monitoring
http://localhost:3000
# Cara Kerja Sistem
## Perangkat Ping
# Server melakukan ping ke 3 perangkat:
Router → 192.168.1.1
Beralih → 192.168.1.2
Titik Akses → 192.168.1.3
Setiap 3 detik, status diperbarui dan dikirim ke klien
#  Bandwidth Grafik
Server menghasilkan nilai bandwidth acak sebagai simulasi.
Nilai-nilai tersebut ditampilkan sebagai grafik garis grafik
# Log Penyimpanan
Jika perangkat offline , server menyimpan log:
{
  "device": "Router",
  "alert": "Device Offline!",
  "time": "2025-01-01T12:00:00"
}

