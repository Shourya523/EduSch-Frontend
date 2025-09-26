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
    return (
        <div className="dashboard-layout">
            <SideBar activePage={'dashboard'} />
            <main className="main-content">
                <Header 
                    title="Dashboard"
                    subtitle="Welcome back, Admin User"
                />
                <div className="content-area">
                    <div className="stats-grid">
                        <StatCard
                            title="Classroom Utilization"
                            icon={<RectangleHorizontal />}
                            value="78%"
                            description="+2% from last week"
                            progressPercent={78}
                        />
                        <StatCard
                            title="Faculty Workload"
                            icon={<Users />}
                            value="16.8h"
                            description="Average per week"
                            progressPercent={65}
                        />
                        <StatCard
                            title="Peak Hours"
                            icon={<Clock />}
                            value="10-12 AM"
                            description="Highest utilization"
                        />
                        <StatCard
                            title="Total Faculty"
                            icon={<UserSquare2 />}
                            value="142"
                            description="5 on leave"
                            progressPercent={95}
                        />
                    </div>
                    <div className="dashboard-main-section">
                        <div className="left-column">
                            <QuickActions />
                        </div>
                        <div className="right-column">
                            <ApprovalQueue />
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
