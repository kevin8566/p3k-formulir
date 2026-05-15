import React from 'react';

// Komponen ini didesain khusus untuk dicetak dengan kertas F4 (Folio)
export default function TemplateCetakF4({ formData }) {

    // Format Tanggal Indonesia (Contoh: 27 Juni 2023)
    const getTanggalSekarang = () => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date().toLocaleDateString('id-ID', options);
    };

    // Helper untuk format Rupiah
    const formatRp = (angka) => {
        if (!angka) return '0';
        return new Intl.NumberFormat('id-ID').format(angka);
    };

    return (
        <div className="hidden print:block bg-white text-black font-serif text-[11.5px] leading-tight w-[215.9mm] mx-auto">

            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    @page {
                        size: 215.9mm 330.2mm; /* Ukuran presisi F4 / Folio */
                        /* Margin Atas 5mm, Kanan 15mm, Bawah 10mm, Kiri 15mm */
                        margin: 5mm 15mm 10mm 15mm;
                    }

                    /* =====================================================================
                       PERBAIKAN: Pembersihan total sisa background abu-abu & padding layout
                       ===================================================================== */
                    body, html, #root, main, #root > div {
                        background-color: #FFFFFF !important;
                        padding-top: 0 !important;
                        margin-top: 0 !important;
                    }

                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    /* Menyembunyikan Navbar, Header, dan Footer bawaan website saat cetak */
                    nav, header, footer { display: none !important; }

                    .page-break { page-break-before: always; }
                    td { vertical-align: top; }

                    /* Mencegah elemen terpotong di tengah-tengah halaman */
                    .avoid-break { page-break-inside: avoid; }
                }
            `}} />

            {/* =======================================================================
                HALAMAN 1: PERMOHONAN KREDIT PEGAWAI
                ======================================================================= */}
            <div className="w-full relative pt-1">

                {/* Header Banner Merah */}
                <div className="flex bg-[#CC0000] text-white p-2 items-center mb-4 border-b-4 border-black">
                    <div className="w-1/3">
                        <img src="/images/logo-final.png" alt="Logo" className="h-10 bg-white p-1 rounded" />
                    </div>
                    <div className="w-2/3 text-right pr-4">
                        <h1 className="text-xl font-bold tracking-wider">PERMOHONAN KREDIT PEGAWAI</h1>
                    </div>
                </div>

                {/* Surat Kepada */}
                <div className="flex justify-between mb-3">
                    <div>
                        <p>Kepada Yth,</p>
                        <p>Direksi PT  BPR Bank Karanganyar</p>
                    </div>
                    <div>
                        <p>Karanganyar, {getTanggalSekarang()}</p>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="mb-1">Dengan hormat,</p>
                    <p className="mb-2 text-justify">
                        Dengan ini kami mengajukan Permohonan Kredit Karyawan Kepada PT BPR Bank Karanganyar dengan data kami sampaikan dengan sebenar-benarnya dan kami sanggup mempertanggung jawabkan kebenaran data secara hukum sebagai berikut :
                    </p>

                    {/* DATA PRIBADI PEMOHON */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 flex justify-between mb-1.5">
                        <span>DATA PRIBADI PEMOHON</span>
                        <span className="italic font-normal text-[9px] pt-0.5">Mohon diisi dengan huruf cetak</span>
                    </div>

                    <table className="w-full mb-2">
                        <tbody>
                            <tr><td className="w-[32%]">Nama Lengkap Sesuai KTP</td><td className="w-[2%]">:</td><td className="w-[66%] uppercase">{formData.nama || '...................................................'}</td></tr>
                            <tr><td>Alamat Tempat Tinggal</td><td>:</td><td className="uppercase">{formData.alamat || '...................................................'}</td></tr>
                            <tr><td></td><td>:</td><td className="uppercase">Kodepos {formData.kode_pos || '..........'}</td></tr>
                            <tr><td>Nomor Handphone</td><td>:</td><td className="uppercase">{formData.no_telp || '...................................................'}</td></tr>
                            <tr><td>Status Rumah</td><td>:</td><td className="uppercase">{formData.status_rumah || '...................................................'}</td></tr>
                            <tr><td>Status Pernikahan</td><td>:</td><td className="uppercase">{formData.status_pernikahan || '.........................'} <span className="ml-12">Jenis Kelamin: {formData.jenis_kelamin || '.....................'}</span></td></tr>
                            <tr><td>Tanda Pengenal (KTP) Nomor</td><td>:</td><td className="uppercase">{formData.nik || '...................................................'}</td></tr>
                            <tr><td>NPWP</td><td>:</td><td className="uppercase">{formData.npwp || '...................................................'}</td></tr>
                            <tr><td>Pekerjaan</td><td>:</td><td className="uppercase">PEGAWAI PEMERINTAH DENGAN PERJANJIAN KERJA (PPPK)</td></tr>
                            <tr><td>Nama Gadis Ibu Kandung</td><td>:</td><td className="uppercase">{formData.nama_ibu || '...................................................'}</td></tr>
                        </tbody>
                    </table>

                    {/* DATA KHUSUS */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-1.5">DATA KHUSUS</div>
                    <table className="w-full mb-2">
                        <tbody>
                            <tr><td className="w-[32%]">Nama Instansi</td><td className="w-[2%]">:</td><td className="w-[66%] uppercase">{formData.instansi || '...................................................'}</td></tr>
                            <tr><td>Alamat Instansi / Kantor</td><td>:</td><td className="uppercase">{formData.alamat_instansi || '...........................................................................'}</td></tr>
                            <tr><td>Jabatan dalam pekerjaan</td><td>:</td><td className="uppercase">{formData.jabatan || '...................................................'}</td></tr>
                        </tbody>
                    </table>

                    {/* DATA KREDIT */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-1.5">DATA KREDIT</div>
                    <table className="w-full mb-2">
                        <tbody>
                            <tr><td className="w-[32%]">Jumlah Kredit</td><td className="w-[2%]">:</td><td className="w-[66%] uppercase">Rp. {formatRp(formData.nominal_kredit)}</td></tr>
                            <tr><td>Kredit digunakan untuk</td><td>:</td><td className="uppercase">{formData.penggunaan_kredit || '...................................................'}</td></tr>
                            <tr><td>Penghasilan tetap per bulan</td><td>:</td><td className="uppercase">Rp. {formatRp(formData.pendapatan_tetap)}</td></tr>
                            <tr><td>Penghasilan tidak tetap per bln</td><td>:</td><td className="uppercase">Rp. {formatRp(formData.pendapatan_tidak_tetap)}</td></tr>
                            <tr><td>Jangka waktu pengambilan</td><td>:</td><td className="uppercase">{formData.tenor_kredit || '......'} BULAN</td></tr>
                        </tbody>
                    </table>

                    {/* DATA JAMINAN */}
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-1.5">DATA JAMINAN</div>
                    <table className="w-full mb-2">
                        <tbody>
                            <tr><td className="w-[32%]">Jaminan berupa</td><td className="w-[2%]">:</td><td className="w-[66%]">SK PPPK dan Ijazah Pendidikan Terakhir</td></tr>
                            <tr><td>Atas nama</td><td>:</td><td className="uppercase">{formData.nama || '...................................................'}</td></tr>
                            <tr><td>Jaminan tambahan</td><td>:</td><td className="uppercase">................................................... Atas nama : ..........................................</td></tr>
                            <tr><td>Nama orang terdekat</td><td>:</td><td className="uppercase">{formData.nama_kerabat || '...................................................'}</td></tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-justify mb-4">
                    Demikian Permohonan Kredit Kami ajukan dan kami memberikan kuasa penuh kepada bank untuk memeriksa kebenaran informasi dan dokumen yang kami berikan. Saya bersedia dan akan mentaati segala persyaratan dan peraturan bank, saya bersedia membayar segala biaya yang timbul dari persyaratan pengajuan permohonan ini. Dokumen yang kami lampirkan tidak wajib dikembalikan apabila permohonan kami ditolak oleh bank.
                </p>

                {/* AREA TANDA TANGAN 1 */}
                <div className="avoid-break flex justify-between text-center mb-4">
                    <div className="w-1/3">
                        <p>Pemilik Jaminan / Penjamin</p>
                        <div className="h-12"></div>
                        <p className="uppercase">(...........................................)</p>
                    </div>
                    <div className="w-1/3">
                        <p>Mengetahui Suami / Istri</p>
                        <div className="h-12"></div>
                        <p className="uppercase">({formData.nama_pasangan || '...........................................'})</p>
                    </div>
                    <div className="w-1/3">
                        <p>Pemohon</p>
                        <div className="h-12"></div>
                        <p className="uppercase underline font-bold">{formData.nama || '...........................................'}</p>
                        <p>NIP/NRP/NIK: {formData.nip || '.........................'}</p>
                    </div>
                </div>

                {/* AREA TANDA TANGAN 2 */}
                <div className="avoid-break flex justify-between text-center mb-3">
                    <div className="w-1/2">
                        <p>Menyetujui, Plh. KEPALA DINAS / INSTANSI</p>
                        <div className="h-12"></div>
                        <p className="font-bold underline">drg. Dwi Rusharyati, M.H</p>
                        <p>NIP/NRP/NIK : 197302142000122005</p>
                    </div>
                    <div className="w-1/2">
                        <p>Bendahara Gaji,</p>
                        <div className="h-12"></div>
                        <p className="font-bold underline">Sugeng Riyadi</p>
                        <p>NIP/NRP/NIK : 197604222007011006</p>
                    </div>
                </div>

                {/* PERSETUJUAN DIREKSI */}
                <div className="avoid-break border-t-2 border-[#CC0000] pt-1">
                    <div className="bg-[#CC0000] text-white font-bold px-2 py-0.5 mb-3 text-center">PERSETUJUAN DIREKSI</div>
                    <div className="flex justify-between">
                        <div className="w-1/3">
                            <p className="mb-1 font-bold">Pertimbangan,</p>
                            <p className="border-b border-dotted border-black mt-5 w-[90%]"></p>
                            <p className="border-b border-dotted border-black mt-5 w-[90%]"></p>
                        </div>
                        <div className="w-1/3 text-center">
                            <p>Menyetujui,<br/>PT BPR Bank Karanganyar</p>
                            <div className="h-10"></div>
                            <p className="border-b border-dotted border-black mx-auto w-[80%]"></p>
                        </div>
                        <div className="w-1/3 text-center">
                            <p>Mengetahui,<br/>PT BPR Bank Karanganyar</p>
                            <div className="h-10"></div>
                            <p className="border-b border-dotted border-black mx-auto w-[80%]"></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* =======================================================================
                HALAMAN 2: SURAT PERNYATAAN (SLIK)
                ======================================================================= */}
            <div className="page-break w-full relative pt-4">
                <h1 className="text-xl font-bold text-center mb-6 underline">SURAT PERNYATAAN</h1>
                <p className="mb-4">Yang bertanda tangan di bawah ini, Kami :</p>

                <table className="w-full mb-6 leading-relaxed">
                    <tbody>
                        {/* DEBITUR */}
                        <tr><td className="w-[4%]">1.</td><td className="w-[15%]">Nama</td><td className="w-[2%]">:</td><td className="uppercase w-[55%]">{formData.nama || '.......................................................'}</td><td className="italic text-right">( Debitur )</td></tr>
                        <tr><td></td><td>Alamat</td><td>:</td><td colSpan="2" className="uppercase">{formData.alamat || '.......................................................'}</td></tr>
                        <tr><td className="pb-3"></td><td className="pb-3">Nomor KTP</td><td className="pb-3">:</td><td colSpan="2" className="pb-3">{formData.nik || '.......................................................'}</td></tr>

                        {/* PASANGAN DEBITUR */}
                        <tr><td>2.</td><td>Nama</td><td>:</td><td className="uppercase">{formData.nama_pasangan || '.......................................................'}</td><td className="italic text-right">( Istri/Suami Debitur )</td></tr>
                        <tr><td></td><td>Alamat</td><td>:</td><td colSpan="2" className="uppercase">{formData.alamat_pasangan || '.......................................................'}</td></tr>
                        <tr><td className="pb-3"></td><td className="pb-3">Nomor KTP</td><td className="pb-3">:</td><td colSpan="2" className="pb-3">{formData.nik_pasangan || '.......................................................'}</td></tr>

                        {/* PENJAMIN */}
                        <tr><td>3.</td><td>Nama</td><td>:</td><td>.......................................................</td><td className="italic text-right">( Penjamin )</td></tr>
                        <tr><td></td><td>Alamat</td><td>:</td><td colSpan="2">.......................................................</td></tr>
                        <tr><td className="pb-3"></td><td className="pb-3">Nomor KTP</td><td className="pb-3">:</td><td colSpan="2" className="pb-3">.......................................................</td></tr>

                        {/* PASANGAN PENJAMIN */}
                        <tr><td>4.</td><td>Nama</td><td>:</td><td>.......................................................</td><td className="italic text-right">( Istri/Suami Penjamin )</td></tr>
                        <tr><td></td><td>Alamat</td><td>:</td><td colSpan="2">.......................................................</td></tr>
                        <tr><td className="pb-3"></td><td className="pb-3">Nomor KTP</td><td className="pb-3">:</td><td colSpan="2" className="pb-3">.......................................................</td></tr>
                    </tbody>
                </table>

                <p className="mb-2 text-justify">Dengan ini menyatakan bahwa kami mengijinkan PT BPR Bank Karanganyar (Perseroda) untuk</p>
                <p className="mb-2 font-bold italic text-justify">Melakukan Analisa SLIK (Sistem Layanan Informasi Keuangan) atas data/identitas kami,</p>
                <p className="mb-8 text-justify">Sehubungan dengan pengajuan kredit kami pada Bank tersebut.</p>

                <div className="flex mb-8">
                    <div className="w-[15%]">
                        <p className="mb-1">Atas Nama</p>
                        <p>Pada tanggal</p>
                    </div>
                    <div className="w-[2%]">
                        <p className="mb-1">:</p>
                        <p>:</p>
                    </div>
                    <div className="w-[83%]">
                        <p className="uppercase font-bold mb-1">{formData.nama || '.......................................................'}</p>
                        <p>{getTanggalSekarang()}</p>
                    </div>
                </div>

                <p className="mb-8">Demikian pernyataan ini kami buat untuk dapat dipergunakan sebagaimana mestinya.</p>

                <div className="avoid-break text-center mb-3">
                    <p>Karanganyar, {getTanggalSekarang()}</p>
                    <p className="mb-2">Yang membuat pernyataan</p>
                </div>

                {/* Kolom Tanda Tangan Kotak (Ketinggian Disesuaikan) */}
                <table className="avoid-break w-full border-collapse border border-black h-28">
                    <tbody>
                        <tr>
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">Nama: <span className="uppercase">{formData.nama || '..................'}</span></td>
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">Nama: <span className="uppercase">{formData.nama_pasangan || '..................'}</span></td>
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">Nama: ........................</td>
                            <td className="border border-black w-1/4 align-bottom p-2 h-28">Nama: ........................</td>
                        </tr>
                    </tbody>
                </table>
                <p className="italic text-[10px] mt-1">*) Coret yang tidak perlu<br/>Pernyataan ini guna untuk Perlengkapan Pengajuan Kredit</p>
            </div>

            {/* =======================================================================
                HALAMAN 3: SURAT PERNYATAAN (POTONG GAJI)
                ======================================================================= */}
            <div className="page-break w-full relative pt-6 px-4">
                <h1 className="text-xl font-bold text-center mb-6 underline">SURAT PERNYATAAN</h1>
                <p className="mb-4">Yang bertanda tangan dibawah ini :</p>

                <table className="w-full mb-5 leading-relaxed">
                    <tbody>
                        <tr><td className="w-[18%]">Nama</td><td className="w-[2%]">:</td><td className="uppercase">{formData.nama || '................................................................'}</td></tr>
                        <tr><td>Alamat</td><td>:</td><td className="uppercase">{formData.alamat || '................................................................'}</td></tr>
                        <tr><td>NIK</td><td>:</td><td>{formData.nik || '................................................................'}</td></tr>
                        <tr><td>Dinas</td><td>:</td><td className="uppercase">{formData.instansi || '................................................................'}</td></tr>
                        <tr><td>NIP</td><td>:</td><td>{formData.nip || '................................................................'}</td></tr>
                    </tbody>
                </table>

                <p className="mb-3">Bahwa saya Nasabah PT BPR Bank Karanganyar (Perseroda) dengan :</p>

                <table className="w-full mb-5 leading-relaxed">
                    <tbody>
                        <tr><td className="w-[18%]">Plafon</td><td className="w-[2%]">:</td><td>Rp. {formatRp(formData.nominal_kredit) || '........................................'} ,00</td></tr>
                        <tr><td>Jangka Waktu</td><td>:</td><td>{formData.tenor_kredit || '..............'} Bln/ …………… Th</td></tr>
                        <tr><td>Akad Kredit</td><td>:</td><td>........................................................................................................</td></tr>
                        <tr><td>Jatuh Tempo</td><td>:</td><td>........................................................................................................</td></tr>
                    </tbody>
                </table>

                <p className="mb-3 text-justify leading-relaxed">
                    Meminta kepada PT BPR Bank Karanganyar (Perseroda) untuk memotong penghasilan saya sebagai <br/>
                    <b>Pegawai Pemerintah Dengan Perjanjian Kerja Sebesar</b> Rp. ........................................................................<br/>
                    (...................................................................................................................................................................................) setiap bulan sebagai angsuran <br/>
                    Di PT BPR Bank Karanganyar (Perseroda) sampai dengan lunas.
                </p>

                <p className="mb-3 text-justify leading-relaxed">
                    Dengan ini menyatakan bahwa saya adalah nasabah PT BPR Bank Karanganyar (Perseroda) dan apabila saya pensiun maupun keluar dari tempat/instansi/perusahaan saya bekerja, maka saya bersedia menyerahkan pesangon/asuransi/atau apapun yang saya terima dari tempat/instansi/perusahaan di mana saya pernah bekerja kepada Bendahara Gaji untuk pelunasan pinjaman saya di PT BPR Bank Karanganyar (Perseroda).
                </p>

                <p className="mb-6 text-justify leading-relaxed">
                    Dan apabila masih terdapat kekurangan dalam pelunasan pinjaman saya di PT BPR Bank Karanganyar (Perseroda), maka saya bersedia menyerahkan agunan sebagai pengganti kekurangan pelunasan.<br/>
                    Demikian surat pernyataan ini dibuat tanpa ada paksaan dari pihak manapun dan untuk dapat dipergunakan sebagaimana mestinya.
                </p>

                <div className="avoid-break flex justify-end text-center mb-6 pr-12">
                    <div>
                        <p>Karanganyar, ………/………………………./…………..</p>
                    </div>
                </div>

                <div className="avoid-break flex justify-between text-center px-12">
                    <div className="w-1/2">
                        <p>Suami</p>
                        <div className="h-20"></div>
                        <p className="uppercase">[ {formData.jenis_kelamin === 'Laki-laki' ? formData.nama : formData.nama_pasangan || '…………………………'} ]</p>
                    </div>
                    <div className="w-1/2">
                        <p className="mb-2">Istri</p>
                        <p className="text-[10px] italic h-14">Materai Rp. 10.000,-</p>
                        <p className="uppercase">[ {formData.jenis_kelamin === 'Perempuan' ? formData.nama : formData.nama_pasangan || '…………………………'} ]</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
