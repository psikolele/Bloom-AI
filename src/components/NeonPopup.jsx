import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import '../styles/NeonPopup.css';

const NeonPopup = ({ message, onClose, type = 'error', title }) => {
    const isSuccess = type === 'success';
    const displayTitle = title || (isSuccess ? 'Success' : 'Access Denied');
    const ButtonText = isSuccess ? 'Continue' : 'Try Again';

    return (
        <div className="neon-popup-overlay">
            <div className={`neon-popup-container ${isSuccess ? 'success' : ''}`}>
                <button
                    onClick={onClose}
                    className="neon-popup-close-btn"
                >
                    <X size={24} />
                </button>

                <div className="neon-popup-icon-wrapper">
                    <div className={`neon-popup-icon-circle ${isSuccess ? 'success' : ''}`}>
                        {isSuccess ? (
                            <CheckCircle size={48} className={`neon-popup-icon ${isSuccess ? 'success' : ''}`} />
                        ) : (
                            <AlertCircle size={48} className="neon-popup-icon" />
                        )}
                    </div>
                </div>

                <h3 className="neon-popup-title">
                    {displayTitle}
                </h3>

                <p className="neon-popup-message">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className={`neon-popup-action-btn ${isSuccess ? 'success' : ''}`}
                >
                    {ButtonText}
                </button>
            </div>
        </div>
    );
};

export default NeonPopup;
