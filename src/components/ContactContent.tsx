import { Send, AtSign, MessageSquare, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { useState } from 'react';

const ContactContent = () => {
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Packet transmitted via secure tunnel...');
        setTimeout(() => setStatus(null), 3000);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            <div className="space-y-6">
                <div className="win-inset p-4 bg-black/30 border border-win-accent/20">
                    <h2 className="text-sm font-bold text-win-accent mb-4 uppercase tracking-widest">Connect_Protocol</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 group px-2 py-1 hover:bg-win-accent/10 transition-colors">
                            <div className="p-2 win-outset bg-win-surface"><AtSign size={14} className="text-win-accent" /></div>
                            <div className="overflow-hidden">
                                <p className="text-[9px] font-bold text-win-text/40 uppercase">Email</p>
                                <a href="mailto:laviniaalfons@gmail.com" className="text-xs text-win-text hover:text-win-accent truncate block">laviniaalfons@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 group px-2 py-1 hover:bg-win-accent/10 transition-colors">
                            <div className="p-2 win-outset bg-win-surface"><Phone size={14} className="text-win-accent" /></div>
                            <div>
                                <p className="text-[9px] font-bold text-win-text/40 uppercase">Phone</p>
                                <p className="text-xs text-win-text">01270369178 / 01002301440</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 group px-2 py-1 hover:bg-win-accent/10 transition-colors">
                            <div className="p-2 win-outset bg-win-surface"><MapPin size={14} className="text-win-accent" /></div>
                            <div>
                                <p className="text-[9px] font-bold text-win-text/40 uppercase">Location</p>
                                <p className="text-xs text-win-text">Cairo, Egypt</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <a href="https://linkedin.com/in/lavinia-alfons" target="_blank" className="flex-1 h-10 win-outset bg-win-surface flex items-center justify-center gap-2 text-xs font-bold hover:bg-win-accent hover:text-white transition-all">
                        <Linkedin size={16} /> LINKEDIN
                    </a>
                    <a href="https://github.com/LaviniaNael" target="_blank" className="flex-1 h-10 win-outset bg-win-surface flex items-center justify-center gap-2 text-xs font-bold hover:bg-win-accent hover:text-white transition-all">
                        <Github size={16} /> GITHUB
                    </a>
                </div>
            </div>

            <div className="win-outset p-4 bg-win-surface/40 space-y-4">
                <h3 className="text-xs font-bold text-win-text/60 italic flex items-center gap-2">
                    <MessageSquare size={14} /> Send a message...
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        className="w-full h-8 bg-black/40 win-inset px-2 text-xs outline-none focus:ring-1 focus:ring-win-accent border-none text-win-text"
                        placeholder="Identity Name"
                        required
                    />
                    <input
                        type="email"
                        className="w-full h-8 bg-black/40 win-inset px-2 text-xs outline-none focus:ring-1 focus:ring-win-accent border-none text-win-text"
                        placeholder="Protocol Address (Email)"
                        required
                    />
                    <textarea
                        className="w-full h-24 bg-black/40 win-inset p-2 text-xs outline-none focus:ring-1 focus:ring-win-accent border-none text-win-text resize-none"
                        placeholder="Transmission content..."
                        required
                    />
                    <button className="w-full h-10 win-outset bg-win-surface flex items-center justify-center gap-3 font-bold hover:bg-win-accent hover:text-white transition-all group">
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        TRANSMIT
                    </button>
                </form>
                {status && <p className="text-[10px] text-win-accent text-center animate-pulse font-mono uppercase tracking-widest">{status}</p>}
            </div>
        </div>
    );
};

export default ContactContent;
