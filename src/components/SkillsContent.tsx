import { Shield, Cpu, Code, Database, Globe, Layers } from 'lucide-react';
import './SkillsContent.css';

const SkillGroup = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) => (
    <div className="skill-group-card win-outset">
        <div className="skill-group-header">
            <Icon size={16} className="skill-group-icon" />
            <span className="skill-group-title">{title}</span>
        </div>
        <div className="skills-list">
            {skills.map(skill => (
                <span key={skill} className="skill-badge">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const SkillsContent = () => {
    return (
        <div className="skills-container">
            <div className="system-scan-box win-inset">
                [SYSTEM ARCHITECTURE DETECTED]
                <br />
                {'>'} Scanning technical_capabilities...
                <br />
                {'>'} 100% Match Found.
            </div>

            <div className="skills-grid">
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

            <div className="skills-footer win-inset">
                <div className="skills-footer-info">
                    <Shield size={14} className="text-win-accent" />
                    <span className="skills-footer-text">SEO & Performance Optimized</span>
                </div>
                <Globe size={14} className="skills-footer-icon" />
            </div>
        </div>
    );
};

export default SkillsContent;
