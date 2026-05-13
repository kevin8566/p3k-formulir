import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/layout/AdminSidebar';
import AdminTopbar from './components/layout/AdminTopbar';

// Import Halaman
import DashboardPage from './features/dashboard/pages/DashboardPage';
import KrediturListPage from './features/kreditur/pages/KrediturListPage';
import PengajuanPage from './features/pengajuan/pages/PengajuanPage';
import MasterDataPage from './features/master-data/pages/MasterDataPage';
import PengaturanPage from './features/pengaturan/pages/PengaturanPage';

// Import Halaman Detail
import KrediturDetailPage from './features/kreditur/pages/KrediturDetailPage';
import PengajuanDetailPage from './features/pengajuan/pages/PengajuanDetailPage';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans selection:bg-[#FFC800]/30">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AdminTopbar />
                <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 scrollbar-hide">
                    <div className="max-w-[1440px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Redirect Root */}
                <Route path="/" element={<Navigate to="/admin" replace />} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <AdminLayout>
                        <DashboardPage />
                    </AdminLayout>
                } />

                {/* Kreditur */}
                <Route path="/admin/kreditur" element={
                    <AdminLayout>
                        <KrediturListPage />
                    </AdminLayout>
                } />
                <Route path="/admin/kreditur/detail/:id" element={
                    <AdminLayout>
                        <KrediturDetailPage />
                    </AdminLayout>
                } />

                {/* Pengajuan */}
                <Route path="/admin/pengajuan" element={
                    <AdminLayout>
                        <PengajuanPage />
                    </AdminLayout>
                } />
                <Route path="/admin/pengajuan/detail/:id" element={
                    <AdminLayout>
                        <PengajuanDetailPage />
                    </AdminLayout>
                } />

                {/* Master Data */}
                <Route path="/admin/master-data" element={
                    <AdminLayout>
                        <MasterDataPage />
                    </AdminLayout>
                } />
                <Route path="/admin/master-data/:category" element={
                    <AdminLayout>
                        <MasterDataPage />
                    </AdminLayout>
                } />

                {/* Pengaturan */}
                <Route path="/admin/pengaturan" element={
                    <AdminLayout>
                        <PengaturanPage />
                    </AdminLayout>
                } />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </Router>
    );
}

export default App;