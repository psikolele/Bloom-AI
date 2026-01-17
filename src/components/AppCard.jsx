import React, { useRef, useState } from 'react';
import GlassPanel from './GlassPanel';
import NeonButton from './NeonButton';
import { ExternalLink } from 'lucide-react';

const AppCard = ({ title, description, url, icon: Icon, disabled = false }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-3xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            style={{
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(18, 18, 18, 0.6)'
            }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 107, 53, 0.15), transparent 40%)`
                }}
            />
            <div className="p-8 h-full flex flex-col relative z-10 text-white">
                <div className="mb-4 text-accent-primary">
                    {Icon && <Icon size={40} color="var(--accent-primary)" />}
                </div>
                <h3 className="text-2xl font-bold font-mono mb-2 track-tight">{title}</h3>
                <p className="text-gray-400 mb-8 flex-grow font-sans leading-relaxed">{description}</p>
                <div>
                    {disabled ? (
                        <button className="px-6 py-3 rounded-xl border border-white/10 text-gray-500 font-mono text-sm cursor-not-allowed w-full">
                            COMING SOON
                        </button>
                    ) : (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full">
                            <NeonButton className="w-full flex items-center justify-center gap-2">
                                Launch App <ExternalLink size={16} />
                            </NeonButton>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppCard;
