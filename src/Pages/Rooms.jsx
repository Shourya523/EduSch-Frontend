import { useState, useEffect, useMemo, useCallback } from 'react'; // Import useCallback
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import MiniStatCard from '../components/MiniStatCard';
import RoomFilters from '../components/RoomFilters';
import RoomCard from '../components/RoomCard';
import RoomHeatmap from '../components/RoomHeatmap';
import './Rooms.css';
import { DoorOpen, Building, Zap, Clock } from 'lucide-react';

// --- Mock Data ---
const allRoomsData = [
    { id: 1, name: 'LT-1', description: 'Lecture Theatre 1', type: 'Lecture Theatre', typeTag: 'LT', status: 'Occupied', occupancy: '95/120', utilization: 85, scheduleInfo: 'Free at 11:00 AM' },
    { id: 2, name: 'LT-2', description: 'Lecture Theatre 2', type: 'Lecture Theatre', typeTag: 'LT', status: 'Available', occupancy: '0/100', utilization: 72, scheduleInfo: 'Math-III at 2:00 PM' },
    { id: 3, name: 'LT-3', description: 'Lecture Theatre 3', type: 'Lecture Theatre', typeTag: 'LT', status: 'Occupied', occupancy: '65/80', utilization: 90, scheduleInfo: 'Free at 12:00 PM' },
    { id: 4, name: 'CL-101', description: 'Classroom 101', type: 'Classroom', typeTag: 'CL', status: 'Maintenance', occupancy: 'N/A', utilization: 0, scheduleInfo: 'Under Maintenance' },
    { id: 5, name: 'LAB-A', description: 'EMFT Lab', type: 'Laboratory', typeTag: 'LAB', status: 'Occupied', occupancy: '28/30', utilization: 95, scheduleInfo: 'Free at 1:00 PM' },
    { id: 6, name: 'LAB-B', description: 'DSA Lab', type: 'Laboratory', typeTag: 'LAB', status: 'Available', occupancy: '0/25', utilization: 88, scheduleInfo: 'DSA Lab at 11:00 AM' },
    { id: 7, name: 'LAB-C', description: 'Math Lab', type: 'Laboratory', typeTag: 'LAB', status: 'Occupied', occupancy: '18/20', utilization: 82, scheduleInfo: 'Free at 4:00 PM' },
    { id: 8, name: 'CL-102', description: 'Classroom 102', type: 'Classroom', typeTag: 'CL', status: 'Available', occupancy: '5/40', utilization: 45, scheduleInfo: 'Free all day' },
];

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filters, setFilters] = useState({
        type: 'All Types',
        status: 'All Status'
    });

    useEffect(() => {
        setRooms(allRoomsData);
    }, []);

    // Wrap handleFilterChange in useCallback
    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []); // Empty dependency array means the function is created only once

    const filteredRooms = useMemo(() => {
        return rooms.filter(room => {
            const typeMatch = filters.type === 'All Types' || room.type === filters.type;
            const statusMatch = filters.status === 'All Status' || room.status === filters.status;
            return typeMatch && statusMatch;
        });
    }, [filters, rooms]);

    return (
        <div className="page-layout">
            <SideBar activePage={"rooms"} />
            <main className="main-content">
                <Header title="Rooms" subtitle="Welcome back, Admin User" />
                <div className="content-area">
                    <div className="stats-grid">
                        <MiniStatCard icon={<DoorOpen size={20} />} value={rooms.length} label="Total Rooms" iconBgClass="icon-blue" />
                        {/* Corrected typo from MiniStatCagrd to MiniStatCard */}
                        <MiniStatCard icon={<Building size={20} />} value={rooms.filter(r => r.status === 'Occupied').length} label="Currently Occupied" iconBgClass="icon-green" />
                        <MiniStatCard icon={<Zap size={20} />} value="78%" label="Average Utilization" iconBgClass="icon-yellow" />
                        <MiniStatCard icon={<Clock size={20} />} value="10-11 AM" label="Peak Hours" iconBgClass="icon-purple" />
                    </div>

                    <RoomFilters onFilterChange={handleFilterChange} />

                    <div className="room-grid">
                        {filteredRooms.map(room => (
                            <RoomCard
                                key={room.id}
                                {...room} // Use object spread for cleaner props
                            />
                        ))}
                    </div>
                    
                    <RoomHeatmap />
                </div>
            </main>
        </div>
    );
}

