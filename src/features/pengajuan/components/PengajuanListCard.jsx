import React from 'react';
import PengajuanFilters from './PengajuanFilters';
import PengajuanMobileList from './PengajuanMobileList';
import PengajuanTable from './PengajuanTable';

export default function PengajuanListCard({
    items,
    search,
    onDetail,
    onReset,
    onSearchChange,
}) {
    return (
        <div
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-scale-in"
        >
            <PengajuanFilters search={search} onSearchChange={onSearchChange} onReset={onReset} />
            <div className="overflow-hidden">
                <PengajuanTable items={items} onDetail={onDetail} />
                <PengajuanMobileList items={items} onDetail={onDetail} />
            </div>
        </div>
    );
}
