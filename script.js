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

    transaksi.push(transaksiBaru);
    simpanData();
    tampilkanSemua();
    form.reset();
});

// mulai
muatData();
tampilkanSemua();
