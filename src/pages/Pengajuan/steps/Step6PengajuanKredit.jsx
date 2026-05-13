import React from 'react';

export default function Step6PengajuanKredit({ formData, setFormData }) {
    // Handler umum untuk input selain nominal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler khusus untuk input nominal (Hanya simpan angka murni ke state)
    const handleNominalChange = (e) => {
        // Menghapus semua huruf/karakter selain angka (0-9)
        const rawValue = e.target.value.replace(/\D/g, '');
        setFormData({ ...formData, nominal_kredit: rawValue });
    };

    // Fungsi untuk memformat angka murni menjadi format ribuan dengan titik
    const formatRupiah = (angka) => {
        if (!angka) return '';
        // Menggunakan standar format Indonesia (titik sebagai pemisah ribuan)
        return new Intl.NumberFormat('id-ID').format(angka);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Teks Deskripsi */}
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-4 mb-6 flex items-start gap-3">
                <div className="bg-[#FBBF24] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</div>
                <p className="text-sm text-gray-700 font-medium">
                    Pastikan nominal pengajuan dan jangka waktu (tenor) yang Anda pilih sudah disesuaikan dengan rencana dan kemampuan finansial Anda.
                </p>
            </div>

            {/* Form Inputs (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">

                {/* Kolom 1: Nominal Kredit (Dilengkapi Auto-Format Ribuan) */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Nominal Pengajuan</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-600 font-bold">Rp</span>
                        <input
                            type="text" // Menggunakan text agar titik bisa masuk ke tampilan
                            name="nominal_kredit"
                            // Tampilan Visual: Diubah menjadi ada titiknya
                            value={formatRupiah(formData.nominal_kredit)}
                            // Logika: Memasukkan angka asli tanpa titik ke database
                            onChange={handleNominalChange}
                            placeholder="Contoh: 50.000.000"
                            className="w-full border border-gray-200 rounded-lg pl-12 pr-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>

                {/* Kolom 2: Tenor (Bulan) */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Jangka Waktu (Tenor)</label>
                    <select
                        name="tenor_kredit"
                        value={formData.tenor_kredit || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-700 text-sm bg-white transition-all shadow-sm"
                    >
                        <option value="" disabled>Pilih tenor pinjaman</option>
                        <option value="12">12 Bulan (1 Tahun)</option>
                        <option value="24">24 Bulan (2 Tahun)</option>
                        <option value="36">36 Bulan (3 Tahun)</option>
                        <option value="48">48 Bulan (4 Tahun)</option>
                        <option value="60">60 Bulan (5 Tahun)</option>
                        <option value="72">72 Bulan (6 Tahun)</option>
                    </select>
                </div>

                {/* REVISI: Kolom 3: Tujuan Penggunaan Kredit (Full Width / md:col-span-2) */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-[#0B1171]">Tujuan Penggunaan Kredit</label>
                    <textarea
                        name="penggunaan_kredit"
                        value={formData.penggunaan_kredit || ''}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Contoh: Renovasi rumah, biaya pendidikan anak, modal usaha, dll."
                        className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm resize-none"
                    ></textarea>
                </div>

            </div>
        </div>
    );
}
