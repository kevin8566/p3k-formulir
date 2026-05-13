import React from 'react';

export default function Step4DataPegawai({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Teks Deskripsi */}
            <p className="text-sm text-gray-600 mb-6">
                Lengkapi informasi kepegawaian Anda saat ini dengan akurat untuk keperluan verifikasi instansi.
            </p>

            {/* Form Inputs */}
            <div className="space-y-6">

                {/* Baris 1: Instansi & Jabatan (Grid 2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">Instansi</label>
                        <select
                            name="instansi"
                            value={formData.instansi || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-gray-500 text-sm bg-white transition-all"
                        >
                            <option value="">Pilih instansi tempat bekerja</option>
                            <option value="Pemerintah Kabupaten Karanganyar">Pemerintah Kabupaten Karanganyar</option>
                            <option value="Dinas Pendidikan dan Kebudayaan">Dinas Pendidikan dan Kebudayaan</option>
                            <option value="Dinas Kesehatan">Dinas Kesehatan</option>
                            <option value="Kementerian Agama">Kementerian Agama</option>
                            <option value="Instansi Lainnya">Instansi Lainnya</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">Jabatan</label>
                        <input
                            type="text"
                            name="jabatan"
                            value={formData.jabatan || ''}
                            onChange={handleChange}
                            placeholder="Contoh: Guru Ahli Pertama"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>

                {/* Baris 2: NIP & Pekerjaan(Grid 2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">NIP (18 Digit)</label>
                        <input
                            type="text"
                            name="nip"
                            value={formData.nip || ''}
                            onChange={handleChange}
                            placeholder="Masukkan NIP 18 digit"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">Pekerjaan</label>
                        <input
                            type="text"
                            name="unit_kerja"
                            value={formData.unit_kerja || ''}
                            onChange={handleChange}
                            placeholder="Contoh: SMP Negeri 1 Karanganyar"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
