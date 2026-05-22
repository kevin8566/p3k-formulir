// src/features/pengajuan/components/PengajuanTable.jsx
import React from 'react';

export default function PengajuanTable({ items = [], onDetail }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="w-12 px-6 py-5 text-left text-xs font-semibold text-gray-500">NO</th>
                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500">KREDITUR</th>
                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500">INSTANSI</th>
                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-500">TANGGAL</th>
                        <th className="w-32 px-6 py-5 text-center text-xs font-semibold text-gray-500">AKSI</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                        <tr
                            key={item.id || index}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            {/* No */}
                            <td className="px-6 py-5 text-center font-medium text-gray-500">
                                {index + 1}
                            </td>

                            {/* Kreditur */}
                            <td className="px-6 py-5 font-medium text-gray-800">
                                {item.name || item.kreditur}
                            </td>

                            {/* Instansi */}
                            <td className="px-6 py-5 text-gray-600">
                                {item.instansi}
                            </td>

                            {/* Tanggal */}
                            <td className="px-6 py-5 text-gray-600 font-medium">
                                {item.tanggal || item.date}
                            </td>

                            {/* Aksi */}
                            <td className="px-6 py-5 text-center">
                                <button
                                    onClick={() => onDetail(item.id)}
                                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5 16.477 5 20.268 7.943 21.542 12 20.268 16.057 16.477 19 12 19 7.523 19 3.732 16.057 2.458 12z" />
                                    </svg>
                                    Detail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}