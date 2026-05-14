import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulasi proses login
        setTimeout(() => {
            // Untuk sekarang kita anggap login selalu berhasil
            // Nanti bisa ditambah validasi username & password
            setLoading(false);
            navigate('/admin', { replace: true });   // ← Sambungan ke Halaman Admin
        }, 1300);
    };

    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 animate-slide-up">
            <div className="text-center mb-8">
                <img 
                    src="/src/assets/logo-final.png" 
                    alt="Bank Karanganyar" 
                    className="h-16 w-auto mx-auto mb-6 drop-shadow-xl" 
                />
                <h1 className="text-3xl font-bold text-gray-800">Selamat Datang</h1>
                <p className="text-gray-500 mt-2">Masuk ke Sistem Admin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Username / NIP</label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Masukkan username atau NIP"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Masukkan password"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Lupa Password?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#152042] to-[#0B1171] text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-lg"
                >
                    {loading ? 'Sedang Masuk...' : 'Masuk ke Dashboard'}
                </button>
            </form>
        </div>
    );
}