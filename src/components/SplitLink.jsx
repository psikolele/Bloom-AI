import React from 'react';

const SplitLink = ({ href, children, fontWidth = 100, onClick }) => {
    const text = children.toString();

    return (
        <a
            href={href}
            onClick={onClick}
            className="split-link"
            style={{ '--font-width': fontWidth }}
        >
            {text.split('').map((char, index) => (
                <span key={index} style={{ '--char': index }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </a>
    );
};

export default SplitLink;
