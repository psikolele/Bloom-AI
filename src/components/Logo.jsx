import React from 'react';

const Logo = ({ size = 60 }) => {
    return (
        <div
            className="logo-wrapper"
            style={{
                width: size,
                height: size,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Rotating Light Ring */}
            <div className="logo-glow-ring"></div>

            {/* The Pictogram Image */}
            <img
                src="/bloom-icon.png"
                alt="Bloom AI Logo"
                style={{
                    width: '85%', /* Slightly smaller to fit inside ring */
                    height: '85%',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 2,
                    borderRadius: '50%' /* Ensure image clip if needed */
                }}
            />

            <style>{`
            .logo-wrapper {
                border-radius: 50%;
                /* box-shadow: 0 0 30px rgba(255, 107, 53, 0.2); Optional ambient glow */
            }

            .logo-glow-ring {
                position: absolute;
                inset: -2px; /* Ring thickness/offset */
                border-radius: 50%;
                background: conic-gradient(
                    from 0deg,
                    transparent 0%,
                    transparent 40%,
                    #FF6B35 50%,    /* Brand Orange */
                    #B349C1 60%,    /* Brand Purple */
                    transparent 70%
                );
                animation: spin-logo 3s linear infinite;
                z-index: 1;
                filter: blur(2px); /* Soft light effect */
            }

            /* Inner mask to define ring width */
            .logo-glow-ring::after {
                content: '';
                position: absolute;
                inset: 2px; /* Thickness of the light beam */
                background: #0A0A0A; /* Match bg to hide center */
                border-radius: 50%;
            }

            @keyframes spin-logo {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
        </div>
    );
};

export default Logo;
