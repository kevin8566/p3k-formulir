import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PengajuanDetailHeader from '../components/PengajuanDetailHeader';
import PengajuanDocument from '../components/PengajuanDocument';
import PengajuanEditModal from '../components/PengajuanEditModal';
import PengajuanDokumen from '../components/PengajuanDokumen';
import PengajuanNotFound from '../components/PengajuanNotFound';
import { usePengajuanStore } from '../store/pengajuanStore';

export default function PengajuanDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pengajuan, updatePengajuan } = usePengajuanStore();
    const [showEdit, setShowEdit] = useState(false);

    const current = pengajuan.find((item) => item.id === id);
    const handleBack = () => navigate('/admin/pengajuan');

    const handleSave = (data) => {
        updatePengajuan(id, data);
        setShowEdit(false);
    };

    if (!current) {
        return <PengajuanNotFound onBack={handleBack} />;
    }

    return (
        <div className="w-full mx-auto space-y-8 pb-12">
            {/* Header + Edit Button */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <PengajuanDetailHeader onBack={handleBack} />
                </div>
                <button
                    onClick={() => setShowEdit(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#0B1121] bg-[#FFC800] hover:bg-yellow-400 shadow-lg shadow-[#FFC800]/30 transition-all duration-200 active:scale-95 shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Data
                </button>
            </div>

            {/* Main Document */}
            <PengajuanDocument pengajuan={current} />

            {/* Dokumen Pendukung */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <PengajuanDokumen />
            </div>

            {/* Edit Modal */}
            {showEdit && (
                <PengajuanEditModal
                    pengajuan={current}
                    onSave={handleSave}
                    onClose={() => setShowEdit(false)}
                />
            )}
        </div>
    );
}
