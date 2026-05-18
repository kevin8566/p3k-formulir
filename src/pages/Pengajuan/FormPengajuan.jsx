import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Penyesuaian struktur impor komponen yang telah digabung dan diubah namanya
import Step1DataDiri from './steps/Step1DataDiri';
import Step2DataSuamiIstri from './steps/Step2DataSuamiIstri';
import Step3DataOrangTerdekat from './steps/Step3DataOrangTerdekat';
import Step4DataPegawaiPendapatan from './steps/Step4DataPegawaiPendapatan';
import Step5PengajuanKredit from './steps/Step5PengajuanKredit';
import Step6UploadBerkas from './steps/Step6UploadBerkas';

import TemplateCetakF4 from './TemplateCetakF4';

// Array label disesuaikan untuk 6 langkah formulir
const STEPS_LABEL = ["Data Diri", "Suami / Istri", "Kerabat", "Pegawai & Pendapatan", "Kredit", "Berkas"];

const ANIMATIONS = {
    step: {
        enter: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({ x: direction < 0 ? 30 : -30, opacity: 0 })
    },
    success: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    }
};

const INITIAL_FORM_DATA = {
    nama: '', alamat: '', kode_pos: '', email: '', no_telp: '',
    jenis_kelamin: '', nik: '', nama_ibu: '',
    status_rumah: '', status_pernikahan: '', npwp: '',
    is_belum_menikah: false,
    nama_pasangan: '', alamat_pasangan: '', telp_pasangan: '', nik_pasangan: '',
    nama_kerabat: '', alamat_kerabat: '', hubungan_kerabat: '', telp_kerabat: '',
    instansi: '', alamat_instansi: '', jabatan: '', nip: '', unit_kerja: '',
    pendapatan_tetap: '', pendapatan_tidak_tetap: '',
    nominal_kredit: '', tenor_kredit: '', penggunaan_kredit: '',
    file_ktp: null, file_kk: null, file_ktp_pasangan: null,
    file_ijazah: null, file_sk: null, file_npwp: null, file_surat_nikah: null,
    setuju_pernyataan: false
};

export default function FormPengajuan() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const handleNext = () => {
        // Validasi pengiriman data dipindahkan ke langkah 6
        if (step === 6) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2500);
            return;
        }
        setDirection(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setDirection(-1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => prev - 1);
    };

    const renderStep = () => {
        const props = { formData, setFormData };
        switch (step) {
            case 1: return <Step1DataDiri {...props} />;
            case 2: return <Step2DataSuamiIstri {...props} />;
            case 3: return <Step3DataOrangTerdekat {...props} />;
            case 4: return <Step4DataPegawaiPendapatan {...props} />;
            case 5: return <Step5PengajuanKredit {...props} />;
            case 6: return <Step6UploadBerkas {...props} />;
            default: return null;
        }
    };

    const isReadyToSubmit = formData.setuju_pernyataan;

    return (
        <>
            <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-10 print:hidden">

                {/* PROGRESS BAR SECTION */}
                <div className="max-w-6xl mx-auto px-6 mb-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="relative flex justify-between items-center w-full">
                            <div className="absolute left-[2%] right-[2%] top-6 h-[2px] bg-gray-100 z-0">
                                <motion.div
                                    className="h-full bg-green-500 origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: (step - 1) / (STEPS_LABEL.length - 1) }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            {STEPS_LABEL.map((label, idx) => (
                                <div key={idx} className="flex flex-col items-center relative z-10 flex-1">
                                    <motion.div
                                        animate={{
                                            backgroundColor: step >= idx + 1 ? '#FFD100' : '#FFF',
                                            borderColor: step >= idx + 1 ? '#FFD100' : '#E5E7EB'
                                        }}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm md:text-base mb-2 shadow-sm ${step >= idx + 1 ? 'text-[#0B1171]' : 'text-gray-400'}`}
                                    >
                                        {step > idx + 1 ? '✓' : idx + 1}
                                    </motion.div>
                                    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-center hidden sm:block ${step >= idx + 1 ? 'text-[#0B1171]' : 'text-gray-400'}`}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FORM / SUCCESS STATE SECTION */}
                <div className="max-w-6xl mx-auto px-6 relative">
                    <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-14 min-h-[550px] flex flex-col relative overflow-hidden">

                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    variants={ANIMATIONS.success} initial="hidden" animate="visible"
                                    className="flex flex-col items-center justify-center text-center py-10 md:py-20 flex-grow"
                                >
                                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <motion.polyline initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-[#0B1171] mb-2 uppercase">Pengajuan Terkirim!</h3>
                                    <p className="text-gray-500 max-w-sm font-medium mb-10">Terima kasih. Data Anda sedang diproses oleh sistem perbankan kami.</p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="flex flex-col sm:flex-row gap-4"
                                    >
                                        <button
                                            onClick={() => window.print()}
                                            className="px-8 py-4 bg-[#FFC800] text-[#152042] rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-yellow-500/20 hover:bg-yellow-400 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                            Cetak Formulir (F4)
                                        </button>

                                        <a
                                            href="/"
                                            className="px-8 py-4 bg-[#0B1171] text-white rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-[#070b4a] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                                            Kembali ke Beranda
                                        </a>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div key="form-content" className="flex-grow flex flex-col">
                                    <h2 className="text-xl md:text-2xl font-black text-[#0B1171] uppercase tracking-wide mb-8 md:mb-12">
                                        {step}. {STEPS_LABEL[step-1]}
                                    </h2>

                                    <div className="relative flex-grow">
                                        <AnimatePresence mode="wait" custom={direction}>
                                            <motion.div
                                                key={step} custom={direction} variants={ANIMATIONS.step}
                                                initial="enter" animate="center" exit="exit"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            >
                                                {renderStep()}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* NAVIGATION BUTTONS */}
                                    <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-100 flex justify-between items-center gap-2 md:gap-4">

                                        <button
                                            onClick={handleBack}
                                            disabled={step === 1 || isSubmitting}
                                            className={`flex items-center justify-center gap-1 md:gap-2 px-3 py-3 md:px-6 md:py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 hover:text-[#0B1171] transition-all text-[11px] md:text-sm uppercase tracking-wider active:scale-95 ${step === 1 ? 'opacity-0 invisible' : ''}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                            </svg>
                                            <span className="hidden sm:inline">Sebelumnya</span>
                                            <span className="sm:hidden">Kembali</span>
                                        </button>

                                        {step === 6 ? (
                                            <motion.button
                                                onClick={handleNext} disabled={!isReadyToSubmit || isSubmitting}
                                                animate={{ width: isSubmitting ? 48 : 'auto', borderRadius: isSubmitting ? 24 : 12 }}
                                                className={`flex items-center justify-center font-black shadow-xl uppercase tracking-widest overflow-hidden transition-colors text-[11px] md:text-sm h-12 md:h-14 px-6 md:px-10 ${isReadyToSubmit ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                            >
                                                {isSubmitting ? (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                ) : "Kirim Pengajuan"}
                                            </motion.button>
                                        ) : (
                                            <button
                                                onClick={handleNext}
                                                className="flex items-center justify-center gap-1 md:gap-2 bg-[#0B1171] text-white px-5 py-3 md:px-10 md:py-4 rounded-xl font-black text-[11px] md:text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-[#070b4a] active:scale-95 transition-all"
                                            >
                                                Selanjutnya
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>

            {/* Template Cetak F4 */}
            <TemplateCetakF4 formData={formData} />
        </>
    );
}
