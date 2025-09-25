import React, { useState } from 'react';
import './Faculty.css';
import SideBar from '../components/SideBar';
import { Plus, Users, School, Book, UserCheck, CalendarDays, Clock, FileText, UserMinus, Award, X, BookOpen, Ban } from 'lucide-react';

// Expanded faculty data for a more robust demo
const facultyList = [
    {
        name: 'Prof. Kumar',
        subjects: ['Data Structures', 'Compiler Design'],
        leavesPerMonth: 1,
        maxClassesPerDay: 3,
        specialClasses: [
            { subject: 'Data Structures', day: 'Monday', time: '10:00-11:00', room: 'LT-101' }
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
            { subject: 'Artificial Intelligence', day: 'Wednesday', time: '11:00-12:00', room: 'LT-102' }
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
    },
    {
        name: 'Dr. Gupta',
        subjects: ['Machine Learning', 'Cloud Computing'],
        leavesPerMonth: 0,
        maxClassesPerDay: 4,
        specialClasses: [
             { subject: 'Machine Learning', day: 'Friday', time: '14:00-15:00', room: 'CS-Lab-1' }
        ]
    },
    {
        name: 'Dr. Reddy',
        subjects: ['Engineering Physics', 'Basic Electronics'],
        leavesPerMonth: 1,
        maxClassesPerDay: 3,
        specialClasses: []
    },
    {
        name: 'Prof. Chatterjee',
        subjects: ['VLSI Design', 'Digital Communication'],
        leavesPerMonth: 2,
        maxClassesPerDay: 2,
        specialClasses: []
    },
    {
        name: 'Ms. Desai',
        subjects: ['English Communication', 'Software Engineering'],
        leavesPerMonth: 1,
        maxClassesPerDay: 4,
        specialClasses: []
    },
    {
        name: 'Mr. Menon',
        subjects: ['Engineering Chemistry', 'Environmental Science'],
        leavesPerMonth: 2,
        maxClassesPerDay: 3,
        specialClasses: []
    },
    {
        name: 'Prof. Joshi',
        subjects: ['Thermodynamics', 'Fluid Mechanics'],
        leavesPerMonth: 1,
        maxClassesPerDay: 3,
        specialClasses: []
    },
    {
        name: 'Dr. Patel',
        subjects: ['Cyber Security', 'Network Security'],
        leavesPerMonth: 0,
        maxClassesPerDay: 2,
        specialClasses: [
            { subject: 'Cyber Security', day: 'Tuesday', time: '15:00-16:00', room: 'CS-Lab-2' }
        ]
    }
];

// Expanded list of subjects, classrooms, and batches
const semesterSubjects = [
    'Engineering Mathematics-I', 'Engineering Physics', 'Engineering Chemistry', 'Basic Electrical Engineering',
    'English Communication', 'Workshop Practice', 'Data Structures', 'Compiler Design', 'Artificial Intelligence',
    'Web Technologies', 'Database Management Systems', 'Operating Systems', 'Microprocessors',
    'Theory of Computation', 'Discrete Mathematics', 'Machine Learning', 'Cloud Computing', 'VLSI Design',
    'Digital Communication', 'Software Engineering', 'Environmental Science', 'Thermodynamics', 'Fluid Mechanics',
    'Cyber Security', 'Network Security', 'Basic Electronics'
];

const classrooms = ['LT-101', 'LT-102', 'LT-103', 'LT-104', 'CS-Lab-1', 'CS-Lab-2', 'EC-Lab-1', 'ME-Lab-1'];
const batches = ['Batch A', 'Batch B', 'Batch C', 'Batch D'];

// Helper component for the info grid
const InfoItem = ({ label, value }) => (
    <div className="info-item">
        <p className="info-label">{label}</p>
        <p className="info-value">{value}</p>
    </div>
);


export default function Faculty() {
    // State to track the currently selected faculty for details view
    const [selectedFaculty, setSelectedFaculty] = useState(facultyList[0]);

    // Enhanced data for the info grid
    const lectureTheatres = classrooms.filter(c => c.startsWith('LT')).length;
    const labs = classrooms.length - lectureTheatres;
    const totalSubjectsTaught = facultyList.reduce((sum, f) => sum + f.subjects.length, 0);

    const infoData = [
        { label: "Total Faculties", value: facultyList.length },
        { label: "Total Subjects in Semester", value: semesterSubjects.length },
        { label: "Total Subject Load", value: `${totalSubjectsTaught} classes taught` },
        { label: "Classroom Breakdown", value: `${lectureTheatres} Lecture Theatres, ${labs} Labs` },
        { label: "Student Batches", value: `${batches.length} (${batches.join(', ')})` },
        { label: "Fixed Special Classes", value: facultyList.reduce((acc, f) => acc + f.specialClasses.length, 0) },
        { label: "Avg. Leaves/Faculty/Month", value: (facultyList.reduce((sum, f) => sum + f.leavesPerMonth, 0) / facultyList.length).toFixed(1) },
        { label: "Faculty with Perfect Attendance", value: facultyList.filter(f => f.leavesPerMonth === 0).length },
    ];

    return (
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

                    {/* --- Semester & Resource Info now on top --- */}
                    <div className="info-section top">
                        <h2><FileText size={20} /> Semester & Resource Info</h2>
                        <div className="info-grid">
                            {infoData.map((item, index) => (
                                <InfoItem key={index} label={item.label} value={item.value} />
                            ))}
                        </div>
                    </div>

                    <div className="faculty-content-container">
                        <div className="faculty-section">
                            <h2><Users size={20} /> Faculty Members</h2>
                            <table className="faculty-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Subjects Taught</th>
                                        <th><CalendarDays size={14} /> Leaves/Month</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facultyList.map((f, idx) => (
                                        <tr 
                                            key={idx} 
                                            onClick={() => setSelectedFaculty(f)}
                                            className={selectedFaculty && selectedFaculty.name === f.name ? 'selected' : ''}
                                        >
                                            <td>{f.name}</td>
                                            <td>{f.subjects.join(', ')}</td>
                                            <td>{f.leavesPerMonth}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* --- Conditionally Rendered Faculty Details Panel --- */}
                        {/* Faculty Details: Side panel for desktop, modal for mobile */}
                        {selectedFaculty && (
                            <>
                                {/* Desktop/Tablet: Side panel */}
                                <div className="faculty-details-panel faculty-details-desktop">
                                    <div className="panel-header">
                                        <h3>{selectedFaculty.name}</h3>
                                        <button className="close-panel-btn" onClick={() => setSelectedFaculty(null)}>
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <div className="panel-content">
                                        <h4><BookOpen size={16} /> Subjects Taught</h4>
                                        <ul className="details-subject-list">
                                            {selectedFaculty.subjects.map(sub => <li key={sub}>{sub}</li>)}
                                        </ul>
                                        <h4><Ban size={16} /> Scheduling Constraints</h4>
                                        <div className="details-constraints">
                                            <p>Max Classes per Day: <strong>{selectedFaculty.maxClassesPerDay}</strong></p>
                                            <p>Allowed Leaves per Month: <strong>{selectedFaculty.leavesPerMonth}</strong></p>
                                        </div>
                                        <h4><Clock size={16} /> Fixed Schedule / Special Classes</h4>
                                        {selectedFaculty.specialClasses.length > 0 ? (
                                            <ul className="details-special-classes">
                                                {selectedFaculty.specialClasses.map((sc, i) => (
                                                    <li key={i}>
                                                        <span className="sc-subject">{sc.subject}</span>
                                                        <span className="sc-details">{sc.day} at {sc.time} in {sc.room}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-special-classes">No special classes scheduled.</p>
                                        )}
                                    </div>
                                </div>
                                {/* Mobile: Modal popup */}
                                <div className="faculty-details-modal faculty-details-mobile" onClick={() => setSelectedFaculty(null)}>
                                    <div className="faculty-details-modal-content" onClick={e => e.stopPropagation()}>
                                        <div className="panel-header">
                                            <h3>{selectedFaculty.name}</h3>
                                            <button className="close-panel-btn" onClick={() => setSelectedFaculty(null)}>
                                                <X size={18} />
                                            </button>
                                        </div>
                                        <div className="panel-content">
                                            <h4><BookOpen size={16} /> Subjects Taught</h4>
                                            <ul className="details-subject-list">
                                                {selectedFaculty.subjects.map(sub => <li key={sub}>{sub}</li>)}
                                            </ul>
                                            <h4><Ban size={16} /> Scheduling Constraints</h4>
                                            <div className="details-constraints">
                                                <p>Max Classes per Day: <strong>{selectedFaculty.maxClassesPerDay}</strong></p>
                                                <p>Allowed Leaves per Month: <strong>{selectedFaculty.leavesPerMonth}</strong></p>
                                            </div>
                                            <h4><Clock size={16} /> Fixed Schedule / Special Classes</h4>
                                            {selectedFaculty.specialClasses.length > 0 ? (
                                                <ul className="details-special-classes">
                                                    {selectedFaculty.specialClasses.map((sc, i) => (
                                                        <li key={i}>
                                                            <span className="sc-subject">{sc.subject}</span>
                                                            <span className="sc-details">{sc.day} at {sc.time} in {sc.room}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="no-special-classes">No special classes scheduled.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}