import React from 'react';
import useCounter from '../hooks/useCounter';

export default function KrediturSummary({ totalKreditur, totalDisetujui, totalDiproses }) {
    const cKreditur = useCounter(totalKreditur, 1300, 500);
    const cDisetujui = useCounter(totalDisetujui, 1300, 600);
    const cDiproses = useCounter(totalDiproses, 1300, 700);

    const summaryItems = [
        { label: 'Total Kreditur', val: cKreditur.toLocaleString('id-ID'), sub: 'Nasabah terdaftar', c: '#6366f1' },
        { label: 'Disetujui', val: cDisetujui.toLocaleString('id-ID'), sub: '76.2% dari total', c: '#10b981' },
        { label: 'Sedang Diproses', val: cDiproses.toLocaleString('id-ID'), sub: '25.0% dari total', c: '#3b82f6' },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" style={{ animation: 'fadeUp 0.55s 280ms both' }}>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-800">
                    Ringkasan Kreditur <span className="font-normal text-gray-400">(Real-time)</span>
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" style={{ animation: 'pulseDot 1.4s ease-in-out infinite' }} />
                    Update real-time
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {summaryItems.map((item, index) => (
                    <div
                        key={item.label}
                        className="rounded-xl p-4 border"
                        style={{
                            borderColor: `${item.c}22`,
                            background: `${item.c}09`,
                            animation: `fadeUp 0.4s ${350 + index * 70}ms both`,
                        }}
                    >
                        <p className="text-[11px] font-semibold mb-2" style={{ color: item.c }}>{item.label}</p>
                        <p className="text-lg font-extrabold text-gray-800">{item.val}</p>
                        <p className="text-[11px] text-gray-400 mt-1.5">{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
