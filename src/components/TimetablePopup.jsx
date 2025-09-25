import React from 'react';
import './TimetablePopup.css'; // Make sure this CSS file is styled for the new classes
import { X, CheckCircle } from 'lucide-react';

// --- Helper function to calculate simple metrics for each timetable ---
const calculateMetrics = (timetable) => {
    let gaps = 0;
    let maxClassesPerDay = 0;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    days.forEach(day => {
        const daySchedule = timetable.find(d => d.day === day);
        if (!daySchedule || daySchedule.classes.length === 0) return;

        // Sort classes by time to find gaps
        const sortedTimes = daySchedule.classes.map(c => c.time).sort();
        if (sortedTimes.length > maxClassesPerDay) {
            maxClassesPerDay = sortedTimes.length;
        }

        for (let i = 0; i < sortedTimes.length - 1; i++) {
            const time1 = parseInt(sortedTimes[i].split(':')[0]);
            const time2 = parseInt(sortedTimes[i + 1].split(':')[0]);
            if (time2 - time1 > 1) {
                // A gap is found if start times are more than 1 hour apart
                gaps += (time2 - time1 - 1);
            }
        }
    });

    return { gaps, maxClassesPerDay };
};


const TimetablePopup = ({ timetables, onSelect, onClose, scope }) => {

    // --- Logic moved to the top level of the component ---
    const augmentedTimetables = timetables.map((tt, index) => ({
        id: index,
        data: tt,
        metrics: calculateMetrics(tt),
    }));

    const timeSlots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "14:00-15:00", "15:00-16:00"];

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <div>
                        <h2>Choose an Optimal Timetable</h2>
                        <p>Select one of the generated options for <strong>{scope.dept} - {scope.semester} (Batch {scope.batch})</strong></p>
                    </div>
                    <button className="popup-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="popup-content">
                    {augmentedTimetables.map((option, index) => (
                        <div key={option.id} className="timetable-card">
                            <div className="card-header">
                                <h3>Option {index + 1}</h3>
                                <div className="card-metrics">
                                    <span>Gaps: <strong>{option.metrics.gaps}</strong></span>
                                    <span>Peak Day: <strong>{option.metrics.maxClassesPerDay} classes</strong></span>
                                </div>
                            </div>
                            <div className="card-body-preview">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            {/* Dynamically generate table headers from timeSlots */}
                                            {timeSlots.map(slot => (
                                                <th key={slot}>{slot.split('-')[0]}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {option.data.map(daySchedule => (
                                            <tr key={daySchedule.day}>
                                                <td>{daySchedule.day.substring(0, 3)}</td>
                                                {timeSlots.map(timeSlot => {
                                                    const cls = daySchedule.classes.find(c => c.time === timeSlot);
                                                    return (
                                                        <td key={timeSlot} className={cls ? 'filled-slot' : ''}>
                                                            {/* Detailed view for each class */}
                                                            {cls ? (
                                                                <div className="slot-details">
                                                                    <div className="slot-subject">{cls.subject}</div>
                                                                    <div className="slot-instructor">{cls.instructor}</div>
                                                                    <div className="slot-location">{cls.location}</div>
                                                                </div>
                                                            ) : ''}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <button className="btn-select" onClick={() => onSelect(option.data)}>
                                    <CheckCircle size={16} /> Select This Timetable
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimetablePopup;