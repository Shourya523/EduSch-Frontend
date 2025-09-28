import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import './timetable.css';
import { Clock, MapPin, User, Sparkles } from 'lucide-react';
import AIChat from '../components/AiChat';

// Helper: get all batch keys and info from localStorage, grouped by dept+sem
function getAllBatchInfos() {
    let batchKeys = [];
    try {
        // Ensure that what we get from localStorage is valid JSON
        const storedKeys = localStorage.getItem('timetable_batchKeys');
        batchKeys = storedKeys ? JSON.parse(storedKeys) : [];
        if (!Array.isArray(batchKeys)) batchKeys = []; // Safety check
    } catch (e) {
        batchKeys = []; // If parsing fails, default to an empty array
    }

    const batchMap = {};
    batchKeys.forEach(key => {
        const stored = localStorage.getItem(`timetable_${key}`);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.dept && parsed.semester) {
                    const groupKey = `${parsed.dept}__${parsed.semester}`;
                    if (!batchMap[groupKey]) batchMap[groupKey] = [];
                    batchMap[groupKey].push({
                        key,
                        branch: parsed.dept || 'Unknown',
                        sem: parsed.semester || 'Unknown',
                        batch: parsed.batch || 'A',
                    });
                }
            } catch (e) { /* Ignore corrupted individual items */ }
        }
    });

    return Object.entries(batchMap).map(([groupKey, batches]) => ({
        groupKey,
        branch: batches[0]?.branch,
        sem: batches[0]?.sem,
        batches
    }));
}

// Helper: get timetable for a batch key from localStorage
function getTimetableForBatch(batchKey) {
    try {
        const stored = localStorage.getItem(`timetable_${batchKey}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.timetable) return parsed.timetable;
        }
    } catch (e) { /* Ignore errors */ }
    return null;
}

export default function Timetable() {
    const [batchGroups, setBatchGroups] = useState(getAllBatchInfos());
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [timetableData, setTimetableData] = useState(null);

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
            setTimetableData(data);
        } else {
            setTimetableData(null);
        }
    }, [selectedBatch]);

    // When storage changes, reload batch groups
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

    // --- Language State and Translations ---
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "समय सारणी";
    const altSubtitle = "वापस स्वागत है, एडमिन उपयोगकर्ता";

    const translations = {
        noBatches: { en: "No batches found.", hi: "कोई बैच नहीं मिला।" },
        generateFirst: { en: "Generate timetables to view them.", hi: "उन्हें देखने के लिए समय सारणी बनाएं।" },
        batches: { en: "Batches:", hi: "बैच:" },
        batch: { en: "Batch", hi: "बैच" },
        weeklyTimetable: { en: "Weekly Timetable", hi: "साप्ताहिक समय सारणी" },
        noTimetable: { en: "No timetable found for this batch.", hi: "इस बैच के लिए कोई समय सारणी नहीं मिली।" },
        days: {
            en: { Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday' },
            hi: { Monday: 'सोमवार', Tuesday: 'मंगलवार', Wednesday: 'बुधवार', Thursday: 'गुरुवार', Friday: 'शुक्रवार' }
        }
    };

    return (
        <div className="timetable-layout">
            <SideBar activePage={'timetable'} />
            <main className="main-content">
                <Header title="Timetable" subtitle="Welcome back, Admin User" altTitle={altTitle} altSubtitle={altSubtitle} lang={lang} onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")} />
                <div className="content-area">
                    {/* Dept/Sem Groups */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        {batchGroups.length === 0 && (
                            <div style={{ color: '#e5484d', fontWeight: 600 }}>
                                {translations.noBatches[lang]}<br />
                                <span style={{ color: '#b3e5fc', fontWeight: 500 }}>
                                    {translations.generateFirst[lang]}
                                </span>
                            </div>
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
                                <div style={{ fontSize: '0.95rem', color: '#b3e5fc' }}>{translations.batches[lang]} {group.batches.map(b => b.batch).join(', ')}</div>
                            </div>
                        ))}
                    </div>

                    {/* Batch Cards for selected group */}
                    {selectedGroup && (
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {selectedGroup.batches.filter(batch => !selectedBatch || batch.key !== selectedBatch.key).map(batch => (
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
                                    <div style={{ fontSize: '0.95rem', color: '#b3e5fc' }}>{translations.batch[lang]} {batch.batch}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="timetable-container">
                        <div className="timetable-header">
                            <div className="timetable-title">
                                <h2>{translations.weeklyTimetable[lang]}</h2>
                                <p>{selectedBatch ? `${selectedBatch.branch} - ${selectedBatch.sem} - ${translations.batch[lang]} ${selectedBatch.batch}` : ''}</p>
                            </div>
                            <button className="batch-tag">{selectedBatch ? `${selectedBatch.branch} ${selectedBatch.sem} ${selectedBatch.batch}` : ''}</button>
                        </div>

                        {timetableData && timetableData.length > 0 ? (
                            timetableData.map((dayData, index) => (
                                <div className="day-section" key={index}>
                                    <h3>{translations.days[lang][dayData.day] || dayData.day}</h3>
                                    <div className="entries-container">
                                        {dayData.classes.map((classInfo, classIndex) => (
                                            <div className="timetable-entry" key={classIndex}>
                                                <div className="entry-top">
                                                    <span className={`entry-tag ${classInfo.type.toLowerCase()}`}>{classInfo.type}</span>
                                                    <h4>{classInfo.subject}</h4>
                                                </div>
                                                <div className="entry-details">
                                                    <div className="detail-item"><Clock size={14} /><span>{classInfo.time}</span></div>
                                                    <div className="detail-item"><MapPin size={14} /><span>{classInfo.location}</span></div>
                                                    <div className="detail-item"><User size={14} /><span>{classInfo.instructor}</span></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: '#e5484d', fontWeight: 600, marginTop: 32 }}>
                                {translations.noTimetable[lang]}<br />
                                <span style={{ color: '#b3e5fc', fontWeight: 500 }}>
                                    {translations.generateFirst[lang]}
                                </span>
                            </div>
                        )}
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