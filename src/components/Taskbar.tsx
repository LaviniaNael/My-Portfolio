import { useState, useEffect, useRef } from 'react';
import { Monitor, Settings, Heart } from 'lucide-react';
import './Taskbar.css';

interface TaskbarProps {
    windows: any[];
    activeWindowId: string | null;
    onFocus: (id: string) => void;
    onStartToggle: () => void;
    isStartOpen: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({
    windows,
    activeWindowId,
    onFocus,
    onStartToggle,
    isStartOpen
}) => {
    const [time, setTime] = useState(new Date());
    const taskbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div ref={taskbarRef} className="taskbar-wrapper">
            {/* Start Button */}
            <button
                data-start-button
                onClick={(e) => {
                    e.stopPropagation();
                    onStartToggle();
                }}
                className={`start-button ${isStartOpen ? 'win-inset' : 'win-outset'}`}
            >
                <Heart size={18} className="text-win-accent fill-win-accent/20" />
                <span className="start-button-label">Start</span>
            </button>

            <div className="taskbar-divider" />

            {/* Window Tabs */}
            <div className="window-tabs-container no-scrollbar">
                {windows.filter(w => w.isOpen).map((win) => (
                    <button
                        key={win.id}
                        onClick={() => onFocus(win.id)}
                        className={`window-tab ${activeWindowId === win.id ? 'window-tab-active win-inset' : 'win-outset shadow-inner'}`}
                    >
                        <win.icon size={14} className="window-tab-icon" />
                        <span className="window-tab-title">
                            {win.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tray Area */}
            <div className="tray-area win-inset">
                <div className="tray-icons">
                    <Monitor size={12} className="tray-icon" />
                    <Settings size={12} className="tray-icon" />
                </div>
                <div className="tray-divider" />
                <span className="tray-time">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default Taskbar;
