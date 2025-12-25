import { useState, useEffect, useRef } from 'react';
import {
  User, Briefcase, Mail, Send, Github, Cpu,
  GraduationCap, ListChecks, Linkedin,
  Heart, Sparkles, Star
} from 'lucide-react';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';
import AboutContent from './components/AboutContent';
import ProjectsContent from './components/ProjectsContent';
import ContactContent from './components/ContactContent';
import SkillsContent from './components/SkillsContent';
import EducationContent from './components/EducationContent';
import ExperienceContent from './components/ExperienceContent';
import { useWindowManager } from './hooks/useWindowManager';
import type { WindowData } from './types/desktop';

const INITIAL_WINDOWS: WindowData[] = [
  { id: 'about', title: 'About.exe', isOpen: false, isMinimized: false, zIndex: 10, icon: User, component: AboutContent, width: 500, defaultPosition: { x: 20, y: 20 } },
  { id: 'skills', title: 'Skills.sys', isOpen: false, isMinimized: false, zIndex: 10, icon: Cpu, component: SkillsContent, width: 550, defaultPosition: { x: 40, y: 50 } },
  { id: 'education', title: 'Education.txt', isOpen: false, isMinimized: false, zIndex: 10, icon: GraduationCap, component: EducationContent, width: 500, defaultPosition: { x: 60, y: 80 } },
  { id: 'experience', title: 'Experience.log', isOpen: false, isMinimized: false, zIndex: 10, icon: ListChecks, component: ExperienceContent, width: 650, defaultPosition: { x: 80, y: 110 } },
  { id: 'projects', title: 'Projects/', isOpen: false, isMinimized: false, zIndex: 10, icon: Briefcase, component: ProjectsContent, width: 700, defaultPosition: { x: 40, y: 40 } },
  { id: 'contact', title: 'Contact.exe', isOpen: false, isMinimized: false, zIndex: 10, icon: Mail, component: ContactContent, width: 600, defaultPosition: { x: 20, y: 140 } },
];

function App() {
  const { windows, activeWindowId, openWindow, closeWindow, toggleMinimize, focusWindow } = useWindowManager(INITIAL_WINDOWS);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Close start menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isStartOpen && startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStartOpen]);

  return (
    <div className="relative h-screen w-screen bg-[#0c0c0c] overflow-hidden selection:bg-win-accent selection:text-white font-retro">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-win-bg">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
          <Heart size={400} className="absolute -top-20 -left-20 text-win-accent animate-float opacity-20" />
          <Sparkles size={300} className="absolute bottom-20 right-20 text-win-secondary animate-float [animation-delay:2s] opacity-30" />
          <Star size={100} className="absolute top-1/4 right-1/3 text-win-accent animate-sparkle" />
          <Star size={60} className="absolute bottom-1/3 left-1/4 text-win-secondary animate-sparkle [animation-delay:1s]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.12)_0%,transparent_100%)] animate-shimmer" />
      </div>

      {/* Retro scanline/grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,4px_100%] pointer-events-none z-[3000]"></div>

      {/* Desktop Workspace */}
      <div
        ref={desktopRef}
        className="relative h-full w-full p-4 overflow-hidden pb-12"
        onClick={() => isStartOpen && setIsStartOpen(false)}
      >
        {/* Icons Grid - Grid-based for perfect alignment, column-first flow */}
        <div className="grid grid-flow-col auto-cols-max grid-rows-[repeat(auto-fill,110px)] gap-2 h-full w-full relative z-10 pointer-events-none">
          <div className="pointer-events-auto contents">
            <DesktopIcon index={0} label="About.exe" icon={User} onDoubleClick={() => openWindow('about')} />
            <DesktopIcon index={1} label="Skills.sys" icon={Cpu} onDoubleClick={() => openWindow('skills')} />
            <DesktopIcon index={2} label="Education.txt" icon={GraduationCap} onDoubleClick={() => openWindow('education')} />
            <DesktopIcon index={3} label="Experience.log" icon={ListChecks} onDoubleClick={() => openWindow('experience')} />
            <DesktopIcon index={4} label="Projects/" icon={Briefcase} onDoubleClick={() => openWindow('projects')} />
            <DesktopIcon index={5} label="Contact.exe" icon={Mail} onDoubleClick={() => openWindow('contact')} />

            <DesktopIcon index={6} label="GitHub" icon={Github} onDoubleClick={() => window.open('https://github.com/LaviniaNael', '_blank')} />
            <DesktopIcon index={7} label="LinkedIn" icon={Linkedin} onDoubleClick={() => window.open('https://linkedin.com/in/lavinia-alfons', '_blank')} />
          </div>
        </div>

        {/* Windows Rendering Layer */}
        {windows.filter(w => w.isOpen && !w.isMinimized).map((win) => {
          const Content = win.component;
          return (
            <Window
              key={win.id}
              title={win.title}
              icon={win.icon}
              zIndex={win.zIndex}
              isActive={activeWindowId === win.id}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => toggleMinimize(win.id)}
              onFocus={() => focusWindow(win.id)}
              defaultPosition={win.defaultPosition}
              width={win.width}
              constraintsRef={desktopRef}
            >
              <Content />
            </Window>
          );
        })}
      </div>

      {/* Start Menu */}
      {isStartOpen && (
        <div
          ref={startMenuRef}
          className="fixed bottom-10 left-1 w-72 win-outset bg-win-surface z-[2100] shadow-[10px_10px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="bg-win-accent h-12 flex items-center px-4 font-bold italic text-white shadow-inner gap-3">
            <div className="p-1 bg-white/20 rounded-sm">
              <Heart size={20} className="animate-pulse fill-white/20" />
            </div>
            <span className="tracking-tighter uppercase text-sm">Lavinia_OS 2025</span>
          </div>

          <div className="p-1 flex">
            {/* Sidebar decoration */}
            <div className="w-8 bg-gradient-to-b from-win-accent to-win-secondary flex flex-col items-center py-4 gap-8 opacity-40">
              <Star size={16} className="text-white" />
              <Heart size={16} className="text-white" />
              <Sparkles size={16} className="text-white" />
            </div>

            <div className="flex-1 p-1 space-y-0.5">
              {[
                { id: 'about', icon: User, label: 'Profile (About.exe)' },
                { id: 'skills', icon: Cpu, label: 'Capabilities (Skills.sys)' },
                { id: 'projects', icon: Briefcase, label: 'Repository (Projects/)' },
                { id: 'contact', icon: Mail, label: 'Messenger (Contact.exe)' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => { openWindow(item.id); setIsStartOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-win-accent hover:text-white transition-colors group"
                >
                  <item.icon size={16} className="text-win-accent group-hover:text-white" />
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-win-shadow my-2 shadow-[0_1px_0_rgba(255,255,255,0.05)]" />
              <button
                onClick={() => window.open('https://github.com/LaviniaNael', '_blank')}
                className="w-full flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-win-accent hover:text-white"
              >
                <Github size={16} /> Source Code
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-red-900/40 text-red-500 mt-4">
                <Send size={16} /> Disconnect...
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onFocus={focusWindow}
        onStartToggle={() => setIsStartOpen(!isStartOpen)}
        isStartOpen={isStartOpen}
      />
    </div>
  );
}

export default App;
