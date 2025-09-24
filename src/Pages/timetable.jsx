import Header from '../components/Header';
import SideBar from '../components/SideBar';
import './timetable.css';
import { Clock, MapPin, User } from 'lucide-react';

// UPDATED: Mock data now includes the full week (Monday - Friday).
const timetableData = [
    {
        day: "Monday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00-10:00", location: "A-204", instructor: "Mrs. Ruchika Bala" },
            { type: "Lecture", subject: "Database Management Systems", time: "10:00-11:00", location: "B-301", instructor: "Mr. Vicky Gupta" },
            { type: "Lab", subject: "IT Infrastructure and Communication Lab", time: "11:00-13:00", location: "Lab-C1", instructor: "Dr. Himika Verma" },
            { type: "Lab", subject: "Digital Systems and Computer Organisation", time: "14:00-16:00", location: "Lab-D2", instructor: "Prof. Divya Kaushik" }
        ]
    },
    {
        day: "Tuesday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00-10:00", location: "A-205", instructor: "Mrs. Ruchika Bala" },
            { type: "Lecture", subject: "Database Management Systems", time: "10:00-11:00", location: "B-302", instructor: "Mr. Vicky Gupta" },
            { type: "Lab", subject: "Data Structures Lab", time: "11:00-13:00", location: "Lab-C2", instructor: "Dr. Anshul Singh" }
        ]
    },
    {
        day: "Wednesday",
        classes: [
            { type: "Lecture", subject: "Economics", time: "9:00-10:00", location: "A-204", instructor: "Mr. Alok Kumar Singh" },
            { type: "Lecture", subject: "IT Infrastructure and Communication Lab", time: "10:00-11:00", location: "B-301", instructor: "Prof. Rishabh Negi" }
        ]
    },
    {
        day: "Thursday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00-10:00", location: "A-205", instructor: "Mrs. Ruchika Bala" },
            { type: "Lecture", subject: "Database Management Systems", time: "10:00-11:00", location: "B-302", instructor: "Mr. Vicky Gupta" },
            { type: "Lecture", subject: "Digital Systems and Computer Organization", time: "11:00-12:00", location: "Lab-C1", instructor: "Dr. Nilufar Yasmin" },
        ]
    },
    {
        day: "Friday",
        classes: [
            { type: "Lecture", subject: "Mathematical Foundations for Artificial Intelligence and Data Science", time: "9:00-10:00", location: "A-204", instructor: "Mrs. Shivani Pant" },
            { type: "Lecture", subject: "IT Infrastructure and Communication Lab", time: "10:00-11:00", location: "B-301", instructor: "Prof.Rishabh  Negi" },
            { type: "Lab", subject: "Database Management Systems Lab", time: "14:00-16:00", location: "Lab-D2", instructor: "Prof. Noor Mohammad" }
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