import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// ======================================================================
// 1. DATA STATIS & KONFIGURASI ANIMASI (Di luar agar hemat memori render)
// ======================================================================
const FEATURES = [
    { icon: '⚡', title: 'Proses Cepat', desc: 'Pinjaman tulus khusus PPPK dari Bank Karanganyar dengan SLA terukur.', borderColor: 'border-yellow-400' },
    { icon: '📝', title: 'Formulir Adaptif', desc: 'Terintegrasi secara cerdas dengan dinas/instansi Anda, dikelola penuh oleh sistem Bank.', borderColor: 'border-blue-500' },
    { icon: '🔍', title: 'Pelacakan Transparan', desc: 'Memonitor status pengajuan dokumen secara real-time seperti melacak resi pengiriman.', borderColor: 'border-green-500' },
];

const CONTACT_INFO = [
    { title: "Address", content: "Jl. Lawu Timur No.135, Karanganyar, Jawa Tengah 57714", icon: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></> },
    { title: "Phone", content: "(0271) 495489", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/> },
    { title: "Email", content: "info@bankkaranganyar.co.id", icon: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></> }
];

const ANIMATIONS = {
    stagger: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } },
    word: { hidden: { opacity: 0, y: 20, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 100, damping: 15 } } },
    fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } }
};

const TEXT_LINE_1 = "Solusi Kredit Cepat &".split(" ");
const TEXT_LINE_3 = "Karanganyar.".split(" ");

// ======================================================================
// 2. KOMPONEN KARTU 3D INTERAKTIF
// ======================================================================
const TiltCard = ({ feature, idx }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: idx * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`bg-white rounded-[16px] md:rounded-[24px] shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] p-3 sm:p-4 md:p-10 border-b-[4px] md:border-b-[8px] ${feature.borderColor} flex flex-col text-left h-full cursor-pointer relative z-10`}
        >
            <motion.div style={{ transform: "translateZ(40px)" }} animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }} className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 mb-2 sm:mb-3 md:mb-6 bg-[#F8FAFC] rounded-lg md:rounded-2xl flex items-center justify-center text-sm sm:text-base md:text-3xl shadow-sm border border-gray-50 shrink-0">
                {feature.icon}
            </motion.div>
            <motion.h3 style={{ transform: "translateZ(30px)" }} className="font-bold text-[10px] sm:text-xs md:text-xl text-[#152042] mb-1 md:mb-3 leading-tight tracking-tight">{feature.title}</motion.h3>
            <motion.p style={{ transform: "translateZ(20px)" }} className="text-gray-500 text-[8px] sm:text-[10px] md:text-sm leading-tight md:leading-relaxed">{feature.desc}</motion.p>
        </motion.div>
    );
};

