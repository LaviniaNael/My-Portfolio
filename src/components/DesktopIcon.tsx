import React from 'react';
import { Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
            className="group flex flex-col items-center gap-1 p-2 w-24 cursor-pointer rounded hover:bg-win-accent/20 border border-transparent hover:border-win-accent/30 transition-all active:scale-95 animate-in fade-in zoom-in-75 duration-300"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
        >
            <div className="relative p-2 bg-win-surface/40 group-hover:bg-win-surface/60 rounded-xl ring-1 ring-win-highlight/20 shadow-[0_0_0_rgba(236,72,153,0)] group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all">
                <Icon size={32} className="text-win-accent group-hover:scale-110 transition-transform" />
                <Sparkles size={12} className="absolute -top-1 -right-1 text-win-secondary opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
            </div>
            <span className="text-[11px] text-center text-win-text drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] font-medium leading-tight group-hover:text-win-accent transition-colors">
                {label}
            </span>
        </div>
    );
};

export default DesktopIcon;
