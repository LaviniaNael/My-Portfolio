import { User, Sparkles, Heart } from 'lucide-react';

const AboutContent = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-win-surface/30 border border-win-highlight/10 rounded">
                <div className="p-3 bg-win-accent/20 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.2)] relative">
                    <User size={48} className="text-win-accent" />
                    <Sparkles size={16} className="absolute -top-1 -right-1 text-win-secondary animate-pulse" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-win-accent flex items-center gap-2">
                        Lavinia Nael Alfons <Heart size={16} className="text-win-secondary fill-win-secondary/20" />
                    </h2>
                    <p className="text-sm text-win-text/80 font-mono tracking-tighter">Front-End Developer | Cairo, Egypt</p>
                </div>
            </div>

            <div className="win-inset p-4 bg-black/40 font-mono text-[13px] leading-relaxed relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Sparkles size={60} className="text-win-accent" />
                </div>
                <p className="mb-3 text-win-accent font-bold tracking-widest uppercase text-[10px] flex items-center gap-2">
                    <span className="w-2 h-2 bg-win-accent animate-pulse" /> user_summary.log
                </p>
                <p className="text-win-text/90 relative z-10">
                    Analytical Front-End Developer with a degree in <span className="text-win-accent font-bold">Mathematics and Computer Science</span>.
                    Specialized in building high-performance, responsive, and SEO-optimized web applications.
                </p>
                <p className="mt-4 text-win-text/80 italic text-xs leading-relaxed border-t border-win-highlight/10 pt-3">
                    Strong at combining mathematical logic with visual elegance to create pixel-perfect UI and interactive experiences.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {['React.js', 'Tailwind CSS', 'TypeScript', 'SEO + Performance'].map(skill => (
                    <div key={skill} className="win-outset p-2 text-center text-[10px] font-bold hover:bg-win-accent hover:text-white transition-all cursor-default">
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutContent;
