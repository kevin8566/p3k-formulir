import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getAvatarUrl } from '../utils/pengajuanUtils';
import PengajuanStatusBadge from './PengajuanStatusBadge';

export default function PengajuanTable({ items, onDetail }) {
    return (
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="px-8 py-6 text-left text-xs font-semibold text-gray-500">NO</th>
                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">NO. PENGAJUAN</th>
                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">KREDITUR</th>
                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">INSTANSI</th>
                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">TANGGAL</th>
                        <th className="px-6 py-6 text-left text-xs font-semibold text-gray-500">STATUS</th>
                        <th className="px-8 py-6 text-center text-xs font-semibold text-gray-500">AKSI</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map((row, index) => (
                        <tr
                            key={row.id}
                            className="hover:bg-blue-50/60 transition-all duration-200 group animate-fade-up"
                            style={{ animationDelay: `${index * 40}ms` }}
                        >
                            <td className="px-8 py-6 text-gray-400">{index + 1}</td>
                            <td className="px-6 py-6 font-mono font-medium text-gray-700">{row.id}</td>
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-4">
                                    <img src={getAvatarUrl(row.name)} className="w-11 h-11 rounded-2xl" alt="" />
                                    <div>
                                        <p className="font-semibold">{row.name}</p>
                                        <p className="text-sm text-gray-500">{row.phone}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-6 text-gray-600">{row.instansi}</td>
                            <td className="px-6 py-6 text-gray-600">{row.date}</td>
                            <td className="px-6 py-6"><PengajuanStatusBadge status={row.status} /></td>
                            <td className="px-8 py-6 text-center">
                                <button
                                    type="button"
                                    onClick={() => onDetail(row.id)}
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lihat Detail
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
