import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Seed Data Default sesuai Gambar Referensi
const SEED_DATA = {
    instansi: [
        { id: 1, label: 'Pemerintah Provinsi DKI Jakarta', kode: 'DKI', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
        { id: 2, label: 'Kementerian Keuangan', kode: 'KEMENKEU', aktif: true, urutan: 2, author: 'Admin Utama', time: '26 Mei 2025 14:20' },
        { id: 3, label: 'Pemerintah Kota Bandung', kode: 'BANDUNG', aktif: true, urutan: 3, author: 'Admin Utama', time: '26 Mei 2025 09:15' },
        { id: 4, label: 'Pemerintah Provinsi Jawa Timur', kode: 'JATIM', aktif: true, urutan: 4, author: 'Admin Utama', time: '25 Mei 2025 11:05' },
        { id: 5, label: 'Kementerian Pendidikan dan Kebudayaan', kode: 'KEMDIKBUD', aktif: true, urutan: 5, author: 'Admin Utama', time: '25 Mei 2025 08:50' },
        { id: 6, label: 'Badan Pusat Statistik', kode: 'BPS', aktif: true, urutan: 6, author: 'Admin Utama', time: '24 Mei 2025 16:40' },
        { id: 7, label: 'Pemerintah Kota Surabaya', kode: 'SURABAYA', aktif: false, urutan: 7, author: 'Admin Utama', time: '24 Mei 2025 10:20' },
        { id: 8, label: 'Kementerian Kesehatan', kode: 'KEMENKES', aktif: true, urutan: 8, author: 'Admin Utama', time: '23 Mei 2025 13:10' },
    ],
    jabatan: [
        { id: 9, label: 'Guru Utama', kode: 'GURU_UTM', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
        { id: 10, label: 'Dokter Spesialis', kode: 'DR_SP', aktif: true, urutan: 2, author: 'Admin Utama', time: '26 Mei 2025 14:20' },
    ],
    'unit-kerja': [
        { id: 11, label: 'Bagian Umum', kode: 'UMUM', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
    ],
    golongan: [
        { id: 12, label: 'IV/a', kode: 'IV_A', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
    ],
    'sumber-dana': [
        { id: 13, label: 'APBN', kode: 'APBN', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
    ],
    pendidikan: [
        { id: 14, label: 'S1 - Sarjana', kode: 'S1', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
    ],
    'status-pernikahan': [
        { id: 15, label: 'Menikah', kode: 'NIKAH', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
    ],
    'jenis-kelamin': [
        { id: 16, label: 'Laki-laki', kode: 'L', aktif: true, urutan: 1, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
        { id: 17, label: 'Perempuan', kode: 'P', aktif: true, urutan: 2, author: 'Admin Utama', time: '27 Mei 2025 10:30' },
    ],
};

const CATEGORIES = [
    { key: 'instansi', label: 'Instansi', icon: '🏢' },
    { key: 'jabatan', label: 'Jabatan', icon: '👔' },
    { key: 'unit-kerja', label: 'Unit Kerja', icon: '📁' },
    { key: 'golongan', label: 'Golongan', icon: '🎖️' },
    { key: 'sumber-dana', label: 'Sumber Dana', icon: '💳' },
    { key: 'pendidikan', label: 'Pendidikan', icon: '🎓' },
    { key: 'status-pernikahan', label: 'Status Pernikahan', icon: '💍' },
    { key: 'jenis-kelamin', label: 'Jenis Kelamin', icon: '🚻' },
];

export const useMasterDataStore = create(
    persist(
        (set, get) => ({
            categories: CATEGORIES,
            data: SEED_DATA,

            addItem: (category, item) => set((state) => {
                const categoryData = state.data[category] ?? [];
                const newItem = {
                    ...item,
                    id: Date.now(),
                    urutan: categoryData.length + 1,
                    aktif: item.aktif ?? true,
                    author: 'Admin Utama',
                    time: new Date().toLocaleString('id-ID'),
                };
                return {
                    data: {
                        ...state.data,
                        [category]: [...categoryData, newItem],
                    }
                };
            }),

            updateItem: (category, id, updates) => set((state) => ({
                data: {
                    ...state.data,
                    [category]: state.data[category].map(item =>
                        item.id === id ? { ...item, ...updates } : item
                    ),
                }
            })),

            deleteItem: (category, id) => set((state) => {
                const categoryData = state.data[category] ?? [];
                return {
                    data: {
                        ...state.data,
                        [category]: categoryData
                            .filter(item => item.id !== id)
                            .map((item, index) => ({ ...item, urutan: index + 1 })),
                    }
                };
            }),

            toggleAktif: (category, id) => set((state) => ({
                data: {
                    ...state.data,
                    [category]: state.data[category].map(item =>
                        item.id === id ? { ...item, aktif: !item.aktif } : item
                    ),
                }
            })),
            
            getActiveByCategory: (category) => {
                const state = get();
                return (state.data[category] || []).filter(item => item.aktif);
            },
        }),
        {
            name: 'sikredit-master-data-final',
        }
    )
);
