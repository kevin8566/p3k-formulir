// src/features/pengajuan/pages/PengajuanDetailPage.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const current = pengajuan.find((item) => item.id === id);
    const handleBack = () => navigate('/admin/pengajuan');

    const handleSave = (data) => {
        updatePengajuan(id, data);
        setShowEdit(false);
    };

    // ================== FUNGSI UNDUH PDF ==================
    const handleDownloadPDF = async () => {
        if (!current) {
            alert('Data pengajuan tidak ditemukan');
            return;
        }

        setIsGeneratingPDF(true);

        try {
            // Delay untuk memastikan semua animasi selesai
            await new Promise(resolve => setTimeout(resolve, 500));

            const element = document.getElementById('pengajuan-document-content');
            
            if (!element) {
                throw new Error('Elemen tidak ditemukan');
            }

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#ffffff',
                scrollY: -window.scrollY, // penting untuk capture full content
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
            
            pdf.save(`Pengajuan_${(current.name || current.nama || 'Kreditur').replace(/\s+/g, '_')}_${current.id || id}.pdf`);

            alert('PDF berhasil dibuat!');
        } catch (error) {
            console.error('PDF Error:', error);
            alert('Gagal membuat PDF. Coba refresh halaman terlebih dahulu.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    if (!current) {
        return <PengajuanNotFound onBack={handleBack} />;
    }

    return (
        <div className="w-full mx-auto space-y-8 pb-12">
            {/* Header + Tombol Aksi */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <PengajuanDetailHeader onBack={handleBack} />
                </div>

                <div className="flex items-center gap-3">
                    {/* Tombol Unduh PDF */}
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30 transition-all duration-200 active:scale-95 disabled:opacity-70"
                    >
                        {isGeneratingPDF ? (
                            'Membuat PDF...'
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H3a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                                </svg>
                                Unduh PDF
                            </>
                        )}
                    </button>

                    {/* Tombol Edit (original) */}
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
            </div>

            {/* Konten yang akan di-capture PDF */}
            <div id="pengajuan-document-content">
                <PengajuanDocument pengajuan={current} />
            </div>

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