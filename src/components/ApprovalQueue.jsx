import React from 'react';
import './ApprovalQueue.css';
import { Check, X } from 'lucide-react';

// Mock data for demonstration purposes
const approvalRequests = [
    { id: 1, department: 'Computer Science', semester: '5th', submittedBy: 'Dr. Aneesh Kumar' },
    { id: 2, department: 'Mechanical Engineering', semester: '3rd', submittedBy: 'Dr. Sarah John' },
    { id: 3, department: 'Electronics', semester: '7th', submittedBy: 'Prof. V. Menon' }
];

export default function ApprovalQueue() {
    return (
        <div className="approval-queue-container">
            <h3>Approval Queue</h3>
            <div className="request-list">
                {approvalRequests.length > 0 ? (
                    approvalRequests.map(request => (
                        <div key={request.id} className="request-item">
                            <div className="request-info">
                                <p className="department-info">
                                    {request.department} - <span>Sem {request.semester}</span>
                                </p>
                                <p className="submitted-by">Submitted by {request.submittedBy}</p>
                            </div>
                            <div className="request-actions">
                                <button className="action-btn reject-btn" aria-label="Reject">
                                    <X size={16} />
                                </button>
                                <button className="action-btn approve-btn" aria-label="Approve">
                                    <Check size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-requests">No pending approvals.</p>
                )}
            </div>
        </div>
    );
}
