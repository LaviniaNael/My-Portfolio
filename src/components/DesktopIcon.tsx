import React from 'react';
import { Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './DesktopIcon.css';

interface DesktopIconProps {
    label: string;
    icon: LucideIcon;
    onDoubleClick: () => void;
    index?: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon: Icon, onDoubleClick, index = 0 }) => {
    return (
        <div
            onDoubleClick={onDoubleClick}
            className="desktop-icon-wrapper group animate-in fade-in zoom-in-75 duration-300"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
        >
            <div className="icon-visual-box ring-1 ring-win-highlight/20">
                <Icon size={32} className="icon-svg" />
                <Sparkles size={12} className="icon-sparkle animate-pulse" />
            </div>
            <span className="icon-label">
                {label}
            </span>
        </div>
    );
};

export default DesktopIcon;
