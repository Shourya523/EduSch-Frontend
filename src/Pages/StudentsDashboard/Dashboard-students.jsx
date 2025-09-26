import { useState } from 'react';
import AIChat from '../../components/AiChat';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar-student';

import StatCard from '../../components/StatCard';
import './Dashboard-students.css';
// UPDATED: Replaced Zap with Clock icon for the new StatCard
import { BookOpen, ClipboardCheck, Award, Clock, MapPin, Library, FileText, Wallet } from "lucide-react";

// Mock data for a student's schedule for today
const todaysSchedule = [
    { time: "9:00 AM", subject: "Data Structures", location: "A-204", instructor: "Mrs. Ruchika Bala" },
    { time: "11:00 AM", subject: "IT Infrastructure Lab", location: "Lab-C1", instructor: "Dr. Himika Verma" },
    { time: "2:00 PM", subject: "Digital Systems", location: "Lab-D2", instructor: "Prof. Divya Kaushik" }
];

export default function StudentDashboard() {
    const [showChat, setShowChat] = useState(false);
    return (
        <div className="student-dashboard-layout">
            <SideBar activePage={'dashboard'} />
            <main className="main-content">
                <Header
                    title="Dashboard"
                    subtitle="Welcome back, Student Name" // Personalized for the student
                />
                <div className="content-area">
                    {/* StatCards with student-relevant data */}
                    <div className="stats-grid">
                        <StatCard
                            title="Overall Attendance"
                            icon={<ClipboardCheck />}
                            value="85%"
                            description="+1% from last week"
                            progressPercent={85}
                        />
                        <StatCard
                            title="Courses Enrolled"
                            icon={<BookOpen />}
                            value="6"
                            description="Current semester"
                            progressPercent={100}
                        />
                        {/* --- CARD UPDATED AS PER YOUR REQUEST --- */}
                        {/* This card was changed to "Weekly Load" to provide a more student-centric metric, */}
                        {/* reflecting the system's goal of ensuring a balanced workload. */}
                        <StatCard
                            title="Weekly Load"
                            icon={<Clock />}
                            value="18 Hours"
                            description="Total class hours this week"
                            progressPercent={45} // Represents 18 out of a 40-hour standard study week
                        />
                        <StatCard
                            title="Credits Completed"
                            icon={<Award />}
                            value="72/140"
                            description="Towards graduation"
                            progressPercent={51}
                        />
                    </div>

                    {/* New sections for student-specific content */}
                    <div className="dashboard-columns">
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
                                                    <span>{item.instructor}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="class-card-location">
                                            <MapPin size={16} />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>
                                )) : <p>No classes scheduled for today.</p>}
                            </div>
                        </div>

                        <div className="quick-access">
                            <div className="quick-access-card">
                                <h3>Quick Access</h3>
                                <div className="quick-links-grid">
                                    <a href="#" className="quick-link">
                                        <Library size={18} />
                                        <span>Digital Library</span>
                                    </a>
                                    <a href="#" className="quick-link">
                                        <FileText size={18} />
                                        <span>Course Materials</span>
                                    </a>
                                    <a href="#" className="quick-link">
                                        <Wallet size={18} />
                                        <span>Fee Payment</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}