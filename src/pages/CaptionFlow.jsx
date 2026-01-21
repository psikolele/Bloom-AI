
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import LoaderScreen from '../components/LoaderScreen';
import SplitLink from '../components/SplitLink';
import { ArrowLeft, Send } from 'lucide-react';
import '../styles/Login.css';
import '../styles/Dashboard.css';

const CaptionFlow = () => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        Topic: '',
        Audience: '',
        Voice: 'Professional',
        Platform: 'Instagram'
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                const logoContainer = document.querySelector('.logoContainer');
                if (logoContainer) logoContainer.style.transform = 'scale(1)';

                setTimeout(() => {
                    document.querySelector('.logo-main')?.classList.add('loadIn');

                    setTimeout(() => {
                        const acceptContainer = document.querySelector('.acceptContainer');
                        if (acceptContainer) acceptContainer.classList.add('loadIn');

                        setTimeout(() => {
                            const form = document.querySelector('.caption-form');
                            if (form) form.style.opacity = 1;
                        }, 500);
                    }, 500);
                }, 500);
            }, 100);
        }
    }, [loading]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('https://emanueleserra.app.n8n.cloud/webhook/caption-flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess(true);
                // Reset after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
                setFormData({
                    Topic: '',
                    Audience: '',
                    Voice: 'Professional',
                    Platform: 'Instagram'
                });
            } else {
                alert("Error sending data to N8N");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Network Error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {loading && <LoaderScreen onAnimationEnd={() => setLoading(false)} />}

            {!loading && (
                <div id="login-body">
                    <div id="container">
                        <div id="inviteContainer" className="dashboard-size">

                            {/* Glint Overlay */}
                            <div className="glint-overlay"></div>

                            {/* Left Side: Brand */}
                            <div className="logoContainer">
                                <div className="logo-main">
                                    <Logo size={160} />
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="acceptContainer">
                                <div className="h-full flex flex-col justify-center px-12 w-full relative">

                                    {/* Back Button */}
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="absolute top-8 left-12 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <ArrowLeft size={24} />
                                    </button>

                                    <div className="caption-form" style={{ opacity: 0, transition: 'opacity 1s ease' }}>
                                        <h2 className="text-2xl font-bold mb-6 text-white">Generate Caption</h2>

                                        {success ? (
                                            <div className="bg-green-500/20 text-green-300 p-4 rounded mb-6 border border-green-500/50">
                                                Request sent successfully! Check your Sheet/Instagram.
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                                <div>
                                                    <label className="text-gray-400 text-sm mb-1 block">Post Topic</label>
                                                    <input
                                                        type="text"
                                                        name="Topic"
                                                        required
                                                        value={formData.Topic}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                                        placeholder="e.g. New Summer Collection Launch"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-gray-400 text-sm mb-1 block">Target Audience</label>
                                                    <input
                                                        type="text"
                                                        name="Audience"
                                                        required
                                                        value={formData.Audience}
                                                        onChange={handleChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                                        placeholder="e.g. Young professionals 25-35"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-gray-400 text-sm mb-1 block">Brand Voice</label>
                                                        <select
                                                            name="Voice"
                                                            value={formData.Voice}
                                                            onChange={handleChange}
                                                            className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-purple-500 focus:outline-none [&>option]:text-black"
                                                        >
                                                            <option>Professional</option>
                                                            <option>Friendly</option>
                                                            <option>Witty</option>
                                                            <option>Luxury</option>
                                                            <option>Urgent</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="text-gray-400 text-sm mb-1 block">Platform</label>
                                                        <select
                                                            name="Platform"
                                                            value={formData.Platform}
                                                            onChange={handleChange}
                                                            className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-purple-500 focus:outline-none [&>option]:text-black"
                                                        >
                                                            <option>Instagram</option>
                                                            <option>LinkedIn</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    className="mt-4 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded font-medium transition-all flex items-center justify-center gap-2 group"
                                                >
                                                    {submitting ? 'Sending...' : 'Generate Content'}
                                                    {!submitting && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CaptionFlow;
