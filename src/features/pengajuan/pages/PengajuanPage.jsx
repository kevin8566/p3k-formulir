import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PengajuanListCard from '../components/PengajuanListCard';
import PengajuanPageHeader from '../components/PengajuanPageHeader';
import { usePengajuanStore } from '../store/pengajuanStore';
import { filterPengajuan } from '../utils/pengajuanUtils';
import { useUIStore } from '../../../store/uiStore';
import '../styles/pengajuan.css';
export default function PengajuanPage() {
    const navigate = useNavigate();
    const { pengajuan } = usePengajuanStore();
    const { globalSearch } = useUIStore();

    const [localSearch, setLocalSearch] = useState('');

    const effectiveSearch = localSearch || globalSearch;
    const filteredPengajuan = useMemo(
        () => filterPengajuan(pengajuan, effectiveSearch, 'Semua'),
        [effectiveSearch, pengajuan]
    );

    const handleReset = () => {
        setLocalSearch('');
    };

    const handleDetail = (id) => {
        navigate(`/admin/pengajuan/detail/${id}`);
    };

    return (
        <div className="space-y-8">
            <PengajuanPageHeader />
            <PengajuanListCard
                items={filteredPengajuan}
                search={localSearch}
                onDetail={handleDetail}
                onReset={handleReset}
                onSearchChange={setLocalSearch}
            />
        </div>
    );
}
