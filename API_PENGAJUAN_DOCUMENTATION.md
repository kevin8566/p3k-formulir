# Dokumentasi API Pengajuan

## Ringkasan

API ini digunakan oleh frontend untuk membuat pengajuan kredit. Endpoint ini menerima data formulir dan lampiran berkas pendukung dalam format multipart/form-data.

## Base URL

```
http://localhost:5000/api/v1/pengajuan
```

## Endpoint Create Pengajuan

- **Method:** `POST`
- **URL:** `/createPengajuan`
- **Tipe Konten:** `multipart/form-data`
- **Authentication:** Tidak diperlukan (public API)

### Field Form Data

#### Data Diri

- `nama_lengkap` (string, required) - minimal 3 karakter
- `alamat` (string, required) - minimal 5 karakter
- `kode_pos` (string, required) - minimal 4 karakter
- `no_handphone` (string, required) - minimal 10 karakter
- `email` (string, required) - format email valid
- `nik` (string, required) - harus 16 digit
- `npwp` (string, optional)
- `nama_ibu_kandung` (string, required) - minimal 3 karakter
- `status_pernikahan_id` (number, required)
- `status_rumah_id` (number, required)
- `jenis_kelamin_id` (number, required)

#### Data Pasangan (Opsional)

- `pasangan_nama` (string, optional)
- `pasangan_alamat` (string, optional)
- `pasangan_nik` (string, optional)
- `pasangan_no_telepon` (string, optional)

#### Data Penjamin

- `penjamin_nama` (string, required) - minimal 3 karakter
- `penjamin_alamat` (string, required) - minimal 5 karakter
- `penjamin_nik` (string, required) - harus 16 digit
- `penjamin_no_telepon` (string, required) - minimal 10 karakter
- `penjamin_hubungan_kerabat` (string, required) - minimal 2 karakter

#### Data Pekerjaan

- `instansi_id` (number, required)
- `jabatan` (string, required) - minimal 2 karakter
- `nip` (string, required) - minimal 5 karakter
- `divisi` (string, optional)
- `pendapatan_tetap` (number, required)
- `pendapatan_tidak_tetap` (number, optional, default 0)

#### Data Pengajuan

- `tujuan_kredit` (string, required) - minimal 3 karakter
- `nominal` (number, required)
- `tenor` (number, required)

### Field Lampiran File

Gunakan `multipart/form-data` dengan field file berikut:

- `KTP_KREDITUR` (file, required)
- `KTP_PASANGAN` (file, optional)
- `KK` (file, required)
- `SURAT_NIKAH` (file, optional)
- `IJASAH_TERAKHIR` (file, optional)
- `SK` (file, optional)
- `SURAT_NPWP` (file, optional)

> Catatan: format file yang didukung adalah `jpg`, `jpeg`, `png`, dan `pdf`, dengan ukuran maksimal 5 MB per file.

## Contoh Request Fetch (Frontend)

```javascript
const submitPengajuan = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/pengajuan/createPengajuan",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Gagal mengirim pengajuan");
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Contoh penggunaan
const formData = new FormData();
formData.append("nama_lengkap", "Budi Santoso");
formData.append("alamat", "Jl. Merpati No. 10");
formData.append("kode_pos", "12345");
formData.append("no_handphone", "081234567890");
formData.append("email", "budi@example.com");
formData.append("nik", "1234567890123456");
formData.append("nama_ibu_kandung", "Siti Aminah");
formData.append("status_pernikahan_id", "1");
formData.append("status_rumah_id", "2");
formData.append("jenis_kelamin_id", "1");
formData.append("penjamin_nama", "Anton");
formData.append("penjamin_alamat", "Jl. Mawar 3");
formData.append("penjamin_nik", "6543210987654321");
formData.append("penjamin_no_telepon", "081298765432");
formData.append("penjamin_hubungan_kerabat", "Saudara");
formData.append("instansi_id", "5");
formData.append("jabatan", "Manager");
formData.append("nip", "1987654321");
formData.append("pendapatan_tetap", "10000000");
formData.append("pendapatan_tidak_tetap", "2000000");
formData.append("tujuan_kredit", "Modal usaha");
formData.append("nominal", "50000000");
formData.append("tenor", "24");

formData.append("KTP_KREDITUR", fileKtpKreditur);
formData.append("KK", fileKk);
formData.append("KTP_PASANGAN", fileKtpPasangan);
formData.append("SURAT_NIKAH", fileSuratNikah);
formData.append("IJASAH_TERAKHIR", fileIjazah);
formData.append("SK", fileSk);
formData.append("SURAT_NPWP", fileNpwp);

const result = await submitPengajuan(formData);
console.log(result);
```

## Contoh Response

### Success 201

```json
{
  "message": "Formulir pengajuan kredit berhasil dikirim.",
  "data": {
    "id": 1,
    "nama_lengkap": "Budi Santoso",
    "alamat": "Jl. Merpati No. 10",
    "nominal": 50000000,
    "tenor": 24,
    "status": "pending",
    "createdAt": "2026-05-18T08:00:00.000Z"
  }
}
```

### Error 400

```json
{
  "error": "Berkas pendukung wajib diupload."
}
```

### Error 400 (Validasi)

```json
{
  "error": [
    {
      "code": "too_small",
      "minimum": 3,
      "type": "string",
      "path": ["nama_lengkap"],
      "message": "String must contain at least 3 character(s)"
    }
  ]
}
```

### Error 500

```json
{
  "error": "Terjadi kesalahan pada server."
}
```
