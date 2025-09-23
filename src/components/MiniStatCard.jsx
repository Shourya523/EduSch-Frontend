import './MiniStatCard.css';

export default function MiniStatCard({ icon, value, label, iconBgClass }) {
    return (
        <div className="mini-stat-card">
            <div className={`icon-container ${iconBgClass || ''}`}>
                {icon}
            </div>
            <div className="text-content">
                <span className="card-value">{value}</span>
                <span className="card-label">{label}</span>
            </div>
        </div>
    );
}
