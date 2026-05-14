import React, { useState } from 'react';
import { useMasterDataStore } from '../store/masterDataStore';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import MasterDataForm from './MasterDataForm';
import InstansiForm from './category/InstansiForm';
import JabatanForm from './category/JabatanForm';
import UnitKerjaForm from './category/UnitKerjaForm';
import GolonganForm from './category/GolonganForm';
import SumberDanaForm from './category/SumberDanaForm';
import PendidikanForm from './category/PendidikanForm';
import StatusPernikahanForm from './category/StatusPernikahanForm';
import JenisKelaminForm from './category/JenisKelaminForm';

const CATEGORY_FORMS = {
    instansi: InstansiForm,
    jabatan: JabatanForm,
    'unit-kerja': UnitKerjaForm,
    golongan: GolonganForm,
    'sumber-dana': SumberDanaForm,
    pendidikan: PendidikanForm,
    'status-pernikahan': StatusPernikahanForm,
    'jenis-kelamin': JenisKelaminForm,
};

export default function MasterDataTable({ categoryKey }) {
    const { categories, data, addItem, updateItem, deleteItem, toggleAktif } = useMasterDataStore();
    const items = data[categoryKey] ?? [];
    const activeCategory = categories.find((category) => category.key === categoryKey);
    const categoryLabel = activeCategory?.label ?? 'Data';
    const CategoryForm = CATEGORY_FORMS[categoryKey] ?? MasterDataForm;

    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null); // null = tambah, object = edit
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleOpenAdd = () => { setEditTarget(null); setModalOpen(true); };
    const handleOpenEdit = (row) => { setEditTarget(row); setModalOpen(true); };
    const handleClose = () => { setModalOpen(false); setEditTarget(null); };

    const handleSubmit = (values) => {
        if (editTarget) {
            updateItem(categoryKey, editTarget.id, values);
        } else {
            addItem(categoryKey, values);
        }
        handleClose();
    };

    const handleDelete = () => {
        if (deleteTarget) deleteItem(categoryKey, deleteTarget.id);
    };

    const columns = [
        {
            key: 'urutan',
            label: '#',
            width: '60px',
            render: (val) => (
                <span className="text-xs font-mono text-gray-400 font-bold">{val}</span>
            )
        },
        {
            key: 'label',
            label: 'Label / Nama',
            render: (val) => (
                <span className="font-semibold text-[#152042]">{val}</span>
            )
        },
        {
            key: 'kode',
            label: 'Kode',
            render: (val) => (
                <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{val}</span>
            )
        },
        {
            key: 'aktif',
            label: 'Status',
            sortable: false,
            render: (val, row) => (
                <button
                    onClick={() => toggleAktif(categoryKey, row.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                        val
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    title="Klik untuk toggle aktif/nonaktif"
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${val ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {val ? 'Aktif' : 'Nonaktif'}
                </button>
            )
        },
    ];

    const actionButtons = (row) => (
        <>
            <button
                onClick={() => handleOpenEdit(row)}
                title="Edit"
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-[#152042] hover:bg-[#152042]/5 hover:border-[#152042]/30 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/>
                </svg>
            </button>
            <button
                onClick={() => setDeleteTarget(row)}
                title="Hapus"
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
            </button>
        </>
    );

    const activeCount = items.filter(i => i.aktif).length;
    const inactiveCount = items.length - activeCount;

    return (
        <>
            {/* Stats + Add Button */}
            <div className="flex items-center justify-between mb-4 master-fade-up master-delay-1">
                <div className="flex items-center gap-3">
                    <span className="master-stat-pill text-xs font-bold bg-[#152042]/10 text-[#152042] px-2.5 py-1 rounded-full">
                        {activeCount} Aktif
                    </span>
                    {inactiveCount > 0 && (
                        <span className="master-stat-pill text-xs font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                            {inactiveCount} Nonaktif
                        </span>
                    )}
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FFC800] hover:bg-yellow-400 text-[#152042] font-bold text-sm rounded-lg transition-all shadow-sm shadow-[#FFC800]/30 hover:-translate-y-0.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    Tambah {categoryLabel}
                </button>
            </div>

            <div className="master-scale-in master-delay-2">
                <DataTable
                    columns={columns}
                    data={items}
                    emptyMessage="Belum ada data. Klik 'Tambah Data' untuk memulai."
                    actions={actionButtons}
                    rowClassName={(_, index) => 'master-row-in'}
                    rowStyle={(_, index) => ({ animationDelay: `${index * 45}ms` })}
                />
            </div>

            {/* Modal Tambah / Edit */}
            <Modal
                isOpen={modalOpen}
                onClose={handleClose}
                title={editTarget ? `Edit ${categoryLabel}: ${editTarget.label}` : `Tambah ${categoryLabel}`}
                size="sm"
            >
                <CategoryForm
                    initialData={editTarget}
                    onSubmit={handleSubmit}
                    onCancel={handleClose}
                />
            </Modal>

            {/* Confirm Hapus */}
            <ConfirmDialog
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Hapus Data Master"
                message={`Anda akan menghapus "${deleteTarget?.label}". Data yang terhapus tidak dapat dikembalikan.`}
            />
        </>
    );
}
