# AI-LOG

## 1. Rancangan awal dan kode dasar 
- Prompt: tolong buatkan langkah dan kode sederhana(jangan terlalu advance) agar gamoang dipahami untuk aplikasi money manager
  persona ojol dengan HTML, CSS, JS, dan localStorage (berdasarkan dokumen requirement ETS, dan materi dari week 1 sampai 9)
- Dipakai: index.html, style.css, dan script.js (fungsi simpanData(),
  muatData(), formatRupiah(), renderDaftar(), hapusTransaksi(), dan
  event submit pada form)
- Diubah: Nama Aplikasi, nama variabel disesuaikan dengan kebutuhan

## 2. Ringkasan, validasi, dan fitur khas ojol
- Prompt: minta kode untuk ringkasan, validasi form, dan pendapatan bersih hari ini untuk persona driver ojol
- Dipakai: hitungRingkasan(), hitungPendapatanBersih(), tanggalHariIni(), dan blok validasi di event submit
- Diubah: -

## 3. Tampilan kartu (style.css)
- Prompt: minta tampilan dengan blok pemisah per section
- Dipakai: style.css (kartu, header, form, tombol)
- Diubah: menebalkan padding di header agar enak dilihat

## 4. Validasi jenis dan kategori
- Prompt: saya menemukan suatu bug dimana pengeluaran dapat disubmit dengan kategori Order, lalu minta langkah2 perbaikannya dan penjelasanya
- Dipakai: dua blok if di event submit untuk mencocokkan jenis dengan kategori
- Diubah: -

## 5. Kategori dinamis mengikuti jenis 
- Prompt: saya inging membuat dropdown kategori yang berubah mengikuti jenis dengan kode yang mudah dijelaskan
- Dipakai: kategoriPemasukan, kategoriPengeluaran, isiKategori(), event change pada jenis, dan pemanggilan isiKategori() setelah form.reset() serta di bagian mulai
- Diubah: -

## 6. Bagian Catatan 
- Prompt: catatan diubah jadi tiga kotak sejajar dengan warna sesuai nama, dan rapi di layar HP
- Dipakai: struktur kotak di index.html, serta .baris-ringkasan, .kotak, dan media query di style.css
- Diubah: warna diubah agar enak dilihat oleh pengguna

## 7. Format Rupiah untuk angka negatif
- Prompt: menemukan bug dimana jika rupiha menjadi negatif, tata letak negatifnya salahh harusnya -Rp 40.000 buakn Rp -40.000
- Dipakai: cabang if (angka < 0) dengan Math.abs() di formatRupiah()
- Diubah: -