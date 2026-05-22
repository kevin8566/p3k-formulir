import React, { useRef, useState, useEffect } from 'react';

const useScrollReveal = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
        );
        const el = ref.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);
    return { ref, isVisible };
};

// All icons use document style with different color accents
const DocIcon = ({ color, lines }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24">
        {/* Page body */}
        <path d="M6 2h8.586a1 1 0 01.707.293l3.414 3.414A1 1 0 0119 6.414V21a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" fill={`${color}15`} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Folded corner */}
        <path d="M14 2v5h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Content lines */}
        {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color} strokeWidth={l.w || 1.5} strokeLinecap="round" opacity={l.op || 1}/>
        ))}
    </svg>
);

const IconKTP = () => <DocIcon color="#3B82F6" lines={[
    {x1:8,y1:10,x2:16,y2:10}, {x1:8,y1:13,x2:14,y2:13,op:0.6}, {x1:8,y1:16,x2:12,y2:16,op:0.4}
]}/>;
const IconKK = () => <DocIcon color="#10B981" lines={[
    {x1:8,y1:10,x2:16,y2:10}, {x1:8,y1:13,x2:16,y2:13,op:0.6}, {x1:8,y1:16,x2:13,y2:16,op:0.4}
]}/>;
const IconKTPPasangan = () => <DocIcon color="#EC4899" lines={[
    {x1:8,y1:10,x2:14,y2:10}, {x1:8,y1:13,x2:16,y2:13,op:0.6}, {x1:8,y1:16,x2:11,y2:16,op:0.4}
]}/>;
const IconSuratNikah = () => <DocIcon color="#F59E0B" lines={[
    {x1:8,y1:10,x2:16,y2:10,w:2}, {x1:8,y1:13,x2:15,y2:13,op:0.6}, {x1:8,y1:16,x2:12,y2:16,op:0.4}
]}/>;
const IconIjazah = () => <DocIcon color="#8B5CF6" lines={[
    {x1:8,y1:10,x2:16,y2:10}, {x1:8,y1:13,x2:16,y2:13,op:0.6}, {x1:8,y1:16,x2:16,y2:16,op:0.4}
]}/>;
const IconSK = () => <DocIcon color="#6366F1" lines={[
    {x1:8,y1:10,x2:16,y2:10,w:2}, {x1:8,y1:13,x2:16,y2:13,op:0.6}, {x1:8,y1:16,x2:14,y2:16,op:0.4}
]}/>;
const IconNPWP = () => <DocIcon color="#F97316" lines={[
    {x1:8,y1:10,x2:16,y2:10}, {x1:8,y1:13,x2:13,y2:13,op:0.6}, {x1:8,y1:16,x2:15,y2:16,op:0.4}
]}/>;

const DOC_LIST = [
    { key: 'ktp',          label: 'KTP',                 Icon: IconKTP,        color: '#3B82F6' },
    { key: 'kk',           label: 'Kartu Keluarga',      Icon: IconKK,         color: '#10B981' },
    { key: 'ktp_pasangan', label: 'KTP Pasangan',        Icon: IconKTPPasangan,color: '#EC4899' },
    { key: 'surat_nikah',  label: 'Surat Nikah',         Icon: IconSuratNikah, color: '#F59E0B' },
    { key: 'ijazah',       label: 'Ijazah Terakhir',     Icon: IconIjazah,     color: '#8B5CF6' },
    { key: 'sk',           label: 'SK',                  Icon: IconSK,         color: '#6366F1' },
    { key: 'npwp',         label: 'NPWP',                Icon: IconNPWP,       color: '#F97316' },
];

const isImage = (file) => file && file.type.startsWith('image/');

const FileCard = ({ docKey, label, Icon, color }) => {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [pressed, setPressed] = useState(false);

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;
        setFile(selectedFile);
        if (isImage(selectedFile)) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        handleFile(dropped);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div 
            className={`flex flex-col transform transition-all duration-200 ${pressed ? 'scale-[0.96]' : 'scale-100'}`}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            onTouchStart={() => setPressed(true)}
            onTouchEnd={() => setPressed(false)}
        >
            <input
                ref={inputRef}
                id={`file-${docKey}`}
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => handleFile(e.target.files[0])}
            />

            {/* Card Area */}
            <div
                onClick={() => !file && inputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 group
                    ${file
                        ? 'border-green-300 bg-green-50/30 cursor-default shadow-md'
                        : dragging
                            ? 'scale-[1.02] shadow-xl cursor-copy'
                            : 'border-dashed border-gray-200 bg-gray-50 hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                    }`}
                style={{
                    minHeight: '180px',
                    borderColor: dragging ? color : undefined,
                    backgroundColor: dragging ? `${color}10` : undefined,
                }}
            >
                {/* Hover border glow effect */}
                {!file && (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 0 2px ${color}` }} />
                )}

                {/* Preview / Placeholder */}
                {preview ? (
                    <img src={preview} alt={label} className="w-full h-44 object-cover" />
                ) : file ? (
                    <div className="flex flex-col items-center justify-center h-44 gap-2 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24">
                            <path d="M6 2h8.586a1 1 0 01.707.293l3.414 3.414A1 1 0 0119 6.414V21a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" fill="#22c55e20" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2v5h5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 13l2 2 4-4" stroke="#22c55e"/>
                        </svg>
                        <p className="text-sm font-semibold text-gray-700 text-center break-all">{file.name}</p>
                        <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-44 gap-3 p-4">
                        <div className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 drop-shadow-sm">
                            <Icon />
                        </div>
                        <div 
                            className="mt-1 px-3 py-1 rounded-full bg-white border text-[10px] font-bold transition-all duration-200 group-hover:shadow-sm"
                            style={{ borderColor: color, color: color }}
                        >
                            Pilih File
                        </div>
                    </div>
                )}

                {/* Status badge */}
                {file && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Terunggah
                    </div>
                )}

                {/* Actions on uploaded */}
                {file && (
                    <div className="absolute top-2 right-2 flex gap-1.5">
                        <button
                            onClick={() => inputRef.current.click()}
                            className="bg-white/90 hover:bg-white text-gray-600 hover:text-[#0B1121] rounded-lg p-1.5 shadow transition-all"
                            title="Ganti file"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </button>
                        <button
                            onClick={handleRemove}
                            className="bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-lg p-1.5 shadow transition-all"
                            title="Hapus file"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Label */}
            <div className="mt-3 flex items-center gap-1.5">
                <span className="w-4 h-4 shrink-0 [&>svg]:w-4 [&>svg]:h-4"><Icon /></span>
                <span className="text-xs font-bold text-gray-700 truncate">{label}</span>
            </div>
            {file && (
                <p className="text-[10px] text-green-600 font-medium mt-0.5 truncate">{file.name}</p>
            )}
        </div>
    );
};

export default function PengajuanDokumen() {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div ref={ref} className={`transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-[#FFC800] rounded-full"></div>
                    Dokumen Pendukung
                </h3>
                <p className="text-xs text-gray-500 mt-1 ml-4">Unggah dokumen dalam format JPG, PNG, atau PDF. Klik atau seret file ke area yang tersedia.</p>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5">
                {DOC_LIST.map((doc, i) => (
                    <div
                        key={doc.key}
                        className="transform transition-all duration-500 ease-out"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                            transitionDelay: isVisible ? `${i * 80}ms` : '0ms',
                        }}
                    >
                        <FileCard docKey={doc.key} label={doc.label} Icon={doc.Icon} color={doc.color} />
                    </div>
                ))}
            </div>
        </div>
    );
}
