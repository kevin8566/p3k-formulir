import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PengajuanListCard from '../components/PengajuanListCard';
import PengajuanPageHeader from '../components/PengajuanPageHeader';
import PengajuanStats from '../components/PengajuanStats';
import { usePengajuanStore } from '../store/pengajuanStore';
import { buildPengajuanStats, buildTabCounts, filterPengajuan } from '../utils/pengajuanUtils';
import { useUIStore } from '../../../store/uiStore';
import '../styles/pengajuan.css';

export default function PengajuanPage() {
    const navigate = useNavigate();
    const { pengajuan } = usePengajuanStore();
    const { globalSearch } = useUIStore();

    const [activeTab, setActiveTab] = useState('Semua');
    const [localSearch, setLocalSearch] = useState('');

    const effectiveSearch = localSearch || globalSearch;
    const stats = useMemo(() => buildPengajuanStats(pengajuan), [pengajuan]);
    const tabCounts = useMemo(() => buildTabCounts(pengajuan), [pengajuan]);
    const filteredPengajuan = useMemo(
        () => filterPengajuan(pengajuan, effectiveSearch, activeTab),
        [activeTab, effectiveSearch, pengajuan]
    );

    const handleReset = () => {
        setLocalSearch('');
        setActiveTab('Semua');
    };

    const handleDetail = (id) => {
        navigate(`/admin/pengajuan/detail/${id}`);
    };

    return (
        <div className="space-y-8">
            <PengajuanPageHeader />
            <PengajuanStats stats={stats} />
            <PengajuanListCard
                activeTab={activeTab}
                counts={tabCounts}
                items={filteredPengajuan}
                search={localSearch}
                onDetail={handleDetail}
                onReset={handleReset}
                onSearchChange={setLocalSearch}
                onTabChange={setActiveTab}
            />
        </div>
    );
}
