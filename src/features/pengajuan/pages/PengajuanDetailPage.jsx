import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PengajuanDetailHeader from '../components/PengajuanDetailHeader';
import PengajuanInfoCard from '../components/PengajuanInfoCard';
import PengajuanNotFound from '../components/PengajuanNotFound';
import PengajuanNoteCard from '../components/PengajuanNoteCard';
import PengajuanProfileHeader from '../components/PengajuanProfileHeader';
import { usePengajuanStore } from '../store/pengajuanStore';
import { formatCurrency } from '../utils/pengajuanUtils';

export default function PengajuanDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pengajuan } = usePengajuanStore();

    const current = pengajuan.find((item) => item.id === id);
    const handleBack = () => navigate('/admin/pengajuan');

    if (!current) {
        return <PengajuanNotFound onBack={handleBack} />;
    }

    const krediturRows = [
        { label: 'Nama Lengkap', value: current.name },
        { label: 'Instansi / SKPD', value: current.instansi },
        { label: 'No. HP', value: current.phone },
        { label: 'Email', value: current.email },
    ];

    const pengajuanRows = [
        { label: 'No. Pengajuan', value: current.id },
        { label: 'Tanggal Pengajuan', value: current.date },
        { label: 'Nominal', value: formatCurrency(current.nominal) },
        { label: 'Tenor', value: current.tenor ? `${current.tenor} bulan` : '-' },
        { label: 'Jenis Kredit', value: current.jenis_kredit },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <PengajuanDetailHeader onBack={handleBack} />

            <div className="space-y-6">
                <PengajuanProfileHeader pengajuan={current} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PengajuanInfoCard title="Data Kreditur" rows={krediturRows} />
                    <PengajuanInfoCard title="Data Pengajuan" rows={pengajuanRows} />
                </div>

                <PengajuanNoteCard catatan={current.catatan} />
            </div>
        </div>
    );
}
