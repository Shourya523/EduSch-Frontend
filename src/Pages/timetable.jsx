import Header from '../components/Header';
import SideBar from '../components/SideBar';
import './timetable.css';
import { Clock, MapPin, User } from 'lucide-react';

// UPDATED: Mock data now includes the full week (Monday - Friday).
const timetableData = [
    {
        day: "Monday",
        classes: [
            { type: "Lecture", subject: "EMFT", time: "9:00-10:00", location: "A-204", instructor: "Dr. Smith" },
            { type: "Lecture", subject: "Comprehensive AI", time: "10:00-11:00", location: "B-301", instructor: "Prof. Johnson" },
            { type: "Lab", subject: "EMFT Lab", time: "11:00-13:00", location: "Lab-C1", instructor: "Dr. Smith" },
            { type: "Lab", subject: "Comprehensive AI Lab", time: "14:00-16:00", location: "Lab-D2", instructor: "Prof. Johnson" }
        ]
    },
    {
        day: "Tuesday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00-10:00", location: "A-205", instructor: "Dr. Williams" },
            { type: "Lecture", subject: "Database Systems", time: "10:00-11:00", location: "B-302", instructor: "Prof. Brown" },
            { type: "Lab", subject: "Data Structures Lab", time: "11:00-13:00", location: "Lab-C2", instructor: "Dr. Williams" }
        ]
    },
    {
        day: "Wednesday",
        classes: [
            { type: "Lecture", subject: "EMFT", time: "9:00-10:00", location: "A-204", instructor: "Dr. Smith" },
            { type: "Lecture", subject: "Comprehensive AI", time: "10:00-11:00", location: "B-301", instructor: "Prof. Johnson" }
        ]
    },
    {
        day: "Thursday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00-10:00", location: "A-205", instructor: "Dr. Williams" },
            { type: "Lecture", subject: "Database Systems", time: "10:00-11:00", location: "B-302", instructor: "Prof. Brown" },
            { type: "Lab", subject: "EMFT Lab", time: "11:00-13:00", location: "Lab-C1", instructor: "Dr. Smith" },
        ]
    },
    {
        day: "Friday",
        classes: [
            { type: "Lecture", subject: "EMFT", time: "9:00-10:00", location: "A-204", instructor: "Dr. Smith" },
            { type: "Lecture", subject: "Comprehensive AI", time: "10:00-11:00", location: "B-301", instructor: "Prof. Johnson" },
            { type: "Lab", subject: "Comprehensive AI Lab", time: "14:00-16:00", location: "Lab-D2", instructor: "Prof. Johnson" }
        ]
    }
];

export default function Timetable() {
    return (
        <div className="timetable-layout">
            <SideBar activePage={'timetable'} />
            <main className="main-content">
                <Header 
                    title="Timetable" 
                    subtitle="Welcome back, Admin User" 
                />
                <div className="content-area">
                    <div className="timetable-container">
                        <div className="timetable-header">
                            <div className="timetable-title">
                                <h2>Weekly Timetable</h2>
                                <p>Batch: E15</p>
                            </div>
                            <button className="batch-tag">E15 Batch</button>
                        </div>

                        {timetableData.map((dayData, index) => (
                            <div className="day-section" key={index}>
                                <h3>{dayData.day}</h3>
                                <div className="entries-container">
                                    {dayData.classes.map((classInfo, classIndex) => (
                                        <div className="timetable-entry" key={classIndex}>
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
                                                    <User size={14} />
                                                    <span>{classInfo.instructor}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}