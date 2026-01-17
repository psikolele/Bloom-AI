import React from 'react';

const TechInput = ({ type = 'text', placeholder, value, onChange, className = '', required = false, ...props }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`tech-input ${className}`}
            style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                width: '100%',
                transition: 'all 0.3s ease',
                outline: 'none'
            }}
            onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-primary)';
                e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1), 0 0 20px rgba(255, 107, 53, 0.2)';
            }}
            onBlur={(e) => {
                e.target.style.borderColor = 'var(--glass-border)';
                e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                e.target.style.boxShadow = 'none';
            }}
            {...props}
        />
    );
};

export default TechInput;
