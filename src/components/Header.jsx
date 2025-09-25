import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Moon, Languages, LogOut } from "lucide-react";

// Add { title, subtitle } as props
export default function Header({ title, subtitle }) {
    const navigate=useNavigate();
    return (
        <header className="dashboard-header">
            <div className="header-title">
                {/* Use the props, with fallback text */}
                <h1>{title || 'Dashboard'}</h1>
                <p className="header-subtitle-mobile-hide">{subtitle || 'Welcome back, Admin User'}</p>
            </div>
            <div className="header-controls">
                <button className="theme-toggle">
                    <Moon size={20} />
                </button>
                <button className="control-btn">
                    <Languages size={18} />
                    <span>हिन्दी</span>
                </button>
                <button className="control-btn logout-btn" onClick={()=>navigate("/")}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
                <div className="user-avatar">
                    A
                </div>
            </div>
        </header>
    );
}