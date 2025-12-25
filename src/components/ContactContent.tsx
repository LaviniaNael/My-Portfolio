import { Send, AtSign, MessageSquare, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ContactContent = () => {
    const [state, handleSubmit] = useForm("xaqwgqge");

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

                {state.succeeded ? (
                    <div className="win-inset bg-black/20 p-4 border-l-4 border-win-accent animate-in fade-in zoom-in-95">
                        <p className="text-sm text-win-accent font-bold uppercase tracking-widest mb-2">Transmission Successful</p>
                        <p className="text-xs text-win-text/80 leading-relaxed font-mono">
                            Packet received at terminal. Primary protocol acknowledged. Thanks for reaching out!
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-[10px] font-bold text-win-accent hover:underline uppercase"
                        >
                            Send another transmission?
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-1">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="w-full h-8 bg-black/40 win-inset px-2 text-xs outline-none focus:ring-1 focus:ring-win-accent border-none text-win-text"
                                placeholder="Identity Name"
                                required
                            />
                            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-[10px] text-red-400 font-mono" />
                        </div>

                        <div className="space-y-1">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="w-full h-8 bg-black/40 win-inset px-2 text-xs outline-none focus:ring-1 focus:ring-win-accent border-none text-win-text"
                                placeholder="Protocol Address (Email)"
                                required
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[10px] text-red-400 font-mono" />
                        </div>

                        <div className="space-y-1">
                            <textarea
                                id="message"
                                name="message"
                                className="w-full h-24 bg-black/40 win-inset p-2 text-xs outline-none focus:ring-1 focus:ring-win-accent border-none text-win-text resize-none"
                                placeholder="Transmission content..."
                                required
                            />
                            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-[10px] text-red-400 font-mono" />
                        </div>

                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full h-10 win-outset bg-win-surface flex items-center justify-center gap-3 font-bold hover:bg-win-accent hover:text-white transition-all group disabled:opacity-50 disabled:cursor-wait"
                        >
                            <Send size={16} className={cn("transition-transform", !state.submitting && "group-hover:translate-x-1")} />
                            {state.submitting ? 'TRANSMITTING...' : 'TRANSMIT'}
                        </button>

                        {state.errors && !state.succeeded && (
                            <p className="text-[10px] text-red-400 font-mono text-center uppercase animate-pulse">
                                Error: Tunnel stability failed. Check inputs.
                            </p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactContent;
