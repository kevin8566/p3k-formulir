import React from "react";

export default function Step4DataPegawai({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCurrencyChange = (e) => {
        const { name, value } = e.target;
        // Menghapus semua karakter selain angka (0-9)
        const rawValue = value.replace(/\D/g, "");
        setFormData({ ...formData, [name]: rawValue });
    };

    // Fungsi untuk memformat angka murni menjadi format ribuan dengan titik
    const formatRupiah = (angka) => {
        if (!angka) return "";
        // Menggunakan standar format Indonesia (titik sebagai pemisah ribuan)
        return new Intl.NumberFormat("id-ID").format(angka);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Teks Deskripsi */}
            <p className="text-sm text-gray-600 mb-6">
                Lengkapi informasi kepegawaian Anda saat ini dengan akurat untuk
                keperluan verifikasi instansi.
            </p>

            {/* Form Inputs */}
            <div className="space-y-6">
                {/* Baris 1: Instansi & Jabatan (Grid 2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Instansi
                        </label>
                        <select
                            name="instansi"
                            value={formData.instansi || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-500 text-sm bg-white transition-all"
                        >
                            <option value="">
                                Pilih instansi tempat bekerja
                            </option>
                            <option value="Pemerintah Kabupaten Karanganyar">
                                Pemerintah Kabupaten Karanganyar
                            </option>
                            <option value="Dinas Pendidikan dan Kebudayaan">
                                Dinas Pendidikan dan Kebudayaan
                            </option>
                            <option value="Dinas Kesehatan">
                                Dinas Kesehatan
                            </option>
                            <option value="Kementerian Agama">
                                Kementerian Agama
                            </option>
                            <option value="Instansi Lainnya">
                                Instansi Lainnya
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Jabatan
                        </label>
                        <input
                            type="text"
                            name="jabatan"
                            value={formData.jabatan || ""}
                            onChange={handleChange}
                            placeholder="Contoh: Guru Ahli Pertama"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>

                {/* Baris 2: NIP & Pekerjaan(Grid 2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            NIP (18 Digit)
                        </label>
                        <input
                            type="text"
                            name="nip"
                            value={formData.nip || ""}
                            onChange={handleChange}
                            placeholder="Masukkan NIP 18 digit"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Unit Kerja (Divisi / Sekolah / Instansi)
                        </label>
                        <input
                            type="text"
                            name="unit_kerja"
                            value={formData.unit_kerja || ""}
                            onChange={handleChange}
                            placeholder="Contoh: SMP Negeri 1 Karanganyar"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Teks Deskripsi Informasi Pendapatan */}
                <div className="bg-[#F8FAFC] border border-blue-100 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700 font-medium">
                        Masukkan informasi pendapatan bulanan Anda secara
                        akurat. Data ini digunakan untuk menentukan kelayakan
                        dan limit plafon kredit pengajuan Anda.
                    </p>
                </div>

                {/* Form Inputs (Grid 2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                    {/* Kolom 1: Pendapatan Tetap */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Pendapatan Tetap per Bulan
                        </label>
                        <span className="text-xs text-gray-500 -mt-1 mb-1">
                            Gaji pokok (termasuk tunjangan tetap PPPK)
                        </span>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-600 font-bold">
                                Rp
                            </span>
                            <input
                                type="text"
                                name="pendapatan_tetap"
                                // Tampilan visual format ribuan
                                value={formatRupiah(formData.pendapatan_tetap)}
                                // Logika simpan murni angka
                                onChange={handleCurrencyChange}
                                placeholder="Contoh: 4.500.000"
                                className="w-full border border-gray-200 rounded-lg pl-12 pr-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm bg-white"
                            />
                        </div>
                    </div>

                    {/* Kolom 2: Pendapatan Tidak Tetap */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">
                            Pendapatan Tidak Tetap per Bulan
                        </label>
                        <span className="text-xs text-gray-500 -mt-1 mb-1">
                            Honor tambahan, lembur, atau usaha sampingan
                        </span>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-600 font-bold">
                                Rp
                            </span>
                            <input
                                type="text"
                                name="pendapatan_tidak_tetap"
                                // Tampilan visual format ribuan
                                value={formatRupiah(
                                    formData.pendapatan_tidak_tetap,
                                )}
                                // Logika simpan murni angka
                                onChange={handleCurrencyChange}
                                placeholder="Contoh: 1.000.000"
                                className="w-full border border-gray-200 rounded-lg pl-12 pr-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
