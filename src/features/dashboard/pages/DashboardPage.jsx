import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Database } from 'lucide-react';
import { useKrediturStore } from '../../kreditur/store/krediturStore';
import { useMasterDataStore } from '../../master-data/store/masterDataStore';
import DashboardBanner from '../components/DashboardBanner';

import QuickAccessPanel from '../components/QuickAccessPanel';
import RecentPengajuanTable from '../components/RecentPengajuanTable';
import StatCard from '../components/StatCard';
import { QUICK_LINKS, RECENT_PENGAJUAN } from '../constants/dashboardData';
import '../styles/dashboard.css';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { kreditur = [] } = useKrediturStore();
    const { categories = [] } = useMasterDataStore();

    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const timeStr = `${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':')} WIB`;

    const totalKreditur = kreditur.length || 856;
    const totalDisetujui = Math.floor(totalKreditur * 0.75);
    const totalDiproses = Math.floor(totalKreditur * 0.25);

    return (
        <div className="dash-root space-y-5 p-6 min-h-screen" style={{ background: '#f1f4fb' }}>
            <DashboardBanner dateStr={dateStr} timeStr={timeStr} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    delay={0}
                    color="#8b5cf6"
                    sparkColor="#8b5cf6"
                    label="Total Pengajuan"
                    value={Math.floor(totalKreditur * 1.46)}
                    sub="12.5% dari bulan lalu"
                    icon={<ClipboardList className="w-5 h-5" />}
                />
                <StatCard
                    delay={70}
                    color="#f59e0b"
                    sparkColor="#f59e0b"
                    label="Data Master"
                    value={categories.length || 24}
                    sub="4 data baru"
                    icon={<Database className="w-5 h-5" />}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="xl:col-span-2">
                    <RecentPengajuanTable
                        pengajuan={RECENT_PENGAJUAN}
                        onViewAll={() => navigate('/admin/pengajuan')}
                    />
                </div>

                <QuickAccessPanel links={QUICK_LINKS} onNavigate={navigate} />
            </div>

            <p className="text-center text-xs text-gray-400 pb-2" style={{ animation: 'fadeIn 1s 900ms both' }}>
                &copy; 2025 Admin CMS. All rights reserved.
            </p>
        </div>
    );
}
