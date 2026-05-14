import React, { useState, useEffect } from 'react';

/**
 * Form Tambah/Edit item Master Data
 * Props:
 *  - initialData: object | null (null = mode tambah)
 *  - onSubmit: (formValues) => void
 *  - onCancel: () => void
 */
export default function MasterDataForm({ initialData = null, onSubmit, onCancel }) {
    const [label, setLabel] = useState('');
    const [kode, setKode] = useState('');
    const [aktif, setAktif] = useState(true);
    const [errors, setErrors] = useState({});

    // Isi form jika mode edit
    useEffect(() => {
        if (initialData) {
            setLabel(initialData.label ?? '');
            setKode(initialData.kode ?? '');
            setAktif(initialData.aktif ?? true);
        } else {
            setLabel('');
            setKode('');
            setAktif(true);
        }
        setErrors({});
    }, [initialData]);

    // Auto-generate kode dari label
    const handleLabelChange = (e) => {
        const val = e.target.value;
        setLabel(val);
        if (!initialData) {
            setKode(val.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '').slice(0, 20));
        }
    };

    const validate = () => {
        const errs = {};
        if (!label.trim()) errs.label = 'Label wajib diisi.';
        if (!kode.trim()) errs.kode = 'Kode wajib diisi.';
        else if (!/^[A-Z0-9_]+$/.test(kode)) errs.kode = 'Kode hanya boleh huruf kapital, angka, dan underscore.';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        onSubmit({ label: label.trim(), kode: kode.trim().toUpperCase(), aktif });
    };

    const inputClass = (field) =>
        `w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors[field]
                ? 'border-red-400 focus:ring-red-200 bg-red-50'
                : 'border-gray-200 focus:ring-[#152042]/20 focus:border-[#152042] bg-white'
        }`;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Label */}
            <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Label / Nama Tampil <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={label}
                    onChange={handleLabelChange}
                    placeholder="Contoh: Dinas Pendidikan"
                    className={inputClass('label')}
                />
                {errors.label && <p className="mt-1 text-xs text-red-500">{errors.label}</p>}
            </div>

            {/* Kode */}
            <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Kode <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={kode}
                    onChange={(e) => setKode(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, ''))}
                    placeholder="Contoh: DIKNAS"
                    className={`${inputClass('kode')} font-mono`}
                    maxLength={20}
                />
                {errors.kode
                    ? <p className="mt-1 text-xs text-red-500">{errors.kode}</p>
                    : <p className="mt-1 text-xs text-gray-400">Otomatis dari label. Hanya huruf kapital, angka, underscore.</p>
                }
            </div>

            {/* Status Aktif */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                    <p className="text-sm font-bold text-gray-700">Status Aktif</p>
                    <p className="text-xs text-gray-400">Item yang nonaktif tidak tampil di dropdown form.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setAktif(v => !v)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                        aktif
                            ? 'bg-[#152042] focus:ring-[#152042]/40'
                            : 'bg-gray-300 focus:ring-gray-400/40'
                    }`}
                >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${aktif ? 'translate-x-5' : ''}`} />
                </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 text-sm font-bold border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 text-sm font-bold rounded-lg bg-[#152042] hover:bg-[#0B1171] text-white transition-all shadow-sm shadow-[#152042]/20 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                    {initialData ? 'Simpan Perubahan' : 'Tambah Data'}
                </button>
            </div>
        </form>
    );
}
