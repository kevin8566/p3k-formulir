import React from 'react';
import { ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RecentPengajuanTable({ pengajuan, onViewAll }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ animation: 'fadeUp 0.55s 380ms both' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                <h3 className="text-sm font-bold text-gray-800">Pengajuan Terbaru</h3>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Lihat semua
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ background: '#f9fafb' }}>
                            {['Nama Kreditur', 'Instansi', 'Nominal Pinjaman', 'Tanggal Pengajuan', 'Status'].map((heading) => (
                                <th
                                    key={heading}
                                    className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-5 py-3 whitespace-nowrap"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {pengajuan.map((row, index) => (
                            <tr key={`${row.nama}-${row.tgl}`} className="t-row" style={{ animation: `fadeUp 0.4s ${480 + index * 60}ms both` }}>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                            style={{ background: 'linear-gradient(135deg,#60a5fa,#2563eb)' }}
                                        >
                                            {row.nama.charAt(0)}
                                        </div>
                                        <span className="font-semibold text-gray-700 whitespace-nowrap">{row.nama}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{row.instansi}</td>
                                <td className="px-5 py-3.5 font-semibold text-gray-700 whitespace-nowrap">{row.nominal}</td>
                                <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">{row.tgl}</td>
                                <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
