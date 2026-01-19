import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import NeonPopup from '../components/NeonPopup';
import '../styles/Login.css'; // Reuse Login styles

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState(null); // { message, type, title }

    // Reuse Animation Logic
    useEffect(() => {
        setTimeout(() => {
            const logoContainer = document.querySelector('.logoContainer');
            if (logoContainer) logoContainer.style.transform = 'scale(1)';

            setTimeout(() => {
                document.querySelector('.logo-main')?.classList.add('loadIn');
                setTimeout(() => {
                    document.querySelector('.logo-text')?.classList.add('loadIn');
                    setTimeout(() => {
                        document.querySelector('.acceptContainer')?.classList.add('loadIn');
                        setTimeout(() => {
                            document.querySelectorAll('.formDiv, form h1').forEach(el => el.classList.add('loadIn'));
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 100);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('https://emanueleserra.app.n8n.cloud/webhook/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const text = await response.text(); // Read as text first
            let data = {};

            try {
                data = JSON.parse(text);
            } catch (e) {
                // If not JSON, check if it's the default N8N success message
                if (text.includes('Workflow was started')) {
                    data = { success: true };
                } else {
                    console.warn('Received non-JSON response:', text);
                }
            }

            if (response.ok && (data.success || text.includes('Workflow was started'))) {
                setPopup({
                    type: 'success',
                    title: 'Account Created',
                    message: 'Welcome to Bloom AI! Redirecting to Dashboard...',
                    onClose: () => navigate('/dashboard', { state: { username: formData.username } }) // Allow manual close
                });
                // Auto redirect
                setTimeout(() => {
                    navigate('/dashboard', { state: { username: formData.username } });
                }, 3000);
            } else {
                throw new Error(data.message || 'Registration failed');
            }

        } catch (err) {
            setPopup({
                type: 'error',
                message: err.message || "Failed to register",
                onClose: () => setPopup(null)
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="login-body">
            {popup && <NeonPopup {...popup} />}

            <div id="container">
                <div id="inviteContainer">

                    <div className="logoContainer">
                        <div className="logo-main">
                            <Logo size={120} />
                        </div>
                        {/* Logo Text Removed */}
                    </div>

                    <div className="acceptContainer">
                        <form onSubmit={handleSubmit}>
                            <h1>Create Account</h1>

                            <div className="formContainer">
                                <div className="formDiv" style={{ transitionDelay: '0.2s' }}>
                                    <p>USERNAME</p>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="formDiv" style={{ transitionDelay: '0.3s' }}>
                                    <p>EMAIL</p>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="formDiv" style={{ transitionDelay: '0.4s' }}>
                                    <p>PASSWORD</p>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="formDiv" style={{ transitionDelay: '0.6s' }}>
                                    <button
                                        className="acceptBtn"
                                        type="submit"
                                        disabled={isLoading}
                                        style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'wait' : 'pointer' }}
                                    >
                                        {isLoading ? 'Creating...' : 'Register'}
                                    </button>
                                    <div className="register">
                                        Already have an account?
                                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                                            Login
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;
