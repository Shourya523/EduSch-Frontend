import './Header.css';
import { Moon, Languages, LogOut } from "lucide-react";

export default function Header() {
    return (
        <header className="dashboard-header">
            <div className="header-title">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin User</p>
            </div>
            <div className="header-controls">
                <button className="theme-toggle">
                    <Moon size={20} />
                </button>
                <button className="control-btn">
                    <Languages size={18} />
                    <span>हिन्दी</span>
                </button>
                <button className="control-btn logout-btn">
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