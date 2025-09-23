import './StatCard.css';

export default function StatCard({ icon, title, value, description, progressPercent }) {
    return (
        <div className="stat-card">
            <div className="card-header">
                <span className="card-title">{title}</span>
                <div className="card-icon">{icon}</div>
            </div>
            <div className="card-value">
                {value}
            </div>
            <div className="card-footer">
                {/* Conditionally render the progress bar only if progressPercent is provided */}
                {progressPercent !== undefined && (
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                )}
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
}