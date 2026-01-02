import { useState, useEffect, useRef } from "react";
import {
  User,
  Briefcase,
  Mail,
  Send,
  Github,
  Cpu,
  GraduationCap,
  ListChecks,
  Linkedin,
  Heart,
  Sparkles,
  Star,
  Snowflake,
  TreePine,
  Gift,
  Candy,
  Circle,
  Gamepad2,
  Monitor,
  FileText,
  Settings,
} from "lucide-react";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import DesktopIcon from "./components/DesktopIcon";
import AboutContent from "./components/AboutContent";
import ProjectsContent from "./components/ProjectsContent";
import ContactContent from "./components/ContactContent";
import SkillsContent from "./components/SkillsContent";
import EducationContent from "./components/EducationContent";
import ExperienceContent from "./components/ExperienceContent";
import SnakeGame from "./components/SnakeGame";
import MobileWarning from "./components/MobileWarning";
import ReadmeContent from "./components/ReadmeContent";
import { useWindowManager } from "./hooks/useWindowManager";
import type { WindowData } from "./types/desktop";
import "./App.css";

const INITIAL_WINDOWS: WindowData[] = [
  {
    id: "about",
    title: "About.exe",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: User,
    component: AboutContent,
    width: 500,
    defaultPosition: { x: 20, y: 20 },
  },
  {
    id: "skills",
    title: "Skills.sys",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: Cpu,
    component: SkillsContent,
    width: 550,
    defaultPosition: { x: 40, y: 50 },
  },
  {
    id: "education",
    title: "Education.txt",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: GraduationCap,
    component: EducationContent,
    width: 500,
    defaultPosition: { x: 60, y: 80 },
  },
  {
    id: "experience",
    title: "Experience.log",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: ListChecks,
    component: ExperienceContent,
    width: 650,
    defaultPosition: { x: 80, y: 110 },
  },
  {
    id: "projects",
    title: "Projects",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: Briefcase,
    component: ProjectsContent,
    width: 700,
    defaultPosition: { x: 40, y: 40 },
  },
  {
    id: "contact",
    title: "Contact.exe",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: Mail,
    component: ContactContent,
    width: 600,
    defaultPosition: { x: 20, y: 140 },
  },
  {
    id: "snake",
    title: "Snake.exe",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: Gamepad2,
    component: SnakeGame,
    width: 380,
    defaultPosition: { x: 100, y: 60 },
  },
  {
    id: "readme",
    title: "README.txt",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    icon: FileText,
    component: ReadmeContent,
    width: 700,
    defaultPosition: { x: 120, y: 120 },
  },
];

