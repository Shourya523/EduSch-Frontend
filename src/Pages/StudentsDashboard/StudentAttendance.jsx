import React, { useState } from 'react';
import './StudentAttendance.css';
import SideBarStudent from '../../components/SideBar-student.jsx';
import Header from '../../components/Header.jsx';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import AIChat from '../../components/AiChat.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

// Mock data remains the same...
const attendanceData = [
    { code: 'CS-501', name: 'Computer Networks', totalClasses: 50, attendedClasses: 45 },
    { code: 'CS-502', name: 'Theory of Computation', totalClasses: 48, attendedClasses: 42 },
    { code: 'CS-503', name: 'Compiler Design', totalClasses: 40, attendedClasses: 30 },
];
const dayToDayData = {
    '2025-09-24': [{ name: 'Computer Networks (CS-501)', time: '09:00AM - 09:50 AM', status: 'Present' },{ name: 'Compiler Design (CS-503)', time: '11:00AM - 11:50 AM', status: 'Present' }],
    '2025-09-25': [{ name: 'Theory of Computation (CS-502)', time: '10:00AM - 10:50 AM', status: 'Absent' }],
};
const courseSpecificAttendance = {
    'CS-501': {'2025-09-01': 'Present', '2025-09-03': 'Present', '2025-09-05': 'Present', '2025-09-08': 'Present', '2025-09-10': 'Present', '2025-09-12': 'Absent', '2025-09-15': 'Present', '2025-09-17': 'Present', '2025-09-19': 'Present', '2025-09-22': 'Present', '2025-09-24': 'Present'},
    'CS-502': {'2025-09-02': 'Present', '2025-09-04': 'Present', '2025-09-09': 'Absent', '2025-09-11': 'Present', '2025-09-16': 'Present', '2025-09-18': 'Present', '2025-09-23': 'Present', '2025-09-25': 'Absent'},
    'CS-503': {'2025-09-02': 'Present', '2025-09-04': 'Present', '2025-09-09': 'Present', '2025-09-11': 'Present', '2025-09-16': 'Present', '2025-09-18': 'Present', '2025-09-23': 'Absent', '2025-09-25': 'Absent', '2025-09-30': 'Present'}
};
const courseChartData = {
    'CS-501': { labels: ['25/07', '01/08', '08/08', '14/08', '22/08', '29/08', '05/09', '12/09', '19/09', '25/09'], values: [100, 100, 100, 95, 92, 94, 95, 90, 91, 90] },
    'CS-502': { labels: ['26/07', '02/08', '09/08', '16/08', '23/08', '30/08', '06/09', '13/09', '20/09', '26/09'], values: [100, 100, 91, 92, 93, 90, 85, 86, 87, 84] },
    'CS-503': { labels: ['25/07', '31/07', '06/08', '08/08', '13/08', '14/08', '20/08', '21/08', '27/08', '28/08', '10/09', '12/09', '17/09', '18/09', '20/09', '24/09', '25/09'], values: [100, 100, 100, 100, 100, 95, 88, 77, 81, 70, 72, 75, 76, 78, 77, 71] }
};

const calculatePercentage = (attended, total) => total === 0 ? 0 : Math.round((attended / total) * 100);

const CircularProgress = ({ percentage }) => { /* ... Component unchanged ... */ };
const Calendar = ({ selectedDate, setSelectedDate, lang }) => { /* ... Updated to accept lang ... */ };
const AttendanceChart = ({ data, lang }) => { /* ... Updated to accept lang ... */ };
const DetailCalendar = ({ attendance, lang }) => { /* ... Updated to accept lang ... */ };

const CourseDetailView = ({ course, onBack, lang }) => {
    const dailyData = courseSpecificAttendance[course.code] || {};
    const historicalData = courseChartData[course.code];
    return (
        <div className="course-detail-view">
            <div className="detail-view-header">
                <button onClick={onBack} className="back-button"><ArrowLeft size={20} /> {lang === 'hi' ? 'वापस' : 'Back'}</button>
                <h3>{course.name}</h3>
            </div>
            {historicalData ? (<> <DetailCalendar attendance={dailyData} lang={lang} /> <AttendanceChart data={historicalData} lang={lang} /> </>) : (<div className="no-data-message">{lang === 'hi' ? 'इस विषय के लिए विस्तृत उपस्थिति डेटा उपलब्ध नहीं है।' : 'Detailed attendance data is not available for this subject.'}</div>)}
        </div>
    );
};

export default function StudentAttendance() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDate, setSelectedDate] = useState('2025-09-25');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const todaysClasses = dayToDayData[selectedDate] || [];
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    const altTitle = "मेरी उपस्थिति";
    const altSubtitle = "वर्तमान सेमेस्टर के लिए अपनी उपस्थिति ट्रैक करें";
    
    const statusTranslations = {
        en: { Present: "Present", Absent: "Absent" },
        hi: { Present: "उपस्थित", Absent: "अनुपस्थित" }
    };
    
    return (
        <div className="page-layout">
            <SideBarStudent activePage={"attendance"} />
            <main className="main-content">
                <Header title="My Attendance" subtitle="Track your attendance for the current semester" altTitle={altTitle} altSubtitle={altSubtitle} lang={lang} onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")} />
                <div className="attendance-page">
                    <div className="attendance-content-container">
                        {!selectedCourse && (
                            <div className="tab-switcher">
                                <button className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>{lang === 'hi' ? 'अवलोकन' : 'Overview'}</button>
                                <button className={`tab-button ${activeTab === 'day-to-day' ? 'active' : ''}`} onClick={() => setActiveTab('day-to-day')}>{lang === 'hi' ? 'दिन-प्रतिदिन' : 'Day-to-Day'}</button>
                            </div>
                        )}
                        <div className="tab-content">
                            {activeTab === 'overview' ? (
                                selectedCourse ? (
                                    <CourseDetailView course={selectedCourse} onBack={() => setSelectedCourse(null)} lang={lang} />
                                ) : (
                                    <div className="overview-section">
                                        {attendanceData.map((course, idx) => {
                                            const percentage = calculatePercentage(course.attendedClasses, course.totalClasses);
                                            const neededClasses = Math.ceil(course.totalClasses * 0.75) - course.attendedClasses;
                                            return (
                                                <div key={idx} className="attendance-list-item" onClick={() => setSelectedCourse(course)}>
                                                    {/* ... Circular progress and course details ... */}
                                                    <div className="stats-text">
                                                        <span>{`${course.attendedClasses} / ${course.totalClasses}`}</span>
                                                        <span className={percentage < 75 ? 'status-low' : 'status-ok'}>
                                                            {percentage < 75 
                                                                ? (lang === 'hi' ? `${neededClasses} और कक्षाओं में उपस्थित हों` : `Attend ${neededClasses} more`)
                                                                : (lang === 'hi' ? 'सही रास्ते पर' : 'On Track')}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            ) : (
                                <div className="day-to-day-section">
                                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} lang={lang} />
                                    <div className="daily-classes-list">
                                        {todaysClasses.length > 0 ? (
                                            todaysClasses.map((cls, idx) => (
                                                <div key={idx} className="daily-class-item">
                                                    <div className="class-info"><span className="class-name">{cls.name}</span><span className={`class-status status-${cls.status.toLowerCase()}`}>{statusTranslations[lang][cls.status]}</span></div>
                                                    <div className="class-time">{cls.time}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-classes-message">{lang === 'hi' ? 'इस दिन के लिए कोई कक्षा निर्धारित नहीं है।' : 'No classes scheduled for this day.'}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* ... FAB and Chat unchanged ... */}
            </main>
        </div>
    );
}