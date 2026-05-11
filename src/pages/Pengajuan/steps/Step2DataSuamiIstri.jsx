import React from 'react';

export default function Step2DataSuamiIstri({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-4 flex items-start gap-3">
                <div className="bg-[#FBBF24] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</div>
                <p className="text-sm text-gray-700 font-medium">Lengkapi data suami/istri Anda dengan benar.</p>
            </div>

            <div className="flex items-start gap-3 pt-2">
                <input
                    type="checkbox" name="is_belum_menikah" id="is_belum_menikah"
                    checked={formData.is_belum_menikah} onChange={handleChange}
                    className="w-5 h-5 mt-0.5 border-gray-300 rounded text-[#0B1171] focus:ring-[#0B1171] cursor-pointer"
                />
                <label htmlFor="is_belum_menikah" className="cursor-pointer">
                    <span className="text-sm font-bold text-gray-900 block">Saya belum menikah</span>
                    <span className="text-xs text-gray-500">Centang pilihan ini jika Anda belum menikah.</span>
                </label>
            </div>

            <div className={`space-y-6 pt-2 transition-opacity duration-300 ${formData.is_belum_menikah ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Nama Lengkap Pasangan</label>
                    <input
                        type="text" name="nama_pasangan" value={formData.nama_pasangan} onChange={handleChange}
                        disabled={formData.is_belum_menikah}
                        placeholder="Nama lengkap suami/istri"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:border-[#0B1171] focus:ring-1 focus:ring-[#0B1171] outline-none text-sm disabled:bg-gray-100"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">No Telepon Pasangan</label>
                        <input
                            type="text" name="telp_pasangan" value={formData.telp_pasangan} onChange={handleChange}
                            disabled={formData.is_belum_menikah}
                            placeholder="Nomor telepon" className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-sm disabled:bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#0B1171]">NIK Pasangan</label>
                        <input
                            type="number" name="nik_pasangan" value={formData.nik_pasangan} onChange={handleChange}
                            disabled={formData.is_belum_menikah}
                            placeholder="NIK 16 Digit" className="w-full border border-gray-200 rounded-lg px-4 py-3.5 outline-none text-sm disabled:bg-gray-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
