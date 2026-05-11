import React from 'react';

export default function Step5Pendapatan({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Teks Deskripsi Informasi Pendapatan */}
            <div className="bg-[#F8FAFC] border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 font-medium">
                    Masukkan informasi pendapatan bulanan Anda secara akurat. Data ini digunakan untuk menentukan kelayakan dan limit plafon kredit pengajuan Anda.
                </p>
            </div>

            {/* Form Inputs (Grid 2 Kolom) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">

                {/* Kolom 1: Pendapatan Tetap */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Pendapatan Tetap per Bulan</label>
                    <span className="text-xs text-gray-500 -mt-1 mb-1">Gaji pokok (termasuk tunjangan tetap PPPK)</span>
                    <select
                        name="pendapatan_tetap"
                        value={formData.pendapatan_tetap || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-700 text-sm bg-white transition-all shadow-sm"
                    >
                        <option value="" disabled>Pilih estimasi pendapatan tetap</option>
                        <option value="< Rp3.000.000">&lt; Rp 3.000.000</option>
                        <option value="Rp3.000.000 - Rp4.000.000">Rp 3.000.000 - Rp 4.000.000</option>
                        <option value="Rp4.000.000 - Rp5.000.000">Rp 4.000.000 - Rp 5.000.000</option>
                        <option value="Rp5.000.000 - Rp6.000.000">Rp 5.000.000 - Rp 6.000.000</option>
                        <option value="> Rp6.000.000">&gt; Rp 6.000.000</option>
                    </select>
                </div>

                {/* Kolom 2: Pendapatan Tidak Tetap */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Pendapatan Tidak Tetap per Bulan</label>
                    <span className="text-xs text-gray-500 -mt-1 mb-1">Honor tambahan, lembur, atau usaha sampingan</span>
                    <select
                        name="pendapatan_tidak_tetap"
                        value={formData.pendapatan_tidak_tetap || ''}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-700 text-sm bg-white transition-all shadow-sm"
                    >
                        <option value="" disabled>Pilih estimasi pendapatan tidak tetap</option>
                        <option value="< Rp500.000">&lt; Rp 500.000</option>
                        <option value="Rp500.000 - Rp1.000.000">Rp 500.000 - Rp 1.000.000</option>
                        <option value="Rp1.000.000 - Rp1.500.000">Rp 1.000.000 - Rp 1.500.000</option>
                        <option value="Rp1.500.000 - Rp2.000.000">Rp 1.500.000 - Rp 2.000.000</option>
                        <option value="> Rp2.000.000">&gt; Rp 2.000.000</option>
                    </select>
                </div>

            </div>
        </div>
    );
}
