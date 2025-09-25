import React from 'react';
import './StatCard.css';

export default function StatCard({ icon, title, value, description, progressPercent }) {
    return (
        <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
                <span className="dashboard-metric-title">{title}</span>
                <div className="dashboard-metric-icon">{icon}</div>
            </div>
            <div className="dashboard-metric-value">
                {value}
            </div>
            <div className="dashboard-metric-footer">
                {/* Conditionally render the progress bar only if progressPercent is provided */}
                {progressPercent !== undefined && (
                    <div className="dashboard-metric-progress-container">
                        <div 
                            className="dashboard-metric-progress-fill" 
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                )}
                <p className="dashboard-metric-description">{description}</p>
            </div>
        </div>
    );
}
