import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, BookOpen } from 'lucide-react';
import './UserRoles.css';

const roles = [
    {
        name: 'Student',
        hiName: 'छात्र',
        description: 'Access your timetable, assignments, and resources.',
        hiDescription: 'अपनी समय सारणी, असाइनमेंट और संसाधनों तक पहुँचें।',
        colorClass: 'role-student',
        icon: <User size={28} strokeWidth={1.7} />,
    },
    {
        name: 'Admin',
        hiName: 'व्यवस्थापक',
        description: 'Manage users, rooms, and system settings.',
        hiDescription: 'उपयोगकर्ता, कक्षाएँ और सिस्टम सेटिंग्स प्रबंधित करें।',
        colorClass: 'role-admin',
        icon: <Shield size={28} strokeWidth={1.7} />,
    },
    {
        name: 'Teacher',
        hiName: 'शिक्षक',
        description: 'View and manage your classes and schedules.',
        hiDescription: 'अपनी कक्षाएँ और समय सारणी देखें और प्रबंधित करें।',
        colorClass: 'role-teacher',
        icon: <BookOpen size={28} strokeWidth={1.7} />,
    },
];

export default function UserRoles() {
    const navigate = useNavigate();
    const [lang, setLang] = useState("en");
    const getRoute = (roleName) => {
        if (roleName.toLowerCase() === 'admin') return '/admin-dashboard';
        if (roleName.toLowerCase() === 'student') return '/student-dashboard';
        if (roleName.toLowerCase() === 'teacher') return '/teacher';
        return '/';
    };
    return (
        <div className="user-roles-backdrop">
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="user-roles-heading">
                        {lang === "hi"
                            ? "डेमो डैशबोर्ड चुनें जिसे आप देखना चाहते हैं"
                            : "Choose the demo dashboard you want to see"}
                    </div>
                    <button
                        style={{ marginLeft: 16, fontSize: 15, padding: "0.3em 1em", borderRadius: 6, border: "1px solid #444", background: "#232323", color: "#eee", cursor: "pointer" }}
                        onClick={() => setLang(l => l === "en" ? "hi" : "en")}
                    >
                        {lang === "hi" ? "English" : "हिन्दी"}
                    </button>
                </div>
                <div className="user-roles-container">
                    {roles.map(role => (
                        <div
                            className={`user-role-card ${role.colorClass}`}
                            key={role.name}
                            onClick={() => navigate(getRoute(role.name))}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="user-role-icon">{role.icon}</div>
                            <div className="user-role-texts">
                                <div className="user-role-title">{lang === "hi" ? role.hiName : role.name}</div>
                                <div className="user-role-desc">{lang === "hi" ? role.hiDescription : role.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}