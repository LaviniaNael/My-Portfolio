import { Send, AtSign, MessageSquare, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import './ContactContent.css';

const ContactContent = () => {
    const [state, handleSubmit] = useForm("xaqwgqge");

    return (
        <div className="contact-grid">
            <div className="contact-info-section">
                <div className="protocol-card win-inset">
                    <h2 className="protocol-header">Connect_Protocol</h2>
                    <div className="protocol-items">
                        <div className="protocol-item">
                            <div className="protocol-icon-box win-outset">
                                <AtSign size={14} className="protocol-icon" />
                            </div>
                            <div className="protocol-content">
                                <p className="protocol-label">Email</p>
                                <a href="mailto:laviniaalfons@gmail.com" className="protocol-value">laviniaalfons@gmail.com</a>
                            </div>
                        </div>

                        <div className="protocol-item">
                            <div className="protocol-icon-box win-outset">
                                <Phone size={14} className="protocol-icon" />
                            </div>
                            <div className="protocol-content">
                                <p className="protocol-label">Phone</p>
                                <p className="protocol-value">01270369178 / 01002301440</p>
                            </div>
                        </div>

                        <div className="protocol-item">
                            <div className="protocol-icon-box win-outset">
                                <MapPin size={14} className="protocol-icon" />
                            </div>
                            <div className="protocol-content">
                                <p className="protocol-label">Location</p>
                                <p className="protocol-value">Cairo, Egypt</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="social-links">
                    <a href="https://linkedin.com/in/lavinia-alfons" target="_blank" className="social-button win-outset">
                        <Linkedin size={16} /> LINKEDIN
                    </a>
                    <a href="https://github.com/LaviniaNael" target="_blank" className="social-button win-outset">
                        <Github size={16} /> GITHUB
                    </a>
                </div>
            </div>

            <div className="form-section win-outset">
                <h3 className="form-header">
                    <MessageSquare size={14} /> Send a message...
                </h3>

                {state.succeeded ? (
                    <div className="success-message win-inset animate-in fade-in zoom-in-95">
                        <p className="success-title">Transmission Successful</p>
                        <p className="success-body">
                            Packet received at terminal. Primary protocol acknowledged. Thanks for reaching out!
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="reset-button"
                        >
                            Send another transmission?
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-field">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="form-input win-inset"
                                placeholder="Identity Name"
                                required
                            />
                            <ValidationError prefix="Name" field="name" errors={state.errors} className="validation-error" />
                        </div>

                        <div className="form-field">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="form-input win-inset"
                                placeholder="Protocol Address (Email)"
                                required
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} className="validation-error" />
                        </div>

                        <div className="form-field">
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea win-inset"
                                placeholder="Transmission content..."
                                required
                            />
                            <ValidationError prefix="Message" field="message" errors={state.errors} className="validation-error" />
                        </div>

                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="submit-button win-outset"
                        >
                            <Send size={16} className="submit-icon" />
                            {state.submitting ? 'TRANSMITTING...' : 'TRANSMIT'}
                        </button>

                        {state.errors && !state.succeeded && (
                            <p className="error-tunnel-msg animate-pulse">
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
