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

    // Assuming teacher routes are prefixed with /teacher
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
                    <span className="header-title">EduSync</span>
                    <span className="header-subtitle">Teacher Dashboard</span>
                </div>
            </div>

            <nav className="sidebar-teacher-nav">
                <ul>
                    {/* --- Teacher Specific Navigation Links --- */}
                    <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => handleNavigate("")}>
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
                    <li className={activePage === 'availability-leave' ? 'active' : ''} onClick={() => handleNavigate("/availability-leave")}>
                        <a href="#">
                            <CalendarCheck size={20} />
                            <span className="label">Availability</span>
                        </a>
                    </li>
                    <li className={activePage === 'change-requests' ? 'active' : ''} onClick={() => handleNavigate("/change-requests")}>
                        <a href="#">
                            <GitPullRequest size={20} />
                            <span className="label">Change Requests</span>
                        </a>
                    </li>
                    <li className={activePage === 'my-courses' ? 'active' : ''} onClick={() => handleNavigate("/my-courses")}>
                        <a href="#">
                            <BookOpen size={20} />
                            <span className="label">Courses</span>
                        </a>
                    </li>
                    <li className={activePage === 'notifications' ? 'active' : ''} onClick={() => handleNavigate("/notifications")}>
                        <a href="#">
                            <Bell size={20} />
                            <span className="label">Notifications</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-teacher-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? 'Expand' : 'Collapse'}</span>
                </button>
            </div>
        </aside>
    );
}