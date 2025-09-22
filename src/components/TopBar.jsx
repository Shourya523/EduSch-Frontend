import "./TopBar.css";
import { Sun,Brain } from "lucide-react";

export default function TopBar() {
    return (
        <header className="sd-wrapper">
            {/* Left Side: Logo + Title */}
            <div className="sd-left">
                <div className="sd-logo">
                    <div className="sd-logo">
                        <Brain size={28} strokeWidth={2.5} className="logo-icon" />
                    </div>
                </div>
                <div>
                    <h2 className="sd-sitename">EduSync</h2>
                    <span className="sd-sitemotto">AI-Powered Scheduling</span>
                </div>
            </div>

            <div className="sd-right">
                <button className="sd-theme">
                    <Sun size={18} />
                </button>
                <button className="sd-btn sign-in">Sign In</button>
                <button className="sd-btn get-started">Get Started</button>
            </div>
        </header>
    );
}
