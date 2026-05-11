import React from 'react';

export default function Step7UploadBerkas({ formData, setFormData }) {
    // Fungsi untuk handling input tipe file
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    // Fungsi untuk handling input tipe checkbox
    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    // Helper untuk menampilkan nama file yang sudah dipilih
    const getFileName = (fieldName) => {
        return formData[fieldName] ? formData[fieldName].name : "Belum ada file dipilih";
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">

            {/* Kotak Instruksi */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
                <div className="bg-[#0B1171] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</div>
                <div>
                    <p className="text-sm text-[#0B1171] font-bold">Instruksi Pengunggahan:</p>
                    <ul className="text-xs text-gray-600 mt-1 list-disc ml-4 space-y-1">
                        <li>Format file yang didukung: <b>JPG, PNG, atau PDF</b>.</li>
                        <li>Ukuran maksimal per file adalah <b>2 MB</b>.</li>
                        <li>Pastikan dokumen asli dapat terbaca dengan jelas (tidak buram).</li>
                    </ul>
                </div>
            </div>

            {/* Grid Form Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 1. Upload KTP */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Upload KTP Nasabah</label>
                    <input type="file" name="file_ktp" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B1171] hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-1" />
                    <span className="text-[10px] text-gray-400 italic">{getFileName('file_ktp')}</span>
                </div>

                {/* 2. Upload KK */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Upload Kartu Keluarga (KK)</label>
                    <input type="file" name="file_kk" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B1171] hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-1" />
                    <span className="text-[10px] text-gray-400 italic">{getFileName('file_kk')}</span>
                </div>

                {/* 3. Upload KTP Pasangan (Kondisional) */}
                <div className={`flex flex-col gap-2 ${formData.is_belum_menikah ? 'opacity-40' : ''}`}>
                    <label className="text-sm font-bold text-[#0B1171]">Upload KTP Pasangan {formData.is_belum_menikah && '(Tidak Wajib)'}</label>
                    <input type="file" name="file_ktp_pasangan" onChange={handleFileChange} disabled={formData.is_belum_menikah} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B1171] hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-1 disabled:bg-gray-50 disabled:cursor-not-allowed" />
                    <span className="text-[10px] text-gray-400 italic">{getFileName('file_ktp_pasangan')}</span>
                </div>

                {/* 4. Upload Surat Nikah (Kondisional) */}
                <div className={`flex flex-col gap-2 ${formData.is_belum_menikah ? 'opacity-40' : ''}`}>
                    <label className="text-sm font-bold text-[#0B1171]">Upload Surat Nikah {formData.is_belum_menikah && '(Tidak Wajib)'}</label>
                    <input type="file" name="file_surat_nikah" onChange={handleFileChange} disabled={formData.is_belum_menikah} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B1171] hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-1 disabled:bg-gray-50 disabled:cursor-not-allowed" />
                    <span className="text-[10px] text-gray-400 italic">{getFileName('file_surat_nikah')}</span>
                </div>

                {/* 5. Upload Ijazah */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Upload Ijazah Terakhir</label>
                    <input type="file" name="file_ijazah" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B1171] hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-1" />
                    <span className="text-[10px] text-gray-400 italic">{getFileName('file_ijazah')}</span>
                </div>

                {/* 6. Upload SK */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Upload SK (Surat Keputusan)</label>
                    <input type="file" name="file_sk" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B1171] hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-1" />
                    <span className="text-[10px] text-gray-400 italic">{getFileName('file_sk')}</span>
                </div>

                {/* 7. Upload NPWP */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#0B1171]">Upload Kartu NPWP</label>
                    <input type="file" name="file_npwp" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0B1171] hover:file:bg-blue-100 cursor-pointer border border-gray-200 rounded-lg p-1" />
                    <span className="text-[10px] text-gray-400 italic">{getFileName('file_npwp')}</span>
                </div>
            </div>

            {/* =======================================================
                SECTION PERNYATAAN & PERSETUJUAN (REVISI FINAL)
                ======================================================= */}
            <div className="pt-8 border-t border-gray-200 mt-8">
                <h3 className="text-lg font-bold text-[#0B1171] mb-4">Pernyataan & Persetujuan</h3>

                {/* Kotak Teks Scrollable */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 mb-5 h-64 overflow-y-auto text-sm text-gray-700 leading-relaxed shadow-inner">
                    <p className="mb-4">
                        Memuat syarat dan ketentuan pengajuan kredit online oleh debitur dalam melakukan pengisian data pribadinya. calon debitur telah <b>“Setuju dalam mengajukan Pinjaman”</b> yang menyatakan hal-hal sebagai berikut :
                    </p>
                    <ol className="list-decimal pl-5 space-y-3">
                        <li>Kebenaran data dan informasi yang saya berikan dalam pengajuan ini adalah sesuai keadaaan yang sebenar-benarnya.</li>
                        <li>Saya menyetujui bahwa PT BPR BANK KARANGANYAR (PERSERODA) yang selanjutnya disebut Bank, berwenang untuk:
                            <ol className="list-[lower-alpha] pl-5 mt-2 space-y-2">
                                <li>Memeriksa kebenaran data yang saya sampaikan dalam pengajuan ini</li>
                                <li>Memperoleh keterangan dan referensi dari sumber manapun dengan cara yang dianggap sah oleh Bank</li>
                                <li>Menyetujui atau menolak pengajuan pinjaman saya berdasarkan hasil analisa Bank</li>
                                <li>Tidak mengembalikan seluruh dokumen yang telah saya serahkan kepada Bank</li>
                                <li>Memberikan secara terbatas dan/atau tidak terbatas data yang telah saya sampaikan dalam pengajuan ini kepada pihak ketiga dalam rangka kepentingan pemrosesan pengajuan pinjaman.</li>
                                <li>Menggunakan data dan atau informasi pribadi saya untuk proses pemeriksaan SLIK</li>
                            </ol>
                        </li>
                        <li>Saya memahami dan mengerti bahwa Bank tidak berkewajiban untuk memberikan fasilitas kredit kepada saya hingga saya memenuhi semua persyaratan yang berlaku pada Bank dan telah menandatangani dokumen yang diperlukan Bank dalam pemberian kredit.</li>
                        <li>Apabila ternyata data dan informasi, serta pernyataan yang saya berikan/buat tidak sesuai dengan keadaan yang sebenarnya, maka segala risiko dan konsekuensi yang diakibatkannya menjadi sepenuhnya tanggung jawab saya.</li>
                    </ol>
                </div>

                {/* Single Checklist */}
                <div
                    onClick={() => setFormData({...formData, setuju_pernyataan: !formData.setuju_pernyataan})}
                    className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-200 flex items-start gap-4 transition-colors hover:bg-gray-100 cursor-pointer shadow-sm"
                >
                    <input
                        type="checkbox"
                        id="setuju_pernyataan"
                        name="setuju_pernyataan"
                        checked={formData.setuju_pernyataan || false}
                        onChange={handleChange}
                        onClick={(e) => e.stopPropagation()} // Mencegah klik ganda saat mengeklik input langsung
                        className="w-5 h-5 shrink-0 mt-0.5 border-gray-300 rounded text-[#0B1171] focus:ring-[#0B1171] cursor-pointer"
                    />
                    <label htmlFor="setuju_pernyataan" className="cursor-pointer text-sm font-bold text-[#0B1171] leading-relaxed select-none">
                        Saya telah membaca, memahami, dan menyetujui seluruh syarat dan pernyataan pengajuan pinjaman di atas.
                    </label>
                </div>
            </div>

        </div>
    );
}
