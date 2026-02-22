import { ExternalLink, Github, Folder, Monitor, ShoppingCart, CheckSquare, Users, Music, Briefcase } from 'lucide-react';
import './ProjectsContent.css';

const PROJECTS = [
    // ... same as before
    { id: 1, title: 'Fryday Restaurant', desc: 'Mobile-first restaurant website with modular scalable styling.', tech: ['Tailwind', 'Responsive', 'Grid'], link: 'https://fryday-restaurant.netlify.app/', repo: 'https://github.com/LaviniaNael/FryDay', icon: ShoppingCart },
    { id: 2, title: 'Mirox', desc: 'Corporate website showcasing smart solutions, sustainability, and tech-driven services.', tech: ['Responsive', 'UI Design', 'Landing Page', 'Ecommerce'], link: 'https://mirox2026.netlify.app/', repo: 'https://github.com/LaviniaNael/mirox', icon: Briefcase },
    { id: 3, title: 'Lavizon', desc: 'React-based e-commerce interface with dynamic product handling.', tech: ['React', 'State Mgmt', 'Ecommerce'], link: 'https://lavizon.netlify.app/', repo: 'https://github.com/LaviniaNael/Lavizon', icon: ShoppingCart },
    { id: 4, title: 'Lavilist', desc: 'To-do application using Local Storage for efficient handling.', tech: ['JS', 'Local Storage', 'Events'], link: 'https://lavilist.netlify.app/', repo: 'https://github.com/LaviniaNael/LaviList', icon: CheckSquare },
    { id: 5, title: 'Influenzilla', desc: 'Social-media-inspired UI built to experiment with SASS.', tech: ['SASS', 'Reusable Comp', 'UI'], link: 'https://influenzillaa.netlify.app/', repo: 'https://github.com/LaviniaNael/Influenzilla', icon: Users },
    { id: 6, title: 'M00d Playlist', desc: 'Mood-based music discovery interface with custom rendering.', tech: ['State Mgmt', 'Theming', 'React'], link: 'https://m00dplaylist.netlify.app/', repo: 'https://github.com/LaviniaNael/play-me', icon: Music },
    { id: 7, title: 'Windows XP 98', desc: 'Interactive mini-game simulating legacy desktop environments.', tech: ['State Handling', 'DOM', 'Retro UI'], link: 'https://windowsxp98.netlify.app/', repo: 'https://github.com/LaviniaNael/Windows98', icon: Monitor }
];

const ProjectsContent = () => {
    return (
        <div className="projects-container">
            <div className="projects-path-bar">
                <Folder size={18} className="text-win-accent" />
                <span className="projects-path-text">C:\Users\Lavinia\Projects</span>
            </div>

            <div className="projects-grid">
                {PROJECTS.map(project => (
                    <div key={project.id} className="project-card win-outset group">
                        <div className="project-card-header">
                            <project.icon size={20} className="project-icon" />
                            <div className="project-links">
                                <a href={project.repo} target="_blank" rel="noreferrer" title="Github Repo">
                                    <Github size={14} className="project-link-icon" />
                                </a>
                                <a href={project.link} target="_blank" rel="noreferrer" title="Live Demo">
                                    <ExternalLink size={14} className="project-link-icon" />
                                </a>
                            </div>
                        </div>

                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-desc">{project.desc}</p>

                        <div className="project-tech-list">
                            {project.tech.map(t => (
                                <span key={t} className="tech-badge">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsContent;
