import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import './GenerateTT.css';
import { Plus, Settings2, RotateCw, Book, School, Users, UserCheck, Target } from 'lucide-react';
import AIChat from '../components/AiChat.jsx';
import TimetablePopup from '../components/TimetablePopup.jsx';

// --- Helper function to shuffle an array (Fisher-Yates shuffle) ---
const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// --- Mock Data (Fully Implemented) ---
const getOrdinal = (n) => {
    if (n === 1) return '1st Semester';
    if (n === 2) return '2nd Semester';
    if (n === 3) return '3rd Semester';
    return `${n}th Semester`;
};
const semesters = Array.from({ length: 8 }, (_, i) => getOrdinal(i + 1));

const btechSubjects = {
    common: {
        1: [
            { name: 'Engineering Mathematics-I', classesPerWeek: 5 },
            { name: 'Engineering Physics', classesPerWeek: 4 },
            { name: 'Engineering Chemistry', classesPerWeek: 3 },
            { name: 'Basic Electrical Engineering', classesPerWeek: 3 },
            { name: 'English Communication', classesPerWeek: 2 },
            { name: 'Workshop Practice', classesPerWeek: 2 },
        ],
        2: [
            { name: 'Engineering Mathematics-II', classesPerWeek: 5 },
            { name: 'Engineering Physics-II', classesPerWeek: 4 },
            { name: 'Engineering Graphics', classesPerWeek: 3 },
            { name: 'Basic Electronics Engineering', classesPerWeek: 3 },
            { name: 'Environmental Science', classesPerWeek: 2 },
            { name: 'Programming for Problem Solving', classesPerWeek: 3 },
        ]
    },
    'Computer Science': {
        3: [ { name: 'Discrete Mathematics', classesPerWeek: 4 }, { name: 'Data Structures', classesPerWeek: 5 }, { name: 'Digital Logic Design', classesPerWeek: 4 }, { name: 'Object Oriented Programming', classesPerWeek: 4 }, { name: 'Computer Organization', classesPerWeek: 3 }, ],
        4: [ { name: 'Design and Analysis of Algorithms', classesPerWeek: 5 }, { name: 'Database Management Systems', classesPerWeek: 4 }, { name: 'Operating Systems', classesPerWeek: 4 }, { name: 'Microprocessors', classesPerWeek: 3 }, { name: 'Software Engineering', classesPerWeek: 3 }, ],
        5: [ { name: 'Computer Networks', classesPerWeek: 5 }, { name: 'Theory of Computation', classesPerWeek: 4 }, { name: 'Compiler Design', classesPerWeek: 4 }, { name: 'Web Technologies', classesPerWeek: 3 }, { name: 'Artificial Intelligence', classesPerWeek: 3 }, ]
    },
    'Information Technology': {
        3: [ { name: 'Discrete Mathematics', classesPerWeek: 4 }, { name: 'Data Structures', classesPerWeek: 5 }, { name: 'Digital Electronics', classesPerWeek: 4 }, { name: 'Object Oriented Programming', classesPerWeek: 4 }, { name: 'Computer Organization', classesPerWeek: 3 }, ],
        4: [ { name: 'Design and Analysis of Algorithms', classesPerWeek: 5 }, { name: 'Database Management Systems', classesPerWeek: 4 }, { name: 'Operating Systems', classesPerWeek: 4 }, { name: 'Microprocessors', classesPerWeek: 3 }, { name: 'Software Engineering', classesPerWeek: 3 }, ],
        5: [ { name: 'Computer Networks', classesPerWeek: 5 }, { name: 'Information Security', classesPerWeek: 4 }, { name: 'Web Technologies', classesPerWeek: 4 }, { name: 'Cloud Computing', classesPerWeek: 3 }, { name: 'Data Mining', classesPerWeek: 3 }, ]
    },
    'Mechanical Engineering': {
        3: [ { name: 'Engineering Thermodynamics', classesPerWeek: 5 }, { name: 'Fluid Mechanics', classesPerWeek: 4 }, { name: 'Strength of Materials', classesPerWeek: 4 }, { name: 'Manufacturing Processes', classesPerWeek: 3 }, { name: 'Machine Drawing', classesPerWeek: 3 }, ],
        4: [ { name: 'Applied Thermodynamics', classesPerWeek: 5 }, { name: 'Kinematics of Machines', classesPerWeek: 4 }, { name: 'Material Science', classesPerWeek: 4 }, { name: 'Dynamics of Machines', classesPerWeek: 3 }, { name: 'Industrial Engineering', classesPerWeek: 3 }, ],
        5: [ { name: 'Heat Transfer', classesPerWeek: 5 }, { name: 'Design of Machine Elements', classesPerWeek: 4 }, { name: 'Refrigeration and Air Conditioning', classesPerWeek: 4 }, { name: 'Automobile Engineering', classesPerWeek: 3 }, { name: 'Vibration Engineering', classesPerWeek: 3 }, ]
    },
    'Biotechnology': {
        3: [ { name: 'Cell Biology', classesPerWeek: 4 }, { name: 'Biochemistry', classesPerWeek: 5 }, { name: 'Microbiology', classesPerWeek: 4 }, { name: 'Genetics', classesPerWeek: 4 }, { name: 'Bioprocess Engineering', classesPerWeek: 3 }, ],
        4: [ { name: 'Molecular Biology', classesPerWeek: 5 }, { name: 'Immunology', classesPerWeek: 4 }, { name: 'Enzyme Technology', classesPerWeek: 4 }, { name: 'Plant Biotechnology', classesPerWeek: 3 }, { name: 'Bioinformatics', classesPerWeek: 3 }, ],
        5: [ { name: 'Animal Biotechnology', classesPerWeek: 5 }, { name: 'Environmental Biotechnology', classesPerWeek: 4 }, { name: 'Genetic Engineering', classesPerWeek: 4 }, { name: 'Biostatistics', classesPerWeek: 3 }, { name: 'Downstream Processing', classesPerWeek: 3 }, ]
    },
    'Electronics and Communication': {
        3: [ { name: 'Analog Circuits', classesPerWeek: 5 }, { name: 'Digital Electronics', classesPerWeek: 4 }, { name: 'Signals and Systems', classesPerWeek: 4 }, { name: 'Network Analysis', classesPerWeek: 3 }, { name: 'Electromagnetic Field Theory', classesPerWeek: 3 }, ],
        4: [ { name: 'Microprocessors and Microcontrollers', classesPerWeek: 5 }, { name: 'Communication Systems', classesPerWeek: 4 }, { name: 'Control Systems', classesPerWeek: 4 }, { name: 'Analog Communication', classesPerWeek: 3 }, { name: 'Electronic Measurement', classesPerWeek: 3 }, ],
        5: [ { name: 'Digital Communication', classesPerWeek: 5 }, { name: 'VLSI Design', classesPerWeek: 4 }, { name: 'Embedded Systems', classesPerWeek: 4 }, { name: 'Microwave Engineering', classesPerWeek: 3 }, { name: 'Antenna and Wave Propagation', classesPerWeek: 3 }, ]
    }
};

