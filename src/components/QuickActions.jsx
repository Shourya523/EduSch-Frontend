import React from 'react';
import './QuickActions.css';
import { PlusCircle, CalendarDays, Users, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
    const navigate=useNavigate();
    return (
        <div className="quick-actions-container">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
                <button className="action-button" onClick={()=>navigate("/admin-genTT")}>
                    <PlusCircle size={24} />
                    <span>Generate New Timetable</span>
                </button>
                <button className="action-button" onClick={()=>navigate("/admin-timetable")}>
                    <CalendarDays size={24} />
                    <span>View All Timetables</span>
                </button>
                <button className="action-button" onClick={()=>navigate("/admin-faculty")}>
                    <Users size={24} />
                    <span>Add New Faculty</span>
                </button>
                <button className="action-button" onClick={()=>navigate("/admin-rooms")}>
                    <School size={24} />
                    <span>Add New Classroom</span>
                </button>
            </div>
        </div>
    );
}
