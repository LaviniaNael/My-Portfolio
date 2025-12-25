import { useState, useEffect, useRef } from 'react';
import { Monitor, Settings, Heart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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

    // Close start menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isStartOpen && taskbarRef.current && !taskbarRef.current.contains(event.target as Node)) {
                // This is tricky because the start menu is usually a child of the taskbar or absolute relative to it
                // We handle the actual logic in App.tsx by wrapping the desktop
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isStartOpen]);

    return (
        <div ref={taskbarRef} className="fixed bottom-0 left-0 right-0 h-10 bg-win-taskbar border-t-2 border-win-highlight flex items-center px-1 gap-1 z-[2000] select-none">
            {/* Start Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onStartToggle();
                }}
                className={cn(
                    "h-8 px-2 flex items-center gap-1.5 win-outset bg-win-surface hover:bg-win-highlight/20 transition-colors",
                    isStartOpen && "win-inset"
                )}
            >
                <Heart size={18} className="text-win-accent fill-win-accent/20" />
                <span className="font-bold text-sm text-win-text italic tracking-tighter">Start</span>
            </button>

            <div className="w-[2px] h-6 bg-win-shadow mx-1 shadow-[1px_0_0_rgba(255,255,255,0.1)]" />

            {/* Window Tabs */}
            <div className="flex-1 flex gap-1 overflow-x-auto no-scrollbar">
                {windows.filter(w => w.isOpen).map((win) => (
                    <button
                        key={win.id}
                        onClick={() => onFocus(win.id)}
                        className={cn(
                            "h-8 min-w-[120px] max-w-[160px] px-2 flex items-center gap-2 win-outset transition-all truncate group",
                            activeWindowId === win.id ? "win-inset bg-black/20" : "bg-win-surface shadow-inner"
                        )}
                    >
                        <win.icon size={14} className={cn(
                            "transition-colors",
                            activeWindowId === win.id ? "text-win-accent" : "text-win-text/40 group-hover:text-win-text/60"
                        )} />
                        <span className={cn(
                            "text-[10px] uppercase tracking-tighter truncate",
                            activeWindowId === win.id ? "font-bold text-win-text" : "text-win-text/60"
                        )}>
                            {win.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tray Area */}
            <div className="win-inset px-2 h-8 flex items-center gap-3 bg-black/20 ml-2">
                <div className="flex gap-2">
                    <Monitor size={12} className="text-win-text/30" />
                    <Settings size={12} className="text-win-text/30" />
                </div>
                <div className="w-px h-4 bg-win-highlight/10" />
                <span className="text-[10px] font-bold text-win-text/80 font-mono">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default Taskbar;
