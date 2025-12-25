import { Shield, Cpu, Code, Database, Globe, Layers } from 'lucide-react';

const SkillGroup = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) => (
    <div className="win-outset p-3 bg-win-surface/40 space-y-2">
        <div className="flex items-center gap-2 border-b border-win-highlight/20 pb-1 mb-2">
            <Icon size={16} className="text-win-accent" />
            <span className="text-xs font-bold uppercase tracking-tight text-win-accent">{title}</span>
        </div>
        <div className="flex flex-wrap gap-1">
            {skills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-black/40 text-[10px] font-mono border border-win-highlight/10 text-win-text/90">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const SkillsContent = () => {
    return (
        <div className="space-y-4">
            <div className="win-inset p-3 bg-black/20 font-mono text-[11px] leading-tight text-green-500/80">
                [SYSTEM ARCHITECTURE DETECTED]
                <br />
                {'>'} Scanning technical_capabilities...
                <br />
                {'>'} 100% Match Found.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SkillGroup
                    title="Languages"
                    icon={Code}
                    skills={['HTML5', 'CSS3', 'Sass', 'JavaScript', 'TypeScript']}
                />
                <SkillGroup
                    title="Frameworks"
                    icon={Layers}
                    skills={['React.js', 'Tailwind CSS', 'Bootstrap']}
                />
                <SkillGroup
                    title="Tools"
                    icon={Database}
                    skills={['WordPress', 'Elementor', 'Git', 'Vite']}
                />
                <SkillGroup
                    title="Core"
                    icon={Cpu}
                    skills={['Mathematics', 'Logic Opt.', 'Algorithms']}
                />
            </div>

            <div className="mt-4 flex items-center justify-between p-2 win-inset bg-win-accent/5">
                <div className="flex items-center gap-2">
                    <Shield size={14} className="text-win-accent" />
                    <span className="text-[10px] font-bold">SEO & Performance Optimized</span>
                </div>
                <Globe size={14} className="text-win-text/30" />
            </div>
        </div>
    );
};

export default SkillsContent;
