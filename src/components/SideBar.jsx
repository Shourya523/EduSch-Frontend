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
    const [lang, setLang] = useState("en");
    const labels = {
        dashboard: lang === "hi" ? "डैशबोर्ड" : "Dashboard",
        gentt: lang === "hi" ? "समय सारणी बनाएं" : "Generate Timetable",
        timetable: lang === "hi" ? "समय सारणी" : "Timetable",
        faculty: lang === "hi" ? "फैकल्टी" : "Faculty",
        rooms: lang === "hi" ? "कक्षाएँ" : "Rooms",
        notifications: lang === "hi" ? "सूचनाएँ" : "Notifications",
        expand: lang === "hi" ? "विस्तार करें" : "Expand",
        collapse: lang === "hi" ? "संकुचित करें" : "Collapse",
        adminDashboard: lang === "hi" ? "व्यवस्थापक डैशबोर्ड" : "Admin Dashboard",
        edusync: "EduSync"
    };
    return (
        <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <LayoutGrid size={24} />
                </div>
                <div className="header-text">
                    <span className="header-title">{labels.edusync}</span>
                    <span className="header-subtitle">{labels.adminDashboard}</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => navigate("/admin-dashboard")}>
                        <a href="#">
                            <LayoutDashboard size={20} />
                            <span className="label">{labels.dashboard}</span>
                        </a>
                    </li>
                    <li className={activePage === 'gentt' ? 'active' : ''} onClick={() => navigate("/admin-gentt")}>
                        <a href="#">
                            <FilePlus2 size={20} />
                            <span className="label">{labels.gentt}</span>
                        </a>
                    </li>
                    <li className={activePage === 'timetable' ? 'active' : ''} onClick={() => navigate("/admin-timetable")}>
                        <a href="#">
                            <CalendarDays size={20} />
                            <span className="label">{labels.timetable}</span>
                        </a>
                    </li>
                    <li className={activePage === 'faculty' ? 'active' : ''} onClick={() => navigate("/admin-faculty")}>
                        <a href="#">
                            <Users size={20} />
                            <span className="label">{labels.faculty}</span>
                        </a>
                    </li>
                    <li className={activePage === 'rooms' ? 'active' : ''} onClick={() => navigate("/admin-rooms")}>
                        <a href="#">
                            <DoorOpen size={20} />
                            <span className="label">{labels.rooms}</span>
                        </a>
                    </li>
                    <li className={activePage === 'notifications' ? 'active' : ''} onClick={() => navigate("/admin-notifications")}>
                        <a href="#">
                            <Bell size={20} />
                            <span className="label">{labels.notifications}</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? labels.expand : labels.collapse}</span>
                </button>

            </div>
        </aside>
    );
}