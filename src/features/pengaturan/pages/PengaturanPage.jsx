import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bankLogo from '../../../assets/logo-final.png';

const PengaturanPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('general');

    const [formData, setFormData] = useState({
        namaBank: "Bank Karanganyar",
        alamat: "Jl. Pemuda No. 45, Karanganyar",
        email: "admin@bankkaranganyar.co.id",
        telepon: "(0271) 123456",
        timezone: "Asia/Jakarta",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveSettings = () => {
        alert("✅ Pengaturan sistem berhasil disimpan!");
        // Nanti bisa dihubungkan ke store atau API
    };

    return (
        <>
            <style>{`
                .settings-root { font-family: 'Plus Jakarta Sans', sans-serif; }
                .tab-active {
                    border-bottom: 3px solid #2563eb;
                    color: #2563eb;
                    font-weight: 600;
                }
            `}</style>

            <div className="settings-root min-h-screen bg-[#f1f4fb] p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Pengaturan Sistem</h1>
                        <p className="text-gray-500 mt-1">Kelola konfigurasi dan pengaturan aplikasi</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
                    >
                        ← Kembali
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-6">
                            <div className="flex items-center gap-3 mb-6 px-2">
                                <img src={bankLogo} alt="Logo" className="h-10 w-auto" />
                                <div>
                                    <p className="font-bold text-gray-800">Bank Karanganyar</p>
                                    <p className="text-xs text-gray-500">Admin Panel</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {[
                                    { id: 'general', label: 'Umum', icon: '⚙️' },
                                    { id: 'security', label: 'Keamanan', icon: '🔒' },
                                    { id: 'notification', label: 'Notifikasi', icon: '🛎️' },
                                    { id: 'system', label: 'Informasi Sistem', icon: '💻' },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <span className="text-xl">{tab.icon}</span>
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Tab Headers */}
                            <div className="border-b border-gray-100 px-8 pt-6">
                                <div className="flex gap-8 text-sm">
                                    <button 
                                        onClick={() => setActiveTab('general')} 
                                        className={`pb-4 ${activeTab === 'general' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Pengaturan Umum
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('security')} 
                                        className={`pb-4 ${activeTab === 'security' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Keamanan
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('notification')} 
                                        className={`pb-4 ${activeTab === 'notification' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Notifikasi
                                    </button>
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-8 space-y-10">
                                {activeTab === 'general' && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-lg font-semibold mb-4">Informasi Institusi</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">NAMA BANK</label>
                                                    <input 
                                                        type="text" 
                                                        name="namaBank" 
                                                        value={formData.namaBank} 
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">NOMOR TELEPON</label>
                                                    <input 
                                                        type="text" 
                                                        name="telepon" 
                                                        value={formData.telepon} 
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">ALAMAT</label>
                                                    <textarea 
                                                        name="alamat" 
                                                        value={formData.alamat} 
                                                        onChange={handleChange} 
                                                        rows={3}
                                                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y" 
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t">
                                            <button
                                                onClick={saveSettings}
                                                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition shadow-lg shadow-blue-500/30 flex items-center gap-2"
                                            >
                                                💾 Simpan Perubahan
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div className="space-y-6">
                                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                                            <h3 className="font-semibold text-amber-800">Password & Autentikasi</h3>
                                            <p className="text-sm text-amber-700 mt-1">Pengaturan keamanan login dan sesi</p>
                                        </div>
                                        {/* Bisa ditambahkan komponen terpisah nanti */}
                                    </div>
                                )}

                                {activeTab === 'notification' && (
                                    <div>
                                        <h3 className="font-semibold mb-4">Preferensi Notifikasi</h3>
                                        <div className="space-y-3">
                                            {["Pengajuan baru", "Status pengajuan berubah", "Login dari perangkat baru"].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between p-5 border rounded-2xl">
                                                    <span className="text-gray-700">{item}</span>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PengaturanPage;