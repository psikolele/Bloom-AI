import React from 'react';

const Logo = ({ size = 40, className = '' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logoLimit" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9B6B" />
                    <stop offset="25%" stopColor="#FF7B4D" />
                    <stop offset="50%" stopColor="#5B9FE3" />
                    <stop offset="100%" stopColor="#B349C1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Outer Circle with Gradient */}
            <circle cx="50" cy="50" r="45" stroke="url(#logoLimit)" strokeWidth="4" />

            {/* Orbital Dots and Lines */}
            <g stroke="white" strokeWidth="1" opacity="0.6">
                <circle cx="50" cy="50" r="30" fill="none" strokeDasharray="4 4" />
                <circle cx="50" cy="20" r="3" fill="white" />
                <circle cx="80" cy="50" r="3" fill="white" />
                <circle cx="50" cy="80" r="3" fill="white" />
                <circle cx="20" cy="50" r="3" fill="white" />
            </g>

            {/* Central Lightning Bolt */}
            <path
                d="M55 25 L40 55 L55 50 L45 75 L65 45 L50 50 Z"
                fill="white"
                filter="url(#glow)"
            />
        </svg>
    );
};

export default Logo;
