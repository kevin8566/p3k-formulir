import { prisma } from "@/lib/prisma.js";
import type { CreatePengajuanInput } from "../schemas/pengajuan.schema.js";
import { DocumentType } from "../../../generated/prisma/client.js";

export const createPengajuan = async (data: CreatePengajuanInput, files: any) => {
  // Gunakan $transaction agar jika salah satu gagal, semua dibatalkan (rollback)
  return await prisma.$transaction(async (tx) => {
    
    // 1. Insert Data Diri
    const dataDiri = await tx.dataDiri.create({
      data: {
        nama_lengkap: data.nama_lengkap,
        alamat: data.alamat,
        kode_pos: data.kode_pos,
        no_handphone: data.no_handphone,
        email: data.email,
        nik: data.nik,
        npwp: data.npwp,
        nama_ibu_kandung: data.nama_ibu_kandung,
        status_pernikahan_id: data.status_pernikahan_id,
        status_rumah_id: data.status_rumah_id,
        jenis_kelamin_id: data.jenis_kelamin_id,
      },
    });

    // 2. Insert Data Pasangan (Hanya jika diisi)
    let dataPasangan = null;
    if (data.pasangan_nama && data.pasangan_nik) {
      dataPasangan = await tx.dataPasangan.create({
        data: {
          nama: data.pasangan_nama,
          alamat: data.pasangan_alamat || "",
          nik: data.pasangan_nik,
          no_telepon: data.pasangan_no_telepon || "",
        },
      });
    }

    // 3. Insert Data Penjamin
    const dataPenjamin = await tx.dataPenjamin.create({
      data: {
        nama: data.penjamin_nama,
        alamat: data.penjamin_alamat,
        nik: data.penjamin_nik,
        no_telepon: data.penjamin_no_telepon,
        hubungan_kerabat: data.penjamin_hubungan_kerabat,
      },
    });

    // 4. Insert Data Pekerjaan
    const dataPekerjaan = await tx.dataPekerjaan.create({
      data: {
        instansi_id: data.instansi_id,
        jabatan: data.jabatan,
        nip: data.nip,
        divisi: data.divisi,
        pendapatan_tetap: data.pendapatan_tetap,
        pendapatan_tidak_tetap: data.pendapatan_tidak_tetap,
      },
    });

    // 5. Insert Core Pengajuan Kredit (Menghubungkan semua ID di atas)
    const pengajuan = await tx.dataPengajuanKredit.create({
      data: {
        tujuan_kredit: data.tujuan_kredit,
        nominal: data.nominal,
        tenor: data.tenor,
        data_diri_id: dataDiri.id,
        data_pasangan_id: dataPasangan ? dataPasangan.id : null,
        data_penjamin_id: dataPenjamin.id,
        data_pekerjaan_id: dataPekerjaan.id,
      },
    });

    // 6. Menyusun Data Berkas Pendukung dari Multer
    const berkasToInsert = [];
    
    // Looping semua file yang ditangkap oleh Multer
    for (const [key, fileArray] of Object.entries(files)) {
      const file = (fileArray as any)[0];
      berkasToInsert.push({
        pengajuan_id: pengajuan.id,
        original_name: file.originalname,
        filename: file.filename,
        filepath: `/uploads/dokumen/${file.filename}`, // Lokasi file untuk frontend
        mime_type: file.mimetype,
        document_type: key as DocumentType, // Otomatis terbaca misal: "KTP_KREDITUR"
      });
    }

    // Insert ke tabel BerkasPendukung jika ada file
    if (berkasToInsert.length > 0) {
      await tx.berkasPendukung.createMany({
        data: berkasToInsert,
      });
    }

    return pengajuan;
  });
};