import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import NeonButton from '../components/NeonButton';
import Logo from '../components/Logo';

const FlowerAnimation = () => (
    <svg width="200" height="200" viewBox="0 0 100 100" className="mx-auto relative z-10">
        <g className="origin-center" style={{ animation: 'bloom-petals 4s ease-out forwards' }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse
                    key={`l1-${i}`}
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="25"
                    fill="url(#petalGradient)"
                    transform={`rotate(${angle} 50 50)`}
                    opacity="0.9"
                />
            ))}
            <circle cx="50" cy="50" r="12" fill="url(#centerGradient)" />
        </g>
        <defs>
            <linearGradient id="petalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#B349C1" />
            </linearGradient>
            <radialGradient id="centerGradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="100%" stopColor="#FFD700" />
            </radialGradient>
        </defs>
    </svg>
);

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'admin') {
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030303] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/40 blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-600/20 blur-[100px]" />
            </div>

            {/* Main Card Container - Fixed Dimensions to match Wardiere style */}
            <div className="w-[900px] h-[600px] bg-white rounded-[30px] overflow-hidden shadow-2xl flex relative z-10 animate-reveal">

                {/* Left Side - Form (White Theme as per request "Exactly like image 2" structure, but adapted closely) 
            Wait, if I use WHITE theme it breaks "Dark Mode" guidelines. 
            User said "con lo stile e le brand guidelines". 
            Brand guidelines say "Dark Mode First".
            I will use a VERY DARK GREY instead of White for the left side to respect brand, 
            but keep the LAYOUT exactly identical.
        */}
                <div className="w-1/2 bg-[#0A0A0A] p-12 flex flex-col justify-center relative">

                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-8">
                            <Logo size={32} />
                            <span className="text-xl font-bold font-mono text-white tracking-tight">Bloom AI</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2 font-mono">Log in</h2>
                        <p className="text-gray-500 text-sm">Welcome back to your marketing hub.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Input with Icon */}
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF6B35] transition-colors" size={20} />
                            <input
                                name="username"
                                type="text"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full bg-[#1A1A1A] border border-gray-800 text-white rounded-full py-3.5 pl-12 pr-6 outline-none focus:border-[#FF6B35] transition-all placeholder:text-gray-600"
                                required
                            />
                        </div>

                        {/* Password Input with Icon */}
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF6B35] transition-colors" size={20} />
                            <input
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full bg-[#1A1A1A] border border-gray-800 text-white rounded-full py-3.5 pl-12 pr-6 outline-none focus:border-[#FF6B35] transition-all placeholder:text-gray-600"
                                required
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm text-gray-400 px-2">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="rounded border-gray-700 bg-[#1A1A1A] text-[#FF6B35] focus:ring-[#FF6B35]" />
                                Remember Me
                            </label>
                            <a href="#" className="hover:text-[#FF6B35] transition-colors">Forgot Password?</a>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <NeonButton type="submit" className="w-full rounded-full py-4 text-base shadow-lg shadow-orange-500/20">
                            Log in
                        </NeonButton>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        or <a href="#" className="text-white hover:text-[#FF6B35]">Sign up</a>
                    </div>
                </div>

                {/* Right Side - Visuals (Purple Gradient + Shapes) */}
                <div className="w-1/2 bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center">
                    {/* The Diagonal Shapes Background */}
                    <div className="absolute inset-0 bg-[#0A0A0A]">
                        {/* Gradient Shape 1 */}
                        <div className="absolute top-[-20%] right-[-20%] w-[150%] h-[150%] bg-gradient-to-bl from-[#B349C1] to-[#5B9FE3] rounded-[100px] transform rotate-[-45deg] opacity-20 blur-xl" />

                        {/* Main Diagonal Pill */}
                        <div className="absolute top-[-10%] right-[-50%] w-[100%] h-[150%] bg-gradient-to-bl from-[#4a0e4e] to-[#2e0935] transform rotate-[-45deg] rounded-[100px] shadow-2xl border-l border-white/10"
                            style={{
                                background: 'linear-gradient(225deg, rgba(80, 20, 100, 0.9) 0%, rgba(18, 18, 18, 0.95) 100%)'
                            }}
                        />

                        {/* Floating Elements (Wardiere style shapes) */}
                        <div className="absolute top-[10%] right-[-10%] w-[400px] h-[120px] bg-gradient-to-r from-[#FF6B35] to-[#B349C1] rounded-full transform rotate-[-45deg] opacity-60 blur-2xl" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col items-center">
                        <FlowerAnimation />
                        <h1 className="text-3xl font-bold text-white mt-8 font-mono">Fai sbocciare il tuo brand</h1>
                        <p className="text-white/60 mt-2 text-center max-w-xs">
                            Access your intelligence hub.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
