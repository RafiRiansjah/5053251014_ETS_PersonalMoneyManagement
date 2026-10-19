// data
let transaksi = [];

function simpanData() {
    localStorage.setItem("transaksi", JSON.stringify(transaksi));
}

function muatData() {
    const data = localStorage.getItem("transaksi");
    if (data) {
        transaksi = JSON.parse(data);
    }
}

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function tanggalHariIni() {
    const sekarang = new Date();
    const tahun = sekarang.getFullYear();
    const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
    const hari = String(sekarang.getDate()).padStart(2, "0");

    return tahun + "-" + bulan + "-" + hari;
}

// perhitungan (W5 dan fitur khas ojol)
function hitungRingkasan() {
    const totalMasuk = transaksi
        .filter(function (t) {
            return t.jenis === "pemasukan";
        })
        .reduce(function (jumlah, t) {
            return jumlah + t.nominal;
        }, 0);

    const totalKeluar = transaksi
        .filter(function (t) {
            return t.jenis === "pengeluaran";
        })
        .reduce(function (jumlah, t) {
            return jumlah + t.nominal;
        }, 0);

    document.getElementById("totalMasuk").textContent =
        formatRupiah(totalMasuk);
    document.getElementById("totalKeluar").textContent =
        formatRupiah(totalKeluar);
    document.getElementById("saldo").textContent = formatRupiah(
        totalMasuk - totalKeluar,
    );
}

function hitungPendapatanBersih() {
    const hariIni = tanggalHariIni();

    const dataHariIni = transaksi.filter(function (t) {
        return t.tanggal === hariIni;
    });

    const pendapatan = dataHariIni
        .filter(function (t) {
            return t.jenis === "pemasukan";
        })
        .reduce(function (jumlah, t) {
            return jumlah + t.nominal;
        }, 0);

    const operasional = dataHariIni
        .filter(function (t) {
            return t.jenis === "pengeluaran" && t.tipe === "operasional";
        })
        .reduce(function (jumlah, t) {
            return jumlah + t.nominal;
        }, 0);

    document.getElementById("masukHariIni").textContent =
        formatRupiah(pendapatan);
    document.getElementById("operasionalHariIni").textContent =
        formatRupiah(operasional);
    document.getElementById("bersihHariIni").textContent = formatRupiah(
        pendapatan - operasional,
    );
}

// bagian tampilan
function renderDaftar() {
    const daftar = document.getElementById("daftar");
    daftar.innerHTML = "";
    const terbaruDiAtas = transaksi.slice().reverse();
    terbaruDiAtas.forEach(function (t) {
        const li = document.createElement("li");
        li.className = t.jenis;
        let labelKategori = t.kategori;
        if (t.tipe) {
            labelKategori = labelKategori + " (" + t.tipe + ")";
        }
        li.textContent =
            t.tanggal +
            " | " +
            labelKategori +
            " | " +
            formatRupiah(t.nominal) +
            " | " +
            t.catatan +
            " ";
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", function () {
            hapusTransaksi(t.id);
        });
        li.appendChild(tombolHapus);
        daftar.appendChild(li);
    });
}

function tampilkanSemua() {
    renderDaftar();
    hitungRingkasan();
    hitungPendapatanBersih();
}

function hapusTransaksi(id) {
    if (!confirm("Yakin mau hapus transaksi ini?")) {
        return;
    }
    transaksi = transaksi.filter(function (t) {
        return t.id !== id;
    });
    simpanData();
    tampilkanSemua();
}

const form = document.getElementById("formTransaksi");
const pesanError = document.getElementById("pesanError");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const transaksiBaru = {
        id: Date.now(),
        tanggal: document.getElementById("tanggal").value,
        jenis: document.getElementById("jenis").value,
        kategori: document.getElementById("kategori").value,
        nominal: Number(document.getElementById("nominal").value),
        catatan: document.getElementById("catatan").value,
        tipe: document.getElementById("tipe").value,
    };

    if (transaksiBaru.jenis === "pemasukan") {
        transaksiBaru.tipe = "";
    }

    // validasi sebelum data disimpan
    if (transaksiBaru.tanggal === "" || transaksiBaru.kategori === "") {
        pesanError.textContent = "Tanggal dan kategori wajib diisi.";
        return;
    }

    if (transaksiBaru.nominal <= 0) {
        pesanError.textContent = "Nominal harus lebih dari 0.";
        return;
    }

    if (
        transaksiBaru.jenis === "pengeluaran" &&
        transaksiBaru.kategori === "Order"
    ) {
        pesanError.textContent = "Kategori Order hanya untuk pemasukan.";
        return;
    }

    if (
        transaksiBaru.jenis === "pemasukan" &&
        (transaksiBaru.kategori === "Bensin" ||
            transaksiBaru.kategori === "Servis" ||
            transaksiBaru.kategori === "Makan")
    ) {
        pesanError.textContent =
            "Kategori Bensin, Servis, dan Makan hanya untuk pengeluaran.";
        return;
    }

    pesanError.textContent = "";

    transaksi.push(transaksiBaru);
    simpanData();
    tampilkanSemua();
    form.reset();
});

// mulai
muatData();
tampilkanSemua();