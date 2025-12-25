import type { LucideIcon } from 'lucide-react';

export interface WindowData {
    id: string;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    zIndex: number;
    icon: LucideIcon;
    component: React.ComponentType<any>;
    width?: number | string;
    height?: number | string;
    defaultPosition?: { x: number; y: number };
}

export interface DesktopIconData {
    id: string;
    label: string;
    icon: LucideIcon;
    onDoubleClick: () => void;
}
