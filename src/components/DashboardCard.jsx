import React, { useRef, useState } from 'react';
import { ExternalLink, LayoutTemplate, MessageSquare, UserCircle } from 'lucide-react';

const DashboardCard = ({ title, description, url, icon: Icon, disabled = false, delay = 0 }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <a
            href={disabled ? '#' : url}
            target={disabled ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="block w-full"
            style={{ textDecoration: 'none' }}
            onClick={(e) => disabled && e.preventDefault()}
        >
            <div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(20, 20, 20, 0.6)',
                    backdropFilter: 'blur(10px)',
                    animationDelay: `${delay}s`
                }}
            >
                {/* Hover Glow Effect */}
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(230, 230, 255, 0.06), transparent 40%)`
                    }}
                />

                {/* Border Glow on Hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        borderRadius: 'inherit',
                        padding: '1px',
                        background: 'linear-gradient(45deg, transparent, rgba(255, 107, 53, 0.3), rgba(179, 73, 193, 0.3), transparent)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        pointerEvents: 'none'
                    }}
                />

                <div className="p-6 flex items-center gap-6 relative z-10">
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110">
                        {Icon ? <Icon size={32} color="#FF6B35" /> : <div className="w-8 h-8 rounded-full bg-gray-700" />}
                    </div>

                    {/* Text Content */}
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold font-mono text-white tracking-tight group-hover:text-accent-primary transition-colors duration-300">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-sm text-gray-400 font-sans mt-1">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Action Icon */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        {disabled ? (
                            <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded">SOON</span>
                        ) : (
                            <ExternalLink size={20} className="text-gray-400 group-hover:text-white" />
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default DashboardCard;
