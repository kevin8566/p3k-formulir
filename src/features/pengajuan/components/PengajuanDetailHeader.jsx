import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PengajuanDetailHeader({ onBack }) {
    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Detail Pengajuan</h1>
        </div>
    );
}
