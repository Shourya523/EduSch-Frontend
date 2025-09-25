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

    // Assuming student routes are prefixed with /student
    // e.g., /student/dashboard, /student/timetable, etc.
    const handleNavigate = (path) => {
        navigate(`/student${path}`);
    };

    return (
        // Using new BEM-style class names for the student sidebar
        <aside className={`sidebar-student${collapsed ? ' collapsed' : ''}`}>
            <div className="sidebar-student-header">
                <div className="logo">
                    <LayoutGrid size={24} />
                </div>
                <div className="header-text">
                    <span className="header-title">EduSync</span>
                    {/* Subtitle updated for student context */}
                    <span className="header-subtitle">Student Dashboard</span>
                </div>
            </div>

            <nav className="sidebar-student-nav">
                <ul>
                    {/* --- Student Specific Navigation Links --- */}
                    <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => handleNavigate("-dashboard")}>
                        <a href="#">
                            <LayoutDashboard size={20} />
                            <span className="label">Dashboard</span>
                        </a>
                    </li>
                    <li className={activePage === 'timetable' ? 'active' : ''} onClick={() => handleNavigate("/timetable")}>
                        <a href="#">
                            <CalendarDays size={20} />
                            <span className="label">Timetable</span>
                        </a>
                    </li>
                    <li className={activePage === 'courses' ? 'active' : ''} onClick={() => handleNavigate("/courses")}>
                        <a href="#">
                            <BookOpen size={20} />
                            <span className="label">Courses</span>
                        </a>
                    </li>
                    <li className={activePage === 'attendance' ? 'active' : ''} onClick={() => handleNavigate("/attendance")}>
                        <a href="#">
                            <ClipboardCheck size={20} />
                            <span className="label">Attendance</span>
                        </a>
                    </li>
                    <li className={activePage === 'grades' ? 'active' : ''} onClick={() => handleNavigate("/grades")}>
                        <a href="#">
                            <GraduationCap size={20} />
                            <span className="label">Grades</span>
                        </a>
                    </li>
                    <li className={activePage === 'notifications' ? 'active' : ''}>
                        <a href="#">
                            <Bell size={20} />
                            <span className="label">Notifications</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-student-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? 'Expand' : 'Collapse'}</span>
                </button>
            </div>
        </aside>
    );
}