import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import '../styles/NeonPopup.css';

const NeonPopup = ({ message, onClose }) => {
    return (
        <div className="neon-popup-overlay">
            <div className="neon-popup-container">
                <button
                    onClick={onClose}
                    className="neon-popup-close-btn"
                >
                    <X size={24} />
                </button>

                <div className="neon-popup-icon-wrapper">
                    <div className="neon-popup-icon-circle">
                        <AlertCircle size={48} className="neon-popup-icon" />
                    </div>
                </div>

                <h3 className="neon-popup-title">
                    Access Denied
                </h3>

                <p className="neon-popup-message">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="neon-popup-action-btn"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default NeonPopup;
