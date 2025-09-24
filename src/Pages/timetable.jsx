

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import './timetable.css';
import { Clock, MapPin, User } from 'lucide-react';


// Helper: get all batch keys and info from localStorage, grouped by dept+sem
function getAllBatchInfos() {
    let batchKeys = [];
    try {
        batchKeys = JSON.parse(localStorage.getItem('timetable_batchKeys') || '[]');
    } catch (e) {}
    // Group by dept+sem
    const batchMap = {};
    batchKeys.forEach(key => {
        const stored = localStorage.getItem(`timetable_${key}`);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const groupKey = `${parsed.dept}__${parsed.semester}`;
                if (!batchMap[groupKey]) batchMap[groupKey] = [];
                batchMap[groupKey].push({
                    key,
                    branch: parsed.dept || 'Unknown',
                    sem: parsed.semester || 'Unknown',
                    batch: parsed.batch || 'A',
                });
            } catch (e) {}
        }
    });
    // Flatten to array of {groupKey, branch, sem, batches: [batchInfo, ...]}
    return Object.entries(batchMap).map(([groupKey, batches]) => ({
        groupKey,
        branch: batches[0]?.branch,
        sem: batches[0]?.sem,
        batches
    }));
}

const fallbackTimetable = [
    {
        day: "Monday",
        classes: [
            { type: "Lecture", subject: "EMFT", time: "9:00-10:00", location: "A-204", instructor: "Dr. Sharma" },
            { type: "Lecture", subject: "Comprehensive AI", time: "10:00-11:00", location: "B-301", instructor: "Prof. Verma" },
            { type: "Lab", subject: "EMFT Lab", time: "11:00-13:00", location: "Lab-C1", instructor: "Dr. Sharma" },
            { type: "Lab", subject: "Comprehensive AI Lab", time: "14:00-16:00", location: "Lab-D2", instructor: "Prof. Verma" }
        ]
    },
    {
        day: "Tuesday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00-10:00", location: "A-205", instructor: "Dr. Iyer" },
            { type: "Lecture", subject: "Database Systems", time: "10:00-11:00", location: "B-302", instructor: "Prof. Singh" },
            { type: "Lab", subject: "Data Structures Lab", time: "11:00-13:00", location: "Lab-C2", instructor: "Dr. Iyer" }
        ]
    },
    {
        day: "Wednesday",
        classes: [
            { type: "Lecture", subject: "EMFT", time: "9:00-10:00", location: "A-204", instructor: "Dr. Sharma" },
            { type: "Lecture", subject: "Comprehensive AI", time: "10:00-11:00", location: "B-301", instructor: "Prof. Verma" }
        ]
    },
    {
        day: "Thursday",
        classes: [
            { type: "Lecture", subject: "Data Structures", time: "9:00-10:00", location: "A-205", instructor: "Dr. Iyer" },
            { type: "Lecture", subject: "Database Systems", time: "10:00-11:00", location: "B-302", instructor: "Prof. Singh" },
            { type: "Lab", subject: "EMFT Lab", time: "11:00-13:00", location: "Lab-C1", instructor: "Dr. Sharma" },
        ]
    },
    {
        day: "Friday",
        classes: [
            { type: "Lecture", subject: "EMFT", time: "9:00-10:00", location: "A-204", instructor: "Dr. Sharma" },
            { type: "Lecture", subject: "Comprehensive AI", time: "10:00-11:00", location: "B-301", instructor: "Prof. Verma" },
            { type: "Lab", subject: "Comprehensive AI Lab", time: "14:00-16:00", location: "Lab-D2", instructor: "Prof. Verma" }
        ]
    }
];



