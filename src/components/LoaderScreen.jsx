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

                {/* Rotating Neon Ring Removed (Now inside Logo component) */}

                {/* Scale Up Logo */}
                <div style={{ animation: 'scaleUp 1s ease-out', position: 'relative', zIndex: 10 }}>
                    <Logo size={120} />
                </div>

                {/* Brand Text Removed as per request (Icon Only) */}
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
