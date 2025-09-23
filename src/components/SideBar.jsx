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

export default function SideBar() {
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
                    <li className="active">
                        <a href="#">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <CalendarDays size={20} />
                            <span>Timetable</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FilePlus2 size={20} />
                            <span>Generate Timetable</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Users size={20} />
                            <span>Faculty</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <DoorOpen size={20} />
                            <span>Rooms</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Bell size={20} />
                            <span>Notifications</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TrendingUp size={20} />
                            <span>Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Settings size={20} />
                            <span>Settings</span>
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