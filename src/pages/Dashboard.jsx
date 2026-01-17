import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import LoaderScreen from '../components/LoaderScreen';
import SplitLink from '../components/SplitLink';
import '../styles/Login.css';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const username = location.state?.username || 'user'; // Default to 'user'
    const isAdmin = username === 'admin';

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                const logoContainer = document.querySelector('.logoContainer');
                if (logoContainer) logoContainer.style.transform = 'scale(1)';

                setTimeout(() => {
                    document.querySelector('.logo-main')?.classList.add('loadIn');

                    setTimeout(() => {
                        document.querySelector('.logo-text')?.classList.add('loadIn');
                        document.querySelector('.logo-payoff')?.classList.add('loadIn');

                        setTimeout(() => {
                            const acceptContainer = document.querySelector('.acceptContainer');
                            if (acceptContainer) acceptContainer.classList.add('loadIn');

                            setTimeout(() => {
                                const links = document.querySelector('.dashboard-links');
                                if (links) links.style.opacity = 1;
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
            }, 100);
        }
    }, [loading]);

    return (
        <>
            {loading && <LoaderScreen onAnimationEnd={() => setLoading(false)} />}

            {!loading && (
                <div id="login-body">
                    <div id="container">
                        <div id="inviteContainer" className="dashboard-size">

                            {/* NEW: Glint Overlay for surface shine */}
                            <div className="glint-overlay"></div>

                            {/* Left Side: Brand */}
                            <div className="logoContainer">
                                <div className="logo-main">
                                    <Logo size={160} />
                                </div>
                                <div
                                    className="logo-text"
                                    style={{
                                        fontSize: '3rem',
                                        background: 'linear-gradient(135deg, #FF9B6B 0%, #FF7B4D 25%, #5B9FE3 50%, #B349C1 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Bloom AI
                                </div>
                                <div className="logo-payoff" style={{
                                    marginTop: '15px',
                                    color: '#aaa',
                                    fontSize: '16px',
                                    fontFamily: 'monospace',
                                    opacity: 0,
                                    transition: 'opacity 1s ease',
                                    textAlign: 'center'
                                }}>
                                    "Fai fiorire i tuoi social"
                                </div>
                                <style>{` .logo-payoff.loadIn { opacity: 1; } `}</style>
                            </div>

                            {/* Right Side: Split Text Links */}
                            <div className="acceptContainer">
                                <div className="h-full flex flex-col justify-center px-12 w-full">
                                    {/* h-full and justify-center are key here for vertical alignment */}

                                    <nav className="dashboard-links" style={{ opacity: 0, transition: 'opacity 1s ease' }}>

                                        <SplitLink
                                            href="https://caption-flow-nu.vercel.app/"
                                            fontWidth={125}
                                        >
                                            CaptionFlow
                                        </SplitLink>

                                        <SplitLink
                                            href="https://social-media-client-sooty-ten.vercel.app/"
                                            fontWidth={110}
                                        >
                                            MarketingFlow
                                        </SplitLink>

                                        {isAdmin && (
                                            <SplitLink
                                                href="https://web-app-brand-profile.vercel.app/"
                                                fontWidth={115}
                                            >
                                                Brand Profile
                                            </SplitLink>
                                        )}

                                    </nav>

                                    <div className="mt-24 text-right opacity-50">
                                        {/* Added margin-top to separate footer from centered content */}
                                        <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">
                                            System Online &bull; {username === 'admin' ? 'Admin Mode' : 'User Mode'}
                                        </span>
                                    </div>
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
