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

// Hindi translations for notification types/actions
const hiText = {
    inbox: "इनबॉक्स",
    unread: "अपठित",
    all: "सभी",
    empty: "सभी सूचनाएँ पढ़ ली गई हैं!",
    // Titles
    classRescheduled: "कक्षा पुनर्निर्धारित",
    classCancelled: "कक्षा रद्द",
    upcomingReminder: "आगामी कक्षा अनुस्मारक",
    campusAnnouncement: "परिसर घोषणा",
    // Messages
    rescheduledMsg: 'आपकी "डेटा संरचना" कक्षा जो सोमवार सुबह 10:00 बजे निर्धारित थी, अब मंगलवार दोपहर 02:00 बजे कमरा LT-101 में होगी।',
    cancelledMsg: 'शिक्षक की अनुपलब्धता के कारण कल के लिए आपकी "इंजीनियरिंग गणित-I" कक्षा रद्द कर दी गई है।',
    upcomingMsg1: 'आपकी "एल्गोरिदम" कक्षा आज सुबह 09:59 बजे कमरा LT-205 में है।',
    upcomingMsg2: 'आपकी "ऑपरेटिंग सिस्टम लैब" 2 घंटे में CS-Lab-3 में शुरू होगी।',
    announcementMsg: "वार्षिक टेक फेस्ट 'इनोवेट 2025' के लिए पंजीकरण अब खुल गए हैं। इसे न चूकें!",
    upcomingMsg3: 'आपकी "डेटाबेस मैनेजमेंट" कक्षा कल सुबह 09:00 बजे है।',
    // Actions
    viewTimetable: "समय सारणी देखें",
    acknowledge: "स्वीकार करें",
    viewDetails: "विवरण देखें",
    learnMore: "और जानें",
    markRead: "पढ़ा हुआ चिह्नित करें"
};


// --- Reusable Notification Card Component ---
const NotificationCard = ({ notification, onMarkRead, lang }) => {
    const { id, type, icon, title, message, timestamp, read, actions } = notification;

    // Hindi mapping for title/message/actions
    const hiMap = {
        'Class Rescheduled': hiText.classRescheduled,
        'Your "Data Structures" class scheduled for Monday 10:00 AM has been moved to Tuesday, 02:00 PM in Room LT-101.': hiText.rescheduledMsg,
        'Class Cancelled': hiText.classCancelled,
        'Your "Engineering Mathematics-I" class for tomorrow has been cancelled due to teacher unavailability.': hiText.cancelledMsg,
        'Upcoming Class Reminder': hiText.upcomingReminder,
        'Your "Algorithms" class is today at 09:59 AM in Room LT-205.': hiText.upcomingMsg1,
        'Your "Operating Systems Lab" starts in 2 hours in CS-Lab-3.': hiText.upcomingMsg2,
        'Campus Announcement': hiText.campusAnnouncement,
        "The annual tech fest 'Innovate 2025' registrations are now open. Don't miss out!": hiText.announcementMsg,
        'Your "Database Management" class is tomorrow at 09:00 AM.': hiText.upcomingMsg3,
    };
    const hiActions = {
        'View Timetable': hiText.viewTimetable,
        'Acknowledge': hiText.acknowledge,
        'View Details': hiText.viewDetails,
        'Learn More': hiText.learnMore,
        'Mark as Read': hiText.markRead
    };

    return (
        <div className={`s-ntf-card ${type} ${read ? 'read' : ''}`}>
            <div className="s-ntf-card-icon">
                {icon}
            </div>
            <div className="s-ntf-card-content">
                <div className="s-ntf-content-header">
                    <h3>{lang === "hi" ? (hiMap[title] || title) : title}</h3>
                    <span className="s-ntf-timestamp">{timestamp}</span>
                </div>
                <p className="s-ntf-message">{lang === "hi" ? (hiMap[message] || message) : message}</p>
                <div className="s-ntf-card-actions">
                    {actions.map(action => (
                        <button key={action} className={`s-ntf-action-btn ${action.toLowerCase().replace(' ', '-')}`}>
                            {lang === "hi" ? (hiActions[action] || action) : action}
                        </button>
                    ))}
                    {!read && <button className="s-ntf-action-btn mark-read" onClick={() => onMarkRead(id)}>
                        {lang === "hi" ? hiText.markRead : "Mark as Read"}
                    </button>}
                </div>
            </div>
        </div>
    );
};


export default function StudentNotifications() {
    const [notifications, setNotifications] = useState(initialStudentNotifications);
    const [filter, setFilter] = useState('unread');
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    const altTitle = "छात्र सूचना केंद्र";
    const altSubtitle = "आपकी कक्षाओं, आयोजनों और घोषणाओं पर अपडेट";
    
    const handleMarkRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        return true;
    });

    return (
        <div className="page-layout">
            <SideBarStudent activePage={"notifications"} />
            <main className="main-content">
                <Header
                    title="Student Notification Center"
                    subtitle="Updates on your classes, events, and announcements"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="s-ntf-page">
                    <div className="s-ntf-container">
                        <div className="s-ntf-header">
                            <h2><Bell size={22} /> {lang === "hi" ? hiText.inbox : "Inbox"}</h2>
                            <div className="s-ntf-filter-tabs">
                                <button
                                    className={`s-ntf-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                                    onClick={() => setFilter('unread')}
                                >
                                    {lang === "hi" ? hiText.unread : "Unread"} ({notifications.filter(n => !n.read).length})
                                </button>
                                <button
                                    className={`s-ntf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    {lang === "hi" ? hiText.all : "All"}
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
                                        lang={lang}
                                    />
                                ))
                            ) : (
                                <div className="s-ntf-empty-state">
                                    <CheckCircle size={48} />
                                    <p>{lang === "hi" ? hiText.empty : "All caught up! No unread notifications."}</p>
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