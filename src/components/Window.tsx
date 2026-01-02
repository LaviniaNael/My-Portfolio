import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './Window.css';

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
            className={`window-outer win-outset ${isActive ? 'window-active' : ''}`}
        >
            {/* Header */}
            <div
                className={`window-header ${isActive ? 'window-header-active' : 'window-header-inactive'}`}
            >
                <div className="window-title-box">
                    <Icon size={14} className={`window-title-icon ${isActive ? 'window-title-icon-active' : 'window-title-icon-inactive'}`} />
                    <span className={`window-title-text ${isActive ? 'window-title-text-active' : 'window-title-text-inactive'}`}>
                        {title}
                    </span>
                </div>

                <div className="window-controls" onPointerDown={(e) => e.stopPropagation()}>
                    <button
                        onClick={onMinimize}
                        className="window-btn window-btn-minimize win-outset"
                    >
                        <Minus size={12} className="text-win-text translate-y-1" />
                    </button>
                    <button className="window-btn win-outset cursor-not-allowed opacity-50" disabled>
                        <Square size={10} className="text-win-text" />
                    </button>
                    <button
                        onClick={onClose}
                        className="window-btn window-btn-close win-outset ml-1"
                    >
                        <X size={12} className="group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="window-content-area win-inset scrollbar-thin"
                onPointerDown={(e) => e.stopPropagation()}
            >
                {children}
            </div>

            {/* Footer / Status Bar */}
            <div className="window-footer">
                <div className="status-bar-item status-bar-main win-inset">READY_SYSTEM_ACK</div>
                <div className="status-bar-item status-bar-loc win-inset">LOC: {isActive ? "ACT" : "SLP"}</div>
            </div>
        </motion.div>
    );
};

export default Window;
