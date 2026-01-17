import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import NeonButton from '../components/NeonButton';
import Logo from '../components/Logo';

// Enhanced Flower Animation with more petals and glow
const FlowerAnimation = () => (
    <div className="relative">
        <svg width="250" height="250" viewBox="0 0 100 100" className="mx-auto relative z-10">
            <g className="origin-center" style={{ animation: 'bloom-petals 4s ease-out forwards' }}>
                {/* Outer petals layer */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                    <ellipse
                        key={`outer-${i}`}
                        cx="50"
                        cy="15"
                        rx="6"
                        ry="28"
                        fill="url(#petalGradientOuter)"
                        transform={`rotate(${angle} 50 50)`}
                        opacity="0.6"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    />
                ))}
                {/* Inner petals layer */}
                {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => (
                    <ellipse
                        key={`inner-${i}`}
                        cx="50"
                        cy="20"
                        rx="8"
                        ry="25"
                        fill="url(#petalGradient)"
                        transform={`rotate(${angle} 50 50)`}
                        opacity="0.9"
                        style={{ animationDelay: `${i * 0.08}s` }}
                    />
                ))}
                {/* Center with glow */}
                <circle cx="50" cy="50" r="14" fill="url(#centerGradient)" opacity="0.8" />
                <circle cx="50" cy="50" r="10" fill="url(#centerGradient)" />
            </g>
            <defs>
                <linearGradient id="petalGradientOuter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF9B6B" />
                    <stop offset="50%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#5B9FE3" />
                </linearGradient>
                <linearGradient id="petalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#B349C1" />
                </linearGradient>
                <radialGradient id="centerGradient" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FF6B35" />
                </radialGradient>
            </defs>
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl opacity-40 animate-pulse"
            style={{
                background: 'radial-gradient(circle, rgba(255, 107, 53, 0.6) 0%, rgba(179, 73, 193, 0.4) 50%, transparent 70%)'
            }}
        />
    </div>
);

