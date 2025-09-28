import React from 'react';
import { useState } from 'react';
import SideBarStudent from '../../components/SideBar-student'; // Corrected path
import Header from '../../components/Header'; // Assuming Header is in components
import './StudentTimetable.css'; // The new CSS file for this page
import { Clock, MapPin, User, Sparkles } from 'lucide-react';
import AIChat from '../../components/AiChat';

// Mock data for a student's timetable. In a real app, this would be fetched.
const studentTimetableData = [
    {
        day: "Monday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00 AM - 10:00 AM", location: "A-204", instructor: "Mrs. Ruchika Bala" },
            { type: "Lab", subject: "IT Infrastructure Lab", time: "11:00 AM - 1:00 PM", location: "Lab-C1", instructor: "Dr. Himika Verma" },
            { type: "Lecture", subject: "Digital Systems", time: "2:00 PM - 3:00 PM", location: "B-101", instructor: "Prof. Divya Kaushik" }
        ]
    },
    {
        day: "Tuesday",
        classes: [
            { type: "Lecture", subject: "Database Management", time: "10:00 AM - 11:00 AM", location: "B-302", instructor: "Prof. Anil Kumar" },
            { type: "Lab", subject: "Data Structures Lab", time: "2:00 PM - 4:00 PM", location: "Lab-C2", instructor: "Mrs. Ruchika Bala" }
        ]
    },
    {
        day: "Wednesday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00 AM - 10:00 AM", location: "A-204", instructor: "Mrs. Ruchika Bala" },
            { type: "Lecture", subject: "Operating Systems", time: "11:00 AM - 12:00 PM", location: "A-205", instructor: "Dr. Sandeep Singh" }
        ]
    },
    {
        day: "Thursday",
        classes: [
            { type: "Lecture", subject: "Database Management", time: "10:00 AM - 11:00 AM", location: "B-302", instructor: "Prof. Anil Kumar" },
            { type: "Lab", subject: "Digital Systems Lab", time: "11:00 AM - 1:00 PM", location: "Lab-D2", instructor: "Prof. Divya Kaushik" },
        ]
    },
    {
        day: "Friday",
        classes: [
            { type: "Lecture", subject: "Operating Systems", time: "9:00 AM - 10:00 AM", location: "A-205", instructor: "Dr. Sandeep Singh" },
            { type: "Lecture", subject: "Digital Systems", time: "2:00 PM - 3:00 PM", location: "B-101", instructor: "Prof. Divya Kaushik" }
        ]
    }
];

export default function StudentTimetable() {
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = React.useState("en");
    const altTitle = "मेरी समय सारणी";
    const altSubtitle = "आपका साप्ताहिक कक्षा कार्यक्रम";

    // Comprehensive Hindi translations
    const hiText = {
        days: {
            Monday: "सोमवार",
            Tuesday: "मंगलवार",
            Wednesday: "बुधवार",
            Thursday: "गुरुवार",
            Friday: "शुक्रवार"
        },
        types: {
            Lecture: "व्याख्यान",
            Lab: "प्रयोगशाला"
        },
        subjects: {
            "Data Structures": "डेटा संरचनाएं",
            "IT Infrastructure Lab": "आईटी इंफ्रास्ट्रक्चर लैब",
            "Digital Systems": "डिजिटल सिस्टम",
            "Database Management": "डेटाबेस प्रबंधन",
            "Data Structures Lab": "डेटा संरचनाएं लैब",
            "Operating Systems": "ऑपरेटिंग सिस्टम",
            "Digital Systems Lab": "डिजिटल सिस्टम लैब"
        },
        instructors: {
            "Mrs. Ruchika Bala": "श्रीमती रुचिका बाला",
            "Dr. Himika Verma": "डॉ. हिमिका वर्मा",
            "Prof. Divya Kaushik": "प्रो. दिव्या कौशिक",
            "Prof. Anil Kumar": "प्रो. अनिल कुमार",
            "Dr. Sandeep Singh": "डॉ. संदीप सिंह"
        },
        noClass: "आज के लिए कोई कक्षा निर्धारित नहीं है।"
    };

    return (
        <div className="student-timetable-layout">
            <SideBarStudent activePage={'timetable'} />
            <main className="main-content">
                <Header
                    title="My Timetable"
                    subtitle="Your weekly class schedule"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="content-area">
                    <div className="timetable-container">
                        {studentTimetableData.map((dayData, index) => (
                            <div className="day-section" key={index}>
                                <h3>{lang === "hi" ? hiText.days[dayData.day] : dayData.day}</h3>
                                <div className="entries-container">
                                    {dayData.classes.length > 0 ? (
                                        dayData.classes.map((classInfo, classIndex) => (
                                            <div className="timetable-entry" key={classIndex}>
                                                <div className="entry-top">
                                                    <span className={`entry-tag ${classInfo.type.toLowerCase()}`}>{lang === "hi" ? hiText.types[classInfo.type] || classInfo.type : classInfo.type}</span>
                                                    <h4>{lang === "hi" ? hiText.subjects[classInfo.subject] || classInfo.subject : classInfo.subject}</h4>
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
                                                        <span>{lang === "hi" ? hiText.instructors[classInfo.instructor] || classInfo.instructor : classInfo.instructor}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-class-message">{lang === "hi" ? hiText.noClass : "No classes scheduled for today."}</p>
                                    )}
                                </div>
                            </div>
                        ))}
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