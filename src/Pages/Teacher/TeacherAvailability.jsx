import React, { useState } from 'react';
import SideBarTeacher from '../../components/SideBar-teacher';
import Header from '../../components/Header';
import './TeacherAvailability.css';
import { Calendar, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

// --- MOCK DATA (EXPANDED with REJECTED status) ---
const leaveData = {
    '2025-09-02': { status: 'Approved', type: 'Annual Leave' },
    '2025-09-03': { status: 'Approved', type: 'Annual Leave' },
    '2025-09-12': { status: 'Approved', type: 'Sick Leave' },
    '2025-09-18': { status: 'Approved', type: 'Annual Leave' },
    '2025-09-19': { status: 'Approved', type: 'Annual Leave' },
    '2025-09-22': { status: 'Rejected', type: 'Annual Leave' },
    '2025-09-29': { status: 'Pending', type: 'Conference' },
    '2025-09-30': { status: 'Pending', type: 'Conference' },
    '2025-10-01': { status: 'Pending', type: 'Conference' },
};

// Represents the teacher's leave history (EXPANDED with REJECTED status)
const leaveHistory = [
    { id: 1, type: 'Conference', dates: 'Sep 29, 2025 - Oct 01, 2025', status: 'Pending' },
    { id: 5, type: 'Annual Leave', dates: 'Sep 22, 2025', status: 'Rejected' },
    { id: 2, type: 'Annual Leave', dates: 'Sep 18, 2025 - Sep 19, 2025', status: 'Approved' },
    { id: 3, type: 'Sick Leave', dates: 'Sep 12, 2025', status: 'Approved' },
    { id: 6, type: 'Annual Leave', dates: 'Sep 02, 2025 - Sep 03, 2025', status: 'Approved' },
    { id: 4, type: 'Annual Leave', dates: 'Aug 04, 2025 - Aug 08, 2025', status: 'Approved' },
];

const LeaveCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1)); // September 2025

    const renderHeader = () => (
        <div className="calendar-header">
            <button><ChevronLeft size={20} /></button>
            <span>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}</span>
            <button><ChevronRight size={20} /></button>
        </div>
    );
    const renderDays = () => (
        <div className="calendar-days">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}</div>
    );
    const renderCells = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(1 - monthStart.getDay());
        const cells = [];
        let day = new Date(startDate);
        while (day <= monthEnd || cells.length % 7 !== 0 || cells.length < 42) {
            const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
            const dayStatus = leaveData[formattedDate]?.status.toLowerCase();
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            cells.push(
                <div key={day} className={`calendar-cell ${!isCurrentMonth ? 'disabled' : ''} ${dayStatus ? `leave-${dayStatus}` : ''}`}>
                    {day.getDate()}
                </div>
            );
            day.setDate(day.getDate() + 1);
        }
        return <div className="calendar-grid">{cells}</div>;
    };
    return <div className="calendar-container">{renderHeader()}{renderDays()}{renderCells()}</div>;
};

export default function TeacherAvailability() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="page-layout">
            <SideBarTeacher activePage={'availability-leave'} />
            <main className="main-content">
                <Header title="Availability & Leave" subtitle="Manage your schedule and request time off">
                    <button className="header-btn primary" onClick={() => setIsModalOpen(true)}>
                        <Plus size={16} />
                        <span>Request Leave</span>
                    </button>
                </Header>
                <div className="availability-page">
                    <div className="availability-columns">
                        {/* Left Column: Stats and History */}
                        <div className="info-section">
                            <div className="leave-stats-grid">
                                <div className="info-item"><p className="info-item-label">Annual Leave Taken</p><p className="info-item-value">9 / 12</p></div>
                                <div className="info-item"><p className="info-item-label">Sick Leave Taken</p><p className="info-item-value">1 / 8</p></div>
                            </div>
                            <div className="leave-history">
                                <h4>Leave History</h4>
                                <div className="leave-history-list">
                                    {leaveHistory.map(item => (
                                        <div className="leave-history-item" key={item.id}>
                                            <div className="item-details">
                                                <span className="item-type">{item.type}</span>
                                                <span className="item-dates">{item.dates}</span>
                                            </div>
                                            <span className={`item-status status-${item.status.toLowerCase()}`}>{item.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Right Column: Calendar */}
                        <div className="calendar-section">
                            <LeaveCalendar />
                            <div className="legend-container">
                                <div className="legend-item"><span className="legend-dot approved"></span> Approved</div>
                                <div className="legend-item"><span className="legend-dot pending"></span> Pending</div>
                                <div className="legend-item"><span className="legend-dot rejected"></span> Rejected</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leave Request Modal */}
                {isModalOpen && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Request Time Off</h3>
                                <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                            </div>
                            <form className="modal-form">
                                <div className="form-group">
                                    <label htmlFor="leave-type">Leave Type</label>
                                    <select id="leave-type">
                                        <option>Annual Leave</option>
                                        <option>Sick Leave</option>
                                        <option>Conference</option>
                                        <option>Unpaid Leave</option>
                                    </select>
                                </div>
                                <div className="form-group-row">
                                    <div className="form-group">
                                        <label htmlFor="start-date">Start Date</label>
                                        <input type="date" id="start-date" defaultValue="2025-09-26" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="end-date">End Date</label>
                                        <input type="date" id="end-date" defaultValue="2025-09-26" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reason">Reason (Optional)</label>
                                    <textarea id="reason" rows="3" placeholder="e.g., Attending conference..."></textarea>
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="form-btn secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="submit" className="form-btn primary">Submit Request</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}