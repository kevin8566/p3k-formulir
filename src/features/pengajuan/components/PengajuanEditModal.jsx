import React, { useState, useEffect } from 'react';

const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '' }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder || label}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC800] focus:border-[#FFC800] transition-all duration-200 placeholder-gray-400"
        />
    </div>
);

const SectionDivider = ({ title }) => (
    <div className="col-span-full flex items-center gap-3 pt-4">
        <div className="w-1.5 h-5 bg-[#FFC800] rounded-full shrink-0"></div>
        <h3 className="font-bold text-gray-800 text-base">{title}</h3>
        <div className="flex-1 h-px bg-gray-100"></div>
    </div>
);

export default function PengajuanEditModal({ pengajuan, onSave, onClose }) {
    const [form, setForm] = useState({});

    useEffect(() => {
        if (pengajuan) setForm({ ...pengajuan });
    }, [pengajuan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    if (!pengajuan) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-8 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl animate-slide-up my-auto">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-[#0B1121] to-gray-900 rounded-t-3xl p-6 flex items-center justify-between border-b-4 border-[#FFC800]">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FFC800]/20 p-2 rounded-xl border border-[#FFC800]/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg">Edit Data Pengajuan</h2>
                            <p className="text-gray-400 text-sm">{pengajuan.id}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-xl p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                            <SectionDivider title="Data Pribadi Pemohon" />
                            <InputField label="Nama Lengkap" name="name" value={form.name} onChange={handleChange} />
                            <InputField label="Nomor Handphone" name="phone" value={form.phone} onChange={handleChange} />
                            <InputField label="No. KTP" name="no_ktp" value={form.no_ktp} onChange={handleChange} />
                            <InputField label="Tempat Tinggal" name="alamat" value={form.alamat} onChange={handleChange} />
                            <InputField label="Kode Pos" name="kodepos" value={form.kodepos} onChange={handleChange} />
                            <InputField label="Status Rumah" name="status_rumah" value={form.status_rumah} onChange={handleChange} />
                            <InputField label="Status Pernikahan" name="status_pernikahan" value={form.status_pernikahan} onChange={handleChange} />
                            <InputField label="Jenis Kelamin" name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} />
                            <InputField label="NPWP" name="npwp" value={form.npwp} onChange={handleChange} />
                            <InputField label="Pekerjaan" name="pekerjaan" value={form.pekerjaan} onChange={handleChange} />
                            <InputField label="Nama Gadis Ibu Kandung" name="nama_ibu" value={form.nama_ibu} onChange={handleChange} />

                            <SectionDivider title="Data Instansi / Pekerjaan" />
                            <InputField label="Nama Instansi" name="instansi" value={form.instansi} onChange={handleChange} />
                            <InputField label="Jabatan" name="jabatan" value={form.jabatan} onChange={handleChange} />
                            <InputField label="Alamat Instansi" name="alamat_instansi" value={form.alamat_instansi} onChange={handleChange} />

                            <SectionDivider title="Data Kredit" />
                            <InputField label="Jumlah Kredit (Rp)" name="nominal" type="number" value={form.nominal} onChange={handleChange} />
                            <InputField label="Jangka Waktu (Bulan)" name="tenor" type="number" value={form.tenor} onChange={handleChange} />
                            <InputField label="Penghasilan Tetap (Rp)" name="penghasilan_tetap" type="number" value={form.penghasilan_tetap} onChange={handleChange} />
                            <InputField label="Penghasilan Tambahan (Rp)" name="penghasilan_tambahan" type="number" value={form.penghasilan_tambahan} onChange={handleChange} />
                            <InputField label="Kredit Digunakan Untuk" name="tujuan_kredit" value={form.tujuan_kredit} onChange={handleChange} />

                            <SectionDivider title="Data Jaminan" />
                            <InputField label="Jaminan Utama" name="jaminan_utama" value={form.jaminan_utama} onChange={handleChange} />
                            <InputField label="Atas Nama (Jaminan Utama)" name="jaminan_utama_atas_nama" value={form.jaminan_utama_atas_nama} onChange={handleChange} />
                            <InputField label="Jaminan Tambahan" name="jaminan_tambahan" value={form.jaminan_tambahan} onChange={handleChange} />
                            <InputField label="Atas Nama (Jaminan Tambahan)" name="jaminan_tambahan_atas_nama" value={form.jaminan_tambahan_atas_nama} onChange={handleChange} />
                            <InputField label="Nama Orang Terdekat" name="nama_kerabat" value={form.nama_kerabat} onChange={handleChange} />

                            <SectionDivider title="Identitas Pasangan Debitur" />
                            <InputField label="Nama Pasangan" name="nama_pasangan" value={form.nama_pasangan} onChange={handleChange} />
                            <InputField label="No. KTP Pasangan" name="no_ktp_pasangan" value={form.no_ktp_pasangan} onChange={handleChange} />
                            <InputField label="Alamat Pasangan" name="alamat_pasangan" value={form.alamat_pasangan} onChange={handleChange} />

                            <SectionDivider title="Penjamin" />
                            <InputField label="Nama Penjamin" name="nama_penjamin" value={form.nama_penjamin} onChange={handleChange} />
                            <InputField label="No. KTP Penjamin" name="no_ktp_penjamin" value={form.no_ktp_penjamin} onChange={handleChange} />
                            <InputField label="Alamat Penjamin" name="alamat_penjamin" value={form.alamat_penjamin} onChange={handleChange} />

                            <SectionDivider title="Pasangan Penjamin" />
                            <InputField label="Nama Pasangan Penjamin" name="nama_pasangan_penjamin" value={form.nama_pasangan_penjamin} onChange={handleChange} />
                            <InputField label="No. KTP Pasangan Penjamin" name="no_ktp_pasangan_penjamin" value={form.no_ktp_pasangan_penjamin} onChange={handleChange} />
                            <InputField label="Alamat Pasangan Penjamin" name="alamat_pasangan_penjamin" value={form.alamat_pasangan_penjamin} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#0B1121] bg-[#FFC800] hover:bg-yellow-400 shadow-lg shadow-[#FFC800]/30 transition-all duration-200 active:scale-95 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
