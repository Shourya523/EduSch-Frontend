import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SideBar-teacher.css';
import {
    LayoutGrid,
    LayoutDashboard,
    CalendarDays,
    CalendarCheck,
    GitPullRequest,
    BookOpen,
    Bell,
    Menu
} from "lucide-react";

export default function SideBarTeacher({ activePage }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [lang, setLang] = useState("en");
    const labels = {
        dashboard: lang === "hi" ? "डैशबोर्ड" : "Dashboard",
        timetable: lang === "hi" ? "समय सारणी" : "Timetable",
        availability: lang === "hi" ? "उपलब्धता" : "Availability",
        changeRequests: lang === "hi" ? "परिवर्तन अनुरोध" : "Change Requests",
        courses: lang === "hi" ? "पाठ्यक्रम" : "Courses",
        notifications: lang === "hi" ? "सूचनाएँ" : "Notifications",
        expand: lang === "hi" ? "विस्तार करें" : "Expand",
        collapse: lang === "hi" ? "संकुचित करें" : "Collapse",
        teacherDashboard: lang === "hi" ? "शिक्षक डैशबोर्ड" : "Teacher Dashboard",
        edusync: "EduSync"
    };
    const handleNavigate = (path) => {
        navigate(`/teacher${path}`);
    };
    return (
        <aside className={`sidebar-teacher${collapsed ? ' collapsed' : ''}`}>
            <div className="sidebar-teacher-header">
                <div className="logo">
                    <LayoutGrid size={24} />
                </div>
                <div className="header-text">
                    <span className="header-title">{labels.edusync}</span>
                    <span className="header-subtitle">{labels.teacherDashboard}</span>
                </div>
            </div>

            <nav className="sidebar-teacher-nav">
                <ul>
                    <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => handleNavigate("")}>
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
                    <li className={activePage === 'availability-leave' ? 'active' : ''} onClick={() => handleNavigate("/availability-leave")}>
                        <a href="#">
                            <CalendarCheck size={20} />
                            <span className="label">{labels.availability}</span>
                        </a>
                    </li>
                    <li className={activePage === 'change-requests' ? 'active' : ''} onClick={() => handleNavigate("/change-requests")}>
                        <a href="#">
                            <GitPullRequest size={20} />
                            <span className="label">{labels.changeRequests}</span>
                        </a>
                    </li>
                    <li className={activePage === 'my-courses' ? 'active' : ''} onClick={() => handleNavigate("/courses")}>
                        <a href="#">
                            <BookOpen size={20} />
                            <span className="label">{labels.courses}</span>
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

            <div className="sidebar-teacher-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? labels.expand : labels.collapse}</span>
                </button>

            </div>
        </aside>
    );
}