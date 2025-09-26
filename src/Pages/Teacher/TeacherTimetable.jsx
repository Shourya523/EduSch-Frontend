import React, { useState, useEffect, useRef } from 'react';
import SideBarTeacher from '../../components/SideBar-teacher';
import Header from '../../components/Header';
import './TeacherTimetable.css';
import { 
    Clock, MapPin, Users, MoreVertical, CalendarPlus, 
    AlertTriangle, CalendarClock, XCircle, Megaphone 
} from 'lucide-react';

// Mock data for a teacher's timetable.
const teacherTimetableData = [
    {
        day: "Monday",
        classes: [
            { id: "mon-1", type: "Lecture", subject: "Data Structures", time: "9:00 AM - 10:00 AM", location: "A-204", batch: "B.Tech CSE - 3rd Year" },
            { id: "mon-2", type: "Lecture", subject: "Digital Systems", time: "2:00 PM - 3:00 PM", location: "B-101", batch: "B.Tech ECE - 2nd Year" }
        ]
    },
    {
        day: "Tuesday",
        classes: [
            { id: "tue-1", type: "Lab", subject: "Data Structures Lab", time: "2:00 PM - 4:00 PM", location: "Lab-C2", batch: "B.Tech CSE - 3rd Year" }
        ]
    },
    {
        day: "Wednesday",
        classes: [
            { id: "wed-1", type: "Lecture", subject: "Data Structures", time: "9:00 AM - 10:00 AM", location: "A-204", batch: "B.Tech CSE - 3rd Year" },
            { id: "wed-2", type: "Lecture", subject: "Advanced Algorithms", time: "11:00 AM - 12:00 PM", location: "A-301", batch: "M.Tech CSE - 1st Year" }
        ]
    },
    {
        day: "Thursday",
        classes: [
             { id: "thu-1", type: "Lab", subject: "Digital Systems Lab", time: "11:00 AM - 1:00 PM", location: "Lab-D2", batch: "B.Tech ECE - 2nd Year" }
        ]
    },
    {
        day: "Friday",
        classes: [
            { id: "fri-1", type: "Lecture", subject: "Digital Systems", time: "2:00 PM - 3:00 PM", location: "B-101", batch: "B.Tech ECE - 2nd Year" }
        ]
    }
];

export default function TeacherTimetable() {
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuToggle = (classId) => {
        setOpenMenuId(openMenuId === classId ? null : classId);
    };

    return (
        <div className="teacher-timetable-layout">
            <SideBarTeacher activePage={'timetable'} />
            <main className="main-content">
                <Header
                    title="My Timetable"
                    subtitle="Your weekly teaching schedule"
                >
                    <div className="header-actions">
                        <button className="header-btn secondary">
                            <CalendarPlus size={16} />
                            <span>Sync to Calendar</span>
                        </button>
                        <button className="header-btn primary">
                            <AlertTriangle size={16} />
                            <span>Request Change</span>
                        </button>
                    </div>
                </Header>
                <div className="content-area">
                    <div className="timetable-container">
                        {teacherTimetableData.map((dayData) => (
                            <div className="day-section" key={dayData.day}>
                                <h3>{dayData.day}</h3>
                                <div className="entries-container">
                                    {dayData.classes.length > 0 ? (
                                        dayData.classes.map((classInfo) => (
                                            <div className="timetable-entry" key={classInfo.id}>
                                                <div className="entry-top">
                                                    <span className={`entry-tag ${classInfo.type.toLowerCase()}`}>{classInfo.type}</span>
                                                    <h4>{classInfo.subject}</h4>
                                                </div>
                                                <div className="entry-details">
                                                    <div className="detail-item">
                                                        <Clock size={14} />
                                                        <span>{classInfo.time}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <MapPin size={14} />
                                                        <span>{classInfo.location}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <Users size={14} />
                                                        <span>{classInfo.batch}</span>
                                                    </div>
                                                </div>
                                                <div className="entry-actions-container" ref={openMenuId === classInfo.id ? menuRef : null}>
                                                    <button className="entry-actions-btn" onClick={() => handleMenuToggle(classInfo.id)}>
                                                        <MoreVertical size={18} />
                                                    </button>
                                                    {openMenuId === classInfo.id && (
                                                        <div className="entry-dropdown-menu">
                                                            <button className="dropdown-item">
                                                                <CalendarClock size={14} />
                                                                <span>Reschedule</span>
                                                            </button>
                                                            <button className="dropdown-item">
                                                                <Megaphone size={14} />
                                                                <span>Send Alert</span>
                                                            </button>
                                                            <button className="dropdown-item danger">
                                                                <XCircle size={14} />
                                                                <span>Cancel Class</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-class-message">No classes scheduled for this day.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}