import Header from '../../components/Header';
import SideBarTeacher from '../../components/SideBar-teacher';
import StatCard from '../../components/StatCard';
import './TeacherDashboard.css';

import {
    Clock,
    BookOpen,
    GitPullRequest,
    Users,
    MapPin,
    Calendar,
    CalendarCheck,
    AlertTriangle
} from "lucide-react";

// Mock data for a teacher's schedule for today
const todaysSchedule = [
    { time: "9:00 AM", subject: "Data Structures", location: "A-204", batch: "B.Tech CSE - 3rd Year" },
    { time: "11:00 AM", subject: "IT Infrastructure Lab", location: "Lab-C1", batch: "B.Tech IT - 2nd Year" },
    { time: "2:00 PM", subject: "Data Structures Lab", location: "Lab-D2", batch: "B.Tech IT - 2nd Year" }
];

export default function TeacherDashboard() {
    return (
        <div className="teacher-dashboard-layout">
            <SideBarTeacher activePage={'dashboard'} />
            <main className="main-content">
                <Header
                    title="Dashboard"
                    subtitle="Welcome back, Professor " // Personalized for the teacher
                />
                <div className="content-area">
                    {/* StatCards with teacher-relevant data */}
                    <div className="stats-grid">
                        <StatCard
                            title="Weekly Teaching Load"
                            icon={<Clock />}
                            value="16/20 Hours"
                            description="Minimizing workload"
                            progressPercent={80}
                        />
                        <StatCard
                            title="Courses Assigned"
                            icon={<BookOpen />}
                            value="4"
                            description="Current semester"
                            progressPercent={100}
                        />
                        <StatCard
                            title="Pending Requests"
                            icon={<GitPullRequest />}
                            value="2"
                            description="Review change requests"
                            progressPercent={0} // Not a progress-based metric
                        />
                        <StatCard
                            title="Total Students"
                            icon={<Users />}
                            value="180"
                            description="Across all batches"
                            progressPercent={0}
                        />
                    </div>

                    {/* Main content columns */}
                    <div className="dashboard-columns">
                        {/* Left Column: Today's Schedule */}
                        <div className="upcoming-schedule">
                            <h3>Today's Schedule</h3>
                            <div className="schedule-list">
                                {todaysSchedule.length > 0 ? todaysSchedule.map((item, index) => (
                                    <div className="class-card" key={index}>
                                        <div className="class-card-details">
                                            <p className="class-card-time">{item.time}</p>
                                            <div>
                                                <p className="class-card-subject">
                                                    {item.subject}
                                                    <span>{item.batch}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="class-card-location">
                                            <MapPin size={16} />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>
                                )) : <p>You have no classes scheduled for today.</p>}
                            </div>
                        </div>

                        {/* Right Column: Quick Actions */}
                        <div className="quick-access">
                            <div className="quick-access-card">
                                <h3>Quick Actions</h3>
                                <div className="quick-links-grid">
                                    <a href="#" className="quick-link">
                                        <Calendar size={18} />
                                        <span>View Full Timetable</span>
                                    </a>
                                    <a href="#" className="quick-link">
                                        <CalendarCheck size={18} />
                                        <span>Update Availability / Leave</span>
                                    </a>
                                    <a href="#" className="quick-link">
                                        <AlertTriangle size={18} />
                                        <span>Request Timetable Change</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}