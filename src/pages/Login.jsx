import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassPanel from '../components/GlassPanel';
import TechInput from '../components/TechInput';
import NeonButton from '../components/NeonButton';
import Logo from '../components/Logo';

const FlowerAnimation = () => (
    <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto mb-6">
        <g className="origin-center" style={{ animation: 'bloom-petals 3s ease-out forwards' }}>
            {/* Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse
                    key={i}
                    cx="50"
                    cy="20"
                    rx="10"
                    ry="20"
                    fill="url(#petalGradient)"
                    transform={`rotate(${angle} 50 50)`}
                    opacity="0.9"
                />
            ))}
            <circle cx="50" cy="50" r="10" fill="#FFD700" />
        </g>
        <defs>
            <linearGradient id="petalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#B349C1" />
            </linearGradient>
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
        // TODO: Replace with real auth against users.json or backend
        if (credentials.username === 'admin' && credentials.password === 'admin') {
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="ambient-light" />
            <div className="grid-overlay" />

            <div className="container mx-auto px-4 max-w-md relative z-10 animate-reveal">
                <div className="text-center mb-10">
                    <FlowerAnimation />
                    <h1 className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-purple-500"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            backgroundImage: 'var(--gradient-logo)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                        Bloom
                    </h1>
                    <p className="text-xl text-gray-400 font-light tracking-wide">Fai sbocciare il tuo business online</p>
                </div>

                <GlassPanel className="w-full backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-2 tracking-widest uppercase">Username</label>
                            <TechInput
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-2 tracking-widest uppercase">Password</label>
                            <TechInput
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-400" />
                                {error}
                            </div>
                        )}

                        <NeonButton type="submit" className="w-full">
                            Access Hub
                        </NeonButton>
                    </form>
                </GlassPanel>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm font-light">
                        Powered by <span className="text-accent-primary">Bloom AI</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
