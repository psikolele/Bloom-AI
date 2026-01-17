import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/Login.css'; // Import the specific styles

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loaded, setLoaded] = useState(false);

    // Animation Logic (simulating the jQuery loadIn)
    useEffect(() => {
        // Stage 1: Scale Check Logo
        setTimeout(() => {
            document.querySelector('.logoContainer').style.transform = 'scale(1)';

            // Stage 2: Logo In
            setTimeout(() => {
                document.querySelector('.logo-main').classList.add('loadIn');

                // Stage 3: Text In
                setTimeout(() => {
                    document.querySelector('.logo-text').classList.add('loadIn');

                    // Stage 4: Expand Accept Container
                    setTimeout(() => {
                        const acceptContainer = document.querySelector('.acceptContainer');
                        // We let CSS transition handle the height/Slide
                        acceptContainer.classList.add('loadIn');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'admin') {
            navigate('/dashboard');
        } else {
            alert('Invalid credentials (use admin/admin)');
        }
    };

    return (
        <div id="login-body">
            <div id="container">
                <div id="inviteContainer">

                    {/* Logo Container (Left) */}
                    <div className="logoContainer">
                        <div className="logo-main">
                            <Logo size={120} />
                        </div>
                        <div className="logo-text">Bloom AI</div>
                    </div>

                    {/* Accept Container (Right/Form) */}
                    <div className="acceptContainer">
                        <form onSubmit={handleSubmit}>
                            <h1>Welcome Back!</h1>

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
                                    />
                                    <a className="forgotPas" href="#">FORGOT YOUR PASSWORD?</a>
                                </div>

                                <div className="formDiv" style={{ transitionDelay: '0.6s' }}>
                                    <button className="acceptBtn" type="submit">Login</button>
                                    <div className="register">
                                        Need an account?
                                        <a href="#">Register</a>
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

export default Login;
