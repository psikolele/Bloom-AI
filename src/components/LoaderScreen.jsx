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
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div style={{ animation: 'scaleUp 1s ease-out' }}>
                    <Logo size={120} />
                </div>
                <div
                    className="mt-6 font-mono text-xl text-white font-bold opacity-0"
                    style={{ animation: 'fadeIn 1s ease-out forwards 0.5s' }}
                >
                    Bloom AI
                </div>
                <div className="mt-8">
                    <svg width="60" height="60" viewBox="0 0 100 100">
                        <g style={{ animation: 'spin 3s linear infinite' }}>
                            <circle cx="50" cy="50" r="40" stroke="#FF6B35" strokeWidth="4" strokeDasharray="60 180" fill="none" />
                            <circle cx="50" cy="50" r="30" stroke="#B349C1" strokeWidth="4" strokeDasharray="40 120" fill="none" style={{ animation: 'spin 2s linear infinite reverse' }} />
                        </g>
                    </svg>
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
            display: flex;
            align-items: center;
            justify-content: center;
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
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default LoaderScreen;
