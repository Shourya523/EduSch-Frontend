import React, { useState } from 'react';
import SideBarTeacher from '../../components/SideBar-teacher.jsx'
import './TeacherChangeRequests.css'
import Header from '../../components/Header';
import { GitPullRequest, ArrowRight, Clock, MapPin, Check, X, Filter, LayoutGrid, Menu, Bell } from 'lucide-react';

// --- STYLES (Embedded CSS) ---


// --- DUMMY COMPONENTS (to resolve imports) ---



// --- MOCK DATA for Change Requests ---
const allRequests = [
    {
        id: 'CR-001',
        requester: 'Prof. Sharma',
        status: 'Pending',
        timestamp: '2 hours ago',
        original: { subject: 'Data Structures', time: 'Mon, 9 AM', location: 'A-204' },
        proposed: { subject: 'Algorithms', time: 'Mon, 9 AM', location: 'A-204' }
    },
    {
        id: 'CR-002',
        requester: 'You',
        status: 'Approved',
        timestamp: '1 day ago',
        original: { subject: 'Digital Systems', time: 'Fri, 2 PM', location: 'B-101' },
        proposed: { subject: 'Digital Systems', time: 'Fri, 4 PM', location: 'B-102' }
    },
     {
        id: 'CR-003',
        requester: 'Dr. Verma',
        status: 'Pending',
        timestamp: '3 days ago',
        original: { subject: 'Digital Systems', time: 'Tue, 11 AM', location: 'Lab-C1' },
        proposed: { subject: 'Digital Systems', time: 'Wed, 11 AM', location: 'Lab-C1' }
    },
    {
        id: 'CR-004',
        requester: 'You',
        status: 'Rejected',
        timestamp: '5 days ago',
        original: { subject: 'Advanced Algorithms', time: 'Wed, 11 AM', location: 'A-301' },
        proposed: { subject: 'Request Cancel', time: '', location: '' }
    }
];

// --- MAIN COMPONENTS ---
const RequestCard = ({ request }) => (
    <div className={`request-card status-${request.status.toLowerCase()}`}>
        <div className="card-header">
            <div className="header-info">
                <span className="request-id">{request.id}</span>
                <span className="request-requester">from {request.requester}</span>
            </div>
            <span className="request-timestamp">{request.timestamp}</span>
        </div>
        <div className="card-body">
            <div className="slot-details original">
                <p className="slot-title">Original Slot</p>
                <p className="slot-subject">{request.original.subject}</p>
                <div className="slot-meta">
                    <span><Clock size={14} /> {request.original.time}</span>
                    <span><MapPin size={14} /> {request.original.location}</span>
                </div>
            </div>
            <div className="swap-icon">
                <ArrowRight size={24} />
            </div>
            <div className={`slot-details proposed ${request.proposed.subject.includes('Cancel') ? 'cancel' : ''}`}>
                <p className="slot-title">Proposed Change</p>
                 <p className="slot-subject">{request.proposed.subject}</p>
                <div className="slot-meta">
                   {request.proposed.time && <span><Clock size={14} /> {request.proposed.time}</span>}
                   {request.proposed.location && <span><MapPin size={14} /> {request.proposed.location}</span>}
                </div>
            </div>
        </div>
       {request.status === 'Pending' && request.requester !== 'You' && (
            <div className="card-footer">
                <button className="action-btn-dec decline"><X size={16} /> Decline</button>
                <button className="action-btn-appr approve"><Check size={16} /> Approve</button>
            </div>
        )}
    </div>
);


export default function TeacherChangeRequests() {
    const [filter, setFilter] = useState('pending');

    const filteredRequests = allRequests.filter(req => {
        if (filter === 'all') return true;
        return req.status.toLowerCase() === filter;
    });

    return (
        <>
            <div className="page-layout">
                <SideBarTeacher activePage={'change-requests'} />
                <main className="main-content">
                    <Header
                        title="Change Requests"
                        subtitle="Review and manage timetable modification proposals"
                    />
                    <div className="requests-page">
                        <div className="requests-container">
                            <div className="requests-header">
                                 <h2><Filter size={20} /> Filter Requests</h2>
                                <div className="filter-tabs">
                                    <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending ({allRequests.filter(r => r.status === 'Pending').length})</button>
                                    <button className={`filter-btn ${filter === 'approved' ? 'active' : ''}`} onClick={() => setFilter('approved')}>Approved</button>
                                    <button className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`} onClick={() => setFilter('rejected')}>Rejected</button>
                                    <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                                </div>
                            </div>
                            <div className="requests-list">
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map(request => (
                                        <RequestCard key={request.id} request={request} />
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <GitPullRequest size={48} />
                                        <p>No {filter} requests found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

