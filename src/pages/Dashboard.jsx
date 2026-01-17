import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Logo from '../components/Logo';
import LoaderScreen from '../components/LoaderScreen';
import SplitLink from '../components/SplitLink';
import '../styles/Login.css'; // Base styles
import '../styles/Dashboard.css'; // Specific dashboard overrides

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const username = location.state?.username || 'user'; // Default to 'user' if direct access
    const isAdmin = username === 'admin';

    useEffect(() => {
        if (!loading) {
            // Animation Sequence
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
                                // Fade in links
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
                        {/* Added dashboard-size class for larger layout */}
                        <div id="inviteContainer" className="dashboard-size">

                            {/* Left Side: Brand */}
                            <div className="logoContainer">
                                <div className="logo-main">
                                    <Logo size={160} />
                                </div>
                                <div className="logo-text" style={{ fontSize: '3rem' }}>Bloom AI</div>
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
                            <div className="acceptContainer flex flex-col justify-center">
                                <div className="p-12 h-full flex flex-col justify-center">
                                    <h2 className="text-gray-500 font-mono mb-12 uppercase tracking-widest text-sm">Select Application</h2>

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

                                    <div className="mt-auto pt-12 text-right">
                                        <span className="text-xs font-mono text-gray-600">
                                            Logged in as: <span className="text-[#FF6B35]">{username}</span> • v1.0.1
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
