import React from 'react';
import './QuickActions.css';
import { PlusCircle, CalendarDays, Users, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions({ lang = 'en' }) {
    const navigate = useNavigate();
    
    const actions = {
        en: [
            { label: 'Generate New Timetable', icon: <PlusCircle size={24} />, path: "/admin-genTT" },
            { label: 'View All Timetables', icon: <CalendarDays size={24} />, path: "/admin-timetable" },
            { label: 'Add New Faculty', icon: <Users size={24} />, path: "/admin-faculty" },
            { label: 'Add New Classroom', icon: <School size={24} />, path: "/admin-rooms" },
        ],
        hi: [
            { label: 'नया टाइमटेबल बनाएं', icon: <PlusCircle size={24} />, path: "/admin-genTT" },
            { label: 'सभी टाइमटेबल देखें', icon: <CalendarDays size={24} />, path: "/admin-timetable" },
            { label: 'नया संकाय सदस्य जोड़ें', icon: <Users size={24} />, path: "/admin-faculty" },
            { label: 'नया कक्षा-कक्ष जोड़ें', icon: <School size={24} />, path: "/admin-rooms" },
        ]
    };

    return (
        <div className="quick-actions-container">
            <h3>{lang === 'hi' ? 'त्वरित कार्रवाई' : 'Quick Actions'}</h3>
            <div className="actions-grid">
                {actions[lang].map((action, index) => (
                    <button key={index} className="action-button" onClick={() => navigate(action.path)}>
                        {action.icon}
                        <span>{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}