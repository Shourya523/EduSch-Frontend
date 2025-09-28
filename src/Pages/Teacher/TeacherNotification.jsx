import React, { useState } from 'react';
import './TeacherNotification.css';
import { Megaphone, CheckCircle, Bell, GitPullRequest, Lightbulb, XCircle,Sparkles } from 'lucide-react';
import SideBarTeacher from '../../components/SideBar-teacher';
import Header from '../../components/Header';
import AIChat from '../../components/AiChat';

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

// Hindi translations for notification types/actions
const hiText = {
    inbox: "इनबॉक्स",
    unread: "अपठित",
    all: "सभी",
    empty: "सभी सूचनाएँ पढ़ ली गई हैं!",
    leaveApproved: "अवकाश अनुरोध स्वीकृत",
    leaveApprovedMsg: "29 सितम्बर 2025 - 1 अक्टूबर 2025 के लिए आपका अवकाश विभागाध्यक्ष द्वारा स्वीकृत किया गया है।",
    changeRequest: "नई समय सारणी परिवर्तन अनुरोध",
    changeRequestMsg: "'Data Structures' कक्षा को प्रो. शर्मा की 'Algorithms' कक्षा से बदलने का अनुरोध किया गया है।",
    systemSuggestion: "सिस्टम शेड्यूलिंग सुझाव",
    systemSuggestionMsg: "'Advanced Algorithms' कक्षा के लिए शुक्रवार 2 बजे कक्ष C-103 में उपयुक्त स्लॉट उपलब्ध है।",
    info: "फैकल्टी मीटिंग सूचना",
    infoMsg: "NEP 2020 अनुपालन पर चर्चा हेतु सोमवार शाम 5:00 बजे मुख्य सम्मेलन कक्ष में अनिवार्य फैकल्टी मीटिंग है।",
    leaveRejected: "अवकाश अनुरोध अस्वीकृत",
    leaveRejectedMsg: "22 सितम्बर 2025 के लिए आपका अवकाश अनुरोध मिड-टर्म परीक्षा के दौरान टकराव के कारण अस्वीकृत किया गया।",
    viewCalendar: "कैलेंडर देखें",
    acknowledge: "स्वीकार करें",
    reviewRequest: "अनुरोध की समीक्षा करें",
    decline: "अस्वीकार करें",
    acceptSlot: "स्लॉट स्वीकारें",
    viewOptions: "विकल्प देखें",
    addToCalendar: "कैलेंडर में जोड़ें",
    viewDetails: "विवरण देखें",
    markRead: "पढ़ा हुआ चिह्नित करें"
};

const NotificationCard = ({ notification, onMarkRead, lang }) => {
    const { id, type, icon, title, message, timestamp, read, actions } = notification;
    // Hindi mapping for title/message/actions
    const hiMap = {
        'Leave Request Approved': hiText.leaveApproved,
        'Your leave request for Sep 29, 2025 - Oct 01, 2025 has been approved by the department head.': hiText.leaveApprovedMsg,
        'New Timetable Change Request': hiText.changeRequest,
        "A request has been submitted to swap your 'Data Structures' class with Prof. Sharma's 'Algorithms' class.": hiText.changeRequestMsg,
        'System Scheduling Suggestion': hiText.systemSuggestion,
        "An optimal slot for your pending 'Advanced Algorithms' class is available on Friday at 2 PM in Room C-103.": hiText.systemSuggestionMsg,
        'Faculty Meeting Announcement': hiText.info,
        'A mandatory faculty meeting is scheduled for Monday at 5:00 PM in the main conference hall to discuss NEP 2020 compliance.': hiText.infoMsg,
        'Leave Request Rejected': hiText.leaveRejected,
        'Your leave request for Sep 22, 2025 was rejected due to scheduling conflicts during the mid-term exam period.': hiText.leaveRejectedMsg,
    };
    const hiActions = {
        'View Calendar': hiText.viewCalendar,
        'Acknowledge': hiText.acknowledge,
        'Review Request': hiText.reviewRequest,
        'Decline': hiText.decline,
        'Accept Slot': hiText.acceptSlot,
        'View Options': hiText.viewOptions,
        'Add to Calendar': hiText.addToCalendar,
        'View Details': hiText.viewDetails,
        'Mark as Read': hiText.markRead
    };

    return (
        <div className={`t-ntf-card ${type} ${read ? 'read' : ''}`}>
            <div className="t-ntf-card-icon">
                {icon}
            </div>
            <div className="t-ntf-card-content">
                <div className="t-ntf-content-header">
                    <h3>{lang === "hi" ? (hiMap[title] || title) : title}</h3>
                    <span className="t-ntf-timestamp">{timestamp}</span>
                </div>
                <p className="t-ntf-message">{lang === "hi" ? (hiMap[message] || message) : message}</p>
                <div className="t-ntf-card-actions">
                    {actions.map(action => (
                        <button key={action} className={`t-ntf-action-btn ${action.toLowerCase().replace(' ', '-')}`}>
                            {lang === "hi" ? (hiActions[action] || action) : action}
                        </button>
                    ))}
                    {!read && <button className="t-ntf-action-btn mark-read" onClick={() => onMarkRead(id)}>
                        {lang === "hi" ? hiText.markRead : "Mark as Read"}
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default function TeacherNotifications() {
    const [showChat, setShowChat] = useState(false);
    const [notifications, setNotifications] = useState(initialTeacherNotifications);
    const [filter, setFilter] = useState('unread');
    const [lang, setLang] = useState("en");

    const altTitle = "सूचना केंद्र";
    const altSubtitle = "आपकी अनुसूची, अनुरोधों और घोषणाओं पर अपडेट";

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
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="t-ntf-page">
                    <div className="t-ntf-container">
                        <div className="t-ntf-header">
                            <h2><Bell size={22} /> {lang === "hi" ? hiText.inbox : "Inbox"}</h2>
                            <div className="t-ntf-filter-tabs">
                                <button
                                    className={`t-ntf-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                                    onClick={() => setFilter('unread')}
                                >
                                    {lang === "hi" ? hiText.unread : "Unread"} ({notifications.filter(n => !n.read).length})
                                </button>
                                <button
                                    className={`t-ntf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    {lang === "hi" ? hiText.all : "All"}
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
                                        lang={lang}
                                    />
                                ))
                            ) : (
                                <div className="t-ntf-empty-state">
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