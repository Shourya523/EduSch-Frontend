import React, { useState } from 'react';
import SideBarTeacher from '../../components/SideBar-teacher';
import Header from '../../components/Header';
import './TeacherCourses.css';
import { BookOpen, Users, BarChart3, Calendar, Tag,Sparkles } from 'lucide-react';
import AIChat from '../../components/AiChat';

// --- MOCK DATA with Hindi Translations ---
const assignedCourses = [
    {
        id: 'DS-301',
        name: {
            en: 'Data Structures',
            hi: 'डेटा संरचनाएं'
        },
        description: {
            en: 'Core course on fundamental data structures and algorithms for B.Tech CSE students.',
            hi: 'बी.टेक सीएसई छात्रों के लिए मौलिक डेटा संरचनाओं और एल्गोरिदम पर मुख्य पाठ्यक्रम।'
        },
        totalStudents: 120,
        batches: 2,
        weeklyClasses: 5,
        semester: '3rd Semester'
    },
    {
        id: 'CS-602',
        name: {
            en: 'Advanced Algorithms',
            hi: 'उन्नत एल्गोरिदम'
        },
        description: {
            en: 'Elective course covering complex algorithms and analysis for M.Tech CSE students.',
            hi: 'एम.टेक सीएसई छात्रों के लिए जटिल एल्गोरिदम और विश्लेषण को कवर करने वाला वैकल्पिक पाठ्यक्रम।'
        },
        totalStudents: 35,
        batches: 1,
        weeklyClasses: 3,
        semester: '1st Semester'
    },
    {
        id: 'EC-205',
        name: {
            en: 'Digital Systems',
            hi: 'डिजिटल सिस्टम'
        },
        description: {
            en: 'Fundamental course on digital logic and system design for B.Tech ECE students.',
            hi: 'बी.टेक ईसीई छात्रों के लिए डिजिटल लॉजिक और सिस्टम डिजाइन पर मौलिक पाठ्यक्रम।'
        },
        totalStudents: 65,
        batches: 1,
        weeklyClasses: 4,
        semester: '2nd Semester'
    }
];

// --- Translation Helpers ---
const hiText = {
    students: "छात्र",
    batches: "बैच",
    classesPerWeek: "कक्षाएँ/सप्ताह",
};

const semesterTranslations = {
    '1st Semester': 'पहला सेमेस्टर',
    '2nd Semester': 'दूसरा सेमेस्टर',
    '3rd Semester': 'तीसरा सेमेस्टर',
};

const CourseCard = ({ course, lang }) => (
    <div className="course-card">
        <div className="card-top">
            <div className="course-icon">
                <BookOpen size={24} />
            </div>
            <div className="course-title">
                <h3>{course.name[lang]}</h3>
                <span className="course-id">{course.id}</span>
            </div>
        </div>
        <p className="course-description">{course.description[lang]}</p>
        <div className="course-stats">
            <div className="stat-item">
                <Users size={16} />
                <span>{course.totalStudents} {lang === "hi" ? hiText.students : "Students"}</span>
            </div>
            <div className="stat-item">
                <BarChart3 size={16} />
                <span>{course.batches} {lang === "hi" ? hiText.batches : "Batch(es)"}</span>
            </div>
            <div className="stat-item">
                <Calendar size={16} />
                <span>{course.weeklyClasses} {lang === "hi" ? hiText.classesPerWeek : "Classes/Week"}</span>
            </div>
            <div className="stat-item">
                <Tag size={16} />
                <span>{lang === "hi" ? semesterTranslations[course.semester] : course.semester}</span>
            </div>
        </div>
    </div>
);


export default function TeacherCourses() {
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "मेरे पाठ्यक्रम";
    const altSubtitle = "वर्तमान शैक्षणिक सत्र के लिए आपके सौंपे गए विषयों का अवलोकन";
    return (
        <div className="page-layout">
            <SideBarTeacher activePage={'my-courses'} />
            <main className="main-content">
                <Header
                    title="My Courses"
                    subtitle="An overview of your assigned subjects for the current academic session"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="courses-page">
                    <div className="courses-grid">
                        {assignedCourses.map(course => (
                            <CourseCard key={course.id} course={course} lang={lang} />
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