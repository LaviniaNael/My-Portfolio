import { GraduationCap, BookOpen, Calendar, Calculator } from 'lucide-react';

const EducationContent = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-start gap-4">
                <div className="p-3 win-outset bg-win-accent/20">
                    <GraduationCap size={40} className="text-win-accent" />
                </div>
                <div className="space-y-1">
                    <h2 className="text-xl font-bold text-win-text">Bachelor’s Degree</h2>
                    <p className="text-win-accent font-bold">Mathematics and Computer Science</p>
                    <div className="flex items-center gap-2 text-xs text-win-text/60">
                        <Calendar size={12} />
                        <span>Graduation: August 2025</span>
                    </div>
                    <p className="text-xs text-win-text/60 italic">Faculty of Science</p>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-win-text/40 border-b border-win-highlight/10 pb-1">Core Coursework</h3>
                <div className="grid grid-cols-1 gap-2">
                    {[
                        { title: 'Advanced Programming', desc: 'Java, C# Implementation', icon: BookOpen },
                        { title: 'Database Design', desc: 'Architecture & Optimization', icon: BookOpen },
                        { title: 'Algorithmic Problem Solving', desc: 'Complex Logic Workflows', icon: Calculator },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 win-inset bg-black/20 hover:bg-black/30 transition-colors">
                            <item.icon size={16} className="text-win-accent/70" />
                            <div>
                                <p className="text-sm font-bold text-win-text/90">{item.title}</p>
                                <p className="text-[10px] text-win-text/50">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="win-outset p-3 bg-win-accent/5 italic text-[11px] text-win-text/70 border-l-4 border-win-accent">
                "Applying mathematical logic to optimize frontend performance and software architecture."
            </div>
        </div>
    );
};

export default EducationContent;
