import React, { useState } from 'react';
import './StudentAttendance.css';
import SideBarStudent from '../../components/SideBar-student.jsx';
import Header from '../../components/Header.jsx';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

// --- ADD CHART.JS IMPORTS ---
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';

// --- REGISTER CHART.JS MODULES ---
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);


// --- MOCK DATA ---
const attendanceData = [
    { code: 'CS-501', name: 'Computer Networks', totalClasses: 50, attendedClasses: 45 },
    { code: 'CS-502', name: 'Theory of Computation', totalClasses: 48, attendedClasses: 42 },
    { code: 'CS-503', name: 'Compiler Design', totalClasses: 40, attendedClasses: 30 },
];

const dayToDayData = {
    '2025-09-24': [
        { name: 'Computer Networks (CS-501)', time: '09:00AM - 09:50 AM', status: 'Present' },
        { name: 'Compiler Design (CS-503)', time: '11:00AM - 11:50 AM', status: 'Present' },
    ],
    '2025-09-25': [
        { name: 'Theory of Computation (CS-502)', time: '10:00AM - 10:50 AM', status: 'Absent' },
    ],
};

// --- NEW MOCK DATA for Detailed View (EXPANDED) ---
const courseSpecificAttendance = {
    'CS-501': { // Data for Computer Networks
        '2025-09-01': 'Present', '2025-09-03': 'Present', '2025-09-05': 'Present',
        '2025-09-08': 'Present', '2025-09-10': 'Present', '2025-09-12': 'Absent',
        '2025-09-15': 'Present', '2025-09-17': 'Present', '2025-09-19': 'Present',
        '2025-09-22': 'Present', '2025-09-24': 'Present',
    },
    'CS-502': { // Data for Theory of Computation
        '2025-09-02': 'Present', '2025-09-04': 'Present', '2025-09-09': 'Absent',
        '2025-09-11': 'Present', '2025-09-16': 'Present', '2025-09-18': 'Present',
        '2025-09-23': 'Present', '2025-09-25': 'Absent',
    },
    'CS-503': { // Data for Compiler Design
        '2025-09-02': 'Present', '2025-09-04': 'Present', '2025-09-09': 'Present',
        '2025-09-11': 'Present', '2025-09-16': 'Present', '2025-09-18': 'Present',
        '2025-09-23': 'Absent', '2025-09-25': 'Absent', '2025-09-30': 'Present'
    }
};

const courseChartData = {
    'CS-501': { // Data for Computer Networks
        labels: ['25/07', '01/08', '08/08', '14/08', '22/08', '29/08', '05/09', '12/09', '19/09', '25/09'],
        values: [100, 100, 100, 95, 92, 94, 95, 90, 91, 90]
    },
    'CS-502': { // Data for Theory of Computation
        labels: ['26/07', '02/08', '09/08', '16/08', '23/08', '30/08', '06/09', '13/09', '20/09', '26/09'],
        values: [100, 100, 91, 92, 93, 90, 85, 86, 87, 84]
    },
    'CS-503': { // Data for Compiler Design
        labels: ['25/07', '31/07', '06/08', '08/08', '13/08', '14/08', '20/08', '21/08', '27/08', '28/08', '10/09', '12/09', '17/09', '18/09', '20/09', '24/09', '25/09'],
        values: [100, 100, 100, 100, 100, 95, 88, 77, 81, 70, 72, 75, 76, 78, 77, 71]
    }
};

const calculatePercentage = (attended, total) => {
    return total === 0 ? 0 : Math.round((attended / total) * 100);
};

// --- Circular Progress Component ---
const CircularProgress = ({ percentage }) => {
    const radius = 30;
    const stroke = 5;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
        <svg height={radius * 2} width={radius * 2} className="progress-ring">
            <circle className="progress-ring-bg" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
            <circle className="progress-ring-fg" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset }} r={normalizedRadius} cx={radius} cy={radius} />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="progress-ring-text">{`${percentage}`}</text>
        </svg>
    );
};

// --- Calendar Component for Day-to-Day tab ---
const Calendar = ({ selectedDate, setSelectedDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1));
    const renderHeader = () => (<div className="calendar-header"><button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}><ChevronLeft size={20} /></button><span>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}</span><button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}><ChevronRight size={20} /></button></div>);
    const renderDays = () => (<div className="calendar-days">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}</div>);
    const renderCells = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(1 - monthStart.getDay());
        const cells = [];
        let day = new Date(startDate);
        while (day <= monthEnd || cells.length % 7 !== 0 || cells.length < 35) {
            const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
            const isSelected = selectedDate === formattedDate;
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            cells.push(<div key={day} className={`calendar-cell ${!isCurrentMonth ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`} onClick={() => isCurrentMonth && setSelectedDate(formattedDate)}>{day.getDate()}</div>);
            day.setDate(day.getDate() + 1);
        }
        return <div className="calendar-grid">{cells}</div>;
    };
    return <div className="calendar-container">{renderHeader()}{renderDays()}{renderCells()}</div>;
};


