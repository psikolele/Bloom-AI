import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import NeonPopup from '../components/NeonPopup'; // Import Popup
import LoaderScreen from '../components/LoaderScreen';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false); // Valid Loading state (Auth)
    const [bootstrapping, setBootstrapping] = useState(true); // Initial App Load
    const [error, setError] = useState(null); // Error state for Popup

    // Animation Logic
    useEffect(() => {
        if (bootstrapping) return; // Wait for loader

        // Stage 1: Scale Check Logo
        setTimeout(() => {
            const logoContainer = document.querySelector('.logoContainer');
            if (logoContainer) logoContainer.style.transform = 'scale(1)';

            // Stage 2: Logo In
            setTimeout(() => {
                const logoMain = document.querySelector('.logo-main');
                if (logoMain) logoMain.classList.add('loadIn');

                // Stage 3: Text In
                setTimeout(() => {
                    const logoText = document.querySelector('.logo-text');
                    if (logoText) logoText.classList.add('loadIn');

                    // Stage 4: Expand Accept Container
                    setTimeout(() => {
                        const acceptContainer = document.querySelector('.acceptContainer');
                        if (acceptContainer) acceptContainer.classList.add('loadIn');

                        // Stage 5: Form Elements In
                        setTimeout(() => {
                            const formElements = document.querySelectorAll('.formDiv, form h1');
                            formElements.forEach(el => el.classList.add('loadIn'));
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 100);
    }, []);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/webhook/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...credentials, mode: 'login' })
            });

            // Assuming N8N returns { success: true/false, message: "..." }
            // We will adapt based on the response content.
            let data;
            const responseText = await response.text();
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error("Non-JSON response:", responseText);
                console.error("Status Code:", response.status);
                throw new Error(`Server error: Invalid response format (${response.status})`);
            }

            if (response.ok && data.success) { // logic dependent on N8N return structure
                // If data.success is explicitly true OR if we just rely on HTTP 200 and absence of "error"
                // Let's assume the user workflow returns { success: true, username: ... }
                navigate('/dashboard', { state: { username: data.username || credentials.username } });
            } else {
                // Logic for 'success: false' or HTTP error
                throw new Error(data.message || 'Invalid Username or Password');
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError(err.message || "Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="login-body">
            {/* Bootstrap Loader */}
            {bootstrapping && <LoaderScreen onAnimationEnd={() => setBootstrapping(false)} />}

            {/* Render Popup if Error exists */}
            {error && <NeonPopup message={error} onClose={() => setError(null)} />}

            {!bootstrapping && (
                <div id="container">
                    <div id="inviteContainer">

                        {/* Logo Container (Left) */}
                        <div className="logoContainer">
                            <div className="logo-main">
                                <Logo size={120} />
                            </div>
                            {/* Added Text Logo */}
                            <div className="logo-text" style={{ marginTop: '20px', opacity: 0, transform: 'translateY(10px)', transition: 'all 0.8s ease' }}>
                                <img
                                    src="/bloom-text.png"
                                    alt="Bloom AI"
                                    style={{
                                        width: '180px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.3))'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Accept Container (Right/Form) */}
                        <div className="acceptContainer">
                            <form onSubmit={handleSubmit}>
                                <h1>Welcome to Bloom AI</h1>

                                <div className="formContainer">
                                    <div className="formDiv" style={{ transitionDelay: '0.2s' }}>
                                        <p>USERNAME</p>
                                        <input
                                            type="text"
                                            name="username"
                                            required
                                            value={credentials.username}
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
                                            value={credentials.password}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                        />
                                        <a className="forgotPas" href="#">FORGOT YOUR PASSWORD?</a>
                                    </div>

                                    <div className="formDiv" style={{ transitionDelay: '0.6s' }}>
                                        <button
                                            className="acceptBtn"
                                            type="submit"
                                            disabled={isLoading}
                                            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'wait' : 'pointer' }}
                                        >
                                            {isLoading ? 'Authenticating...' : 'Login'}
                                        </button>
                                        <div className="register">
                                            Need an account?
                                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
                                                Register
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
