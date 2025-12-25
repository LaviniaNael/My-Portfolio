import { ExternalLink, Github, Folder, Monitor, ShoppingCart, CheckSquare, Users, Music } from 'lucide-react';

const PROJECTS = [
    {
        id: 1,
        title: 'Windows XP 98',
        desc: 'Interactive mini-game simulating legacy desktop environments.',
        tech: ['State Handling', 'DOM', 'Retro UI'],
        link: 'https://windowsxp98.netlify.app/',
        repo: '#',
        icon: Monitor
    },
    {
        id: 2,
        title: 'Fryday Restaurant',
        desc: 'Mobile-first restaurant website with modular scalable styling.',
        tech: ['Tailwind', 'Responsive', 'Grid'],
        link: 'https://fryday-restaurant.netlify.app/',
        repo: '#',
        icon: ShoppingCart
    },
    {
        id: 3,
        title: 'Lavizon',
        desc: 'React-based e-commerce interface with dynamic product handling.',
        tech: ['React', 'State Mgmt', 'Ecommerce'],
        link: 'https://lavizon.netlify.app/',
        repo: '#',
        icon: ShoppingCart
    },
    {
        id: 4,
        title: 'Lavilist',
        desc: 'To-do application using Local Storage for efficient handling.',
        tech: ['JS', 'Local Storage', 'Events'],
        link: 'https://lavilist.netlify.app/',
        repo: '#',
        icon: CheckSquare
    },
    {
        id: 5,
        title: 'Influenzilla',
        desc: 'Social-media-inspired UI built to experiment with SASS.',
        tech: ['SASS', 'Reusable Comp', 'UI'],
        link: 'https://influenzillaa.netlify.app/',
        repo: '#',
        icon: Users
    },
    {
        id: 6,
        title: 'M00d Playlist',
        desc: 'Mood-based music discovery interface with custom rendering.',
        tech: ['State Mgmt', 'Theming', 'React'],
        link: 'https://m00dplaylist.netlify.app/',
        repo: '#',
        icon: Music
    }
];

const ProjectsContent = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 p-2 bg-win-accent/10 border-b border-win-accent/30">
                <Folder size={18} className="text-win-accent" />
                <span className="text-xs font-mono font-bold">C:\Users\Lavinia\Projects</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map(project => (
                    <div key={project.id} className="win-outset p-4 bg-win-surface/40 hover:bg-win-surface/60 transition-all hover:scale-[1.02] group">
                        <div className="flex justify-between items-start mb-2">
                            <project.icon size={20} className="text-win-accent/50 group-hover:text-win-accent transition-colors" />
                            <div className="flex gap-2">
                                <a href={project.repo} target="_blank" rel="noreferrer" title="Github Repo">
                                    <Github size={14} className="text-win-text/40 hover:text-win-accent" />
                                </a>
                                <a href={project.link} target="_blank" rel="noreferrer" title="Live Demo">
                                    <ExternalLink size={14} className="text-win-text/40 hover:text-win-accent" />
                                </a>
                            </div>
                        </div>

                        <h3 className="font-bold text-win-text text-md mb-1">{project.title}</h3>
                        <p className="text-[10px] text-win-text/60 mb-3 leading-tight h-8 line-clamp-2">{project.desc}</p>

                        <div className="flex flex-wrap gap-1">
                            {project.tech.map(t => (
                                <span key={t} className="px-1.5 py-0.5 bg-black/40 text-[9px] font-mono border border-win-highlight/10 text-win-accent/80">
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