const AttendanceChart = ({ data }) => {
    const chartOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, ticks: { color: 'rgba(238, 238, 238, 0.7)', callback: (value) => `${value}%` }, grid: { color: 'rgba(255, 255, 255, 0.1)', drawBorder: false } }, x: { ticks: { color: 'rgba(238, 238, 238, 0.7)' }, grid: { display: false } } }, plugins: { legend: { display: false }, tooltip: { enabled: true, backgroundColor: '#1c1c1c', titleColor: '#eeeeee', bodyColor: '#eeeeee' } }, elements: { line: { tension: 0.3 } } };
    const chartData = { labels: data.labels, datasets: [{ label: 'Attendance %', data: data.values, fill: false, borderColor: '#3b82f6', backgroundColor: '#3b82f6', pointBackgroundColor: '#fff', pointBorderColor: '#3b82f6', pointRadius: 4, pointHoverRadius: 6 }] };
    return <div className="chart-container"><Line options={chartOptions} data={chartData} /></div>;
};

const DetailCalendar = ({ attendance }) => {
    const [currentMonth] = useState(new Date(2025, 8, 1));
    const renderHeader = () => (<div className="calendar-header"><button disabled><ChevronLeft size={20} /></button><span>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}</span><button disabled><ChevronRight size={20} /></button></div>);
    const renderDays = () => (<div className="calendar-days">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}</div>);
    const renderCells = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(1 - monthStart.getDay());
        const cells = [];
        let day = new Date(startDate);
        while (day <= monthEnd || cells.length % 7 !== 0 || cells.length < 35) {
            const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
            const status = attendance[formattedDate];
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            cells.push(<div key={day} className={`calendar-cell ${!isCurrentMonth ? 'disabled' : ''}`}><span className={status ? `status-dot ${status.toLowerCase()}` : ''}>{day.getDate()}</span></div>);
            day.setDate(day.getDate() + 1);
        }
        return <div className="calendar-grid">{cells}</div>;
    };
    return <div className="calendar-container">{renderHeader()}{renderDays()}{renderCells()}</div>;
};

const CourseDetailView = ({ course, onBack }) => {
    const dailyData = courseSpecificAttendance[course.code] || {};
    const historicalData = courseChartData[course.code];
    return (
        <div className="course-detail-view">
            <div className="detail-view-header">
                <button onClick={onBack} className="back-button"><ArrowLeft size={20} /> Back</button>
                <h3>{course.name}</h3>
            </div>
            {historicalData ? (<> <DetailCalendar attendance={dailyData} /> <AttendanceChart data={historicalData} /> </>) : (<div className="no-data-message">Detailed attendance data is not available for this subject.</div>)}
        </div>
    );
};

export default function StudentAttendance() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDate, setSelectedDate] = useState('2025-09-25');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const todaysClasses = dayToDayData[selectedDate] || [];

    return (
        <div className="page-layout">
            <SideBarStudent activePage={"attendance"} />
            <main className="main-content">
                <Header title="My Attendance" subtitle="Track your attendance for the current semester" />
                <div className="attendance-page">
                    <div className="attendance-content-container">
                        {!selectedCourse && (
                            <div className="tab-switcher">
                                <button className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                                <button className={`tab-button ${activeTab === 'day-to-day' ? 'active' : ''}`} onClick={() => setActiveTab('day-to-day')}>Day-to-Day</button>
                            </div>
                        )}
                        <div className="tab-content">
                            {activeTab === 'overview' ? (
                                selectedCourse ? (
                                    <CourseDetailView course={selectedCourse} onBack={() => setSelectedCourse(null)} />
                                ) : (
                                    <div className="overview-section">
                                        {attendanceData.map((course, idx) => {
                                            const percentage = calculatePercentage(course.attendedClasses, course.totalClasses);
                                            return (
                                                <div key={idx} className="attendance-list-item" onClick={() => setSelectedCourse(course)}>
                                                    <div className="course-details">
                                                        <span className="course-name">{course.name}</span>
                                                        <span className="course-code">{course.code}</span>
                                                    </div>
                                                    <div className="attendance-stats">
                                                        <div className="progress-container"><CircularProgress percentage={percentage} /></div>
                                                        <div className="stats-text">
                                                            <span>{`${course.attendedClasses} / ${course.totalClasses}`}</span>
                                                            <span className={percentage < 75 ? 'status-low' : 'status-ok'}>{percentage < 75 ? `Attend ${Math.ceil(course.totalClasses * 0.75) - course.attendedClasses} more` : 'On Track'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            ) : (
                                <div className="day-to-day-section">
                                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                    <div className="daily-classes-list">
                                        {todaysClasses.length > 0 ? (
                                            todaysClasses.map((cls, idx) => (
                                                <div key={idx} className="daily-class-item">
                                                    <div className="class-info"><span className="class-name">{cls.name}</span><span className={`class-status status-${cls.status.toLowerCase()}`}>{cls.status}</span></div>
                                                    <div className="class-time">{cls.time}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-classes-message">No classes scheduled for this day.</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}