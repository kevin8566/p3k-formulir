import React from 'react';

export default function Step1DataDiri({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div>
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-lg font-bold text-[#0B1171] whitespace-nowrap">Informasi Pribadi</h3>
                    <div className="w-full h-[1px] bg-gray-200"></div>
                </div>

                <div className="space-y-6">
                    {/* Baris 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">Nama Lengkap</label>
                            <input
                                type="text" name="nama" value={formData.nama} onChange={handleChange}
                                placeholder="Masukkan nama lengkap" className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">Alamat</label>
                            <input
                                type="text" name="alamat" value={formData.alamat} onChange={handleChange}
                                placeholder="Masukkan alamat lengkap" className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Baris 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">Kode Pos</label>
                            <input type="number" name="kode_pos" value={formData.kode_pos} onChange={handleChange} placeholder="57xxx" className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-sm" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">Tempat Lahir</label>
                            <input type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} placeholder="Kota" className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-sm" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">Tanggal Lahir</label>
                            <input type="date" name="tgl_lahir" value={formData.tgl_lahir} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-gray-500 text-sm" />
                        </div>
                    </div>

                    {/* Baris 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">Jenis Kelamin</label>
                            <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-gray-500 text-sm bg-white">
                                <option value="">Pilih jenis kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">NIK</label>
                            <input type="number" name="nik" value={formData.nik} onChange={handleChange} placeholder="NIK (16 digit)" className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-sm" />
                        </div>
                        {/* REVISI: Kolom Agama diganti menjadi Nama Ibu Kandung */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#0B1171]">Nama Ibu Kandung</label>
                            <input
                                type="text"
                                name="nama_ibu"
                                value={formData.nama_ibu || ''}
                                onChange={handleChange}
                                placeholder="Nama lengkap ibu kandung"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-sm placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-base font-bold text-[#0B1171] whitespace-nowrap">Informasi Tambahan</h3>
                    <div className="flex-grow h-[1px] bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">Status Rumah</label>
                        <select name="status_rumah" value={formData.status_rumah} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-gray-500 text-sm bg-white">
                            <option value="">Pilih status</option>
                            <option value="Milik Sendiri">Milik Sendiri</option><option value="Sewa">Sewa/Kontrak</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">Status Pernikahan</label>
                        <select name="status_pernikahan" value={formData.status_pernikahan} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-gray-500 text-sm bg-white">
                            <option value="">Pilih status</option>
                            <option value="Belum Menikah">Belum Menikah</option><option value="Menikah">Menikah</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">NPWP</label>
                        <input type="text" name="npwp" value={formData.npwp} onChange={handleChange} placeholder="Nomor NPWP" className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
}
