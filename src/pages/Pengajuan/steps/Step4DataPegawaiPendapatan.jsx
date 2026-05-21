import React from "react";
import { useInstansiOptions } from "../../../hooks/useOptions";

export default function Step4DataPegawaiPendapatan({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { options: instansiOptions, loading: instansiLoading } =
        useInstansiOptions();

    const handleSelect = (idField, labelField, options) => (e) => {
        const val = e.target.value;
        const opt = (options || []).find(
            (o) => String(o.value) === String(val),
        );
        setFormData({
            ...formData,
            [idField]: opt?.value || "",
            [labelField]: opt?.label || "",
        });
    };

    // Handler khusus untuk input nominal mata uang (Hanya simpan angka murni ke state)
    const handleCurrencyChange = (e) => {
        const { name, value } = e.target;
        const rawValue = value.replace(/\D/g, "");
        setFormData({ ...formData, [name]: rawValue });
    };

    // Fungsi untuk memformat angka murni menjadi format ribuan dengan titik
    const formatRupiah = (angka) => {
        if (!angka) return "";
        return new Intl.NumberFormat("id-ID").format(angka);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* ==============================================
                BAGIAN 1: INFORMASI KEPEGAWAIAN
                ============================================== */}
            <div>
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-lg font-bold text-[#0B1171] whitespace-nowrap">
                        Informasi Kepegawaian
                    </h3>
                    <div className="w-full h-[1px] bg-gray-200"></div>
                </div>

                <div className="space-y-6">
                    {/* Baris 1: Instansi & Jabatan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">
                                Instansi
                            </label>
                            <select
                                name="instansi_id"
                                value={formData.instansi_id || ""}
                                onChange={handleSelect(
                                    "instansi_id",
                                    "instansi",
                                    instansiOptions,
                                )}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-500 text-sm bg-white transition-all"
                            >
                                <option value="">
                                    {instansiLoading
                                        ? "Memuat..."
                                        : "Pilih instansi tempat bekerja"}
                                </option>
                                {(instansiOptions || []).map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
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

                    {/* Baris 2: NIP & Pekerjaan */}
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
                                Pekerjaan
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
            </div>

            {/* ==============================================
                BAGIAN 2: INFORMASI PENDAPATAN
                ============================================== */}
            <div className="pt-2">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-lg font-bold text-[#0B1171] whitespace-nowrap">
                        Informasi Pendapatan
                    </h3>
                    <div className="flex-grow h-[1px] bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pendapatan Tetap */}
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
                                value={formatRupiah(formData.pendapatan_tetap)}
                                onChange={handleCurrencyChange}
                                placeholder="Contoh: 4.500.000"
                                className="w-full border border-gray-200 rounded-lg pl-12 pr-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm bg-white"
                            />
                        </div>
                    </div>

                    {/* Pendapatan Tidak Tetap */}
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
                                value={formatRupiah(
                                    formData.pendapatan_tidak_tetap,
                                )}
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
