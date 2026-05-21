import { Request, Response } from "express";
import * as pengajuanService from "../services/pengajuan.service.js";
import { createPengajuanSchema } from "../schemas/pengajuan.schema.js";

export const createPengajuanController = async (req: Request, res: Response) => {
  try {
    // 1. Validasi Input Teks menggunakan Zod
    const validatedData = createPengajuanSchema.parse(req.body);
    const files = (req as any).files;
    // 2. Pastikan file ada (minimal beberapa file wajib harusnya ada)
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "Berkas pendukung wajib diupload." });
    }

    // 3. Panggil Service
    const pengajuan = await pengajuanService.createPengajuan(validatedData, files);

    res.status(201).json({
      message: "Formulir pengajuan kredit berhasil dikirim.",
      data: pengajuan,
    });
    
  } catch (error: any) {
    if (error.name === "ZodError") {
      // Tangkap error validasi form
      return res.status(400).json({ error: JSON.parse(error.message) });
    }
    console.error("Gagal membuat pengajuan:", error);
    res.status(500).json({ error: error.message || "Terjadi kesalahan pada server." });
  }
};