function App() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    toggleMinimize,
    focusWindow,
  } = useWindowManager(INITIAL_WINDOWS);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  // Mobile detection
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const hasSeenWarning = localStorage.getItem("lavinia-os-warning-seen");

    if (isMobile && !hasSeenWarning) {
      setShowMobileWarning(true);
    }
  }, []);

  const closeMobileWarning = () => {
    setShowMobileWarning(false);
    localStorage.setItem("lavinia-os-warning-seen", "true");
  };

  // Auto-detect December for Christmas theme
  const isDecember = new Date().getMonth() === 11; // December = 11 (0-indexed)
  const [theme, setTheme] = useState<"default" | "christmas">(
    isDecember ? "christmas" : "default"
  );
  const [currentStatus] = useState(
    isDecember
      ? "Ho ho ho! Happy Holidays! 🎅"
      : "Available for new opportunities! 💼"
  );
  const startMenuRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Generate snowflakes for Christmas theme
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 5 + Math.random() * 10,
    size: 8 + Math.random() * 16,
    opacity: 0.3 + Math.random() * 0.7,
  }));

  // Theme definitions
  const themes = {
    default: {
      bg: "#1a1525",
      surface: "#2a2135",
      header: "#3d3148",
      text: "#f5e6ff",
      highlight: "#5a4a6a",
      shadow: "#0f0c14",
      accent: "#ff4d8d",
      taskbar: "#221b2e",
      secondary: "#ff85a1",
      label: "💜 Default",
    },
    christmas: {
      bg: "#1a0f0f",
      surface: "#2d1a1a",
      header: "#4a2828",
      text: "#fff5f5",
      highlight: "#5c3030",
      shadow: "#0a0505",
      accent: "#ef4444",
      taskbar: "#1f1212",
      secondary: "#22c55e",
      label: "🎄 Christmas",
    },
  };

  // Apply theme CSS variables
  useEffect(() => {
    const currentTheme = themes[theme];
    const root = document.documentElement;
    root.style.setProperty("--color-win-bg", currentTheme.bg);
    root.style.setProperty("--color-win-surface", currentTheme.surface);
    root.style.setProperty("--color-win-header", currentTheme.header);
    root.style.setProperty("--color-win-text", currentTheme.text);
    root.style.setProperty("--color-win-highlight", currentTheme.highlight);
    root.style.setProperty("--color-win-shadow", currentTheme.shadow);
    root.style.setProperty("--color-win-accent", currentTheme.accent);
    root.style.setProperty("--color-win-taskbar", currentTheme.taskbar);
    root.style.setProperty("--color-win-secondary", currentTheme.secondary);
    document.body.style.backgroundColor = currentTheme.bg;
    document.body.style.color = currentTheme.text;
  }, [theme]);

  const funFacts =
    theme === "christmas"
      ? [
          "🎄 Merry Christmas & Happy Coding!",
          "🎅 Santa approved this portfolio",
          "❄️ Let it snow, let it code!",
          "🎁 Unwrapping new features daily",
          "⭐ Spreading holiday cheer through code",
        ]
      : [
          "😜 Passionate and a little silly",
          "☕ Fueled by coffee and code",
          "🚀 Always learning new technologies",
          "🌟 Building beautiful web experiences",
          "💡 Creative problem solver",
        ];

  const techStack = [
    { name: "React", color: "#61dafb" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Tailwind", color: "#06b6d4" },
    { name: "Node.js", color: "#68a063" },
    { name: "Git", color: "#f05032" },
  ];

  // Close start menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isStartOpen) return;
      const target = event.target as HTMLElement;
      if (startMenuRef.current && startMenuRef.current.contains(target)) return;
      if (target.closest("[data-start-button]")) return;
      setIsStartOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStartOpen]);

  return (
    <div className="app-container">
      {/* Ambient background */}
      <div className="ambient-bg">
        {theme === "christmas" ? (
          <div className="decorations-container">
            {snowflakes.map((flake) => (
              <div
                key={flake.id}
                className="snowflake animate-snowfall"
                style={{
                  left: `${flake.left}%`,
                  animationDuration: `${flake.duration}s`,
                  opacity: flake.opacity,
                }}
              >
                <Snowflake size={flake.size} className="text-white/80" />
              </div>
            ))}
            <TreePine
              size={100}
              className="absolute bottom-20 left-4 text-green-500 opacity-15 animate-float"
            />
            <TreePine
              size={140}
              className="hidden md:block absolute bottom-24 right-8 text-green-600 opacity-12 animate-float [animation-delay:2s]"
            />
            <TreePine
              size={70}
              className="hidden lg:block absolute top-1/2 left-[15%] text-green-400 opacity-10 animate-float [animation-delay:4s]"
            />
            <Gift
              size={45}
              className="absolute bottom-20 left-[20%] text-red-500 opacity-20 animate-float [animation-delay:1s]"
            />
            <Gift
              size={55}
              className="hidden md:block absolute bottom-24 right-[25%] text-red-400 opacity-18 animate-float [animation-delay:3s]"
            />
            <Star
              size={50}
              className="absolute top-16 right-[15%] text-yellow-400 opacity-35 animate-sparkle fill-yellow-400/30"
            />
            <Circle
              size={35}
              className="hidden md:block absolute top-[30%] left-[8%] text-red-500 opacity-25 animate-sparkle [animation-delay:0.5s] fill-red-500/50"
            />
            <Circle
              size={28}
              className="hidden lg:block absolute top-[45%] right-[10%] text-green-500 opacity-30 animate-sparkle [animation-delay:1s] fill-green-500/50"
            />
            <Circle
              size={32}
              className="hidden md:block absolute top-[15%] left-[20%] text-blue-600 opacity-50 animate-sparkle [animation-delay:1.5s] fill-blue-600/50"
            />
            <Candy
              size={40}
              className="hidden lg:block absolute top-[60%] left-4 text-red-400 opacity-18 rotate-45"
            />
            <Candy
              size={35}
              className="hidden md:block absolute top-[25%] right-4 text-pink-400 opacity-20 -rotate-45"
            />
            <Star
              size={25}
              className="absolute top-8 right-[40%] text-yellow-300 opacity-25 animate-float fill-yellow-300/20"
            />
            <Sparkles
              size={35}
              className="hidden lg:block absolute top-[35%] right-[30%] text-yellow-200 opacity-20 animate-float [animation-delay:1s]"
            />
            <div className="christmas-glow animate-shimmer" />
          </div>
        ) : (
          <div className="decorations-container">
            <Heart
              size={300}
              className="decoration-heart animate-float opacity-30"
            />
            <Heart
              size={150}
              className="decoration-heart1 opacity-30"
            />

            <Sparkles
              size={150}
              className="decoration-sparkles animate-float [animation-delay:2s] opacity-40"
            />
            <Star size={100} className="decoration-star-1 animate-sparkle" />
            <Star
              size={60}
              className="decoration-star-2 animate-sparkle [animation-delay:1s]"
            />
            <div className="ambient-glow animate-shimmer" />
          </div>
        )}
      </div>

      {/* Retro scanline/grid overlay */}
      <div className="retro-overlay"></div>

      {/* Desktop Workspace */}
      <div ref={desktopRef} className="desktop-workspace">
        {/* Desktop Hint */}
        <div className="desktop-hint">
          <div className="hint-content">
            <Monitor size={140} className="hint-monitor" />
            <h1 className="hint-title">Lavinia_OS 2025</h1>
            <p className="hint-p">
              "a digital playground and portfolio. double-click icons to explore
              my work, skills, and experience. have a wonderful stay!"
            </p>
            <div className="hint-icons animate-pulse">
              <Star size={50} />
              <Heart size={50} className="fill-current" />
              <Star size={50} />
            </div>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="icons-grid">
          <div>
            <DesktopIcon
              index={0}
              label="About.exe"
              icon={User}
              onDoubleClick={() => openWindow("about")}
            />
            <DesktopIcon
              index={1}
              label="Skills.sys"
              icon={Cpu}
              onDoubleClick={() => openWindow("skills")}
            />
            <DesktopIcon
              index={2}
              label="Education.txt"
              icon={GraduationCap}
              onDoubleClick={() => openWindow("education")}
            />
            <DesktopIcon
              index={3}
              label="Experience.log"
              icon={ListChecks}
              onDoubleClick={() => openWindow("experience")}
            />
            <DesktopIcon
              index={4}
              label="Projects"
              icon={Briefcase}
              onDoubleClick={() => openWindow("projects")}
            />
            <DesktopIcon
              index={5}
              label="Contact.exe"
              icon={Mail}
              onDoubleClick={() => openWindow("contact")}
            />
            <DesktopIcon
              index={6}
              label="README.txt"
              icon={FileText}
              onDoubleClick={() => openWindow("readme")}
            />
            <DesktopIcon
              index={7}
              label="GitHub"
              icon={Github}
              onDoubleClick={() =>
                window.open("https://github.com/LaviniaNael", "_blank")
              }
            />
            <DesktopIcon
              index={8}
              label="LinkedIn"
              icon={Linkedin}
              onDoubleClick={() =>
                window.open("https://linkedin.com/in/lavinia-alfons", "_blank")
              }
            />
          </div>
        </div>

        {/* Windows Rendering Layer */}
        {windows
          .filter((w) => w.isOpen && !w.isMinimized)
          .map((win) => {
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
          className="start-menu-outer win-outset animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="start-menu-header">
            <div className="header-icon-box">
              <Heart size={22} className="animate-pulse fill-white/30" />
            </div>
            <div>
              <div className="header-text-main">Lavinia_OS 2025</div>
              <div className="header-text-sub">Professional Edition</div>
            </div>
          </div>

          <div className="start-menu-content">
            <div className="start-section win-inset">
              <div className="section-header">
                <User size={16} className="text-win-accent" />
                <span className="section-title">System Status</span>
              </div>
              <div className="status-text">
                <p className="status-name">
                  👋 <strong>Lavinia Alfons</strong>
                </p>
                <p className="status-desc">{currentStatus}</p>
              </div>
            </div>

            <div className="start-section win-inset">
              <div className="section-header">
                <Sparkles size={16} className="text-win-secondary" />
                <span className="section-title">Daily Inspiration</span>
              </div>
              <p className="status-text italic">
                {funFacts[Math.floor(Date.now() / 10000) % funFacts.length]}
              </p>
            </div>

            <div className="start-section win-inset">
              <div className="section-header">
                <Cpu size={16} className="text-win-accent" />
                <span className="section-title">Tech Stack</span>
              </div>
              <div className="tech-badges-wrapper">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="tech-badge win-outset shadow-inner"
                    style={{ borderLeft: `3px solid ${tech.color}` }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="start-section win-inset">
              <div className="section-header">
                <Star size={16} className="text-win-accent" />
                <span className="section-title">Quick Actions</span>
              </div>
              <button
                onClick={() =>
                  window.open("Lavinia_Nael_Alfons_CV.pdf", "_blank")
                }
                className="action-btn win-outset"
              >
                <GraduationCap size={16} className="text-win-accent" />
                Download Resume.pdf
              </button>
              <button
                onClick={() => {
                  openWindow("contact");
                  setIsStartOpen(false);
                }}
                className="action-btn win-outset"
              >
                <Send size={16} className="text-win-secondary" />
                Send Message
              </button>
            </div>

            <div className="start-section win-inset">
              <div className="section-header">
                <Heart size={16} className="text-win-secondary" />
                <span className="section-title">Connect</span>
              </div>
              <button
                onClick={() =>
                  window.open("https://github.com/LaviniaNael", "_blank")
                }
                className="action-btn action-btn-github win-outset"
              >
                <Github size={16} />
                GitHub Profile
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://linkedin.com/in/lavinia-alfons",
                    "_blank"
                  )
                }
                className="action-btn action-btn-linkedin win-outset"
              >
                <Linkedin size={16} className="text-blue-600" />
                LinkedIn Profile
              </button>
            </div>

            <div className="start-section win-inset">
              <div className="section-header">
                <Settings size={16} className="text-win-accent" />
                <span className="section-title">Settings</span>
              </div>
              <button
                onClick={() =>
                  setTheme(theme === "default" ? "christmas" : "default")
                }
                className="action-btn win-outset"
              >
                <div className="theme-btn-content">
                  <Sparkles size={16} className="text-win-accent" />
                  Theme: {themes[theme].label}
                </div>
                <div className="theme-toggle-text">Toggle</div>
              </button>
            </div>

            <div className="start-section win-inset">
              <div className="section-header">
                <Gamepad2 size={16} className="text-win-secondary" />
                <span className="section-title">Entertainment</span>
              </div>
              <button
                onClick={() => {
                  openWindow("snake");
                  setIsStartOpen(false);
                }}
                className="action-btn win-outset"
              >
                <Gamepad2 size={16} className="text-win-secondary" />
                Snake.exe
              </button>
            </div>

            <button
              onClick={() => setIsStartOpen(false)}
              className="action-btn win-outset"
              style={{ color: "rgb(220, 38, 38)", marginTop: "0.5rem" }}
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

      {/* Mobile Interaction Warning */}
      {showMobileWarning && <MobileWarning onClose={closeMobileWarning} />}
    </div>
  );
}

export default App;
