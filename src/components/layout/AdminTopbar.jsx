import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

const PAGE_TITLES = {
    '/admin': 'Dashboard',
    '/admin/pengajuan': 'Data Pengajuan',
    '/admin/kreditur': 'Data Kreditur',
    '/admin/master-data': 'Kelola Master Data',
};

export default function AdminTopbar() {
    const location = useLocation();
    const { globalSearch, setGlobalSearch } = useUIStore();

    const pageTitle = Object.entries(PAGE_TITLES)
        .sort((a, b) => b[0].length - a[0].length)
        .find(([path]) => location.pathname.startsWith(path))?.[1] ?? 'Admin CMS';

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-10">
            <div className="flex items-center gap-8 flex-1">
                {/* Menu Toggle (Mobile) */}
                <button className="lg:hidden p-2 hover:bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Page Info */}
                <div className="hidden sm:block">
                    <h1 className="text-[22px] font-black text-[#152042] tracking-tight">{pageTitle}</h1>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Home</span>
                        <span className="text-[11px] text-gray-300">/</span>
                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{pageTitle}</span>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-[#F8FAFC] text-gray-400 hover:bg-gray-100 hover:text-[#152042] transition-all group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
                    </svg>
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#FFC800] text-[#152042] text-[9px] font-black rounded-full border-2 border-white flex items-center justify-center shadow-sm">3</span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-[#152042] leading-none">Admin Utama</p>
                        <p className="text-[11px] text-gray-400 font-semibold mt-1">Super Admin</p>
                    </div>
                    <div className="relative group cursor-pointer">
                        <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white shadow-md group-hover:ring-[#FFC800] transition-all duration-300">
                            <img 
                                src="https://ui-avatars.com/api/?name=Admin+Utama&background=152042&color=fff&bold=true" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                    </div>
                </div>
            </div>
        </header>
    );
}

