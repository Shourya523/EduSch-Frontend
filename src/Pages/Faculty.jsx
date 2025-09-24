import React from 'react';
import './Faculty.css';
import SideBar from '../components/SideBar';
import { Plus, Users, School, Book, UserCheck, CalendarDays, Clock, FileText, UserMinus } from 'lucide-react';

// Example faculty data for demo
const facultyList = [
    {
        name: 'Prof. Kumar',
        subjects: ['Data Structures', 'Compiler Design'],
        leavesPerMonth: 1,
        maxClassesPerDay: 3,
        specialClasses: [
            { subject: 'Data Structures', day: 'Monday', time: '10:00-11:00', room: 'Room-101' }
        ]
    },
    {
        name: 'Prof. Sharma',
        subjects: ['Engineering Mathematics-I', 'Discrete Mathematics'],
        leavesPerMonth: 2,
        maxClassesPerDay: 2,
        specialClasses: []
    },
    {
        name: 'Prof. Verma',
        subjects: ['Artificial Intelligence', 'Web Technologies'],
        leavesPerMonth: 1,
        maxClassesPerDay: 3,
        specialClasses: [
            { subject: 'Artificial Intelligence', day: 'Wednesday', time: '11:00-12:00', room: 'Room-102' }
        ]
    },
    {
        name: 'Prof. Iyer',
        subjects: ['Database Management Systems', 'Operating Systems'],
        leavesPerMonth: 1,
        maxClassesPerDay: 2,
        specialClasses: []
    },
    {
        name: 'Prof. Singh',
        subjects: ['Microprocessors', 'Theory of Computation'],
        leavesPerMonth: 2,
        maxClassesPerDay: 2,
        specialClasses: []
    }
];

const semesterSubjects = [
    'Engineering Mathematics-I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Electrical Engineering',
    'English Communication', 'Workshop Practice', 'Data Structures', 'Compiler Design', 'Artificial Intelligence',
    'Web Technologies', 'Database Management Systems', 'Operating Systems', 'Microprocessors',
    'Theory of Computation', 'Discrete Mathematics'
];

const classrooms = ['Room-101', 'Room-102', 'Room-103', 'Lab-201', 'Lab-202', 'Lab-203'];
const batches = ['Batch A', 'Batch B', 'Batch C'];

// Helper component for the info grid
const InfoItem = ({ label, value }) => (
    <div className="info-item">
        <p className="info-label">{label}</p>
        <p className="info-value">{value}</p>
    </div>
);


export default function Faculty() {
    // Data for the info grid, derived from the constants above
    const infoData = [
        { label: "Classrooms Available", value: `${classrooms.length} (${classrooms.join(', ')})` },
        { label: "Student Batches", value: `${batches.length} (${batches.join(', ')})` },
        { label: "Total Subjects in Semester", value: semesterSubjects.length },
        { label: "Faculties Available", value: facultyList.length },
        { label: "Avg. Leaves/Faculty/Month", value: (facultyList.reduce((sum, f) => sum + f.leavesPerMonth, 0) / facultyList.length).toFixed(1) },
        { label: "Fixed Special Classes", value: facultyList.filter(f => f.specialClasses.length > 0).length },
    ];

    return (
        <>
        <div className="page-layout">
            <SideBar activePage={"faculty"} />
            <main className="main-content">
                <div className="faculty-page">
                    <div className="page-header">
                        <h1>Faculty Management</h1>
                        <button className="add-faculty-btn">
                            <Plus size={16} />
                            Add New Faculty
                        </button>
                    </div>

                    <div className="faculty-content-container">
                        <div className="faculty-section">
                            <h2><Users size={20} /> Faculty Members</h2>
                            <table className="faculty-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Subjects</th>
                                        <th>Leaves/Month</th>
                                        <th>Max Classes/Day</th>
                                        <th>Special Classes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facultyList.map((f, idx) => (
                                        <tr key={idx}>
                                            <td>{f.name}</td>
                                            <td>{f.subjects.join(', ')}</td>
                                            <td>{f.leavesPerMonth}</td>
                                            <td>{f.maxClassesPerDay}</td>
                                            <td>
                                                {f.specialClasses.length > 0 ? (
                                                    <ul>
                                                        {f.specialClasses.map((sc, i) => (
                                                            <li key={i}>{sc.subject} - {sc.day} {sc.time} ({sc.room})</li>
                                                        ))}
                                                    </ul>
                                                ) : 'None'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="info-section">
                            <h2><FileText size={20} /> Semester & Timetable Info</h2>
                            <div className="info-grid">
                                {infoData.map((item, index) => (
                                    <InfoItem key={index} label={item.label} value={item.value} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </div>
        </>
    );
}
