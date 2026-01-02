import React from 'react';
import { Heart, Sparkles, Code2, Monitor, MousePointer2, Layout, Palette } from 'lucide-react';
import './ReadmeContent.css';

const ReadmeContent: React.FC = () => {
    return (
        <div className="readme-container custom-scrollbar">
            {/* Header Section */}
            <div className="readme-hero win-inset group">
                <div className="readme-hero-icon">
                    <Code2 size={100} className='animate-float [animation-delay:5s]'/>
                </div>

                <div className="readme-hero-content">
                    <div className="hero-title-wrapper">
                        <Sparkles className="text-win-accent animate-pulse" />
                        <h1 className="hero-title animate-shimmer">
                            Lavinia_OS 2025
                        </h1>
                        <Sparkles className="text-win-accent animate-pulse" />
                    </div>
                    <p className="hero-subtitle">
                        "Not just a portfolio… it’s a tiny computer living inside your browser"
                    </p>
                    <div className="hero-subtitle hero-divider" />
                </div>
            </div>

            <div className="intro-grid">
                {/* Who am I Section */}
                <div className="readme-card win-outset">
                    <div className="card-header">
                        <div className="card-icon-box bg-win-accent/20">
                            <Heart size={20} className="text-win-accent fill-win-accent/30" />
                        </div>
                        <h2 className="card-title">Who am I?</h2>
                    </div>
                    <div className="card-content">
                        <p>Hi, I’m <strong className="accent-text">Lavinia Nael Alfons 💗🦋</strong></p>
                        <p>A Front-End Developer who loves mixing <span className="secondary-bold font-bold">logic with aesthetics</span>.</p>
                        <p className="dim-text">
                            I come from a Mathematics & Computer Science background, but my heart is always leaning toward design, colors, and ✨ vibes ✨.
                        </p>
                    </div>
                </div>

                {/* What is this project Section */}
                <div className="readme-card win-outset">
                    <div className="card-header">
                        <div className="card-icon-box bg-win-secondary/20">
                            <Monitor size={20} className="text-win-secondary" />
                        </div>
                        <h2 className="card-title">The Project</h2>
                    </div>
                    <div className="card-content">
                        <p>Think Win95 energy 🎧 but make it <strong className="text-win-secondary">girly</strong> — pinks, lavenders, hearts, sparkles… yes please 💅</p>
                        <div className="info-list win-inset">
                            <div className="list-item"><div className="item-dot bg-win-accent" /> opening apps</div>
                            <div className="list-item"><div className="item-dot bg-win-secondary" /> dragging windows</div>
                            <div className="list-item"><div className="item-dot bg-win-accent" /> discovery exploration</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why a Retro OS Section */}
            <div className="section-divider-row">
                <div className="divider-header">
                    <div className="divider-line divider-to-right" />
                    <h2 className="divider-title">Why Retro?</h2>
                    <div className="divider-line divider-to-left" />
                </div>

                <div className="why-retro-list">
                    {[
                        {
                            icon: Layout,
                            title: "Structure Lover",
                            desc: "As a Math & CS graduate, windows and grids just make sense to my brain. This interface reflects how I build.",
                            color: "text-blue-icon"
                        },
                        {
                            icon: Palette,
                            title: "Breaking the Boredom",
                            desc: "I wanted to prove that strong engineering doesn’t have to look serious or dull. Clean code + pink UI = valid ✨",
                            color: "text-accent-icon"
                        },
                        {
                            icon: MousePointer2,
                            title: "Interaction > Scrolling",
                            desc: "I wanted you to discover things by clicking and opening — like a real desktop.",
                            color: "text-secondary-icon"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="why-retro-item win-inset group">
                            <item.icon className={`why-retro-icon ${item.color}`} size={24} />
                            <div className="why-retro-details">
                                <h3 className="why-retro-title">{item.title}</h3>
                                <p className="why-retro-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Built with Section */}
            <div className="built-with-card win-outset">
                <div className="built-with-glow" />
                <div className="built-with-content">
                    <h2 className="built-with-title">
                        <Code2 className="text-win-accent" />
                        Built With
                        <Code2 className="text-win-accent" />
                    </h2>
                    <div className="tech-tags-wrapper">
                        {['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'].map((tech) => (
                            <span key={tech} className="tech-tag win-outset">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="readme-footer">
                <p className="footer-love">Made with love, caffeine, and a lot of pink 💖</p>
                <p className="footer-name">Lavinia Nael Alfons — 2025</p>
            </div>
        </div>
    );
};

export default ReadmeContent;