// Helper: get timetable for a batch key from localStorage
function getTimetableForBatch(batchKey) {
    try {
        const stored = localStorage.getItem(`timetable_${batchKey}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.timetable) return parsed.timetable;
        }
    } catch (e) {}
    return null;
}



export default function Timetable() {
    const [batchGroups, setBatchGroups] = useState(getAllBatchInfos());
    const [selectedGroup, setSelectedGroup] = useState(null); // dept+sem
    const [selectedBatch, setSelectedBatch] = useState(null); // batchInfo
    const [timetableData, setTimetableData] = useState(fallbackTimetable);

    // On mount, load batch groups and select the first group/batch if available
    useEffect(() => {
        const groups = getAllBatchInfos();
        setBatchGroups(groups);
        if (groups.length > 0) {
            setSelectedGroup(groups[0]);
            setSelectedBatch(groups[0].batches[0]);
        } else {
            setSelectedGroup(null);
            setSelectedBatch(null);
        }
    }, []);

    // When selectedBatch changes, load its timetable
    useEffect(() => {
        if (selectedBatch) {
            const data = getTimetableForBatch(selectedBatch.key);
            if (data) setTimetableData(data);
            else setTimetableData(fallbackTimetable);
        }
    }, [selectedBatch]);

    // When batchGroups change (e.g., after generating a new timetable), reload from localStorage
    useEffect(() => {
        const handleStorage = () => {
            const groups = getAllBatchInfos();
            setBatchGroups(groups);
            if (groups.length > 0) {
                if (!selectedGroup || !groups.find(g => g.groupKey === selectedGroup.groupKey)) {
                    setSelectedGroup(groups[0]);
                    setSelectedBatch(groups[0].batches[0]);
                }
            } else {
                setSelectedGroup(null);
                setSelectedBatch(null);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [selectedGroup]);

    return (
        <div className="timetable-layout">
            <SideBar activePage={'timetable'} />
            <main className="main-content">
                <Header 
                    title="Timetable" 
                    subtitle="Welcome back, Admin User" 
                />
                <div className="content-area">
                    {/* Dept/Sem Groups */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        {batchGroups.length === 0 && (
                            <div style={{ color: '#e5484d', fontWeight: 600 }}>No batches found. Generate a timetable first.</div>
                        )}
                        {batchGroups.map(group => (
                            <div
                                key={group.groupKey}
                                onClick={() => {
                                    setSelectedGroup(group);
                                    setSelectedBatch(group.batches[0]);
                                }}
                                style={{
                                    border: selectedGroup && group.groupKey === selectedGroup.groupKey ? '2px solid #eee' : '1px solid #444',
                                    background: selectedGroup && group.groupKey === selectedGroup.groupKey ? '#232323' : '#181818',
                                    borderRadius: '0.5rem',
                                    padding: '1rem 1.5rem',
                                    cursor: 'pointer',
                                    minWidth: 220,
                                    color: '#eee',
                                    boxShadow: selectedGroup && group.groupKey === selectedGroup.groupKey ? '0 2px 8px #0002' : 'none',
                                    fontWeight: 600
                                }}
                            >
                                <div style={{ fontSize: '1.1rem', marginBottom: 4 }}>{group.branch}</div>
                                <div style={{ fontSize: '0.98rem', color: '#bdbdbd' }}>{group.sem}</div>
                                <div style={{ fontSize: '0.95rem', color: '#b3e5fc' }}>Batches: {group.batches.map(b => b.batch).join(', ')}</div>
                            </div>
                        ))}
                    </div>
                    {/* Batch Cards for selected group (excluding the selected batch) */}
                    {selectedGroup && (
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {selectedGroup.batches
                                .filter(batch => !selectedBatch || batch.key !== selectedBatch.key)
                                .map(batch => (
                                    <div
                                        key={batch.key}
                                        onClick={() => setSelectedBatch(batch)}
                                        style={{
                                            border: '1px solid #444',
                                            background: '#181818',
                                            borderRadius: '0.5rem',
                                            padding: '1rem 1.5rem',
                                            cursor: 'pointer',
                                            minWidth: 180,
                                            color: '#eee',
                                            fontWeight: 600
                                        }}
                                    >
                                        <div style={{ fontSize: '1.1rem', marginBottom: 4 }}>{batch.branch}</div>
                                        <div style={{ fontSize: '0.98rem', color: '#bdbdbd' }}>{batch.sem}</div>
                                        <div style={{ fontSize: '0.95rem', color: '#b3e5fc' }}>Batch {batch.batch}</div>
                                    </div>
                                ))}
                        </div>
                    )}
                    <div className="timetable-container">
                        <div className="timetable-header">
                            <div className="timetable-title">
                                <h2>Weekly Timetable</h2>
                                <p>{selectedBatch ? `${selectedBatch.branch} - ${selectedBatch.sem} - Batch ${selectedBatch.batch}` : ''}</p>
                            </div>
                            <button className="batch-tag">{selectedBatch ? `${selectedBatch.branch} ${selectedBatch.sem} ${selectedBatch.batch}` : ''}</button>
                        </div>

                        {timetableData && timetableData.length > 0 ? (
                            timetableData.map((dayData, index) => (
                                <div className="day-section" key={index}>
                                    <h3>{dayData.day}</h3>
                                    <div className="entries-container">
                                        {dayData.classes.map((classInfo, classIndex) => (
                                            <div className="timetable-entry" key={classIndex}>
                                                <div className="entry-top">
                                                    <span className={`entry-tag ${classInfo.type.toLowerCase()}`}>{classInfo.type}</span>
                                                    <h4>{classInfo.subject}</h4>
                                                </div>
                                                <div className="entry-details">
                                                    <div className="detail-item">
                                                        <Clock size={14} />
                                                        <span>{classInfo.time}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <MapPin size={14} />
                                                        <span>{classInfo.location}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <User size={14} />
                                                        <span>{classInfo.instructor}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: '#e5484d', fontWeight: 600, marginTop: 32 }}>
                                No timetable found for this batch.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}