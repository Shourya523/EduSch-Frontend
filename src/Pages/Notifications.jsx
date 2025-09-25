import React, { useState } from 'react';
import './Notifications.css'; // This now links to the refactored CSS
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { CalendarPlus, UserMinus, Wrench, Megaphone, CheckCircle, Bell } from 'lucide-react';

// Mock Notification Data (remains the same)
const initialNotifications = [
    {
        id: 1,
        type: 'request',
        icon: <CalendarPlus size={24} className="ntf-icon-request" />,
        title: 'Extra Class Request',
        message: 'Prof. Kumar has requested an extra class for Data Structures (Batch A) on Friday, 14:00-15:00 in Room LT-101.',
        timestamp: '2 hours ago',
        read: false,
        actions: ['Approve', 'Decline']
    },
    {
        id: 2,
        type: 'absence',
        icon: <UserMinus size={24} className="ntf-icon-absence" />,
        title: 'Teacher Absence Report',
        message: 'Prof. Sharma will be absent on Monday. Please reschedule all classes for Engineering Mathematics-I.',
        timestamp: '8 hours ago',
        read: false,
        actions: ['Reschedule', 'Notify Students']
    },
    {
        id: 3,
        type: 'maintenance',
        icon: <Wrench size={24} className="ntf-icon-maintenance" />,
        title: 'Room Under Maintenance',
        message: 'CS-Lab-1 will be unavailable on Wednesday due to network equipment upgrades. All scheduled labs need to be relocated.',
        timestamp: '1 day ago',
        read: false,
        actions: ['Find Room', 'Acknowledge']
    },
    {
        id: 4,
        type: 'info',
        icon: <Megaphone size={24} className="ntf-icon-info" />,
        title: 'General Announcement',
        message: 'Mid-semester feedback forms for all departments will be distributed next week.',
        timestamp: '2 days ago',
        read: true,
        actions: ['Acknowledge']
    },
    {
        id: 5,
        type: 'success',
        icon: <CheckCircle size={24} className="ntf-icon-success" />,
        title: 'Timetable Published',
        message: 'The timetable for Computer Science - 5th Semester (Batch B) has been successfully generated and published.',
        timestamp: '3 days ago',
        read: true,
        actions: ['View Timetable']
    }
];

// --- Reusable Notification Card Component with new class names ---
const NotificationCard = ({ notification, onMarkRead }) => {
    const { id, type, icon, title, message, timestamp, read, actions } = notification;

    return (
        <div className={`ntf-card ${type} ${read ? 'read' : ''}`}>
            <div className="ntf-card-icon">
                {icon}
            </div>
            <div className="ntf-card-content">
                <div className="ntf-content-header">
                    <h3>{title}</h3>
                    <span className="ntf-timestamp">{timestamp}</span>
                </div>
                <p className="ntf-message">{message}</p>
                <div className="ntf-card-actions">
                    {actions.map(action => (
                        <button key={action} className={`ntf-action-btn ${action.toLowerCase().replace(' ', '-')}`}>{action}</button>
                    ))}
                    {!read && <button className="ntf-action-btn mark-read" onClick={() => onMarkRead(id)}>Mark as Read</button>}
                </div>
            </div>
        </div>
    );
};


export default function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);
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
            <SideBar activePage={"notifications"} />
            <main className="main-content">
                <Header 
                    title="Notifications & Alerts"
                    subtitle="Review requests, updates, and system alerts"
                />
                <div className="ntf-page">
                    <div className="ntf-container">
                        <div className="ntf-header">
                            <h2><Bell size={22} /> Inbox</h2>
                            <div className="ntf-filter-tabs">
                                <button 
                                    className={`ntf-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                                    onClick={() => setFilter('unread')}
                                >
                                    Unread ({notifications.filter(n => !n.read).length})
                                </button>
                                <button 
                                    className={`ntf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All
                                </button>
                            </div>
                        </div>

                        <div className="ntf-list">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map(notification => (
                                    <NotificationCard 
                                        key={notification.id}
                                        notification={notification}
                                        onMarkRead={handleMarkRead}
                                    />
                                ))
                            ) : (
                                <div className="ntf-empty-state">
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

