# Dropdown Input Documentation

Dokumentasi ini menjelaskan cara menggunakan endpoint `master` dan `instansi` untuk mengisi input dropdown di frontend. Fokus pada format respons dan contoh pemetaan ke opsi dropdown `{ value, label }`.

**Base URLs:**

- Master: `http://localhost:5000/api/v1/master/:kategori`
- Instansi: `http://localhost:5000/api/v1/instansi/getAllInstansi`

## Prinsip umum pemetaan

- `value`: gunakan `id` (number) dari objek.
- `label`: gunakan field yang representatif untuk ditampilkan, mis. `nama_instansi` untuk instansi atau `kepemilikan`/`status`/`gender` untuk master kategori.

---

## 1) Contoh: Dropdown untuk `instansi`

**Endpoint:** `GET /api/v1/instansi/getAllInstansi`

**Response (Success - 200)** — array of objects:

```json
[
  {
    "id": 3,
    "nama_instansi": "Dinas Pendidikan",
    "alamat": "Jalan Contoh 1",
    "nama_kepala_dinas": "Budi",
    "nip_kepala_dinas": "123456",
    "nama_bendahara_dinas": "Siti",
    "nip_bendahara_dinas": "654321"
  },
  {
    "id": 2,
    "nama_instansi": "Dinas Kesehatan",
    "alamat": "Jalan Contoh 2",
    "nama_kepala_dinas": "Ani",
    "nip_kepala_dinas": "987654",
    "nama_bendahara_dinas": "Rina",
    "nip_bendahara_dinas": "456789"
  }
]
```

**Mapping ke dropdown (example React/JS):**

```javascript
const fetchInstansiOptions = async () => {
  const res = await fetch(
    "http://localhost:5000/api/v1/instansi/getAllInstansi",
    {
      credentials: "include",
    },
  );
  const data = await res.json();
  // data di-return langsung sebagai array instansi
  return data.map((item) => ({ value: item.id, label: item.nama_instansi }));
};
```

Gunakan hasilnya untuk <select>, React Select, atau komponen UI lain.

---

## 2) Contoh: Dropdown untuk `master` kategori (status-rumah, status-pernikahan, jenis-kelamin)

**Endpoint:** `GET /api/v1/master/:kategori`

Contoh respons untuk `status-rumah`:

```json
{
  "message": "Berhasil mengambil data",
  "data": [
    { "id": 1, "kepemilikan": "Milik Sendiri" },
    { "id": 2, "kepemilikan": "Kontrak" }
  ]
}
```

Contoh respons untuk `jenis-kelamin`:

```json
{
  "message": "Berhasil mengambil data",
  "data": [
    { "id": 1, "gender": "Laki-laki" },
    { "id": 2, "gender": "Perempuan" }
  ]
}
```

**Mapping ke dropdown (example React/JS generik):**

```javascript
const fieldMap = {
  "status-rumah": "kepemilikan",
  "status-pernikahan": "status",
  "jenis-kelamin": "gender",
};

const fetchMasterOptions = async (kategori) => {
  const res = await fetch(`http://localhost:5000/api/v1/master/${kategori}`, {
    credentials: "include",
  });
  const json = await res.json();
  const list = json.data || [];
  const labelField = fieldMap[kategori] || "nama";
  return list.map((item) => ({ value: item.id, label: item[labelField] }));
};
```

---

## Best practices

- Lakukan caching sederhana (atau state management) untuk menghindari fetch berulang saat komponen re-render.
- Tampilkan placeholder "Memuat..." saat data dropdown belum tersedia.
- Tangani skenario kosong (kosongkan opsi dan tampilkan teks "Tidak ada data").
- Jika API mengembalikan objek detail (bukan array), sesuaikan ekstraksi array sebelum mapping.

---

Jika Anda mau, saya bisa menambahkan contoh penggunaan komponen dropdown React dengan `react-select` atau memasukkan snippet untuk Vue/Angular.
