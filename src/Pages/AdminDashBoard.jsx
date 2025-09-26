import React, { useState } from 'react';
import AiChat from '../components/AiChat';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import StatCard from '../components/StatCard';
import QuickActions from '../components/QuickActions';
import ApprovalQueue from '../components/ApprovalQueue';
import './AdminDashBoard.css';
import { RectangleHorizontal, Users, Clock, UserSquare2 } from "lucide-react";
import UserRoles from './UserRoles';


export default function DashBoard() {
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "डैशबोर्ड";
    const altSubtitle = "स्वागत है, व्यवस्थापक उपयोगकर्ता";
    const statCards = [
        {
            title: lang === "hi" ? "कक्षा उपयोग" : "Classroom Utilization",
            icon: <RectangleHorizontal />,
            value: "78%",
            description: lang === "hi" ? "पिछले सप्ताह से +2%" : "+2% from last week",
            progressPercent: 78
        },
        {
            title: lang === "hi" ? "फैकल्टी कार्यभार" : "Faculty Workload",
            icon: <Users />,
            value: lang === "hi" ? "16.8घं" : "16.8h",
            description: lang === "hi" ? "प्रति सप्ताह औसत" : "Average per week",
            progressPercent: 65
        },
        {
            title: lang === "hi" ? "पीक घंटे" : "Peak Hours",
            icon: <Clock />,
            value: lang === "hi" ? "10-12 पूर्वाह्न" : "10-12 AM",
            description: lang === "hi" ? "सर्वाधिक उपयोग" : "Highest utilization"
        },
        {
            title: lang === "hi" ? "कुल फैकल्टी" : "Total Faculty",
            icon: <UserSquare2 />,
            value: "142",
            description: lang === "hi" ? "5 अवकाश पर" : "5 on leave",
            progressPercent: 95
        }
    ];
    return (
        <div className="dashboard-layout">
            <SideBar activePage={'dashboard'} />
            <main className="main-content">
                <Header 
                    title="Dashboard"
                    subtitle="Welcome back, Admin User"
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
                    <div className="dashboard-main-section">
                        <div className="left-column">
                            <QuickActions lang={lang} />
                        </div>
                        <div className="right-column">
                            <ApprovalQueue lang={lang} />
                        </div>
                    </div>
                </div>
                {/* Floating Chat Button */}
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)} >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
                </button>
                {showChat && <AiChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}
