import { useState, useEffect } from 'react';
import './RoomFilters.css';

export default function RoomFilters({ onFilterChange }) {
    const [roomType, setRoomType] = useState('All Types');
    const [roomStatus, setRoomStatus] = useState('All Status');

    // This effect calls the onFilterChange prop whenever the filters change.
    // This is how this child component communicates back up to its parent.
    useEffect(() => {
        // We check if onFilterChange is actually provided as a prop before calling it
        if (onFilterChange) {
            onFilterChange({ type: roomType, status: roomStatus });
        }
    }, [roomType, roomStatus, onFilterChange]);

    return (
        <div className="room-filters-container">
            <div className="filters-header">
                <h4>Room Filters</h4>
                <p>Filter rooms by type and status</p>
            </div>
            <div className="filter-controls">
                <div className="filter-group">
                    <label htmlFor="type-filter">Type:</label>
                    <div className="select-wrapper">
                        <select
                            id="type-filter"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value="All Types">All Types</option>
                            <option value="Lecture Theatre">Lecture Theatre</option>
                            <option value="Classroom">Classroom</option>
                            <option value="Laboratory">Laboratory</option>
                        </select>
                    </div>
                </div>
                <div className="filter-group">
                    <label htmlFor="status-filter">Status:</label>
                    <div className="select-wrapper">
                        <select
                            id="status-filter"
                            value={roomStatus}
                            onChange={(e) => setRoomStatus(e.target.value)}
                        >
                            <option value="All Status">All Status</option>
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}