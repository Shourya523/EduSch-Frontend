import { useState, useMemo } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import MiniStatCard from '../components/MiniStatCard';
import RoomFilters from '../components/RoomFilters';
import RoomCard from '../components/RoomCard';
import RoomHeatmap from '../components/RoomHeatmap';
import './Rooms.css';
// import "./PageLayout.css"
import { DoorOpen, Building, Zap, Clock } from 'lucide-react';

// --- Mock Data (In a real app, this would come from an API) ---
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
    const [filters, setFilters] = useState({
        type: 'All Types',
        status: 'All Status'
    });

    // This function is passed down to the RoomFilters component
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // useMemo will re-calculate the filtered rooms only when the data or filters change
    const filteredRooms = useMemo(() => {
        return allRoomsData.filter(room => {
            const typeMatch = filters.type === 'All Types' || room.type === filters.type;
            const statusMatch = filters.status === 'All Status' || room.status === filters.status;
            return typeMatch && statusMatch;
        });
    }, [filters]);

    return (
        <div className="page-layout">
            <SideBar activePage={"rooms"} />
            <main className="main-content">
                <Header title="Rooms" subtitle="Welcome back, Admin User" />
                <div className="content-area">
                    <div className="stats-grid">
                        <MiniStatCard icon={<DoorOpen size={20} />} value={allRoomsData.length} label="Total Rooms" iconBgClass="icon-blue" />
                        <MiniStatCard icon={<Building size={20} />} value={allRoomsData.filter(r => r.status === 'Occupied').length} label="Currently Occupied" iconBgClass="icon-green" />
                        <MiniStatCard icon={<Zap size={20} />} value="78%" label="Average Utilization" iconBgClass="icon-yellow" />
                        <MiniStatCard icon={<Clock size={20} />} value="10-11 AM" label="Peak Hours" iconBgClass="icon-purple" />
                    </div>

                    <RoomFilters onFilterChange={handleFilterChange} />

                    <div className="room-grid">
                        {filteredRooms.map(room => (
                            <RoomCard
                                key={room.id}
                                name={room.name}
                                description={room.description}
                                typeTag={room.typeTag}
                                status={room.status}
                                occupancy={room.occupancy}
                                utilization={room.utilization}
                                scheduleInfo={room.scheduleInfo}
                            />
                        ))}
                    </div>
                    
                    <RoomHeatmap />
                </div>
            </main>
        </div>
    );
}
