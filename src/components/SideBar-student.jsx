import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SideBar-student.css';
import {
    LayoutGrid,
    LayoutDashboard,
    CalendarDays,
    BookOpen,
    ClipboardCheck,
    GraduationCap,
    Bell,
    Settings,
    Menu
} from "lucide-react";

// Renamed component to avoid conflicts
export default function SideBarStudent({ activePage }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [lang, setLang] = useState("en");
    const labels = {
        dashboard: lang === "hi" ? "डैशबोर्ड" : "Dashboard",
        timetable: lang === "hi" ? "समय सारणी" : "Timetable",
        courses: lang === "hi" ? "पाठ्यक्रम" : "Courses",
        attendance: lang === "hi" ? "उपस्थिति" : "Attendance",
        grades: lang === "hi" ? "अंक" : "Grades",
        notifications: lang === "hi" ? "सूचनाएँ" : "Notifications",
        expand: lang === "hi" ? "विस्तार करें" : "Expand",
        collapse: lang === "hi" ? "संकुचित करें" : "Collapse",
        studentDashboard: lang === "hi" ? "छात्र डैशबोर्ड" : "Student Dashboard",
        edusync: "EduSync"
    };
    const handleNavigate = (path) => {
        navigate(`/student${path}`);
    };
    return (
        <aside className={`sidebar-student${collapsed ? ' collapsed' : ''}`}>
            <div className="sidebar-student-header">
                <div className="logo">
                    <LayoutGrid size={24} />
                </div>
                <div className="header-text">
                    <span className="header-title">{labels.edusync}</span>
                    <span className="header-subtitle">{labels.studentDashboard}</span>
                </div>
            </div>
            <nav className="sidebar-student-nav">
                <ul>
                    <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => handleNavigate("-dashboard")}>
                        <a href="#">
                            <LayoutDashboard size={20} />
                            <span className="label">{labels.dashboard}</span>
                        </a>
                    </li>
                    <li className={activePage === 'timetable' ? 'active' : ''} onClick={() => handleNavigate("/timetable")}>
                        <a href="#">
                            <CalendarDays size={20} />
                            <span className="label">{labels.timetable}</span>
                        </a>
                    </li>
                    <li className={activePage === 'courses' ? 'active' : ''} onClick={() => handleNavigate("/courses")}>
                        <a href="#">
                            <BookOpen size={20} />
                            <span className="label">{labels.courses}</span>
                        </a>
                    </li>
                    <li className={activePage === 'attendance' ? 'active' : ''} onClick={() => handleNavigate("/attendance")}>
                        <a href="#">
                            <ClipboardCheck size={20} />
                            <span className="label">{labels.attendance}</span>
                        </a>
                    </li>
                    <li className={activePage === 'grades' ? 'active' : ''} onClick={() => handleNavigate("/grades")}>
                        <a href="#">
                            <GraduationCap size={20} />
                            <span className="label">{labels.grades}</span>
                        </a>
                    </li>
                    <li className={activePage === 'notifications' ? 'active' : ''} onClick={() => handleNavigate("/notifications")}>
                        <a href="#">
                            <Bell size={20} />
                            <span className="label">{labels.notifications}</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-student-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? labels.expand : labels.collapse}</span>
                </button>
                <button
                    style={{ marginTop: 8, fontSize: 13, padding: "0.2em 0.7em", borderRadius: 6, border: "1px solid #444", background: "#232323", color: "#eee", cursor: "pointer" }}
                    onClick={() => setLang(l => l === "en" ? "hi" : "en")}
                >
                    {lang === "hi" ? "English" : "हिन्दी"}
                </button>
            </div>
        </aside>
    );
}