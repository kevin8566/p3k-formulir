import React, { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { Link, useLocation } from 'react-router-dom';
import { useMasterDataStore } from '../../features/master-data/store/masterDataStore';

export default function AdminSidebar() {
    const location = useLocation();
    const { categories } = useMasterDataStore();
    const [isMasterOpen, setIsMasterOpen] = useState(location.pathname.includes('master-data'));
    const { sidebarOpen, setSidebarOpen } = useUIStore();

    const NAV_ITEMS = [
        {
            to: '/admin',
            exact: true,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            label: 'Dashboard',
        },
        {
            to: '/admin/kreditur',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'Kreditur',
            hasArrow: true,
        },
        {
            to: '/admin/master-data',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            label: 'Master Data',
            hasArrow: true,
            isExpandable: true,
            children: categories.map(cat => ({
                to: `/admin/master-data/${cat.key}`,
                label: cat.label,
                key: cat.key
            }))
        },
        {
            to: '/admin/pengajuan',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            label: 'Pengajuan',
            
        },
    ];

    const isActive = (to, exact = false) => {
        if (exact) return location.pathname === to;
        return location.pathname.startsWith(to);
    };

    // Sidebar desktop: md:block, mobile: fixed overlay
    return (
        <>
        {/* Overlay for mobile */}
        {sidebarOpen && (
            <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden animate-fade-in"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup menu sidebar"
            />
        )}
        <aside
            className={`w-[280px] bg-[#0B1121] text-white flex flex-col shadow-2xl z-50 shrink-0 border-r border-white/5 overflow-hidden hidden md:flex ${
                sidebarOpen ? '!flex fixed md:static left-0 top-0 h-screen md:h-auto md:relative' : ''
            }`}
        >
            {/* Close button mobile */}
            <button
                className="absolute top-4 right-4 md:hidden bg-white/10 hover:bg-white/20 rounded-lg p-2 z-50"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup sidebar"
                style={{ display: sidebarOpen ? 'block' : 'none' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {/* Brand */}
            <div className="h-28 flex items-center px-10 shrink-0 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FFC800] rounded-2xl flex items-center justify-center shadow-xl shadow-[#FFC800]/20 rotate-3">
                         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#0B1121" />
                            <path d="M8 10L12 12L16 10" stroke="#FFC800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 14L12 16L16 14" stroke="#FFC800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-white">Admin CMS</span>
                </div>
            </div>

            <div className="px-6 py-4 flex-1 relative z-10 overflow-y-auto scrollbar-hide">
                <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 opacity-50">Menu Utama</p>
                <nav className="space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.to, item.exact);
                        const isMaster = item.label === 'Master Data';

                        return (
                            <div key={item.to}>
                                <div 
                                    onClick={() => isMaster && setIsMasterOpen(!isMasterOpen)}
                                    className="block"
                                >
                                    <Link
                                        to={isMaster ? '#' : item.to}
                                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                                            active && !isMaster
                                                ? 'bg-[#FFC800] text-[#0B1121] shadow-xl shadow-[#FFC800]/10 font-black'
                                                : (active && isMaster) 
                                                    ? 'text-[#FFC800] font-black' 
                                                    : 'text-gray-500 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        <span className={`${active ? 'text-[#FFC800]' : 'group-hover:text-white transition-colors'} ${active && !isMaster ? '!text-[#0B1121]' : ''}`}>
                                            {item.icon}
                                        </span>
                                        <span className="text-[15px] flex-1 tracking-tight">{item.label}</span>
                                        {item.badge && (
                                            <span className="bg-[#FFC800] text-[#0B1121] text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.hasArrow && (
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="12" height="12" fill="none" viewBox="0 0 24 24" 
                                                stroke="currentColor" strokeWidth="4" 
                                                className={`transition-transform duration-300 ${isMaster && isMasterOpen ? 'rotate-90' : ''} ${active ? 'text-[#FFC800]' : 'opacity-30'}`}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </Link>
                                </div>

                                {isMaster && isMasterOpen && (
                                    <div className="mt-2 ml-10 space-y-1 border-l border-white/5 pl-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                        {item.children.map(child => {
                                            const childActive = location.pathname.includes(child.to);
                                            return (
                                                <Link
                                                    key={child.to}
                                                    to={child.to}
                                                    className={`block py-2.5 text-[13px] transition-all ${
                                                        childActive 
                                                            ? 'text-[#FFC800] font-black' 
                                                            : 'text-gray-500 hover:text-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {childActive && <div className="w-1.5 h-1.5 bg-[#FFC800] rounded-full shadow-[0_0_10px_#FFC800]" />}
                                                        {child.label}
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>


              
                    <Link
                        to="/login"                   
                        onClick={() => {
                            
                            console.log('User logout');
                        }}
                        className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-500 hover:bg-white/5 hover:text-red-400 transition-all group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4V7m-4 4V7" />
                        </svg>
                        <span className="text-[15px] flex-1 tracking-tight">Keluar</span>
                    </Link>
            </div>

            <div className="h-10 shrink-0" />
        </aside>
        </>
    );
}
