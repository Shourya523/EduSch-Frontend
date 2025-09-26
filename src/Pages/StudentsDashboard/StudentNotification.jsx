import React, { useState } from 'react';
import './StudentNotification.css'; // This now links to the refactored CSS
import { Megaphone, CheckCircle, Bell, CalendarClock, CalendarX2, Timer } from 'lucide-react';
import SideBarStudent from '../../components/SideBar-student';
import Header from '../../components/Header';
import AIChat from '../../components/AiChat';

// --- Mock Data with updated icon class names ---
const initialStudentNotifications = [
    {
        id: 1,
        type: 'rescheduled',
        icon: <CalendarClock size={24} className="s-ntf-icon-rescheduled" />,
        title: 'Class Rescheduled',
        message: 'Your "Data Structures" class scheduled for Monday 10:00 AM has been moved to Tuesday, 02:00 PM in Room LT-101.',
        timestamp: '1 hour ago',
        read: false,
        actions: ['View Timetable', 'Acknowledge']
    },
    {
        id: 2,
        type: 'cancelled',
        icon: <CalendarX2 size={24} className="s-ntf-icon-cancelled" />,
        title: 'Class Cancelled',
        message: 'Your "Engineering Mathematics-I" class for tomorrow has been cancelled due to teacher unavailability.',
        timestamp: '3 hours ago',
        read: false,
        actions: ['Acknowledge']
    },
    {
        id: 3,
        type: 'upcoming',
        icon: <Timer size={24} className="s-ntf-icon-upcoming" />,
        title: 'Upcoming Class Reminder',
        message: 'Your "Algorithms" class is today at 09:59 AM in Room LT-205.',
        timestamp: 'Just now',
        read: true, // Reminders can be pre-read
        actions: ['View Details']
    },
    {
        id: 4,
        type: 'upcoming',
        icon: <Timer size={24} className="s-ntf-icon-upcoming" />,
        title: 'Upcoming Class Reminder',
        message: 'Your "Operating Systems Lab" starts in 2 hours in CS-Lab-3.',
        timestamp: '1 hour ago',
        read: true,
        actions: ['View Details']
    },
    {
        id: 5,
        type: 'info',
        icon: <Megaphone size={24} className="s-ntf-icon-info" />,
        title: 'Campus Announcement',
        message: "The annual tech fest 'Innovate 2025' registrations are now open. Don't miss out!",
        timestamp: '1 day ago',
        read: false,
        actions: ['Learn More']
    },
    {
        id: 6,
        type: 'upcoming',
        icon: <Timer size={24} className="s-ntf-icon-upcoming" />,
        title: 'Upcoming Class Reminder',
        message: 'Your "Database Management" class is tomorrow at 09:00 AM.',
        timestamp: '1 day ago',
        read: true,
        actions: ['View Details']
    },
];

// --- Reusable Notification Card Component ---
const NotificationCard = ({ notification, onMarkRead }) => {
    const { id, type, icon, title, message, timestamp, read, actions } = notification;

    return (
        <div className={`s-ntf-card ${type} ${read ? 'read' : ''}`}>
            <div className="s-ntf-card-icon">
                {icon}
            </div>
            <div className="s-ntf-card-content">
                <div className="s-ntf-content-header">
                    <h3>{title}</h3>
                    <span className="s-ntf-timestamp">{timestamp}</span>
                </div>
                <p className="s-ntf-message">{message}</p>
                <div className="s-ntf-card-actions">
                    {actions.map(action => (
                        <button key={action} className={`s-ntf-action-btn ${action.toLowerCase().replace(' ', '-')}`}>{action}</button>
                    ))}
                    {!read && <button className="s-ntf-action-btn mark-read" onClick={() => onMarkRead(id)}>Mark as Read</button>}
                </div>
            </div>
        </div>
    );
};


export default function StudentNotifications() {
    const [notifications, setNotifications] = useState(initialStudentNotifications);
    const [filter, setFilter] = useState('unread');

    const handleMarkRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        return true;
    });
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="page-layout">
            <SideBarStudent activePage={"notifications"} />
            <main className="main-content">
                <Header
                    title="Student Notification Center"
                    subtitle="Updates on your classes, events, and announcements"
                />
                <div className="s-ntf-page">
                    <div className="s-ntf-container">
                        <div className="s-ntf-header">
                            <h2><Bell size={22} /> Inbox</h2>
                            <div className="s-ntf-filter-tabs">
                                <button
                                    className={`s-ntf-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                                    onClick={() => setFilter('unread')}
                                >
                                    Unread ({notifications.filter(n => !n.read).length})
                                </button>
                                <button
                                    className={`s-ntf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All
                                </button>
                            </div>
                        </div>

                        <div className="s-ntf-list">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map(notification => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onMarkRead={handleMarkRead}
                                    />
                                ))
                            ) : (
                                <div className="s-ntf-empty-state">
                                    <CheckCircle size={48} />
                                    <p>All caught up! No unread notifications.</p>
                                </div>
                            )}
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