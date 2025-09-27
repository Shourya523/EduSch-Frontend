import React from 'react';
import './ApprovalQueue.css';
import { Check, X } from 'lucide-react';

// Mock data for demonstration purposes
const approvalRequests = [
    { id: 1, department: 'Computer Science', semester: '5th', submittedBy: 'Dr. Aneesh Kumar' },
    { id: 2, department: 'Mechanical Engineering', semester: '3rd', submittedBy: 'Dr. Sarah John' },
    { id: 3, department: 'Electronics', semester: '7th', submittedBy: 'Prof. V. Menon' }
];

export default function ApprovalQueue({ lang = 'en' }) {
    return (
        <div className="approval-queue-container">
            <h3>{lang === 'hi' ? 'अनुमोदन कतार' : 'Approval Queue'}</h3>
            <div className="request-list">
                {approvalRequests.length > 0 ? (
                    approvalRequests.map(request => (
                        <div key={request.id} className="request-item">
                            <div className="request-info">
                                <p className="department-info">
                                    {request.department} - <span>{lang === 'hi' ? 'सेमेस्टर' : 'Sem'} {request.semester}</span>
                                </p>
                                <p className="submitted-by">{lang === 'hi' ? 'द्वारा प्रस्तुत' : 'Submitted by'} {request.submittedBy}</p>
                            </div>
                            <div className="request-actions">
                                <button className="action-btn reject-btn" aria-label={lang === 'hi' ? 'अस्वीकार करें' : 'Reject'}>
                                    <X size={16} />
                                </button>
                                <button className="action-btn approve-btn" aria-label={lang === 'hi' ? 'अनुमोदन दें' : 'Approve'}>
                                    <Check size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-requests">{lang === 'hi' ? 'कोई लंबित अनुमोदन नहीं है।' : 'No pending approvals.'}</p>
                )}
            </div>
        </div>
    );
}