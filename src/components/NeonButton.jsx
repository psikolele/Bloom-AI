import React from 'react';

const NeonButton = ({ children, onClick, className = '', type = 'button', ...props }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn-primary ${className}`}
            style={{
                background: 'var(--gradient-btn)',
                color: 'white',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: 'none',
                boxShadow: 'var(--shadow-glow)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
            {...props}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(255, 107, 53, 0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
        >
            {children}
        </button>
    );
};

export default NeonButton;
