import { Briefcase, CheckCircle2, Layout, Zap, Search } from 'lucide-react';

const ExperienceContent = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-win-highlight/20 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 win-outset bg-win-accent">
                        <Briefcase size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-win-text">Front-End Developer</h2>
                        <p className="text-sm text-win-accent font-bold">Procode</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-mono text-win-text/50">Aug 2025 – Present</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-win-text/40">Development Task_Log</h3>
                    <ul className="space-y-3">
                        {[
                            "Built modular, component-based UIs using React and Hooks",
                            "Developed responsive, mobile-first layouts with Tailwind & Bootstrap",
                            "Optimized performance, SEO, and accessibility",
                            "Collaborated with designers and stakeholders"
                        ].map((task, i) => (
                            <li key={i} className="flex gap-3 text-xs text-win-text/80 group">
                                <div className="mt-0.5"><CheckCircle2 size={14} className="text-win-accent/50 group-hover:text-win-accent transition-colors" /></div>
                                <span>{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-win-text/40">Creative Workflow</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { icon: Layout, label: "UI Implementation", desc: "Pixel-perfect React components" },
                            { icon: Zap, label: "Performance", desc: "SEO & Speed optimization" },
                            { icon: Search, label: "UI Revisions", desc: "Client-centric feedback loops" }
                        ].map((item, i) => (
                            <div key={i} className="p-2 win-inset bg-black/10 flex items-center gap-3">
                                <item.icon size={16} className="text-win-accent/60" />
                                <div>
                                    <p className="text-[11px] font-bold">{item.label}</p>
                                    <p className="text-[9px] text-win-text/40">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceContent;
