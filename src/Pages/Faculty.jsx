import React, { useState } from 'react';
import './Faculty.css';
import SideBar from '../components/SideBar';
import { Plus, Users, FileText, CalendarDays, BookOpen, Ban, Clock, X } from 'lucide-react';
import AIChat from '../components/AiChat';

// Expanded faculty data for a more robust demo
const facultyList = [
    // ... (facultyList data remains the same)
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
    // ... rest of the list
];

const semesterSubjects = [
    // ... (semesterSubjects data remains the same)
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

const hiText = {
    // Page Titles
    title: "फैकल्टी प्रबंधन",
    addNew: "नया फैकल्टी जोड़ें",
    resourceInfo: "सेमेस्टर और संसाधन जानकारी",
    facultyMembers: "फैकल्टी सदस्य",
    // Info Grid Labels
    totalFaculties: "कुल फैकल्टी",
    totalSubjects: "सेमेस्टर में कुल विषय",
    totalLoad: "कुल विषय भार",
    taught: "कक्षाएँ पढ़ाई गई",
    classroomBreakdown: "कक्षा विभाजन",
    lectureTheatres: "व्याख्यान कक्ष",
    labs: "प्रयोगशालाएँ",
    studentBatches: "छात्र बैच",
    fixedClasses: "नियत विशेष कक्षाएँ",
    avgLeaves: "औसत अवकाश/फैकल्टी/माह",
    perfectAttendance: "पूर्ण उपस्थिति वाले फैकल्टी",
    // Table Headers
    name: "नाम",
    subjectsTaught: "पढ़ाए गए विषय",
    leavesPerMonth: "अवकाश/माह",
    // Details Panel
    schedulingConstraints: "शेड्यूलिंग बाधाएं",
    maxClasses: "अधिकतम कक्षाएं प्रति दिन",
    allowedLeaves: "अनुमत अवकाश प्रति माह",
    fixedSchedule: "निश्चित शेड्यूल / विशेष कक्षाएं",
    noSpecialClasses: "कोई विशेष कक्षा निर्धारित नहीं है।",
    at: "को",
    in: "में",
    // Days
    days: {
        Monday: "सोमवार",
        Tuesday: "मंगलवार",
        Wednesday: "बुधवार",
        Thursday: "गुरुवार",
        Friday: "शुक्रवार"
    },
    // Faculty Names
    names: {
        'Prof. Kumar': 'प्रो. कुमार',
        'Prof. Sharma': 'प्रो. शर्मा',
        'Prof. Verma': 'प्रो. वर्मा',
        'Prof. Iyer': 'प्रो. अय्यर',
        'Prof. Singh': 'प्रो. सिंह',
        'Dr. Gupta': 'डॉ. गुप्ता',
        'Dr. Reddy': 'डॉ. रेड्डी',
        'Prof. Chatterjee': 'प्रो. चटर्जी',
        'Ms. Desai': 'सुश्री देसाई',
        'Mr. Menon': 'श्री मेनन',
        'Prof. Joshi': 'प्रो. जोशी',
        'Dr. Patel': 'डॉ. पटेल'
    },
    // Subjects
    subjects: {
        'Data Structures': 'डेटा संरचनाएं',
        'Compiler Design': 'कंपाइलर डिजाइन',
        'Engineering Mathematics-I': 'इंजीनियरिंग गणित-I',
        'Discrete Mathematics': 'असतत गणित',
        'Artificial Intelligence': 'कृत्रिम बुद्धिमत्ता',
        'Web Technologies': 'वेब टेक्नोलॉजीज',
        'Database Management Systems': 'डेटाबेस प्रबंधन प्रणाली',
        'Operating Systems': 'ऑपरेटिंग सिस्टम',
        'Microprocessors': 'माइक्रोप्रोसेसर',
        'Theory of Computation': 'संगणना का सिद्धांत',
        'Machine Learning': 'मशीन लर्निंग',
        'Cloud Computing': 'क्लाउड कंप्यूटिंग',
        'Engineering Physics': 'इंजीनियरिंग भौतिकी',
        'Basic Electronics': 'बेसिक इलेक्ट्रॉनिक्स',
        'VLSI Design': 'वीएलएसआई डिजाइन',
        'Digital Communication': 'डिजिटल संचार',
        'English Communication': 'अंग्रेजी संचार',
        'Software Engineering': 'सॉफ्टवेयर इंजीनियरिंग',
        'Engineering Chemistry': 'इंजीनियरिंग रसायन विज्ञान',
        'Environmental Science': 'पर्यावरण विज्ञान',
        'Thermodynamics': 'ऊष्मप्रवैगिकी',
        'Fluid Mechanics': 'द्रव यांत्रिकी',
        'Cyber Security': 'साइबर सुरक्षा',
        'Network Security': 'नेटवर्क सुरक्षा',
    }
};

export default function Faculty() {
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    const lectureTheatres = classrooms.filter(c => c.startsWith('LT')).length;
    const labs = classrooms.length - lectureTheatres;
    const totalSubjectsTaught = facultyList.reduce((sum, f) => sum + f.subjects.length, 0);

    const infoData = [
        { label: lang === "hi" ? hiText.totalFaculties : "Total Faculties", value: facultyList.length },
        { label: lang === "hi" ? hiText.totalSubjects : "Total Subjects in Semester", value: semesterSubjects.length },
        { label: lang === "hi" ? hiText.totalLoad : "Total Subject Load", value: `${totalSubjectsTaught} ${lang === "hi" ? hiText.taught : "classes taught"}` },
        { label: lang === "hi" ? hiText.classroomBreakdown : "Classroom Breakdown", value: `${lectureTheatres} ${lang === "hi" ? hiText.lectureTheatres : "Lecture Theatres"}, ${labs} ${lang === "hi" ? hiText.labs : "Labs"}` },
        { label: lang === "hi" ? hiText.studentBatches : "Student Batches", value: `${batches.length} (${batches.join(', ')})` },
        { label: lang === "hi" ? hiText.fixedClasses : "Fixed Special Classes", value: facultyList.reduce((acc, f) => acc + f.specialClasses.length, 0) },
        { label: lang === "hi" ? hiText.avgLeaves : "Avg. Leaves/Faculty/Month", value: (facultyList.reduce((sum, f) => sum + f.leavesPerMonth, 0) / facultyList.length).toFixed(1) },
        { label: lang === "hi" ? hiText.perfectAttendance : "Faculty with Perfect Attendance", value: facultyList.filter(f => f.leavesPerMonth === 0).length },
    ];

    const translateSubject = (subject) => lang === 'hi' ? (hiText.subjects[subject] || subject) : subject;
    const translateName = (name) => lang === 'hi' ? (hiText.names[name] || name) : name;
    const translateDay = (day) => lang === 'hi' ? (hiText.days[day] || day) : day;

    const FacultyDetails = ({ faculty }) => (
        <>
            <div className="panel-header">
                <h3>{translateName(faculty.name)}</h3>
                <button className="close-panel-btn" onClick={() => setSelectedFaculty(null)}>
                    <X size={18} />
                </button>
            </div>
            <div className="panel-content">
                <h4><BookOpen size={16} /> {lang === 'hi' ? hiText.subjectsTaught : 'Subjects Taught'}</h4>
                <ul className="details-subject-list">
                    {faculty.subjects.map(sub => <li key={sub}>{translateSubject(sub)}</li>)}
                </ul>
                <h4><Ban size={16} /> {lang === 'hi' ? hiText.schedulingConstraints : 'Scheduling Constraints'}</h4>
                <div className="details-constraints">
                    <p>{lang === 'hi' ? hiText.maxClasses : 'Max Classes per Day'}: <strong>{faculty.maxClassesPerDay}</strong></p>
                    <p>{lang === 'hi' ? hiText.allowedLeaves : 'Allowed Leaves per Month'}: <strong>{faculty.leavesPerMonth}</strong></p>
                </div>
                <h4><Clock size={16} /> {lang === 'hi' ? hiText.fixedSchedule : 'Fixed Schedule / Special Classes'}</h4>
                {faculty.specialClasses.length > 0 ? (
                    <ul className="details-special-classes">
                        {faculty.specialClasses.map((sc, i) => (
                            <li key={i}>
                                <span className="sc-subject">{translateSubject(sc.subject)}</span>
                                <span className="sc-details">{translateDay(sc.day)} {lang === 'hi' ? hiText.at : 'at'} {sc.time} {lang === 'hi' ? hiText.in : 'in'} {sc.room}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-special-classes">{lang === 'hi' ? hiText.noSpecialClasses : 'No special classes scheduled.'}</p>
                )}
            </div>
        </>
    );

    return (
        <div className="page-layout">
            <SideBar activePage={"faculty"} />
            <main className="main-content">
                 {/* Dummy Header for language toggle */}
                <div style={{ padding: '20px', background: '#1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{color: 'white', margin: 0}}>{lang === 'hi' ? 'फैकल्टी' : 'Faculty'}</h1>
                    <button onClick={() => setLang(l => l === "en" ? "hi" : "en")} style={{background: '#333', color: 'white', border: '1px solid #555', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer'}}>
                        {lang === 'hi' ? 'English' : 'हिन्दी'}
                    </button>
                </div>

                <div className="faculty-page">
                    <div className="page-header">
                        <h1>{lang === "hi" ? hiText.title : "Faculty Management"}</h1>
                        <button className="add-faculty-btn">
                            <Plus size={16} />
                            {lang === "hi" ? hiText.addNew : "Add New Faculty"}
                        </button>
                    </div>
                    <div className="info-section top">
                        <h2><FileText size={20} /> {lang === "hi" ? hiText.resourceInfo : "Semester & Resource Info"}</h2>
                        <div className="info-grid">
                            {infoData.map((item, index) => (
                                <InfoItem key={index} label={item.label} value={item.value} />
                            ))}
                        </div>
                    </div>
                    <div className="faculty-content-container">
                        <div className="faculty-section">
                            <h2><Users size={20} /> {lang === "hi" ? hiText.facultyMembers : "Faculty Members"}</h2>
                            <table className="faculty-table">
                                <thead>
                                    <tr>
                                        <th>{lang === "hi" ? hiText.name : "Name"}</th>
                                        <th>{lang === "hi" ? hiText.subjectsTaught : "Subjects Taught"}</th>
                                        <th><CalendarDays size={14} /> {lang === "hi" ? hiText.leavesPerMonth : "Leaves/Month"}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facultyList.map((f, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => setSelectedFaculty(f)}
                                            className={selectedFaculty && selectedFaculty.name === f.name ? 'selected' : ''}
                                        >
                                            <td>{translateName(f.name)}</td>
                                            <td>{f.subjects.map(translateSubject).join(', ')}</td>
                                            <td>{f.leavesPerMonth}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {selectedFaculty && (
                            <>
                                <div className="faculty-details-panel faculty-details-desktop">
                                    <FacultyDetails faculty={selectedFaculty} />
                                </div>
                                <div className="faculty-details-modal faculty-details-mobile" onClick={() => setSelectedFaculty(null)}>
                                    <div className="faculty-details-modal-content" onClick={e => e.stopPropagation()}>
                                        <FacultyDetails faculty={selectedFaculty} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)} >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}