import React, { useState } from 'react';
import './Notifications.css'; // This now links to the refactored CSS
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { CalendarPlus, UserMinus, Wrench, Megaphone, CheckCircle, Bell, Sparkles } from 'lucide-react';
import AIChat from '../components/AiChat';

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

// Hindi translations
const hiText = {
    inbox: "इनबॉक्स",
    unread: "अपठित",
    all: "सभी",
    empty: "सभी सूचनाएँ पढ़ ली गई हैं!",
    // Titles
    extraClassRequest: "अतिरिक्त कक्षा का अनुरोध",
    teacherAbsence: "शिक्षक अनुपस्थिति रिपोर्ट",
    roomMaintenance: "कमरा रखरखाव में",
    generalAnnouncement: "सामान्य घोषणा",
    timetablePublished: "समय सारणी प्रकाशित",
    // Messages
    extraClassMsg: 'प्रो. कुमार ने शुक्रवार, 14:00-15:00 बजे कमरा LT-101 में डेटा संरचना (बैच ए) के लिए एक अतिरिक्त कक्षा का अनुरोध किया है।',
    absenceMsg: 'प्रो. शर्मा सोमवार को अनुपस्थित रहेंगे। कृपया इंजीनियरिंग गणित-I की सभी कक्षाओं को पुनर्निर्धारित करें।',
    maintenanceMsg: 'नेटवर्क उपकरण अपग्रेड के कारण CS-Lab-1 बुधवार को अनुपलब्ध रहेगा। सभी निर्धारित लैब्स को स्थानांतरित करने की आवश्यकता है।',
    announcementMsg: 'सभी विभागों के लिए मध्य-सेमेस्टर फीडबैक फॉर्म अगले सप्ताह वितरित किए जाएंगे।',
    publishedMsg: 'कंप्यूटर विज्ञान - 5वें सेमेस्टर (बैच बी) के लिए समय सारणी सफलतापूर्वक बना और प्रकाशित कर दी गई है।',
    // Actions
    approve: "स्वीकृत करें",
    decline: "अस्वीकार करें",
    reschedule: "पुनर्निर्धारित करें",
    notifyStudents: "छात्रों को सूचित करें",
    findRoom: "कमरा खोजें",
    acknowledge: "स्वीकार करें",
    viewTimetable: "समय सारणी देखें",
    markRead: "पढ़ा हुआ चिह्नित करें"
};

// --- Reusable Notification Card Component with new class names ---
const NotificationCard = ({ notification, onMarkRead, lang }) => {
    const { id, type, icon, title, message, timestamp, read, actions } = notification;

    const hiMap = {
        'Extra Class Request': hiText.extraClassRequest,
        'Prof. Kumar has requested an extra class for Data Structures (Batch A) on Friday, 14:00-15:00 in Room LT-101.': hiText.extraClassMsg,
        'Teacher Absence Report': hiText.teacherAbsence,
        'Prof. Sharma will be absent on Monday. Please reschedule all classes for Engineering Mathematics-I.': hiText.absenceMsg,
        'Room Under Maintenance': hiText.roomMaintenance,
        'CS-Lab-1 will be unavailable on Wednesday due to network equipment upgrades. All scheduled labs need to be relocated.': hiText.maintenanceMsg,
        'General Announcement': hiText.generalAnnouncement,
        'Mid-semester feedback forms for all departments will be distributed next week.': hiText.announcementMsg,
        'Timetable Published': hiText.timetablePublished,
        'The timetable for Computer Science - 5th Semester (Batch B) has been successfully generated and published.': hiText.publishedMsg,
    };
    const hiActions = {
        'Approve': hiText.approve,
        'Decline': hiText.decline,
        'Reschedule': hiText.reschedule,
        'Notify Students': hiText.notifyStudents,
        'Find Room': hiText.findRoom,
        'Acknowledge': hiText.acknowledge,
        'View Timetable': hiText.viewTimetable,
        'Mark as Read': hiText.markRead
    };

    return (
        <div className={`ntf-card ${type} ${read ? 'read' : ''}`}>
            <div className="ntf-card-icon">
                {icon}
            </div>
            <div className="ntf-card-content">
                <div className="ntf-content-header">
                    <h3>{lang === "hi" ? (hiMap[title] || title) : title}</h3>
                    <span className="ntf-timestamp">{timestamp}</span>
                </div>
                <p className="ntf-message">{lang === "hi" ? (hiMap[message] || message) : message}</p>
                <div className="ntf-card-actions">
                    {actions.map(action => (
                        <button key={action} className={`ntf-action-btn ${action.toLowerCase().replace(' ', '-')}`}>
                            {lang === "hi" ? (hiActions[action] || action) : action}
                        </button>
                    ))}
                    {!read && <button className="ntf-action-btn mark-read" onClick={() => onMarkRead(id)}>
                        {lang === "hi" ? hiText.markRead : "Mark as Read"}
                    </button>}
                </div>
            </div>
        </div>
    );
};


export default function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState('unread');
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    const altTitle = "सूचनाएँ";
    const altSubtitle = "अनुरोधों, अपडेट्स और सिस्टम अलर्ट की समीक्षा करें";

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
                    title="Notifications"
                    subtitle="Review requests, updates, and system alerts"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="ntf-page">
                    <div className="ntf-container">
                        <div className="ntf-header">
                            <h2><Bell size={22} /> {lang === "hi" ? hiText.inbox : "Inbox"}</h2>
                            <div className="ntf-filter-tabs">
                                <button
                                    className={`ntf-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                                    onClick={() => setFilter('unread')}
                                >
                                    {lang === "hi" ? hiText.unread : "Unread"} ({notifications.filter(n => !n.read).length})
                                </button>
                                <button
                                    className={`ntf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    {lang === "hi" ? hiText.all : "All"}
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
                                        lang={lang}
                                    />
                                ))
                            ) : (
                                <div className="ntf-empty-state">
                                    <CheckCircle size={48} />
                                    <p>{lang === "hi" ? hiText.empty : "All caught up! No unread notifications."}</p>
                                </div>
                            )}
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