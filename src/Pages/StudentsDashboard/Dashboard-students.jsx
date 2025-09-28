import { useState } from 'react';
import AIChat from '../../components/AiChat';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar-student';

import StatCard from '../../components/StatCard';
import './Dashboard-students.css';
// UPDATED: Replaced Zap with Clock icon for the new StatCard
import { BookOpen, ClipboardCheck, Award, Clock, MapPin, Library, FileText, Wallet, Sparkles } from "lucide-react";

// Mock data for a student's schedule for today
const todaysSchedule = [
    { time: "9:00 AM", subject: "Data Structures", location: "A-204", instructor: "Mrs. Ruchika Bala" },
    { time: "11:00 AM", subject: "IT Infrastructure Lab", location: "Lab-C1", instructor: "Dr. Himika Verma" },
    { time: "2:00 PM", subject: "Digital Systems", location: "Lab-D2", instructor: "Prof. Divya Kaushik" }
];

export default function StudentDashboard() {
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "डैशबोर्ड";
    const altSubtitle = "स्वागत है, छात्र नाम";
    const statCards = [
        {
            title: lang === "hi" ? "कुल उपस्थिति" : "Overall Attendance",
            icon: <ClipboardCheck />,
            value: "85%",
            description: lang === "hi" ? "पिछले सप्ताह से +1%" : "+1% from last week",
            progressPercent: 85
        },
        {
            title: lang === "hi" ? "नामांकित पाठ्यक्रम" : "Courses Enrolled",
            icon: <BookOpen />,
            value: "6",
            description: lang === "hi" ? "वर्तमान सेमेस्टर" : "Current semester",
            progressPercent: 100
        },
        {
            title: lang === "hi" ? "साप्ताहिक भार" : "Weekly Load",
            icon: <Clock />,
            value: lang === "hi" ? "18 घंटे" : "18 Hours",
            description: lang === "hi" ? "इस सप्ताह की कुल कक्षा घंटे" : "Total class hours this week",
            progressPercent: 45
        },
        {
            title: lang === "hi" ? "पूर्ण क्रेडिट" : "Credits Completed",
            icon: <Award />,
            value: "72/140",
            description: lang === "hi" ? "स्नातक की ओर" : "Towards graduation",
            progressPercent: 51
        }
    ];
    const quickLinks = [
        {
            icon: <Library size={18} />,
            label: lang === "hi" ? "डिजिटल लाइब्रेरी" : "Digital Library"
        },
        {
            icon: <FileText size={18} />,
            label: lang === "hi" ? "पाठ्यक्रम सामग्री" : "Course Materials"
        },
        {
            icon: <Wallet size={18} />,
            label: lang === "hi" ? "शुल्क भुगतान" : "Fee Payment"
        }
    ];
    return (
        <div className="student-dashboard-layout">
            <SideBar activePage={'dashboard'} />
            <main className="main-content">
                <Header
                    title="Dashboard"
                    subtitle="Welcome back, Student Name"
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
                                                    <span>{item.instructor}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="class-card-location">
                                            <MapPin size={16} />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>
                                )) : <p>{lang === "hi" ? "आज के लिए कोई कक्षा निर्धारित नहीं है।" : "No classes scheduled for today."}</p>}
                            </div>
                        </div>
                        <div className="quick-access">
                            <div className="quick-access-card">
                                <h3>{lang === "hi" ? "त्वरित पहुँच" : "Quick Access"}</h3>
                                <div className="quick-links-grid">
                                    {quickLinks.map((link, idx) => (
                                        <a href="#" className="quick-link" key={idx}>
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </a>
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