// ======================================================================
// 3. KOMPONEN UTAMA (LANDING PAGE)
// ======================================================================
export default function LandingPage() {
    const { scrollY } = useScroll();
    const yBackground = useTransform(scrollY, [0, 1000], [0, 200]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleHeroMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - left, y: e.clientY - top });
    };

    return (
        <div className="w-full font-sans bg-[#FAFAFA]">

            {/* HERO SECTION */}
            <section className="relative w-full h-[520px] sm:h-[600px] md:h-[85vh] md:min-h-[550px] overflow-hidden bg-[#152042] group" id="home" onMouseMove={handleHeroMouseMove}>

                {/* Efek Lampu Sorot Kursor (Spotlight) */}
                <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
                     style={{ background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 200, 0, 0.08), transparent 80%)` }} />

                {/* Parallax Background */}
                <motion.img
                    style={{ y: yBackground, willChange: "transform" }}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="/images/logo1.png" alt="Ilustrasi Bank Karanganyar"
                    className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-[90%_center] md:object-right z-0"
                />

                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#152042]/60 via-[#152042]/20 to-transparent md:w-[80%] pointer-events-none"></div>

                <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
                    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 w-full">
                        <div className="w-[75%] sm:w-[60%] md:w-1/2 flex flex-col items-start pointer-events-auto mt-10 md:mt-0">

                            {/* Judul Animasi Per-kata */}
                            <motion.h1
                                className="font-extrabold text-[#F3F4F6] mb-2 md:mb-4 leading-[1.15] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] flex flex-wrap"
                                style={{ fontSize: 'clamp(1.2rem, 4.5vw + 0.1rem, 3.5rem)' }}
                                variants={ANIMATIONS.stagger} initial="hidden" animate="visible"
                            >
                                <div className="w-full">{TEXT_LINE_1.map((word, i) => <motion.span key={i} variants={ANIMATIONS.word} className="inline-block mr-[0.25em]">{word}</motion.span>)}</div>
                                <div className="w-full">
                                    <motion.span variants={ANIMATIONS.word} className="text-[#FFC800] italic inline-block mr-[0.25em] drop-shadow-sm">Mudah</motion.span>
                                    <motion.span variants={ANIMATIONS.word} className="text-[#FFC800] italic inline-block mr-[0.25em] drop-shadow-sm">Khusus</motion.span>
                                    <motion.span variants={ANIMATIONS.word} className="text-[#FFC800] italic inline-block mr-[0.25em] drop-shadow-sm">PPPK</motion.span>
                                </div>
                                <div className="w-full">{TEXT_LINE_3.map((word, i) => <motion.span key={i} variants={ANIMATIONS.word} className="inline-block mr-[0.25em]">{word}</motion.span>)}</div>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, filter: 'blur(5px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.8 }}
                                className="text-[#E5E7EB] font-medium leading-[1.5] md:leading-[1.7] mb-5 md:mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                                style={{ fontSize: 'clamp(0.7rem, 1.5vw + 0.2rem, 1.125rem)' }}
                            >
                                Ajukan pinjaman tanpa ribet, proses transparan, dan difasilitasi penuh oleh Bank Karanganyar dalam kolaborasi strategis dengan instansi pemerintah daerah.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, delay: 1 }}
                                className="flex flex-col min-[420px]:flex-row gap-2.5 sm:gap-4 w-full min-[420px]:w-auto"
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05, y: -3, transition: { type: "spring", stiffness: 400 } }} whileTap={{ scale: 0.95 }}
                                    href="/pengajuan" className="w-full min-[420px]:w-auto px-4 py-2.5 md:px-8 md:py-4 bg-[#FFC800] text-[#152042] font-extrabold rounded-[10px] md:rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.2)] flex items-center justify-center gap-1.5"
                                    style={{ fontSize: 'clamp(0.7rem, 1.5vw + 0.2rem, 1.125rem)' }}
                                >
                                    Ajukan Sekarang <span className="text-[#F53649]">⚡</span>
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.05, y: -3, backgroundColor: "rgba(255,255,255,0.15)", transition: { type: "spring", stiffness: 400 } }} whileTap={{ scale: 0.95 }}
                                    href="#prosedur" className="w-full min-[420px]:w-auto px-4 py-2.5 md:px-8 md:py-4 bg-white/10 text-white font-bold rounded-[10px] md:rounded-xl border border-white/40 shadow-[0_4px_10px_rgba(0,0,0,0.1)] backdrop-blur-sm flex justify-center items-center"
                                    style={{ fontSize: 'clamp(0.7rem, 1.5vw + 0.2rem, 1.125rem)' }}
                                >
                                    Baca Prosedur
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MENGAPA SIKREDIT SECTION */}
            <section className="pt-16 pb-40 md:pt-28 md:pb-64 bg-[#FAFAFA] overflow-hidden" id="prosedur">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={ANIMATIONS.fadeUp} className="text-center mb-8 md:mb-16 px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-[#152042] mb-3 md:mb-4 tracking-tight">Mengapa Memilih SiKredit?</h2>
                        <div className="w-12 md:w-16 h-1 md:h-1.5 bg-[#FFC800] mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8 w-full max-w-6xl mx-auto px-4 sm:px-0">
                        {FEATURES.map((feature, idx) => <TiltCard key={idx} feature={feature} idx={idx} />)}
                    </div>
                </div>
            </section>

            {/* CONTACT US SECTION */}
            <section id="contact" className="w-full bg-[#152042] pt-16 pb-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-4 border-[#FFC800] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={ANIMATIONS.fadeUp} className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight">Hubungi Kami</h2>
                        <p className="text-blue-200 text-sm sm:text-base max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">Kunjungi kantor operasional kami atau hubungi layanan pelanggan untuk mendapatkan bantuan lebih lanjut terkait pengajuan Anda.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 60, damping: 20 }} viewport={{ once: true, margin: "-50px" }} className="space-y-6 sm:space-y-8 flex flex-col justify-center order-2 lg:order-1">
                            {CONTACT_INFO.map((item, i) => (
                                <motion.div key={i} whileHover={{ x: 10, scale: 1.02, transition: { type: "spring", stiffness: 400 } }} className="flex items-start gap-4 sm:gap-5 group cursor-pointer">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 group-hover:bg-[#FFC800] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 border border-white/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#152042] transition-colors">{item.icon}</svg>
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-blue-300 font-bold mb-1 text-[11px] sm:text-xs uppercase tracking-widest">{item.title}</h4>
                                        <p className="text-white font-medium text-[13px] sm:text-[15px] leading-relaxed break-all">{item.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }} viewport={{ once: true, margin: "-50px" }} className="w-full h-[280px] sm:h-[400px] bg-white p-2 sm:p-3 rounded-3xl shadow-2xl order-1 lg:order-2" style={{ willChange: "transform, opacity" }}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31638.73535936511!2d110.9543149!3d-7.5921784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a189d83abdfc7%3A0xb82ba8b6cb56b0d!2sPT%20BPR%20BANK%20Karanganyar%20(Perseroda)!5e0!3m2!1sid!2sid!4v1776045658886!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-2xl shadow-inner w-full h-full" title="Lokasi PT BPR Bank Karanganyar"></iframe>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
