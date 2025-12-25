import { useState } from 'react';
import type { WindowData } from '../types/desktop';

export const useWindowManager = (initialWindows: WindowData[]) => {
    const [windows, setWindows] = useState<WindowData[]>(initialWindows);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [maxZIndex, setMaxZIndex] = useState(10);

    const openWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 } : w
            )
        );
        setActiveWindowId(id);
        setMaxZIndex((prev) => prev + 1);
    };

    const closeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
        );
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const toggleMinimize = (id: string) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
            )
        );
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const focusWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
            )
        );
        setActiveWindowId(id);
        setMaxZIndex((prev) => prev + 1);
    };

    return {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        toggleMinimize,
        focusWindow,
    };
};