const generateSemesterData = (dept, sem) => {
    let semNum = 0;
    if (typeof sem === 'string') {
        const match = sem.match(/^(\d+)/);
        if (match) semNum = parseInt(match[1]);
    } else {
        semNum = sem;
    }
    let subjects = [];
    if (semNum === 1 || semNum === 2) {
        subjects = btechSubjects.common[semNum] || [];
    } else if (btechSubjects[dept] && btechSubjects[dept][semNum]) {
        subjects = btechSubjects[dept][semNum];
    } else {
        subjects = [
            { name: `${dept} ${sem} - Subject 1`, classesPerWeek: 3 },
            { name: `${dept} ${sem} - Subject 2`, classesPerWeek: 4 },
            { name: `${dept} ${sem} - Subject 3`, classesPerWeek: 2 },
        ];
    }
    return {
        resources: {
            faculties: Math.floor(Math.random() * 20) + 10,
            classrooms: Math.floor(Math.random() * 10) + 5,
            subjects: subjects.length,
            batches: Math.floor(Math.random() * 3) + 1,
        },
        subjects,
    };
};

const departments = [
    'Computer Science', 'Information Technology', 'Mechanical Engineering',
    'Biotechnology', 'Electronics and Communication'
];

const mockData = {};
for (const dept of departments) {
    mockData[dept] = {};
    for (const sem of semesters) {
        if (dept === 'Computer Science' && sem === '5th Semester') {
            mockData[dept][sem] = {
                resources: { faculties: 28, classrooms: 12, subjects: 4, batches: 3 },
                subjects: [
                    { name: 'CS-501 Artificial Intelligence', classesPerWeek: 4 },
                    { name: 'CS-502 Database Systems', classesPerWeek: 4 },
                    { name: 'CS-503 Operating Systems', classesPerWeek: 5 },
                    { name: 'CS-504 Web Development Lab', classesPerWeek: 3 },
                ]
            };
        } else if (dept === 'Computer Science' && sem === '7th Semester') {
            mockData[dept][sem] = {
                resources: { faculties: 25, classrooms: 10, subjects: 3, batches: 2 },
                subjects: [
                    { name: 'CS-701 Machine Learning', classesPerWeek: 5 },
                    { name: 'CS-702 Cloud Computing', classesPerWeek: 4 },
                    { name: 'CS-703 Cyber Security', classesPerWeek: 4 },
                ]
            };
        } else if (dept === 'Mechanical Engineering' && sem === '3rd Semester') {
            mockData[dept][sem] = {
                resources: { faculties: 35, classrooms: 15, subjects: 3, batches: 4 },
                subjects: [
                    { name: 'ME-301 Thermodynamics', classesPerWeek: 5 },
                    { name: 'ME-302 Fluid Mechanics', classesPerWeek: 5 },
                    { name: 'ME-303 Strength of Materials', classesPerWeek: 4 },
                ]
            };
        } else {
            mockData[dept][sem] = generateSemesterData(dept, sem);
        }
    }
}
// --- End of Mock Data ---


