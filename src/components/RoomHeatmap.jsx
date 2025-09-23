import './RoomHeatmap.css';
import { LineChart } from 'lucide-react';

// Helper function to get the CSS class based on utilization percentage
const getHeatmapCellClass = (utilization) => {
    if (utilization == null) return 'heat-empty';
    if (utilization >= 90) return 'heat-90-plus';
    if (utilization >= 75) return 'heat-75-90';
    if (utilization >= 50) return 'heat-50-75';
    if (utilization >= 25) return 'heat-25-50';
    return 'heat-0-25';
};

// Mock data to build the component - this would be passed in as a prop
const mockHeatmapData = [
  { time: '9-10 AM', values: [85, 70, 90] },
  { time: '10-11 AM', values: [95, 85, 95] },
  { time: '11-12 PM', values: [75, 60, 100] },
  { time: '12-1 PM', values: [40, 30, 45] },
  { time: '1-2 PM', values: [20, 15, 25] },
  { time: '2-3 PM', values: [null, null, null]}, // Example of an empty row
  { time: '3-4 PM', values: [65, 55, 70] },
];

export default function RoomHeatmap({ heatmapData = mockHeatmapData }) {
    const headers = ['Lecture Theatres', 'Classrooms', 'Laboratories'];

    return (
        <div className="heatmap-container">
            <div className="heatmap-header">
                <LineChart size={20} />
                <h4>Room Utilization Heatmap</h4>
            </div>
            <p className="heatmap-description">Hourly utilization rates across different room types</p>

            <div className="heatmap-legend">
                <span>Utilization:</span>
                <div className="legend-item">
                    <div className="legend-color-box heat-0-25"></div>
                    <span>0-25%</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color-box heat-25-50"></div>
                    <span>25-50%</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color-box heat-50-75"></div>
                    <span>50-75%</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color-box heat-75-90"></div>
                    <span>75-90%</span>
                </div>
                 <div className="legend-item">
                    <div className="legend-color-box heat-90-plus"></div>
                    <span>90%+</span>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="heatmap-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            {headers.map(header => <th key={header}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {heatmapData.map((row) => (
                            <tr key={row.time}>
                                <td className="time-cell">{row.time}</td>
                                {row.values.map((value, index) => (
                                    <td key={`${row.time}-${index}`} className="data-cell">
                                        <div className={`cell-content ${getHeatmapCellClass(value)}`}>
                                            {value !== null ? `${value}%` : ''}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
