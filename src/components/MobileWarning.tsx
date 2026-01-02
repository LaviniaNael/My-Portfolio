import React from 'react';
import { Monitor, Heart, Sparkles, X } from 'lucide-react';
import './MobileWarning.css';

interface MobileWarningProps {
    onClose: () => void;
}

const MobileWarning: React.FC<MobileWarningProps> = ({ onClose }) => {
    return (
        <div className="mobile-warning-overlay animate-in fade-in duration-300">
            <div className="warning-modal win-outset animate-in zoom-in-95 duration-200">
                {/* Title Bar */}
                <div className="warning-title-bar">
                    <div className="title-box">
                        <Monitor size={14} />
                        <span>System Welcome!</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="warning-close-btn win-outset"
                    >
                        <X size={12} className="warning-close-icon" />
                    </button>
                </div>

                {/* Content */}
                <div className="warning-content">
                    <div className="warning-intro-row">
                        <div className="warning-icon-box win-inset shrink-0">
                            <Sparkles size={32} className="text-win-accent animate-pulse" />
                        </div>
                        <div className="warning-text-box">
                            <h2 className="warning-h2">
                                Welcome to Lavinia's OS! <Heart size={16} className="fill-win-secondary text-win-secondary" />
                            </h2>
                            <p className="warning-p">
                                I'm so glad you're here! This project is designed to feel like a real computer.
                            </p>
                        </div>
                    </div>

                    <div className="warning-tip-box win-inset">
                        <p className="warning-italic italic">
                            "For the best experience, I recommend viewing this on a desktop. But don't worry, you can still explore here!"
                        </p>
                        <div className="warning-pro-tip font-bold">
                            <div className="tip-dot animate-ping" />
                            PRO TIP: Double-tap icons to open them!
                        </div>
                    </div>

                    <div className="warning-footer">
                        <button
                            onClick={onClose}
                            className="warning-action-btn win-outset"
                        >
                            Let's Explore!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileWarning;
