import React, { useState } from 'react';
import './TeacherNotification.css';
import { Megaphone, CheckCircle, Bell, GitPullRequest, Lightbulb, XCircle } from 'lucide-react';
import SideBarTeacher from '../../components/SideBar-teacher';
import Header from '../../components/Header';

// --- Mock Data for a Teacher ---
const initialTeacherNotifications = [
    {
        id: 1,
        type: 'leave-approved',
        icon: <CheckCircle size={24} className="t-ntf-icon-leave-approved" />,
        title: 'Leave Request Approved',
        message: 'Your leave request for Sep 29, 2025 - Oct 01, 2025 has been approved by the department head.',
        timestamp: '2 hours ago',
        read: false,
        actions: ['View Calendar', 'Acknowledge']
    },
    {
        id: 2,
        type: 'change-request',
        icon: <GitPullRequest size={24} className="t-ntf-icon-change-request" />,
        title: 'New Timetable Change Request',
        message: "A request has been submitted to swap your 'Data Structures' class with Prof. Sharma's 'Algorithms' class.",
        timestamp: '5 hours ago',
        read: false,
        actions: ['Review Request', 'Decline']
    },
    {
        id: 3,
        type: 'system-suggestion',
        icon: <Lightbulb size={24} className="t-ntf-icon-system-suggestion" />,
        title: 'System Scheduling Suggestion',
        message: "An optimal slot for your pending 'Advanced Algorithms' class is available on Friday at 2 PM in Room C-103.",
        timestamp: '1 day ago',
        read: false,
        actions: ['Accept Slot', 'View Options']
    },
    {
        id: 4,
        type: 'info',
        icon: <Megaphone size={24} className="t-ntf-icon-info" />,
        title: 'Faculty Meeting Announcement',
        message: 'A mandatory faculty meeting is scheduled for Monday at 5:00 PM in the main conference hall to discuss NEP 2020 compliance.',
        timestamp: '2 days ago',
        read: true,
        actions: ['Add to Calendar']
    },
    {
        id: 5,
        type: 'leave-rejected',
        icon: <XCircle size={24} className="t-ntf-icon-leave-rejected" />,
        title: 'Leave Request Rejected',
        message: 'Your leave request for Sep 22, 2025 was rejected due to scheduling conflicts during the mid-term exam period.',
        timestamp: '3 days ago',
        read: true,
        actions: ['View Details']
    },
];

const NotificationCard = ({ notification, onMarkRead }) => {
    const { id, type, icon, title, message, timestamp, read, actions } = notification;

    return (
        <div className={`t-ntf-card ${type} ${read ? 'read' : ''}`}>
            <div className="t-ntf-card-icon">
                {icon}
            </div>
            <div className="t-ntf-card-content">
                <div className="t-ntf-content-header">
                    <h3>{title}</h3>
                    <span className="t-ntf-timestamp">{timestamp}</span>
                </div>
                <p className="t-ntf-message">{message}</p>
                <div className="t-ntf-card-actions">
                    {actions.map(action => (
                        <button key={action} className={`t-ntf-action-btn ${action.toLowerCase().replace(' ', '-')}`}>{action}</button>
                    ))}
                    {!read && <button className="t-ntf-action-btn mark-read" onClick={() => onMarkRead(id)}>Mark as Read</button>}
                </div>
            </div>
        </div>
    );
};

export default function TeacherNotifications() {
    const [notifications, setNotifications] = useState(initialTeacherNotifications);
    const [filter, setFilter] = useState('unread');

    const handleMarkRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        return true;
    });

    return (
        <div className="page-layout">
            <SideBarTeacher activePage={"notifications"} />
            <main className="main-content">
                <Header
                    title="Notification Center"
                    subtitle="Updates on your schedule, requests, and announcements"
                />
                <div className="t-ntf-page">
                    <div className="t-ntf-container">
                        <div className="t-ntf-header">
                            <h2><Bell size={22} /> Inbox</h2>
                            <div className="t-ntf-filter-tabs">
                                <button
                                    className={`t-ntf-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                                    onClick={() => setFilter('unread')}
                                >
                                    Unread ({notifications.filter(n => !n.read).length})
                                </button>
                                <button
                                    className={`t-ntf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All
                                </button>
                            </div>
                        </div>

                        <div className="t-ntf-list">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map(notification => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onMarkRead={handleMarkRead}
                                    />
                                ))
                            ) : (
                                <div className="t-ntf-empty-state">
                                    <CheckCircle size={48} />
                                    <p>All caught up! No unread notifications.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}