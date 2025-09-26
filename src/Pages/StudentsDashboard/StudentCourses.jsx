import React from 'react';
import './StudentCourses.css';
import { useState } from 'react';
import SideBarStudent from '../../components/SideBar-student';
import Header from '../../components/Header';
import { BookOpen, BarChart2, Layers, Star, Clock } from 'lucide-react';
import AIChat from '../../components/AiChat';

// --- Mock Data for a single 5th Semester CS Student ---
const courseList = [
    { code: 'CS-501', name: 'Computer Networks', department: 'Computer Science', semester: '5th Semester', type: 'Core', classesPerWeek: 5, faculty: 'Prof. Singh' },
    { code: 'CS-502', name: 'Theory of Computation', department: 'Computer Science', semester: '5th Semester', type: 'Core', classesPerWeek: 4, faculty: 'Prof. Iyer' },
    { code: 'CS-503', name: 'Compiler Design', department: 'Computer Science', semester: '5th Semester', type: 'Core', classesPerWeek: 4, faculty: 'Prof. Kumar' },
    { code: 'CS-504', name: 'Web Technologies', department: 'Computer Science', semester: '5th Semester', type: 'Lab', classesPerWeek: 3, faculty: 'Prof. Sharma' },
    { code: 'CS-505', name: 'Artificial Intelligence', department: 'Computer Science', semester: '5th Semester', type: 'Core', classesPerWeek: 3, faculty: 'Prof. Verma' },
    { code: 'OE-501', name: 'Operations Research', department: 'Open Elective', semester: '5th Semester', type: 'Elective', classesPerWeek: 3, faculty: 'Dr. Gupta' },
];

// UPDATED: Helper component now accepts and renders a description
const InfoItem = ({ icon, label, value, progress, description }) => (
    <div className="info-item">
        <div>
            <div className="info-item-header">
                <p className="info-item-label">{label}</p>
                <div className="info-item-icon">
                    {icon}
                </div>
            </div>
            <p className="info-item-value">{value}</p>
        </div>
        <div>
            <div className="info-item-progress">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="info-item-description">{description}</p>
        </div>
    </div>
);

export default function StudentCourses() {
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "मेरे पाठ्यक्रम";
    const altSubtitle = "वर्तमान सेमेस्टर के लिए आपके विषयों का अवलोकन";
    const infoData = [
        { label: lang === "hi" ? "नामांकित पाठ्यक्रम" : "Courses Enrolled", value: courseList.length, icon: <BookOpen size={20} />, progress: (courseList.length / 7) * 100, description: lang === "hi" ? "प्रति सेमेस्टर अधिकतम 7" : "Max 7 per semester" },
        { label: lang === "hi" ? "मुख्य विषय" : "Core Subjects", value: courseList.filter(c => c.type === 'Core').length, icon: <Layers size={20} />, progress: (courseList.filter(c => c.type === 'Core').length / 5) * 100, description: lang === "hi" ? "सभी अनिवार्य विषय" : "All mandatory subjects" },
        { label: lang === "hi" ? "ऐच्छिक विषय" : "Elective Subjects", value: courseList.filter(c => c.type === 'Elective').length, icon: <Star size={20} />, progress: (courseList.filter(c => c.type === 'Elective').length / 2) * 100, description: lang === "hi" ? "पिछले सेमेस्टर से +1" : "+1 from last semester" },
        { label: lang === "hi" ? "इस सप्ताह की कुल कक्षाएँ" : "Total Classes This Week", value: courseList.reduce((sum, course) => sum + course.classesPerWeek, 0), icon: <Clock size={20} />, progress: (courseList.reduce((sum, course) => sum + course.classesPerWeek, 0) / 25) * 100, description: lang === "hi" ? "पिछले सप्ताह से -5%" : "-5% from last week" },
    ];
    const tableHeaders = [
        lang === "hi" ? "कोड" : "Code",
        lang === "hi" ? "विषय का नाम" : "Subject Name",
        lang === "hi" ? "विभाग" : "Department",
        lang === "hi" ? "सेमेस्टर" : "Semester",
        lang === "hi" ? "प्रकार" : "Type",
        lang === "hi" ? "कक्षाएँ/सप्ताह" : "Classes/Week",
        lang === "hi" ? "सौंपे गए शिक्षक" : "Assigned Faculty"
    ];
    return (
        <div className="page-layout">
            <SideBarStudent activePage={"courses"} />
            <main className="main-content">
                <Header
                    title="My Courses"
                    subtitle="An overview of your subjects for the current semester"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="courses-page">
                    <div className="courses-content-container">
                        <div className="info-section">
                            <h2><BarChart2 size={20} /> {lang === "hi" ? "वर्तमान सेमेस्टर का अवलोकन" : "Current Semester Overview"}</h2>
                            <div className="info-grid">
                                {infoData.map((item, index) => (
                                    <InfoItem key={index} label={item.label} value={item.value} icon={item.icon} progress={item.progress} description={item.description} />
                                ))}
                            </div>
                        </div>
                        <div className="course-section">
                            <h2><BookOpen size={20} /> {lang === "hi" ? "नामांकित विषय" : "Enrolled Subjects"}</h2>
                            <table className="course-table">
                                <thead>
                                    <tr>
                                        {tableHeaders.map((th, idx) => <th key={idx}>{th}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseList.map((course, idx) => (
                                        <tr key={idx}>
                                            <td>{course.code}</td>
                                            <td>{course.name}</td>
                                            <td>{course.department}</td>
                                            <td>{course.semester}</td>
                                            <td><span className={`type-tag type-${course.type.toLowerCase()}`}>{lang === "hi" ? (course.type === "Core" ? "मुख्य" : course.type === "Elective" ? "ऐच्छिक" : course.type === "Lab" ? "प्रयोगशाला" : course.type) : course.type}</span></td>
                                            <td>{course.classesPerWeek}</td>
                                            <td>{course.faculty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}