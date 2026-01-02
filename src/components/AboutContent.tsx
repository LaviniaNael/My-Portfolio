import { User, Sparkles, Heart } from 'lucide-react';
import './AboutContent.css';

const AboutContent = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <div className="profile-icon-wrapper">
                    <User size={48} className="text-win-accent" />
                    <Sparkles size={16} className="profile-sparkle animate-pulse" />
                </div>
                <div>
                    <h2 className="profile-name">
                        Lavinia Nael Alfons <Heart size={16} className="text-win-secondary fill-win-secondary/20" />
                    </h2>
                    <p className="profile-title">Front-End Developer | Cairo, Egypt</p>
                </div>
            </div>

            <div className="about-card win-inset group">
                <div className="about-card-sparkle">
                    <Sparkles size={60} className="text-win-accent" />
                </div>
                <p className="card-filename">
                    <span className="status-dot animate-pulse" /> user_summary.log
                </p>
                <p className="about-text">
                    Analytical Front-End Developer with a degree in <span className="highlight-text">Mathematics and Computer Science</span>.
                    Specialized in building high-performance, responsive, and SEO-optimized web applications.
                </p>
                <p className="about-footer-text">
                    Strong at combining mathematical logic with visual elegance to create pixel-perfect UI and interactive experiences.
                </p>
            </div>

            <div className="quick-skills-grid">
                {['React.js', 'Tailwind CSS', 'TypeScript', 'SEO + Performance'].map(skill => (
                    <div key={skill} className="skill-tag win-outset">
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutContent;
