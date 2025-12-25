import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface WindowProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    onClose: () => void;
    onMinimize: () => void;
    onFocus: () => void;
    isActive: boolean;
    zIndex: number;
    defaultPosition?: { x: number; y: number };
    width?: number | string;
    height?: number | string;
    constraintsRef: React.RefObject<HTMLDivElement | null>;
}

const Window: React.FC<WindowProps> = ({
    title,
    icon: Icon,
    children,
    onClose,
    onMinimize,
    onFocus,
    isActive,
    zIndex,
    defaultPosition = { x: 50, y: 50 },
    width = 600,
    height = 'auto',
    constraintsRef,
}) => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            onPointerDown={onFocus}
            initial={{
                x: Math.max(10, defaultPosition.x),
                y: Math.max(10, defaultPosition.y),
                scale: 0.95,
                opacity: 0
            }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ zIndex, width, height }}
            className={cn(
                "absolute top-0 left-0 min-w-[320px] max-w-[95vw] max-h-[85vh] win-outset bg-win-surface flex flex-col pointer-events-auto shadow-2xl transition-shadow overflow-hidden",
                isActive ? "ring-1 ring-win-accent/40 shadow-win-accent/10" : "shadow-black/50"
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "h-8 flex items-center justify-between px-1 cursor-move select-none",
                    isActive ? "bg-win-accent" : "bg-win-header"
                )}
            >
                <div className="flex items-center gap-2 ml-1">
                    <Icon size={14} className={isActive ? "text-white" : "text-win-text/60"} />
                    <span className={cn(
                        "text-[11px] font-bold antialiased truncate max-w-[200px] uppercase tracking-tighter",
                        isActive ? "text-white" : "text-win-text/70"
                    )}>
                        {title}
                    </span>
                </div>

                <div className="flex items-center gap-1 mr-1 pointer-events-auto" onPointerDown={(e) => e.stopPropagation()}>
                    <button
                        onClick={onMinimize}
                        className="w-5 h-5 win-outset bg-win-surface flex items-center justify-center hover:bg-win-highlight/20 active:win-inset"
                    >
                        <Minus size={12} className="text-win-text translate-y-1" />
                    </button>
                    <button className="w-5 h-5 win-outset bg-win-surface flex items-center justify-center cursor-not-allowed opacity-50">
                        <Square size={10} className="text-win-text" />
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-1 w-5 h-5 win-outset bg-win-surface flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors active:win-inset"
                    >
                        <X size={12} className="text-win-text group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="flex-1 overflow-auto win-inset m-1 bg-win-bg p-4 text-sm scrollbar-thin cursor-default"
                onPointerDown={(e) => e.stopPropagation()}
            >
                {children}
            </div>

            {/* Footer / Status Bar */}
            <div className="h-6 mx-1 mb-1 px-1 flex items-center gap-2 text-[9px] font-bold text-win-text/40 bg-win-surface">
                <div className="win-inset flex-1 px-2 py-0.5 uppercase tracking-widest truncate">READY_SYSTEM_ACK</div>
                <div className="win-inset w-16 px-2 py-0.5 text-center">LOC: {isActive ? "ACT" : "SLP"}</div>
            </div>
        </motion.div>
    );
};

export default Window;
