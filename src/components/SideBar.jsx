import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import {
    LayoutGrid,
    LayoutDashboard,
    CalendarDays,
    FilePlus2,
    Users,
    DoorOpen,
    Bell,
    TrendingUp,
    Settings,
    Menu
} from "lucide-react";

export default function SideBar({ activePage }) {
    const navigate = useNavigate();
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <LayoutGrid size={24} />
                </div>
                <div className="header-text">
                    <span className="header-title">EduSync</span>
                    <span className="header-subtitle">Admin Dashboard</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => navigate("/admin-dashboard")}>
                        <a href="#">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className={activePage === 'timetable' ? 'active' : ''} onClick={() => navigate("/admin-timetable")}>
                        <a href="#">
                            <CalendarDays size={20} />
                            <span>Timetable</span>
                        </a>
                    </li>
                    <li className={activePage === 'gentt' ? 'active' : ''} onClick={() => navigate("/admin-gentt")}>
                        <a href="#">
                            <FilePlus2 size={20} />
                            <span>Generate Timetable</span>
                        </a>
                    </li>
                    <li className={activePage === 'faculty' ? 'active' : ''} onClick={() => navigate("/admin-faculty")}>
                        <a href="#">
                            <Users size={20} />
                            <span>Faculty</span>
                        </a>
                    </li>
                    <li className={activePage === 'rooms' ? 'active' : ''} onClick={() => navigate("/admin-rooms")}>
                        <a href="#">
                            <DoorOpen size={20} />
                            <span>Rooms</span>
                        </a>
                    </li>
                    <li className={activePage === 'notifications' ? 'active' : ''} onClick={() => navigate("/admin-notifications")}>
                        <a href="#">
                            <Bell size={20} />
                            <span>Notifications</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button>
                    <Menu size={20} />
                    <span>Collapse</span>
                </button>
            </div>
        </aside>
    );
}