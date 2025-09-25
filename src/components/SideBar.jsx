import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
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
                            <span className="label">Dashboard</span>
                        </a>
                    </li>
                    <li className={activePage === 'gentt' ? 'active' : ''} onClick={() => navigate("/admin-gentt")}>
                        <a href="#">
                            <FilePlus2 size={20} />
                            <span className="label">Generate Timetable</span>
                        </a>
                    </li>
                    <li className={activePage === 'timetable' ? 'active' : ''} onClick={() => navigate("/admin-timetable")}>
                        <a href="#">
                            <CalendarDays size={20} />
                            <span className="label">Timetable</span>
                        </a>
                    </li>
                    
                    <li className={activePage === 'faculty' ? 'active' : ''} onClick={() => navigate("/admin-faculty")}>
                        <a href="#">
                            <Users size={20} />
                            <span className="label">Faculty</span>
                        </a>
                    </li>
                    <li className={activePage === 'rooms' ? 'active' : ''} onClick={() => navigate("/admin-rooms")}>
                        <a href="#">
                            <DoorOpen size={20} />
                            <span className="label">Rooms</span>
                        </a>
                    </li>
                    <li className={activePage === 'notifications' ? 'active' : ''} onClick={() => navigate("/admin-notifications")}>
                        <a href="#">
                            <Bell size={20} />
                            <span className="label">Notifications</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? 'Expand' : 'Collapse'}</span>
                </button>
            </div>
        </aside>
    );
}