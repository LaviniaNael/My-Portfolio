import { useState, useEffect, useRef } from 'react';
import {
  User, Briefcase, Mail, Send, Github, Cpu,
  GraduationCap, ListChecks, Linkedin,
  Heart, Sparkles, Star, Snowflake, TreePine, Gift, Candy, Circle, Gamepad2
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
import SnakeGame from './components/SnakeGame';
import { useWindowManager } from './hooks/useWindowManager';
import type { WindowData } from './types/desktop';

const INITIAL_WINDOWS: WindowData[] = [
  { id: 'about', title: 'About.exe', isOpen: false, isMinimized: false, zIndex: 10, icon: User, component: AboutContent, width: 500, defaultPosition: { x: 20, y: 20 } },
  { id: 'skills', title: 'Skills.sys', isOpen: false, isMinimized: false, zIndex: 10, icon: Cpu, component: SkillsContent, width: 550, defaultPosition: { x: 40, y: 50 } },
  { id: 'education', title: 'Education.txt', isOpen: false, isMinimized: false, zIndex: 10, icon: GraduationCap, component: EducationContent, width: 500, defaultPosition: { x: 60, y: 80 } },
  { id: 'experience', title: 'Experience.log', isOpen: false, isMinimized: false, zIndex: 10, icon: ListChecks, component: ExperienceContent, width: 650, defaultPosition: { x: 80, y: 110 } },
  { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, zIndex: 10, icon: Briefcase, component: ProjectsContent, width: 700, defaultPosition: { x: 40, y: 40 } },
  { id: 'contact', title: 'Contact.exe', isOpen: false, isMinimized: false, zIndex: 10, icon: Mail, component: ContactContent, width: 600, defaultPosition: { x: 20, y: 140 } },
  { id: 'snake', title: 'Snake.exe', isOpen: false, isMinimized: false, zIndex: 10, icon: Gamepad2, component: SnakeGame, width: 380, defaultPosition: { x: 100, y: 60 } },
];

function App() {
  const { windows, activeWindowId, openWindow, closeWindow, toggleMinimize, focusWindow } = useWindowManager(INITIAL_WINDOWS);
  const [isStartOpen, setIsStartOpen] = useState(false);

  // Auto-detect December for Christmas theme
  const isDecember = new Date().getMonth() === 11; // December = 11 (0-indexed)
  const [theme, setTheme] = useState<'default' | 'christmas'>(isDecember ? 'christmas' : 'default');
  const [currentStatus] = useState(isDecember ? 'Ho ho ho! Happy Holidays! 🎅' : 'Available for new opportunities! 💼');
  const startMenuRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Generate snowflakes for Christmas theme
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 5 + Math.random() * 10,
    size: 8 + Math.random() * 16,
    opacity: 0.3 + Math.random() * 0.7
  }));

  // Theme definitions
  const themes = {
    default: {
      bg: '#1a1525',
      surface: '#2a2135',
      header: '#3d3148',
      text: '#f5e6ff',
      highlight: '#5a4a6a',
      shadow: '#0f0c14',
      accent: '#e879f9',
      taskbar: '#221b2e',
      secondary: '#f472b6',
      label: '💜 Default'
    },
    christmas: {
      bg: '#1a0f0f',
      surface: '#2d1a1a',
      header: '#4a2828',
      text: '#fff5f5',
      highlight: '#5c3030',
      shadow: '#0a0505',
      accent: '#ef4444',
      taskbar: '#1f1212',
      secondary: '#22c55e',
      label: '🎄 Christmas'
    }
  };

  // Apply theme CSS variables
  useEffect(() => {
    const currentTheme = themes[theme];
    const root = document.documentElement;
    root.style.setProperty('--color-win-bg', currentTheme.bg);
    root.style.setProperty('--color-win-surface', currentTheme.surface);
    root.style.setProperty('--color-win-header', currentTheme.header);
    root.style.setProperty('--color-win-text', currentTheme.text);
    root.style.setProperty('--color-win-highlight', currentTheme.highlight);
    root.style.setProperty('--color-win-shadow', currentTheme.shadow);
    root.style.setProperty('--color-win-accent', currentTheme.accent);
    root.style.setProperty('--color-win-taskbar', currentTheme.taskbar);
    root.style.setProperty('--color-win-secondary', currentTheme.secondary);
    document.body.style.backgroundColor = currentTheme.bg;
    document.body.style.color = currentTheme.text;
  }, [theme]);

  const funFacts = theme === 'christmas' ? [
    "🎄 Merry Christmas & Happy Coding!",
    "🎅 Santa approved this portfolio",
    "❄️ Let it snow, let it code!",
    "🎁 Unwrapping new features daily",
    "⭐ Spreading holiday cheer through code"
  ] : [
    "😜 Passionate and a little silly",
    "☕ Fueled by coffee and code",
    "🚀 Always learning new technologies",
    "🌟 Building beautiful web experiences",
    "💡 Creative problem solver"
  ];

  const techStack = [
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Tailwind', color: '#06b6d4' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'Git', color: '#f05032' }
  ];

  // Close start menu on outside click (but not when clicking the Start button itself)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isStartOpen) return;

      const target = event.target as HTMLElement;

      // Check if click is inside Start menu
      if (startMenuRef.current && startMenuRef.current.contains(target)) {
        return;
      }

      // Check if click is on the Start button (or its children)
      if (target.closest('[data-start-button]')) {
        return;
      }

      // Close the menu for any other click
      setIsStartOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStartOpen]);

  return (
    <div className="relative h-screen w-screen bg-win-bg overflow-hidden selection:bg-win-accent selection:text-white font-retro">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-win-bg">
        {theme === 'christmas' ? (
          <>
            {/* Christmas decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Falling Snowflakes */}
              {snowflakes.map((flake) => (
                <div
                  key={flake.id}
                  className="absolute text-white animate-snowfall"
                  style={{
                    left: `${flake.left}%`,
                    // animationDelay: `${flake.delay}s`,
                    animationDuration: `${flake.duration}s`,
                    opacity: flake.opacity
                  }}
                >
                  <Snowflake size={flake.size} className="text-white/80" />
                </div>
              ))}

              {/* Christmas Trees - spread across corners */}
              <TreePine size={100} className="absolute bottom-20 left-4 text-green-500 opacity-15 animate-float" />
              <TreePine size={140} className="hidden md:block absolute bottom-24 right-8 text-green-600 opacity-12 animate-float [animation-delay:2s]" />
              <TreePine size={70} className="hidden lg:block absolute top-1/2 left-[15%] text-green-400 opacity-10 animate-float [animation-delay:4s]" />

              {/* Presents - bottom area, well spaced */}
              <Gift size={45} className="absolute bottom-20 left-[20%] text-red-500 opacity-20 animate-float [animation-delay:1s]" />
              <Gift size={55} className="hidden md:block absolute bottom-24 right-[25%] text-red-400 opacity-18 animate-float [animation-delay:3s]" />

              {/* Ornaments - scattered around edges */}
              <Star size={50} className="absolute top-16 right-[15%] text-yellow-400 opacity-35 animate-sparkle fill-yellow-400/30" />
              <Circle size={35} className="hidden md:block absolute top-[30%] left-[8%] text-red-500 opacity-25 animate-sparkle [animation-delay:0.5s] fill-red-500/50" />
              <Circle size={28} className="hidden lg:block absolute top-[45%] right-[10%] text-green-500 opacity-30 animate-sparkle [animation-delay:1s] fill-green-500/50" />
              <Circle size={32} className="hidden md:block absolute bottom-[40%] left-[45%] text-blue-400 opacity-25 animate-sparkle [animation-delay:1.5s] fill-blue-400/50" />

              {/* Candy - corners */}
              <Candy size={40} className="hidden lg:block absolute top-[60%] left-4 text-red-400 opacity-18 rotate-45" />
              <Candy size={35} className="hidden md:block absolute top-[25%] right-4 text-pink-400 opacity-20 -rotate-45" />

              {/* Stars for sparkle - top area */}
              <Star size={25} className="absolute top-8 right-[40%] text-yellow-300 opacity-25 animate-float fill-yellow-300/20" />
              <Sparkles size={35} className="hidden lg:block absolute top-[35%] right-[30%] text-yellow-200 opacity-20 animate-float [animation-delay:1s]" />
            </div>

            {/* Christmas glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.15)_0%,transparent_50%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.1)_0%,transparent_50%)] animate-shimmer" />
          </>
        ) : (
          <>
            {/* Default decorations */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden">
              <Heart size={400} className="absolute -top-20 -left-20 text-win-accent animate-float opacity-30" />
              <Sparkles size={300} className="absolute bottom-20 right-20 text-win-secondary animate-float [animation-delay:2s] opacity-40" />
              <Star size={100} className="absolute top-1/4 right-1/3 text-win-accent animate-sparkle" />
              <Star size={60} className="absolute bottom-1/3 left-1/4 text-win-secondary animate-sparkle [animation-delay:1s]" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,121,249,0.18)_0%,transparent_100%)] animate-shimmer" />
          </>
        )}
      </div>

      {/* Retro scanline/grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_3px,4px_100%] pointer-events-none z-[3000]"></div>

      {/* Desktop Workspace */}
      <div
        ref={desktopRef}
        className="relative h-full w-full p-4 overflow-hidden pb-12"
      >
        {/* Icons Grid - Grid-based for perfect alignment, column-first flow */}
        <div className="grid grid-flow-col auto-cols-max grid-rows-[repeat(auto-fill,110px)] gap-2 h-full w-full relative z-10 pointer-events-none">
          <div className="pointer-events-auto contents">
            <DesktopIcon index={0} label="About.exe" icon={User} onDoubleClick={() => openWindow('about')} />
            <DesktopIcon index={1} label="Skills.sys" icon={Cpu} onDoubleClick={() => openWindow('skills')} />
            <DesktopIcon index={2} label="Education.txt" icon={GraduationCap} onDoubleClick={() => openWindow('education')} />
            <DesktopIcon index={3} label="Experience.log" icon={ListChecks} onDoubleClick={() => openWindow('experience')} />
            <DesktopIcon index={4} label="Projects" icon={Briefcase} onDoubleClick={() => openWindow('projects')} />
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
          className="fixed bottom-10 left-1 w-96 max-h-[85vh] win-outset bg-win-surface z-[2100] shadow-[10px_10px_30px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-4 duration-200 overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-win-accent to-win-secondary h-14 flex items-center px-4 font-bold italic text-white shadow-inner gap-3 sticky top-0 z-10">
            <div className="p-1.5 bg-white/30 rounded-sm backdrop-blur-sm">
              <Heart size={22} className="animate-pulse fill-white/30" />
            </div>
            <div>
              <div className="tracking-tight uppercase text-sm">Lavinia_OS 2025</div>
              <div className="text-[9px] opacity-90 font-normal">Professional Edition</div>
            </div>
          </div>

          <div className="p-3 space-y-3">
            {/* Mini Bio / Status */}
            <div className="win-inset bg-win-bg p-3 space-y-2">
              <div className="flex items-center gap-2 border-b border-win-shadow pb-2">
                <User size={16} className="text-win-accent" />
                <span className="font-bold text-xs uppercase">System Status</span>
              </div>
              <div className="text-[11px] leading-relaxed">
                <p className="mb-1">👋 <strong>Lavinia Alfons</strong></p>
                <p className="text-win-text/80">{currentStatus}</p>
              </div>
            </div>

            {/* Fun Facts - Rotating */}
            <div className="win-inset bg-win-bg p-3 space-y-2">
              <div className="flex items-center gap-2 border-b border-win-shadow pb-2">
                <Sparkles size={16} className="text-win-secondary" />
                <span className="font-bold text-xs uppercase">Daily Inspiration</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {funFacts[Math.floor(Date.now() / 10000) % funFacts.length]}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="win-inset bg-win-bg p-3 space-y-2">
              <div className="flex items-center gap-2 border-b border-win-shadow pb-2">
                <Cpu size={16} className="text-win-accent" />
                <span className="font-bold text-xs uppercase">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="text-[10px] px-2 py-1 rounded win-outset bg-win-surface font-bold"
                    style={{ borderLeftColor: tech.color, borderLeftWidth: '3px' }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="win-inset bg-win-bg p-2 space-y-1">
              <div className="flex items-center gap-2 border-b border-win-shadow pb-2 px-1">
                <Star size={16} className="text-win-accent" />
                <span className="font-bold text-xs uppercase">Quick Actions</span>
              </div>

              {/* Download Resume */}
              <button
                onClick={() => {
                  // You can replace this with your actual resume link
                  window.open('Lavinia_Nael_Alfons_CV.pdf', '_blank');
                }}
                className="w-full flex items-center gap-3 px-2 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-win-accent hover:text-white transition-colors group win-outset bg-win-surface"
              >
                <GraduationCap size={16} className="text-win-accent group-hover:text-white" />
                Download Resume.pdf
              </button>

              {/* Contact */}
              <button
                onClick={() => { openWindow('contact'); setIsStartOpen(false); }}
                className="w-full flex items-center gap-3 px-2 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-win-accent hover:text-white transition-colors group win-outset bg-win-surface"
              >
                <Send size={16} className="text-win-secondary group-hover:text-white" />
                Send Message
              </button>
            </div>

            {/* Social Media Links */}
            <div className="win-inset bg-win-bg p-2 space-y-1">
              <div className="flex items-center gap-2 border-b border-win-shadow pb-2 px-1">
                <Heart size={16} className="text-win-secondary" />
                <span className="font-bold text-xs uppercase">Connect</span>
              </div>

              <button
                onClick={() => window.open('https://github.com/LaviniaNael', '_blank')}
                className="w-full flex items-center gap-3 px-2 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-gray-800 hover:text-white transition-colors group win-outset bg-win-surface"
              >
                <Github size={16} className="group-hover:text-white" />
                GitHub Profile
              </button>

              <button
                onClick={() => window.open('https://linkedin.com/in/lavinia-alfons', '_blank')}
                className="w-full flex items-center gap-3 px-2 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-blue-600 hover:text-white transition-colors group win-outset bg-win-surface"
              >
                <Linkedin size={16} className="text-blue-600 group-hover:text-white" />
                LinkedIn Profile
              </button>
            </div>

            {/* Settings */}
            <div className="win-inset bg-win-bg p-2 space-y-1">
              <div className="flex items-center gap-2 border-b border-win-shadow pb-2 px-1">
                <Star size={16} className="text-win-accent" />
                <span className="font-bold text-xs uppercase">Settings</span>
              </div>

              <button
                onClick={() => {
                  setTheme(theme === 'default' ? 'christmas' : 'default');
                }}
                className="w-full flex items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-win-accent hover:text-white transition-colors group win-outset bg-win-surface"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-win-accent group-hover:text-white" />
                  Theme: {themes[theme].label}
                </div>
                <div className="text-[9px] opacity-70">Toggle</div>
              </button>
            </div>

            {/* Games */}
            <div className="win-inset bg-win-bg p-2 space-y-1">
              <div className="flex items-center gap-2 border-b border-win-shadow pb-2 px-1">
                <Gamepad2 size={16} className="text-win-secondary" />
                <span className="font-bold text-xs uppercase">Entertainment</span>
              </div>

              <button
                onClick={() => { openWindow('snake'); setIsStartOpen(false); }}
                className="w-full flex items-center gap-3 px-2 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-gradient-to-r hover:from-win-accent hover:to-win-secondary hover:text-white transition-colors group win-outset bg-win-surface"
              >
                <Gamepad2 size={16} className="text-win-secondary group-hover:text-white" />
                Snake.exe
              </button>
            </div>

            {/* Disconnect */}
            <button
              onClick={() => setIsStartOpen(false)}
              className="w-full flex items-center gap-3 px-2 py-2 text-[11px] font-bold uppercase tracking-tight hover:bg-red-600 hover:text-white text-red-600 mt-2 win-outset bg-win-surface"
            >
              <Send size={16} />
              Close Menu
            </button>
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
