import React, { useState } from 'react';
import SideBarTeacher from '../../components/SideBar-teacher';
import Header from '../../components/Header';
import './TeacherCourses.css';
import { BookOpen, Users, BarChart3, Calendar, Tag } from 'lucide-react';

// --- MOCK DATA for the Teacher's Assigned Courses ---
const assignedCourses = [
    {
        id: 'DS-301',
        name: 'Data Structures',
        description: 'Core course on fundamental data structures and algorithms for B.Tech CSE students.',
        totalStudents: 120,
        batches: 2,
        weeklyClasses: 5,
        semester: '3rd Semester'
    },
    {
        id: 'CS-602',
        name: 'Advanced Algorithms',
        description: 'Elective course covering complex algorithms and analysis for M.Tech CSE students.',
        totalStudents: 35,
        batches: 1,
        weeklyClasses: 3,
        semester: '1st Semester'
    },
    {
        id: 'EC-205',
        name: 'Digital Systems',
        description: 'Fundamental course on digital logic and system design for B.Tech ECE students.',
        totalStudents: 65,
        batches: 1,
        weeklyClasses: 4,
        semester: '2nd Semester'
    }
];

const hiText = {
    students: "छात्र",
    batches: "बैच",
    classesPerWeek: "कक्षाएँ/सप्ताह",
    semester: "सेमेस्टर"
};

const CourseCard = ({ course, lang }) => (
    <div className="course-card">
        <div className="card-top">
            <div className="course-icon">
                <BookOpen size={24} />
            </div>
            <div className="course-title">
                <h3>{course.name}</h3>
                <span className="course-id">{course.id}</span>
            </div>
        </div>
        <p className="course-description">{course.description}</p>
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
                <span>{lang === "hi" ? hiText.semester : course.semester}</span>
            </div>
        </div>
    </div>
);


export default function TeacherCourses() {
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
            </main>
        </div>
    );
}
