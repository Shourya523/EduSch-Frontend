import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, BookOpen } from 'lucide-react';
import './UserRoles.css';

const roles = [
    {
        name: 'Student',
        description: 'Access your timetable, assignments, and resources.',
        colorClass: 'role-student',
        icon: <User size={28} strokeWidth={1.7} />,
    },
    {
        name: 'Admin',
        description: 'Manage users, rooms, and system settings.',
        colorClass: 'role-admin',
        icon: <Shield size={28} strokeWidth={1.7} />,
    },
    {
        name: 'Teacher',
        description: 'View and manage your classes and schedules.',
        colorClass: 'role-teacher',
        icon: <BookOpen size={28} strokeWidth={1.7} />,
    },
];

export default function UserRoles() {
    const navigate = useNavigate();
    const getRoute = (roleName) => {
        if (roleName.toLowerCase() === 'admin') return '/admin-dashboard';
        if (roleName.toLowerCase() === 'student') return '/student-dashboard';
        if (roleName.toLowerCase() === 'teacher') return '/teacher';
        return '/';
    };
    return (
        <div className="user-roles-backdrop">
            <div>
                <div className="user-roles-heading">Choose the demo dashboard you want to see</div>
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
                                <div className="user-role-title">{role.name}</div>
                                <div className="user-role-desc">{role.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
