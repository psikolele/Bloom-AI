import React, { useEffect, useState } from 'react';
import { ExternalLink, Briefcase, MessageSquare, Zap } from 'lucide-react';
import Logo from '../components/Logo';
import LoaderScreen from '../components/LoaderScreen';
import '../styles/Login.css'; // Reusing the split layout styles

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    // Animation Logic (Same as Login but triggered after Loader)
    useEffect(() => {
        if (!loading) {
            // Stage 1: Scale Check Logo
            setTimeout(() => {
                const logoContainer = document.querySelector('.logoContainer');
                if (logoContainer) {
                    logoContainer.style.transform = 'scale(1)';
                }

                // Stage 2: Logo In
                setTimeout(() => {
                    const logoMain = document.querySelector('.logo-main');
                    if (logoMain) logoMain.classList.add('loadIn');

                    // Stage 3: Text In
                    setTimeout(() => {
                        const logoText = document.querySelector('.logo-text');
                        if (logoText) logoText.classList.add('loadIn');

                        const payoff = document.querySelector('.logo-payoff');
                        if (payoff) payoff.classList.add('loadIn');

                        // Stage 4: Expand Accept Container
                        setTimeout(() => {
                            const acceptContainer = document.querySelector('.acceptContainer');
                            if (acceptContainer) {
                                acceptContainer.classList.add('loadIn');
                            }

                            // Stage 5: Content In
                            setTimeout(() => {
                                const formElements = document.querySelectorAll('.app-item, .dashboard-title');
                                formElements.forEach((el, index) => {
                                    setTimeout(() => {
                                        el.classList.add('loadIn');
                                    }, index * 100);
                                });
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
            }, 100);
        }
    }, [loading]);

    const apps = [
        {
            id: 1,
            title: 'Brand Profile',
            desc: 'Manage assets & voice',
            url: 'http://localhost:3000',
            icon: Briefcase,
            active: true,
            color: '#FF6B35'
        },
        {
            id: 2,
            title: 'CaptionFlow',
            desc: 'Generate captions',
            url: 'http://localhost:3001',
            icon: MessageSquare,
            active: true,
            color: '#B349C1'
        },
        {
            id: 3,
            title: 'Growth Analytics',
            desc: 'Coming Soon',
            url: '#',
            icon: Zap,
            active: false,
            color: '#666'
        }
    ];

    return (
        <>
            {loading && <LoaderScreen onAnimationEnd={() => setLoading(false)} />}

            {!loading && (
                <div id="login-body">
                    <div id="container">
                        <div id="inviteContainer">

                            {/* Left Side: Brand & Payoff */}
                            <div className="logoContainer">
                                <div className="logo-main">
                                    <Logo size={120} />
                                </div>
                                <div className="logo-text">Bloom AI</div>
                                <div className="logo-payoff" style={{
                                    marginTop: '10px',
                                    color: '#aaa',
                                    fontSize: '12px',
                                    fontFamily: 'monospace',
                                    opacity: 0,
                                    transition: 'opacity 1s ease',
                                    textAlign: 'center'
                                }}>
                                    "Fai fiorire i tuoi social"
                                </div>
                                <style>{`
                    .logo-payoff.loadIn { opacity: 1; }
                `}</style>
                            </div>

                            {/* Right Side: App List */}
                            <div className="acceptContainer">
                                <div className="h-full flex flex-col justify-center">
                                    <h1 className="dashboard-title" style={{
                                        opacity: 0,
                                        position: 'relative',
                                        left: '-20px',
                                        transition: '0.5s ease',
                                        marginBottom: '30px'
                                    }}>
                                        Select Tool
                                    </h1>

                                    <div className="formContainer">
                                        {apps.map((app) => (
                                            <div
                                                key={app.id}
                                                className="app-item formDiv"
                                                style={{
                                                    marginBottom: '15px',
                                                    cursor: app.active ? 'pointer' : 'default',
                                                    opacity: 0 // handled by JS loadIn
                                                }}
                                            >
                                                <div
                                                    onClick={() => app.active && window.open(app.url, '_blank')}
                                                    className={`p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between group ${!app.active ? 'opacity-50' : ''}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <app.icon size={20} color={app.color} />
                                                        <div>
                                                            <div className="text-white font-bold text-sm tracking-wide font-mono">{app.title}</div>
                                                            <div className="text-[10px] text-gray-400">{app.desc}</div>
                                                        </div>
                                                    </div>
                                                    {app.active && (
                                                        <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="app-item register" style={{ opacity: 0 }}>
                                        <span className="text-xs text-gray-600">Logged in as Admin</span>
                                    </div>

                                    <style>{`
                      .dashboard-title.loadIn, .app-item.loadIn {
                          opacity: 1 !important;
                          left: 0 !important;
                      }
                  `}</style>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
