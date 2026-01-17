import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassPanel from '../components/GlassPanel';
import TechInput from '../components/TechInput';
import NeonButton from '../components/NeonButton';
import Logo from '../components/Logo';

const FlowerAnimation = () => (
    <svg width="180" height="180" viewBox="0 0 100 100" className="mx-auto">
        <g className="origin-center" style={{ animation: 'bloom-petals 4s ease-out forwards' }}>
            {/* Petals Layer 1 */}
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
                    className="blur-[1px]"
                />
            ))}
            {/* Petals Layer 2 (Offset) */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                <ellipse
                    key={`l2-${i}`}
                    cx="50"
                    cy="30"
                    rx="6"
                    ry="15"
                    fill="#FF6B35"
                    transform={`rotate(${angle} 50 50)`}
                    opacity="0.7"
                />
            ))}
            <circle cx="50" cy="50" r="12" fill="url(#centerGradient)" />
        </g>
        <defs>
            <linearGradient id="petalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="50%" stopColor="#FF9B6B" />
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
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="ambient-light" />
            <div className="grid-overlay" />

            {/* Centered Split Card */}
            <div className="w-full max-w-5xl h-[600px] flex rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-reveal"
                style={{
                    background: 'rgba(10, 10, 10, 0.8)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 0 50px rgba(0,0,0,0.8)'
                }}>

                {/* Left Side: Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative bg-black/40">
                    {/* Mobile Logo Visibility */}
                    <div className="md:hidden absolute top-6 left-6">
                        <Logo size={40} />
                    </div>

                    <div className="max-w-sm mx-auto w-full">
                        <h2 className="text-3xl font-bold font-mono text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400 mb-8 text-sm">Please enter your details to access the hub.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Username</label>
                                <TechInput
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    required
                                    className="bg-black/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Password</label>
                                <TechInput
                                    name="password"
                                    type="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                    className="bg-black/50"
                                />
                            </div>

                            {error && (
                                <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                    {error}
                                </div>
                            )}

                            <div className="pt-4">
                                <NeonButton type="submit" className="w-full justify-center">
                                    Log In
                                </NeonButton>
                            </div>
                        </form>

                        <p className="mt-8 text-center text-xs text-gray-600">
                            Protected by Bloom AI Authentication
                        </p>
                    </div>
                </div>

                {/* Right Side: Visuals (Hidden on small screens) */}
                <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-900/40 to-black z-0" />

                    {/* Decorative Circles */}
                    <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center p-12">
                        <div className="mb-8 scale-110">
                            <Logo size={120} />
                        </div>

                        <FlowerAnimation />

                        <h1 className="text-4xl font-bold mt-8 mb-4 font-mono tracking-tight"
                            style={{
                                background: 'linear-gradient(135deg, #FF9B6B 0%, #B349C1 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                            Bloom AI
                        </h1>
                        <p className="text-gray-300 font-light text-lg italic opacity-90">
                            "Fai sbocciare il tuo business online"
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
