import React from 'react';
import Logo from './Logo';

const LoaderScreen = ({ onAnimationEnd }) => {
    return (
        <div
            className="loader-overlay"
            style={{ animation: 'fadeOut 0.5s ease-out forwards 2.5s' }}
            onAnimationEnd={(e) => {
                if (e.animationName === 'fadeOut') {
                    onAnimationEnd();
                }
            }}
        >
            <div className="flex flex-col items-center justify-center relative">

                {/* Rotating Neon Ring */}
                <div className="absolute inset-0 w-[180px] h-[180px] -translate-x-[30px] -translate-y-[30px] rounded-full">
                    <div className="w-full h-full rounded-full border-[3px] border-transparent border-t-[#FF6B35] border-r-[#B349C1] border-b-[#FF6B35] border-l-[#B349C1] blur-md animate-spin-slow"></div>
                </div>

                {/* Scale Up Logo */}
                <div style={{ animation: 'scaleUp 1s ease-out', position: 'relative', zIndex: 10 }}>
                    <Logo size={120} />
                </div>

                {/* Brand Text */}
                <div
                    className="mt-8 font-mono text-3xl font-bold opacity-0 tracking-widest uppercase"
                    style={{
                        animation: 'fadeIn 1s ease-out forwards 0.5s',
                        fontFamily: '"Space Grotesk", sans-serif',
                        background: 'linear-gradient(135deg, #FF9B6B 0%, #FF7B4D 25%, #5B9FE3 50%, #B349C1 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Bloom AI
                </div>
            </div>

            <style>{`
        .loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #030303;
            z-index: 99999;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        @keyframes fadeOut {
            to { opacity: 0; visibility: hidden; }
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes scaleUp {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }
        @keyframes spin-slow {
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default LoaderScreen;