// --- Reusable Sub-Components ---
const StatBox = ({ icon, value, label }) => (
    <div className="stat-box">
        {icon}
        <div className="stat-box-info">
            <p className="stat-box-value">{value}</p>
            <p className="stat-box-label">{label}</p>
        </div>
    </div>
);

const SubjectAllocationRow = ({ subject, onAllocationChange }) => (
    <div className="subject-allocation-row">
        <p className="subject-name">{subject.name}</p>
        <div className="form-group subject-allocation-controls">
            <button type="button" className="allocation-btn minus" onClick={() => onAllocationChange(subject.name, Math.max(0, subject.classesPerWeek - 1))} > - </button>
            <span className="allocation-value">{subject.classesPerWeek}</span>
            <button type="button" className="allocation-btn plus" onClick={() => onAllocationChange(subject.name, subject.classesPerWeek + 1)} > + </button>
        </div>
    </div>
);

function getInitialDept() { return localStorage.getItem('lastSelectedDept') || 'Computer Science'; }
function getInitialSem() { return localStorage.getItem('lastSelectedSemester') || '5th Semester'; }

function GenerateTT() {
    const [selectedDept, setSelectedDept] = useState(getInitialDept());
    const [selectedSemester, setSelectedSemester] = useState(getInitialSem());
    const [currentScopeData, setCurrentScopeData] = useState(mockData[getInitialDept()][getInitialSem()]);
    const [subjectAllocations, setSubjectAllocations] = useState(mockData[getInitialDept()][getInitialSem()].subjects);
    const [selectedBatch, setSelectedBatch] = useState('A');
    const [classroomConstraints, setClassroomConstraints] = useState([]);
    const [teacherConstraints, setTeacherConstraints] = useState([]);
    const [minimizeGaps, setMinimizeGaps] = useState(false);
    const [balanceWorkload, setBalanceWorkload] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [generatedTimetables, setGeneratedTimetables] = useState([]);

    const allRooms = ["LT-101", "LT-102", "LT-103", "LT-104", "LT-105", "MECH-LAB-1", "MECH-LAB-2", "MECH-LAB-3", "CS-LAB-1", "CS-LAB-2", "CS-LAB-3", "PHY-LAB-1", "CHEM-LAB-1", "EEE-LAB-1"];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "14:00-15:00", "15:00-16:00"];

    const [newClassroom, setNewClassroom] = useState({ room: allRooms[0], day: daysOfWeek[0], time: timeSlots[0] });
    const [newTeacher, setNewTeacher] = useState({ teacher: '', day: daysOfWeek[0] });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const batchOptions = Array.from({ length: currentScopeData?.resources?.batches || 1 }, (_, i) => String.fromCharCode(65 + i));

    function generateTimetable(subjectAllocations, constraints, globalRules) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const times = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "14:00-15:00", "15:00-16:00"];
        let timetable = days.map(day => ({ day, classes: [] }));
        const usedSlots = new Set();
        const facultyList = ["Prof. Kumar", "Prof. Sharma", "Prof. Verma", "Prof. Iyer", "Prof. Singh", "Dr. Gupta", "Dr. Reddy"];

        function isSlotAvailable(day, time, room, faculty) {
            if (usedSlots.has(`${day}|${time}|${room}`)) return false;
            if (usedSlots.has(`${day}|${time}|faculty|${faculty}`)) return false;
            if (constraints.classrooms.some(c => c.day === day && c.time === time && c.room === room)) return false;
            if (constraints.teachers.some(c => c.day === day && c.teacher === faculty)) return false;
            return true;
        }
        
        let classSessions = [];
        subjectAllocations.forEach((subject, subjIdx) => {
            for (let i = 0; i < subject.classesPerWeek; i++) {
                classSessions.push({ subject: subject.name, subjIdx, type: 'Lecture' });
            }
        });
        classSessions = shuffleArray(classSessions);

        let sessionIdx = 0;
        for (let slot = 0; slot < days.length * times.length; slot++) {
            if (sessionIdx >= classSessions.length) break;
            const day = days[slot % days.length];
            const time = times[Math.floor(slot / days.length) % times.length];
            const session = classSessions[sessionIdx];
            const room = allRooms[(sessionIdx + slot) % allRooms.length];
            const faculty = facultyList[(session.subjIdx + slot) % facultyList.length];
            if (isSlotAvailable(day, time, room, faculty)) {
                timetable.find(d => d.day === day).classes.push({
                    type: session.type, subject: session.subject, time, location: room, instructor: faculty
                });
                usedSlots.add(`${day}|${time}|${room}`);
                usedSlots.add(`${day}|${time}|faculty|${faculty}`);
                sessionIdx++;
            }
        }
        timetable.forEach(day => {
            day.classes.sort((a, b) => times.indexOf(a.time) - times.indexOf(b.time));
        });
        return timetable;
    }

    useEffect(() => {
        localStorage.setItem('lastSelectedDept', selectedDept);
        localStorage.setItem('lastSelectedSemester', selectedSemester);
        const data = mockData[selectedDept]?.[selectedSemester];
        if (data) {
            setCurrentScopeData(data);
            setSubjectAllocations(data.subjects);
        } else {
            const fallbackDept = Object.keys(mockData)[0];
            const fallbackSem = Object.keys(mockData[fallbackDept])[0];
            setCurrentScopeData(mockData[fallbackDept][fallbackSem]);
            setSubjectAllocations(mockData[fallbackDept][fallbackSem].subjects);
        }
    }, [selectedDept, selectedSemester]);

    const handleAllocationChange = (subjectName, newValue) => {
        const updatedAllocations = subjectAllocations.map(subject =>
            subject.name === subjectName ? { ...subject, classesPerWeek: newValue } : subject
        );
        setSubjectAllocations(updatedAllocations);
    };

    const handleReset = () => {
        const initialDept = getInitialDept();
        const initialSem = getInitialSem();
        setSelectedDept(initialDept);
        setSelectedSemester(initialSem);
        setCurrentScopeData(mockData[initialDept][initialSem]);
        setSubjectAllocations(mockData[initialDept][initialSem].subjects);
        setClassroomConstraints([]);
        setTeacherConstraints([]);
        setMinimizeGaps(false);
        setBalanceWorkload(false);
    };

    const handleGenerate = () => {
        const options = [];
        const constraints = { classrooms: classroomConstraints, teachers: teacherConstraints };
        const globalRules = { minimizeGaps, balanceWorkload };
        for (let i = 0; i < 4; i++) {
            const timetable = generateTimetable(subjectAllocations, constraints, globalRules);
            options.push(timetable);
        }
        setGeneratedTimetables(options);
        setShowPopup(true);
    };

    const handleTimetableSelect = (selectedTimetable) => {
        const batchKey = `${selectedDept.replace(/\s+/g, '')}_${selectedSemester.replace(/\s+/g, '')}_${selectedBatch}`;
        localStorage.setItem(`timetable_${batchKey}`, JSON.stringify({
            dept: selectedDept, semester: selectedSemester, batch: selectedBatch, timetable: selectedTimetable
        }));
        let batchKeys = JSON.parse(localStorage.getItem('timetable_batchKeys') || '[]');
        if (!batchKeys.includes(batchKey)) {
            batchKeys.push(batchKey);
            localStorage.setItem('timetable_batchKeys', JSON.stringify(batchKeys));
        }
        setShowPopup(false);
        window.location.href = '/admin-timetable';
    };

    const handleAddClassroomConstraint = () => { if (newClassroom.room && newClassroom.day && newClassroom.time) { setClassroomConstraints([...classroomConstraints, { ...newClassroom }]); setNewClassroom({ room: allRooms[0], day: 'Monday', time: '9:00-10:00' }); } };
    const handleRemoveClassroomConstraint = idx => { setClassroomConstraints(classroomConstraints.filter((_, i) => i !== idx)); };
    const handleAddTeacherConstraint = () => { if (newTeacher.teacher && newTeacher.day) { setTeacherConstraints([...teacherConstraints, { ...newTeacher }]); setNewTeacher({ teacher: '', day: 'Monday' }); } };
    const handleRemoveTeacherConstraint = idx => { setTeacherConstraints(teacherConstraints.filter((_, i) => i !== idx)); };
    
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "समय सारणी बनाएं";
    const altSubtitle = "अनुकूलित समय सारणी बनाने के लिए पैरामीटर और बाधाएँ सेट करें";

    const translations = {
        scopeTitle: { en: "Define Scope", hi: "दायरा परिभाषित करें" },
        scopeDesc: { en: "Select the department, semester, and batch. The resources and subjects below will update accordingly.", hi: "विभाग, सेमेस्टर और बैच का चयन करें। नीचे दिए गए संसाधन और विषय तदनुसार अपडेट होंगे।" },
        department: { en: "Department", hi: "विभाग" },
        semester: { en: "Semester", hi: "सेमेस्टर" },
        batch: { en: "Batch", hi: "बैच" },
        resourceTitle: { en: "Resource Overview", hi: "संसाधन अवलोकन" },
        resourceDesc: { en: "A summary of the available resources for the selected scope.", hi: "चयनित दायरे के लिए उपलब्ध संसाधनों का सारांश।" },
        faculties: { en: "Faculties Available", hi: "उपलब्ध संकाय" },
        classrooms: { en: "Classrooms & Labs", hi: "कक्षाएं और प्रयोगशालाएं" },
        subjects: { en: "Total Subjects", hi: "कुल विषय" },
        batches: { en: "Student Batches", hi: "छात्र बैच" },
        allocationTitle: { en: "Subject Class Allocation", hi: "विषय कक्षा आवंटन" },
        allocationDesc: { en: "Define the number of classes to be conducted for each subject per week.", hi: "प्रति सप्ताह प्रत्येक विषय के लिए आयोजित की जाने वाली कक्षाओं की संख्या परिभाषित करें।" },
        subjectName: { en: "Subject Name", hi: "विषय का नाम" },
        classesPerWeek: { en: "Classes Per Week", hi: "कक्षाएं प्रति सप्ताह" },
        constraintsTitle: { en: "Constraints & Rules", hi: "बाधाएं और नियम" },
        constraintsDesc: { en: "Add classroom/teacher constraints and set global rules for the timetable engine.", hi: "कक्षा/शिक्षक बाधाएं जोड़ें और टाइमटेबल इंजन के लिए वैश्विक नियम निर्धारित करें।" },
        classroomUnavailable: { en: "Classroom Unavailable", hi: "कक्षा अनुपलब्ध" },
        teacherAbsent: { en: "Teacher Absent", hi: "शिक्षक अनुपस्थित" },
        teacherPlaceholder: { en: "Teacher (e.g. Prof. Kumar)", hi: "शिक्षक (उदा. प्रो. कुमार)" },
        unavailableOn: { en: "unavailable on", hi: "को अनुपलब्ध" },
        at: { en: "at", hi: "बजे" },
        remove: { en: "Remove", hi: "हटाएं" },
        add: { en: "Add", hi: "जोड़ें" },
        globalRules: { en: "Global Rules", hi: "वैश्विक नियम" },
        minimizeGaps: { en: "Minimize Gaps for Students", hi: "छात्रों के लिए अंतराल कम करें" },
        minimizeGapsDesc: { en: "Prioritize schedules with fewer free periods between classes.", hi: "कक्षाओं के बीच कम खाली पीरियड वाले शेड्यूल को प्राथमिकता दें।" },
        balanceWorkload: { en: "Balance Faculty Workload", hi: "संकाय कार्यभार संतुलित करें" },
        balanceWorkloadDesc: { en: "Distribute classes evenly across faculty members.", hi: "संकाय सदस्यों के बीच कक्षाओं का समान रूप से वितरण करें।" },
        reset: { en: "Reset", hi: "रीसेट" },
        generate: { en: "Generate Timetable", hi: "समय सारणी बनाएं" },
        days: {
            en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            hi: ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार']
        }
    };

    return (
        <div className="page-layout">
            <SideBar activePage={'gentt'} />
            <main className="main-content">
                <Header title="Generate Timetable" subtitle="Set parameters and constraints to generate an optimized timetable" altTitle={altTitle} altSubtitle={altSubtitle} lang={lang} onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")} />
                <div className="content-area">
                    <div className="generation-container">
                        {/* --- Section 1: Define the Scope --- */}
                        <div className="generation-section">
                            <div className="section-header"><div className="section-number">1</div><h3>{translations.scopeTitle[lang]}</h3></div>
                            <p className="section-description">{translations.scopeDesc[lang]}</p>
                            <div className="scope-selection">
                                <div className="form-group"><label htmlFor="department">{translations.department[lang]}</label><select id="department" name="department" value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>{Object.keys(mockData).map(dept => <option key={dept} value={dept}>{dept}</option>)}</select></div>
                                <div className="form-group"><label htmlFor="semester">{translations.semester[lang]}</label><select id="semester" name="semester" value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>{semesters.map(sem => (<option key={sem} value={sem}>{sem}</option>))}</select></div>
                                <div className="form-group"><label htmlFor="batch">{translations.batch[lang]}</label><select id="batch" name="batch" value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>{batchOptions.map(batch => (<option key={batch} value={batch}>{batch}</option>))}</select></div>
                            </div>
                        </div>

                        {/* --- Section 2: Resource Overview --- */}
                        <div className="generation-section">
                            <div className="section-header"><div className="section-number">2</div><h3>{translations.resourceTitle[lang]}</h3></div>
                            <p className="section-description">{translations.resourceDesc[lang]}</p>
                            <div className="resource-overview">
                                <StatBox icon={<Users size={24} />} value={currentScopeData.resources.faculties} label={translations.faculties[lang]} />
                                <StatBox icon={<School size={24} />} value={currentScopeData.resources.classrooms} label={translations.classrooms[lang]} />
                                <StatBox icon={<Book size={24} />} value={currentScopeData.resources.subjects} label={translations.subjects[lang]} />
                                <StatBox icon={<UserCheck size={24} />} value={currentScopeData.resources.batches} label={translations.batches[lang]} />
                            </div>
                        </div>

                        {/* --- Section 3: Subject Class Allocation --- */}
                        <div className="generation-section">
                            <div className="section-header"><div className="section-number">3</div><h3>{translations.allocationTitle[lang]}</h3></div>
                            <p className="section-description">{translations.allocationDesc[lang]}</p>
                            <div className="subject-allocation-container">
                                <div className="subject-allocation-header"><h4><Book size={18} /> {translations.subjectName[lang]}</h4><h4><Target size={18} /> {translations.classesPerWeek[lang]}</h4></div>
                                {subjectAllocations.map(subject => (<SubjectAllocationRow key={subject.name} subject={subject} onAllocationChange={handleAllocationChange} />))}
                            </div>
                        </div>

                        {/* --- Section 4: Constraints & Rules --- */}
                        <div className="generation-section">
                            <div className="section-header"><div className="section-number">4</div><h3>{translations.constraintsTitle[lang]}</h3></div>
                            <p className="section-description">{translations.constraintsDesc[lang]}</p>
                            <div className="constraints-content">
                                <div className="fixed-slots">
                                    <h4>{translations.classroomUnavailable[lang]}</h4>
                                    <ul className="fixed-slot-list">{classroomConstraints.map((c, idx) => (<li key={idx}> {c.room} {translations.unavailableOn[lang]} {translations.days[lang][daysOfWeek.indexOf(c.day)]} {translations.at[lang]} {c.time} <button onClick={() => handleRemoveClassroomConstraint(idx)} className="btn-remove-constraint">{translations.remove[lang]}</button> </li>))}</ul>
                                    <div className="constraint-form">
                                        <select value={newClassroom.room} onChange={e => setNewClassroom({ ...newClassroom, room: e.target.value })}>{allRooms.map(room => <option key={room} value={room}>{room}</option>)}</select>
                                        <select value={newClassroom.day} onChange={e => setNewClassroom({ ...newClassroom, day: e.target.value })}>{daysOfWeek.map((day, idx) => <option key={day} value={day}>{translations.days[lang][idx]}</option>)}</select>
                                        <select value={newClassroom.time} onChange={e => setNewClassroom({ ...newClassroom, time: e.target.value })}>{timeSlots.map(time => <option key={time} value={time}>{time}</option>)}</select>
                                        <button className="btn btn-secondary" onClick={handleAddClassroomConstraint}> <Plus size={16} /> {translations.add[lang]} </button>
                                    </div>
                                </div>
                                <div className="fixed-slots">
                                    <h4>{translations.teacherAbsent[lang]}</h4>
                                    <ul className="fixed-slot-list">{teacherConstraints.map((c, idx) => (<li key={idx}> {c.teacher} {translations.unavailableOn[lang]} {translations.days[lang][daysOfWeek.indexOf(c.day)]} <button onClick={() => handleRemoveTeacherConstraint(idx)} className="btn-remove-constraint">{translations.remove[lang]}</button> </li>))}</ul>
                                    <div className="constraint-form">
                                        <input type="text" placeholder={translations.teacherPlaceholder[lang]} value={newTeacher.teacher} onChange={e => setNewTeacher({ ...newTeacher, teacher: e.target.value })} />
                                        <select value={newTeacher.day} onChange={e => setNewTeacher({ ...newTeacher, day: e.target.value })}>{daysOfWeek.map((day, idx) => <option key={day} value={day}>{translations.days[lang][idx]}</option>)}</select>
                                        <button className="btn btn-secondary" onClick={handleAddTeacherConstraint}> <Plus size={16} /> {translations.add[lang]} </button>
                                    </div>
                                </div>
                                <div className="global-rules">
                                    <h4><Settings2 size={18} /> {translations.globalRules[lang]}</h4>
                                    <div className="rule-item">
                                        <div className="rule-info"><p className="rule-label">{translations.minimizeGaps[lang]}</p><p className="rule-description">{translations.minimizeGapsDesc[lang]}</p></div>
                                        {isMobile ? <input className="mobile-checkbox" type="checkbox" checked={minimizeGaps} onChange={e => setMinimizeGaps(e.target.checked)} /> : <label className="switch"><input type="checkbox" checked={minimizeGaps} onChange={e => setMinimizeGaps(e.target.checked)} /><span className="slider round"></span></label>}
                                    </div>
                                    <div className="rule-item">
                                        <div className="rule-info"><p className="rule-label">{translations.balanceWorkload[lang]}</p><p className="rule-description">{translations.balanceWorkloadDesc[lang]}</p></div>
                                        {isMobile ? <input className="mobile-checkbox" type="checkbox" checked={balanceWorkload} onChange={e => setBalanceWorkload(e.target.checked)} /> : <label className="switch"><input type="checkbox" checked={balanceWorkload} onChange={e => setBalanceWorkload(e.target.checked)} /><span className="slider round"></span></label>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Section 5: Action Panel --- */}
                        <div className="action-panel">
                            <button className="btn-secondary-reset" onClick={handleReset}> <RotateCw size={16} /> {translations.reset[lang]} </button>
                            <button className="btn btn-primary" onClick={handleGenerate}> {translations.generate[lang]} </button>
                        </div>
                    </div>
                </div>
            </main>

            {showPopup && <TimetablePopup timetables={generatedTimetables} onSelect={handleTimetableSelect} onClose={() => setShowPopup(false)} scope={{ dept: selectedDept, semester: selectedSemester, batch: selectedBatch }} lang={lang} />}
            <button className="s-fab-chat-btn" onClick={() => setShowChat(true)} >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
            </button>
            {showChat && <AIChat onClose={() => setShowChat(false)} />}
        </div>
    );
}

export default GenerateTT;