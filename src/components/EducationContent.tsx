import { GraduationCap, BookOpen, Calendar, Calculator } from 'lucide-react';
import './EducationContent.css';

const EducationContent = () => {
    return (
        <div className="education-container">
            <div className="education-header">
                <div className="degree-icon-box win-outset">
                    <GraduationCap size={40} className="text-win-accent" />
                </div>
                <div className="degree-info">
                    <h2 className="degree-title">Bachelor’s Degree</h2>
                    <p className="degree-major">Mathematics and Computer Science</p>
                    <div className="degree-meta">
                        <Calendar size={12} />
                        <span>Graduation: August 2025</span>
                    </div>
                    <p className="degree-faculty">Faculty of Science</p>
                </div>
            </div>

            <div className="coursework-section">
                <h3 className="section-label">Core Coursework</h3>
                <div className="coursework-list">
                    {[
                        { title: 'Advanced Programming', desc: 'Java, C# Implementation', icon: BookOpen },
                        { title: 'Database Design', desc: 'Architecture & Optimization', icon: BookOpen },
                        { title: 'Algorithmic Problem Solving', desc: 'Complex Logic Workflows', icon: Calculator },
                    ].map((item, i) => (
                        <div key={i} className="course-item win-inset">
                            <item.icon size={16} className="course-icon" />
                            <div>
                                <p className="course-title">{item.title}</p>
                                <p className="course-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="education-quote win-outset">
                "Applying mathematical logic to optimize frontend performance and software architecture."
            </div>
        </div>
    );
};

export default EducationContent;
