import './RoomCard.css';
import { Circle, Clock } from 'lucide-react';

// Helper function to determine the CSS class for the status tag
const getStatusClass = (status) => {
    if (!status) return '';
    const lowerCaseStatus = status.toLowerCase();
    switch (lowerCaseStatus) {
        case 'occupied':
            return 'status-occupied';
        case 'available':
            return 'status-available';
        case 'maintenance':
            return 'status-maintenance';
        default:
            return '';
    }
};

export default function RoomCard({ name, description, typeTag, status, occupancy, utilization, scheduleInfo }) {
    
    // Calculate progress for the occupancy bar, e.g., "65/80" -> 81.25%
    const [current, max] = occupancy ? occupancy.split('/').map(Number) : [0, 100];
    const occupancyPercent = max > 0 ? (current / max) * 100 : 0;

    return (
        <div className="room-card">
            <div className="room-card-header">
                <div className="room-title">
                    <h4>{name || 'N/A'}</h4>
                    <p>{description || 'No description'}</p>
                </div>
                <div className="room-tags">
                    <span className="tag type-tag">{typeTag || 'Gen'}</span>
                    <span className={`tag status-tag ${getStatusClass(status)}`}>
                        <Circle size={8} fill="currentColor" strokeWidth={0} />
                        {status || 'Unknown'}
                    </span>
                </div>
            </div>

            <div className="room-card-body">
                <div className="progress-item">
                    <div className="progress-labels">
                        <span>Current Occupancy</span>
                        <span>{occupancy || '0/0'}</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${occupancyPercent}%` }}></div>
                    </div>
                </div>
                <div className="progress-item">
                    <div className="progress-labels">
                        <span>Weekly Utilization</span>
                        <span>{utilization || 0}%</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${utilization || 0}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="room-card-footer">
                <Clock size={14} />
                <span>{scheduleInfo || 'No schedule info'}</span>
            </div>
        </div>
    );
}