// Floating particles component
const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-white/20 animate-float"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (error) setError(''); // Clear error on input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 800));

        if (credentials.username === 'admin' && credentials.password === 'admin') {
            navigate('/dashboard');
        } else {
            setError('Credenziali non valide');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030303] relative overflow-hidden">
            {/* Enhanced Ambient Background with Animated Gradients */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/50 blur-[150px] animate-pulse"
                    style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-600/30 blur-[150px] animate-pulse"
                    style={{ animationDuration: '6s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] animate-pulse"
                    style={{ animationDuration: '10s' }} />
            </div>

            {/* Animated Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none grid-overlay" />

            {/* Main Glassmorphic Card Container */}
            <div className="w-[800px] max-w-[50vw] h-[600px] max-h-[85vh] rounded-[40px] overflow-hidden shadow-2xl flex relative z-10 backdrop-blur-xl"
                style={{
                    background: 'rgba(10, 10, 10, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 0 80px rgba(255, 107, 53, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.02)',
                    animation: 'reveal 0.8s ease-out, scale-in 0.8s ease-out'
                }}>

                {/* Left Side - Form Section with Glassmorphism */}
                <div className="w-1/2 p-10 flex flex-col justify-center relative backdrop-blur-md"
                    style={{
                        background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>

                    {/* Subtle glow effect on form side */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-orange-600/10 blur-[100px] animate-pulse"
                            style={{ animationDuration: '4s' }} />
                    </div>

                    <div className="mb-8 relative z-10 animate-slide-up">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="animate-glow-pulse">
                                <Logo size={40} />
                            </div>
                            <span className="text-2xl font-bold font-mono tracking-tight"
                                style={{
                                    background: 'var(--gradient-logo)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                Bloom AI
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-3 font-mono tracking-tight">Welcome Back</h2>
                        <p className="text-gray-400 text-base">Please enter your details to access the hub.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {/* Username Input with Enhanced Design */}
                        <div className="relative group">
                            <label className="block text-xs font-mono font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                Username
                            </label>
                            <User className="absolute left-4 bottom-4 text-gray-500 group-focus-within:text-[#FF6B35] transition-all duration-300" size={20} />
                            <input
                                name="username"
                                type="text"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                disabled={isLoading}
                                className="w-full bg-black/30 border border-white/10 text-white rounded-2xl py-3.5 pl-12 pr-6 outline-none focus:border-[#FF6B35] focus:bg-black/50 transition-all duration-300 placeholder:text-gray-600 backdrop-blur-sm"
                                style={{
                                    boxShadow: '0 0 0 0 rgba(255, 107, 53, 0)'
                                }}
                                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1), 0 0 20px rgba(255, 107, 53, 0.15)'}
                                onBlur={(e) => e.target.style.boxShadow = '0 0 0 0 rgba(255, 107, 53, 0)'}
                                required
                            />
                        </div>

                        {/* Password Input with Toggle Visibility */}
                        <div className="relative group">
                            <label className="block text-xs font-mono font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                Password
                            </label>
                            <Lock className="absolute left-4 bottom-4 text-gray-500 group-focus-within:text-[#FF6B35] transition-all duration-300" size={20} />
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                disabled={isLoading}
                                className="w-full bg-black/30 border border-white/10 text-white rounded-2xl py-3.5 pl-12 pr-12 outline-none focus:border-[#FF6B35] focus:bg-black/50 transition-all duration-300 placeholder:text-gray-600 backdrop-blur-sm"
                                style={{
                                    boxShadow: '0 0 0 0 rgba(255, 107, 53, 0)'
                                }}
                                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1), 0 0 20px rgba(255, 107, 53, 0.15)'}
                                onBlur={(e) => e.target.style.boxShadow = '0 0 0 0 rgba(255, 107, 53, 0)'}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 bottom-4 text-gray-500 hover:text-[#FF6B35] transition-colors duration-300"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm px-1">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded-md border-2 border-gray-700 bg-black/30 checked:bg-[#FF6B35] checked:border-[#FF6B35] transition-all cursor-pointer appearance-none"
                                        style={{
                                            backgroundImage: 'none'
                                        }}
                                    />
                                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-medium">Remember Me</span>
                            </label>
                            <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors font-medium">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Error Message with Animation */}
                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 py-3 px-4 rounded-2xl animate-slide-up backdrop-blur-sm">
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        {/* Submit Button with Loading State */}
                        <div className="pt-2">
                            <NeonButton
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-2xl py-4 text-base font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 relative overflow-hidden group transition-all duration-300"
                                style={{
                                    opacity: isLoading ? 0.7 : 1,
                                    transform: isLoading ? 'scale(0.98)' : 'scale(1)'
                                }}
                            >
                                {/* Shimmer effect overlay */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                                <span className="relative z-10">
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Loading...
                                        </span>
                                    ) : (
                                        'Log in'
                                    )}
                                </span>
                            </NeonButton>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500 relative z-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        or{' '}
                        <a href="#" className="text-white hover:text-[#FF6B35] transition-colors font-medium">
                            Sign up
                        </a>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent" />
                </div>

                {/* Right Side - Visual Experience with Advanced Animations */}
                <div className="w-1/2 relative overflow-hidden flex items-center justify-center"
                    style={{
                        background: 'linear-gradient(225deg, rgba(18, 18, 18, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)'
                    }}>

                    {/* Floating Particles */}
                    <FloatingParticles />

                    {/* Animated Gradient Shapes */}
                    <div className="absolute inset-0">
                        {/* Large diagonal shape with gradient */}
                        <div className="absolute top-[-15%] right-[-60%] w-[130%] h-[180%] rounded-[120px] transform rotate-[-45deg] shadow-2xl animate-gradient"
                            style={{
                                background: 'linear-gradient(135deg, rgba(179, 73, 193, 0.4) 0%, rgba(91, 159, 227, 0.3) 50%, rgba(255, 107, 53, 0.2) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                        />

                        {/* Secondary animated shape */}
                        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[150px] bg-gradient-to-r from-[#FF6B35]/40 via-[#B349C1]/30 to-[#5B9FE3]/20 rounded-full transform rotate-[-45deg] blur-2xl animate-pulse"
                            style={{ animationDuration: '5s' }}
                        />

                        {/* Accent glow 1 */}
                        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[#FF6B35]/20 rounded-full blur-3xl animate-float"
                            style={{ animationDuration: '8s' }}
                        />

                        {/* Accent glow 2 */}
                        <div className="absolute top-[30%] right-[20%] w-[250px] h-[250px] bg-[#5B9FE3]/15 rounded-full blur-3xl animate-float"
                            style={{ animationDuration: '10s', animationDelay: '2s' }}
                        />
                    </div>

                    {/* Content Overlay with Stagger Animation */}
                    <div className="relative z-10 flex flex-col items-center px-12 text-center">
                        <div className="animate-scale-in mb-8" style={{ animationDelay: '0.2s' }}>
                            <FlowerAnimation />
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-4 font-mono tracking-tight animate-slide-up"
                            style={{
                                animationDelay: '0.4s',
                                textShadow: '0 0 40px rgba(255, 107, 53, 0.3)'
                            }}>
                            Fai sbocciare il tuo business online
                        </h1>

                        <p className="text-white/70 text-base max-w-sm leading-relaxed animate-slide-up"
                            style={{ animationDelay: '0.6s' }}>
                            Accedi al tuo hub di intelligenza marketing e scopri il potenziale del tuo brand.
                        </p>

                        {/* Decorative brand quote */}
                        <div className="mt-10 px-6 py-3 rounded-full animate-fade-in backdrop-blur-sm"
                            style={{
                                animationDelay: '0.8s',
                                background: 'rgba(255, 107, 53, 0.1)',
                                border: '1px solid rgba(255, 107, 53, 0.2)'
                            }}>
                            <span className="text-sm font-mono text-white/60">
                                Protected by{' '}
                                <span className="text-[#FF6B35] font-bold">Bloom AI Authentication</span>
                            </span>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-[#B349C1]/30 to-transparent" />
                </div>

            </div>
        </div>
    );
};

export default Login;
