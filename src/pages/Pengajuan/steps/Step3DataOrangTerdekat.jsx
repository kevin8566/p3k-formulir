import React from "react";

export default function Step3DataOrangTerdekat({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Teks Deskripsi (Sesuai Mockup) */}
            <p className="text-sm text-gray-600 mb-6">
                Masukkan data orang terdekat yang dapat dihubungi sebagai
                referensi.
            </p>

            {/* Form Inputs */}
            <div className="space-y-6">
                {/* Baris 1: Nama Lengkap (Full Width) */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        name="nama_kerabat"
                        value={formData.nama_kerabat || ""}
                        onChange={handleChange}
                        required
                        placeholder=""
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nomor Induk Kependudukan (NIK){" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="nik_kerabat"
                        value={formData.nik_kerabat || ""}
                        onChange={handleChange}
                        required
                        placeholder=""
                        inputMode="numeric"
                        maxLength={16}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] outline-none transition-all"
                    />
                </div>

                {/* Baris 2: Alamat (Full Width, Textarea) */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">
                        Alamat
                    </label>
                    <textarea
                        name="alamat_kerabat"
                        value={formData.alamat_kerabat || ""}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Masukkan alamat lengkap"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm resize-none"
                    ></textarea>
                </div>

                {/* Baris 3: Hubungan & No Telepon (Grid 2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* REVISI: Mengubah dropdown (select) menjadi input text manual */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Hubungan
                        </label>
                        <input
                            type="text"
                            name="hubungan_kerabat"
                            value={formData.hubungan_kerabat || ""}
                            onChange={handleChange}
                            placeholder="Contoh: Orang Tua, Kakak Kandung"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            No Telepon
                        </label>
                        <input
                            type="text"
                            name="telp_kerabat"
                            value={formData.telp_kerabat || ""}
                            onChange={handleChange}
                            placeholder="Masukkan nomor telepon"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
