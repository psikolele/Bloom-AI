import React from 'react';
import { LayoutGrid, MessageSquare, Briefcase, Zap } from 'lucide-react';
import AppCard from '../components/AppCard';
import Logo from '../components/Logo';

const Dashboard = () => {
    const apps = [
        {
            id: 1,
            title: 'Brand Profile',
            description: 'AI-powered brand identity manager. Organize your assets, voice, and strategy guidelines.',
            url: 'http://localhost:3000', // Update with real URL
            icon: Briefcase
        },
        {
            id: 2,
            title: 'CaptionFlow',
            description: 'Generate engaging social media captions instantly using your brand voice.',
            url: 'http://localhost:3001', // Update with real URL
            icon: MessageSquare
        },
        {
            id: 3,
            title: 'Growth Analytics',
            description: 'Track your growth and engagement metrics across all social platforms.',
            url: '#',
            icon: Zap,
            disabled: true
        }
    ];

    return (
        <div className="min-h-screen relative">
            <div className="ambient-light" />
            <div className="grid-overlay" />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Logo size={40} />
                        <span className="text-xl font-bold font-mono tracking-tight text-white">Bloom AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-mono text-green-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            SYSTEM ONLINE
                        </span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-6 pt-32 pb-20 animate-reveal">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">My Apps</h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Access your suite of AI-powered marketing tools. Select a tool to launch.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {apps.map(app => (
                        <AppCard
                            key={app.id}
                            title={app.title}
                            description={app.description}
                            url={app.url}
                            icon={app.icon}
                            disabled={app.disabled}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
