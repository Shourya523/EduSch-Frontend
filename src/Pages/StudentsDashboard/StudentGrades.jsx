import React from 'react';
import { useState } from 'react';
import './StudentGrades.css';
import SideBarStudent from '../../components/SideBar-student';
import Header from '../../components/Header';
import { BarChart3, TrendingUp, Percent, CheckCircle, Award } from 'lucide-react';
import AIChat from '../../components/AiChat';

// --- Mock Data for a student's grades for the current semester ---
const gradesData = [
    { code: 'CS-501', name: 'Computer Networks', type: 'Core', credits: 4, grade: 'A+', points: 10 },
    { code: 'CS-502', name: 'Theory of Computation', type: 'Core', credits: 4, grade: 'A', points: 9 },
    { code: 'CS-503', name: 'Compiler Design', type: 'Core', credits: 3, grade: 'B+', points: 8 },
    { code: 'CS-504', name: 'Web Technologies', type: 'Lab', credits: 2, grade: 'O', points: 10 },
    { code: 'CS-505', name: 'Artificial Intelligence', type: 'Core', credits: 3, grade: 'A', points: 9 },
    { code: 'OE-501', name: 'Operations Research', type: 'Elective', credits: 3, grade: 'C', points: 6 },
];

// --- Helper functions to calculate stats from data ---
const calculateSGPA = (data) => {
    const totalPoints = data.reduce((acc, course) => acc + (course.points * course.credits), 0);
    const totalCredits = data.reduce((acc, course) => acc + course.credits, 0);
    return totalCredits === 0 ? 'N/A' : (totalPoints / totalCredits).toFixed(2);
};

const calculatePercentage = (data) => {
    const sgpa = parseFloat(calculateSGPA(data));
    if (isNaN(sgpa)) return 'N/A';
    return ((sgpa - 0.75) * 10).toFixed(2) + '%';
};

const countSubjectsPassed = (data) => {
    return data.filter(course => course.points > 4).length; // Assuming a passing grade point is > 4
};


// --- Reusable Info Card Component (similar to the one in StudentCourses) ---
const InfoItem = ({ icon, label, value }) => (
    <div className="info-item">
        <div>
            <div className="info-item-header">
                <p className="info-item-label">{label}</p>
                <div className="info-item-icon">{icon}</div>
            </div>
            <p className="info-item-value">{value}</p>
        </div>
    </div>
);


export default function StudentGrades() {
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "मेरे अंक";
    const altSubtitle = "वर्तमान सेमेस्टर के लिए अपनी शैक्षणिक प्रदर्शन की समीक्षा करें";
    const infoData = [
        { label: lang === "hi" ? "वर्तमान SGPA" : "Current SGPA", value: calculateSGPA(gradesData), icon: <Award size={20} /> },
        { label: lang === "hi" ? "कुल CGPA" : "Overall CGPA", value: "8.45", icon: <TrendingUp size={20} /> },
        { label: lang === "hi" ? "कुल प्रतिशत" : "Overall Percentage", value: calculatePercentage(gradesData), icon: <Percent size={20} /> },
        { label: lang === "hi" ? "उत्तीर्ण विषय" : "Subjects Passed", value: `${countSubjectsPassed(gradesData)} / ${gradesData.length}`, icon: <CheckCircle size={20} /> },
    ];
    const tableHeaders = [
        lang === "hi" ? "कोड" : "Code",
        lang === "hi" ? "विषय का नाम" : "Subject Name",
        lang === "hi" ? "प्रकार" : "Type",
        lang === "hi" ? "क्रेडिट्स" : "Credits",
        lang === "hi" ? "ग्रेड" : "Grade",
        lang === "hi" ? "अंक" : "Points"
    ];
    return (
        <div className="page-layout">
            <SideBarStudent activePage={"grades"} />
            <main className="main-content">
                <Header
                    title="My Grades"
                    subtitle="Review your academic performance for the current semester"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="grades-page">
                    <div className="grades-content-container">
                        <div className="info-section">
                            <h2><BarChart3 size={20} /> {lang === "hi" ? "प्रदर्शन अवलोकन" : "Performance Overview"}</h2>
                            <div className="info-grid">
                                {infoData.map((item, index) => (
                                    <InfoItem key={index} label={item.label} value={item.value} icon={item.icon} />
                                ))}
                            </div>
                        </div>
                        <div className="grades-section">
                            <h2><Award size={20} /> {lang === "hi" ? "सेमेस्टर ग्रेड शीट" : "Semester Grade Sheet"}</h2>
                            <table className="grades-table">
                                <thead>
                                    <tr>
                                        {tableHeaders.map((th, idx) => <th key={idx}>{th}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {gradesData.map((course, idx) => (
                                        <tr key={idx}>
                                            <td>{course.code}</td>
                                            <td>{course.name}</td>
                                            <td>{lang === "hi" ? (course.type === "Core" ? "मुख्य" : course.type === "Elective" ? "ऐच्छिक" : course.type === "Lab" ? "प्रयोगशाला" : course.type) : course.type}</td>
                                            <td>{course.credits}</td>
                                            <td>
                                                <span className={`grade-badge grade-${course.grade.replace('+', 'plus')}`}>
                                                    {course.grade}
                                                </span>
                                            </td>
                                            <td>{course.points}</td>
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