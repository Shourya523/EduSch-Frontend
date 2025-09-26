import React, { useState } from 'react';
import AiChat from '../components/AiChat';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import StatCard from '../components/StatCard';
import QuickActions from '../components/QuickActions';
import ApprovalQueue from '../components/ApprovalQueue';
import './AdminDashBoard.css';
import { RectangleHorizontal, Users, Clock, UserSquare2 } from "lucide-react";

// Static data for the dashboard cards (in English)
const statCardsData = [
    {
        id: "utilization",
        title: "Classroom Utilization",
        icon: <RectangleHorizontal />,
        value: "78%",
        description: "+2% from last week",
        progressPercent: 78
    },
    {
        id: "workload",
        title: "Faculty Workload",
        icon: <Users />,
        value: "16.8h",
        description: "Average per week",
        progressPercent: 65
    },
    {
        id: "peakHours",
        title: "Peak Hours",
        icon: <Clock />,
        value: "10-12 AM",
        description: "Highest utilization"
    },
    {
        id: "totalFaculty",
        title: "Total Faculty",
        icon: <UserSquare2 />,
        value: "142",
        description: "5 on leave",
        progressPercent: 95
    }
];

// Centralized Hindi translations
const hiText = {
    title: "डैशबोर्ड",
    subtitle: "स्वागत है, व्यवस्थापक उपयोगकर्ता",
    stats: {
        utilization: {
            title: "कक्षा उपयोग",
            description: "पिछले सप्ताह से +2%"
        },
        workload: {
            title: "फैकल्टी कार्यभार",
            value: "16.8घं",
            description: "प्रति सप्ताह औसत"
        },
        peakHours: {
            title: "पीक घंटे",
            value: "10-12 पूर्वाह्न",
            description: "सर्वाधिक उपयोग"
        },
        totalFaculty: {
            title: "कुल फैकल्टी",
            description: "5 अवकाश पर"
        }
    }
};

export default function DashBoard() {
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    return (
        <div className="dashboard-layout">
            <SideBar activePage={'dashboard'} />
            <main className="main-content">
                <Header 
                    title="Dashboard"
                    subtitle="Welcome back, Admin User"
                    altTitle={hiText.title}
                    altSubtitle={hiText.subtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="content-area">
                    <div className="stats-grid">
                        {statCardsData.map((card) => {
                            const translatedCard = lang === 'hi' ? hiText.stats[card.id] : {};
                            return (
                                <StatCard
                                    key={card.id}
                                    title={translatedCard.title || card.title}
                                    icon={card.icon}
                                    value={translatedCard.value || card.value}
                                    description={translatedCard.description || card.description}
                                    progressPercent={card.progressPercent}
                                />
                            );
                        })}
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