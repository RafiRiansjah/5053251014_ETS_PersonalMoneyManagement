# PROSES

## Persona dan masalahnya
Driver ojek online memiliki pendapatan yang tidak menentu setiap harinya dan perlu mengatur pengeluaran seperti bensin serta servis kendaraan. Karena itu, aplikasi CUJOL dibuat untuk membantu mencatat pemasukan dan pengeluaran agar keuangan lebih mudah dipantau.

## Rancangan struktur data
Semua transaksi disimpan dalam satu array bernama transaksi, lalu disimpan ke localStorage dengan JSON.stringify() dan dibaca dengan JSON.parse() saat halaman dibukan

Contoh satu transaksi:

    {
      id: 1739251200000,
      tanggal: "2026-10-19",
      jenis: "pengeluaran",
      kategori: "Bensin",
      nominal: 30000,
      catatan: "Isi full",
      tipe: "operasional"
    }

- id: dari Date.now() supaya unik
- nominal: angka, bukan teks berformat Rupiah
- tipe: khusus persona ojol ("operasional" atau "pribadi", kosong untuk pemasukan)

## Keputusan desain
Saya menaruh tipe sebagai field di dalam objek transaksi yang sama, bukan membuat array atau halaman terpisah. Alasannya, daftar, hapus, ringkasan, dan pendapatan bersih semuanya memakai satu sumber data. Jadi ketika sebuah transaksi dihapus, semua tampilan ikut berubah tanpa perlu menyinkronkan dua data.>

## Bug 