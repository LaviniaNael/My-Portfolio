import { Briefcase, CheckCircle2, Layout, Zap, Search } from 'lucide-react';
import './ExperienceContent.css';

const ExperienceContent = () => {
    return (
        <div className="experience-container">
            <div className="experience-header">
                <div className="job-title-wrapper">
                    <div className="job-icon-box win-outset">
                        <Briefcase size={20} className="text-white" />
                    </div>
                    <div className="job-details">
                        <h2 className="job-role">Front-End Developer</h2>
                        <p className="job-company">Procode</p>
                    </div>
                </div>
                <div className="job-timeline">
                    <p className="timeline-text">Aug 2025 – Present</p>
                </div>
            </div>

            <div className="experience-grid">
                <div className="exp-column">
                    <h3 className="exp-section-title">Development Task_Log</h3>
                    <ul className="task-list">
                        {[
                            "Built modular, component-based UIs using React and Hooks",
                            "Developed responsive, mobile-first layouts with Tailwind & Bootstrap",
                            "Optimized performance, SEO, and accessibility",
                            "Collaborated with designers and stakeholders"
                        ].map((task, i) => (
                            <li key={i} className="task-item group">
                                <CheckCircle2 size={14} className="task-icon" />
                                <span>{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="exp-column">
                    <h3 className="exp-section-title">Creative Workflow</h3>
                    <div className="workflow-list">
                        {[
                            { icon: Layout, label: "UI Implementation", desc: "Pixel-perfect React components" },
                            { icon: Zap, label: "Performance", desc: "SEO & Speed optimization" },
                            { icon: Search, label: "UI Revisions", desc: "Client-centric feedback loops" }
                        ].map((item, i) => (
                            <div key={i} className="workflow-item win-inset">
                                <item.icon size={16} className="workflow-icon" />
                                <div className="workflow-details">
                                    <p className="workflow-label">{item.label}</p>
                                    <p className="workflow-desc">{item.desc}</p>
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
