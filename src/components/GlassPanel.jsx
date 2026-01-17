import React from 'react';

const GlassPanel = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`glass-panel ${className}`}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)',
                padding: '2rem'
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassPanel;
