import { useState, useEffect } from 'react';
import './RoomFilters.css';

export default function RoomFilters({ onFilterChange, lang = 'en' }) {
    const [roomType, setRoomType] = useState('All Types');
    const [roomStatus, setRoomStatus] = useState('All Status');

    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({ type: roomType, status: roomStatus });
        }
    }, [roomType, roomStatus, onFilterChange]);

    const typeOptions = {
        en: { 'All Types': 'All Types', 'Lecture Theatre': 'Lecture Theatre', 'Classroom': 'Classroom', 'Laboratory': 'Laboratory' },
        hi: { 'All Types': 'सभी प्रकार', 'Lecture Theatre': 'व्याख्यान थिएटर', 'Classroom': 'कक्षा', 'Laboratory': 'प्रयोगशाला' }
    };

    const statusOptions = {
        en: { 'All Status': 'All Status', 'Available': 'Available', 'Occupied': 'Occupied', 'Maintenance': 'Maintenance' },
        hi: { 'All Status': 'सभी स्थितियाँ', 'Available': 'उपलब्ध', 'Occupied': 'व्यस्त', 'Maintenance': 'रखरखाव' }
    };

    return (
        <div className="room-filters-container">
            <div className="filters-header">
                <h4>{lang === 'hi' ? 'कमरा फिल्टर' : 'Room Filters'}</h4>
                <p>{lang === 'hi' ? 'प्रकार और स्थिति के अनुसार कमरे फ़िल्टर करें' : 'Filter rooms by type and status'}</p>
            </div>
            <div className="filter-controls">
                <div className="filter-group">
                    <label htmlFor="type-filter">{lang === 'hi' ? 'प्रकार:' : 'Type:'}</label>
                    <div className="select-wrapper">
                        <select id="type-filter" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                            {Object.entries(typeOptions.en).map(([value, label_en]) => (
                                <option key={value} value={value}>
                                    {lang === 'hi' ? typeOptions.hi[value] : label_en}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="filter-group">
                    <label htmlFor="status-filter">{lang === 'hi' ? 'स्थिति:' : 'Status:'}</label>
                    <div className="select-wrapper">
                        <select id="status-filter" value={roomStatus} onChange={(e) => setRoomStatus(e.target.value)}>
                            {Object.entries(statusOptions.en).map(([value, label_en]) => (
                                <option key={value} value={value}>
                                    {lang === 'hi' ? statusOptions.hi[value] : label_en}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}