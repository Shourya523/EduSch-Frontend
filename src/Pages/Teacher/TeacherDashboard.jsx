import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SideBarTeacher from '../../components/SideBar-teacher';
import StatCard from '../../components/StatCard';
import './TeacherDashboard.css';
import { useState } from 'react';

import {
    Clock,
    BookOpen,
    GitPullRequest,
    Users,
    MapPin,
    Calendar,
    CalendarCheck,
    AlertTriangle,
    Sparkles
} from "lucide-react";
import AIChat from '../../components/AiChat';

// Mock data for a teacher's schedule for today
const todaysSchedule = [
    { time: "9:00 AM", subject: "Data Structures", location: "A-204", batch: "B.Tech CSE - 3rd Year" },
    { time: "11:00 AM", subject: "IT Infrastructure Lab", location: "Lab-C1", batch: "B.Tech IT - 2nd Year" },
    { time: "2:00 PM", subject: "Data Structures Lab", location: "Lab-D2", batch: "B.Tech IT - 2nd Year" }
];

export default function TeacherDashboard() {
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();
    const [lang, setLang] = useState("en");
    // Hindi alternatives for stat cards and quick actions
    const statCards = [
        {
            title: lang === "hi" ? "साप्ताहिक शिक्षण भार" : "Weekly Teaching Load",
            icon: <Clock />,
            value: "16/20 " + (lang === "hi" ? "घंटे" : "Hours"),
            description: lang === "hi" ? "कार्यभार न्यूनतम" : "Minimizing workload",
            progressPercent: 80
        },
        {
            title: lang === "hi" ? "आवंटित पाठ्यक्रम" : "Courses Assigned",
            icon: <BookOpen />,
            value: "4",
            description: lang === "hi" ? "वर्तमान सेमेस्टर" : "Current semester",
            progressPercent: 100
        },
        {
            title: lang === "hi" ? "लंबित अनुरोध" : "Pending Requests",
            icon: <GitPullRequest />,
            value: "2",
            description: lang === "hi" ? "परिवर्तन अनुरोधों की समीक्षा करें" : "Review change requests",
            progressPercent: 0
        },
        {
            title: lang === "hi" ? "कुल छात्र" : "Total Students",
            icon: <Users />,
            value: "180",
            description: lang === "hi" ? "सभी बैचों में" : "Across all batches",
            progressPercent: 0
        }
    ];

    const quickActions = [
        {
            icon: <Calendar size={18} />,
            label: lang === "hi" ? "पूर्ण समय सारणी देखें" : "View Full Timetable",
            onClick: () => navigate('/teacher/timetable')
        },
        {
            icon: <CalendarCheck size={18} />,
            label: lang === "hi" ? "उपलब्धता / अवकाश अपडेट करें" : "Update Availability / Leave",
            onClick: () => navigate('/teacher/availability-leave')
        },
        {
            icon: <AlertTriangle size={18} />,
            label: lang === "hi" ? "समय सारणी परिवर्तन अनुरोध" : "Request Timetable Change",
            onClick: () => navigate('/teacher/change-requests')
        }
    ];

    const altTitle = "डैशबोर्ड";
    const altSubtitle = "स्वागत है, प्रोफेसर";

    return (
        <div className="teacher-dashboard-layout">
            <SideBarTeacher activePage={'dashboard'} />
            <main className="main-content">
                <Header
                    title="Dashboard"
                    subtitle="Welcome back, Professor "
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="content-area">
                    <div className="stats-grid">
                        {statCards.map((card, idx) => (
                            <StatCard
                                key={idx}
                                title={card.title}
                                icon={card.icon}
                                value={card.value}
                                description={card.description}
                                progressPercent={card.progressPercent}
                            />
                        ))}
                    </div>
                    <div className="dashboard-columns">
                        <div className="upcoming-schedule">
                            <h3>{lang === "hi" ? "आज का कार्यक्रम" : "Today's Schedule"}</h3>
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
                                )) : <p>{lang === "hi" ? "आज के लिए कोई कक्षा निर्धारित नहीं है।" : "You have no classes scheduled for today."}</p>}
                            </div>
                        </div>
                        <div className="quick-access">
                            <div className="quick-access-card">
                                <h3>{lang === "hi" ? "त्वरित क्रियाएँ" : "Quick Actions"}</h3>
                                <div className="quick-links-grid">
                                    {quickActions.map((action, idx) => (
                                        <div className="quick-link" key={idx} onClick={action.onClick}>
                                            {action.icon}
                                            <span>{action.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)}>
                    <Sparkles
                        size={24} // Adjust size as needed, using the default 24x24 viewBox
                        strokeWidth={2}
                        aria-label="AI Sparkles Icon" // Good practice for accessibility
                    />
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}