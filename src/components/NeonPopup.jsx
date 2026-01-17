import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const NeonPopup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div
                className="relative bg-[#0A0A0A] border-2 border-red-600 rounded-2xl p-8 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(220,38,38,0.5)] transform animate-scaleUp text-center"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-red-600/20 border border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                        <AlertCircle size={48} className="text-red-500" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white mb-2 uppercase tracking-wide">
                    Access Denied
                </h3>

                <p className="text-gray-300 mb-8 font-light">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] uppercase tracking-wider font-mono text-sm"
                >
                    Try Again
                </button>
            </div>

            <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleUp {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
        </div>
    );
};

export default NeonPopup;
