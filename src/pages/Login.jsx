import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import Logo from '../components/Logo';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Animation states
    const [logoScale, setLogoScale] = useState(false);
    const [logoVisible, setLogoVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [fieldsVisible, setFieldsVisible] = useState(false);

    // Progressive animation on mount
    useEffect(() => {
        const timer1 = setTimeout(() => setLogoScale(true), 100);
        const timer2 = setTimeout(() => setLogoVisible(true), 600);
        const timer3 = setTimeout(() => setTextVisible(true), 1000);
        const timer4 = setTimeout(() => setFieldsVisible(true), 1400);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Authentication logic - ready for N8N integration
        // TODO: Replace with N8N webhook endpoint
        // N8N Webhook URL: https://your-n8n-instance.com/webhook/bloom-auth
        // Expected payload: { email: string, password: string }
        // Expected response: { success: boolean, token?: string, user?: object }

        if (credentials.email === 'admin@bloom.ai' && credentials.password === 'admin') {
            // TODO: Store auth token in localStorage
            // localStorage.setItem('bloom_auth_token', response.token);
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030303] relative overflow-hidden">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)',
                    filter: 'blur(0px)'
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Two-Panel Login Container - Fixed Dimensions */}
            <div
                className="flex rounded-lg overflow-hidden shadow-2xl relative z-10 transition-all duration-700 ease-out"
                style={{
                    width: '680px',
                    height: '431.5px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                    opacity: logoScale ? 1 : 0,
                    transform: logoScale ? 'scale(1)' : 'scale(0.8)'
                }}>

                {/* Logo Panel - Left Side */}
                <div
                    className="relative overflow-hidden flex items-center justify-center flex-col px-12 py-12"
                    style={{
                        width: '280px',
                        minWidth: '280px'
                    }}
                >
                    {/* Blurred background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)',
                            filter: 'blur(10px)',
                            transform: 'scale(1.5)'
                        }}
                    />

                    {/* White overlay */}
                    <div className="absolute inset-0 bg-white/80" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo */}
                        <div
                            className="mb-4 transition-all duration-800 ease-out"
                            style={{
                                opacity: logoVisible ? 1 : 0,
                                transform: logoVisible ? 'translateY(0)' : 'translateY(-20px)'
                            }}
                        >
                            <Logo size={120} />
                        </div>

                        {/* Brand Text */}
                        <div
                            className="transition-all duration-800 ease-out"
                            style={{
                                opacity: textVisible ? 1 : 0,
                                marginTop: textVisible ? '0' : '-70px'
                            }}
                        >
                            <h1 className="text-3xl font-bold font-mono tracking-tight"
                                style={{
                                    background: 'var(--gradient-logo)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                Bloom AI
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Form Panel - Right Side */}
                <div
                    className="relative overflow-hidden"
                    style={{
                        width: '400px',
                        minWidth: '400px'
                    }}
                >
                    {/* Blurred background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)',
                            filter: 'blur(10px)',
                            transform: 'scale(1.5)'
                        }}
                    />

                    {/* Dark overlay with glassmorphism */}
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

                    {/* Form Content */}
                    <div className="relative z-10 p-12 h-full">
                        <form onSubmit={handleSubmit} className="h-full flex flex-col">
                            {/* Title */}
                            <h1
                                className="text-white font-bold text-xl mb-4 font-mono tracking-tight transition-all duration-500 ease-out"
                                style={{
                                    opacity: fieldsVisible ? 1 : 0,
                                    position: 'relative',
                                    left: fieldsVisible ? '0' : '-30px'
                                }}
                            >
                                WELCOME BACK!
                            </h1>

                            {/* Email Input */}
                            <div
                                className="mb-7 transition-all duration-500 ease-out"
                                style={{
                                    opacity: fieldsVisible ? 1 : 0,
                                    position: 'relative',
                                    left: fieldsVisible ? '0' : '-25px',
                                    transitionDelay: '0.2s'
                                }}
                            >
                                <label className="block text-[#aaa] text-[10px] font-bold mb-1 tracking-wider">
                                    EMAIL
                                </label>
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none text-white py-4 outline-none transition-all duration-200"
                                        style={{
                                            boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.15)'
                                        }}
                                        onFocus={(e) => e.target.style.boxShadow = 'inset 0 -2px 0 #fff'}
                                        onBlur={(e) => e.target.style.boxShadow = 'inset 0 -1px 0 rgba(255,255,255,0.15)'}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div
                                className="mb-7 transition-all duration-500 ease-out"
                                style={{
                                    opacity: fieldsVisible ? 1 : 0,
                                    position: 'relative',
                                    left: fieldsVisible ? '0' : '-25px',
                                    transitionDelay: '0.4s'
                                }}
                            >
                                <label className="block text-[#aaa] text-[10px] font-bold mb-1 tracking-wider">
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none text-white py-4 outline-none transition-all duration-200"
                                        style={{
                                            boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.15)'
                                        }}
                                        onFocus={(e) => e.target.style.boxShadow = 'inset 0 -2px 0 #fff'}
                                        onBlur={(e) => e.target.style.boxShadow = 'inset 0 -1px 0 rgba(255,255,255,0.15)'}
                                    />
                                </div>
                                <a
                                    href="#"
                                    className="text-[#aaa] text-[10px] font-bold mt-4 block opacity-80 hover:opacity-100 hover:text-white transition-all duration-200"
                                    style={{ textDecoration: 'none' }}
                                >
                                    FORGOT YOUR PASSWORD?
                                </a>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-400 text-sm mb-4 text-center bg-red-500/10 border border-red-500/20 py-2 px-3 rounded">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div
                                className="mt-2 transition-all duration-500 ease-out"
                                style={{
                                    opacity: fieldsVisible ? 1 : 0,
                                    position: 'relative',
                                    left: fieldsVisible ? '0' : '-25px',
                                    transitionDelay: '0.6s'
                                }}
                            >
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 text-white font-bold rounded cursor-pointer transition-all duration-200 border-none"
                                    style={{
                                        background: isLoading ? '#5a6d9e' : '#FF6B35',
                                        opacity: isLoading ? 0.7 : 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isLoading) e.target.style.background = '#e55d2e';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isLoading) e.target.style.background = '#FF6B35';
                                    }}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Loading...
                                        </span>
                                    ) : 'Login'}
                                </button>

                                {/* Register Link */}
                                <div className="text-[#aaa] text-xs text-center pt-4">
                                    Need an account?{' '}
                                    <a
                                        href="#"
                                        className="text-white ml-1 pb-1 transition-all duration-200 hover:text-[#FF6B35]"
                                        style={{
                                            textDecoration: 'none',
                                            boxShadow: 'inset 0 -2px 0 transparent'
                                        }}
                                        onMouseEnter={(e) => e.target.style.boxShadow = 'inset 0 -2px 0 #FF6B35'}
                                        onMouseLeave={(e) => e.target.style.boxShadow = 'inset 0 -2px 0 transparent'}
                                    >
                                        Register
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
