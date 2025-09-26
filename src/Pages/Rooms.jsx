import { useState, useEffect, useMemo, useCallback } from 'react'; // Import useCallback
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import MiniStatCard from '../components/MiniStatCard';
import RoomFilters from '../components/RoomFilters';
import RoomCard from '../components/RoomCard';
import RoomHeatmap from '../components/RoomHeatmap';
import './Rooms.css';
import { DoorOpen, Building, Zap, Clock } from 'lucide-react';
import AIChat from '../components/AiChat';

// --- Realistic BTech College Room Data ---
const allRoomsData = [
    { id: 1, name: 'LT-101', description: 'Main Lecture Theatre', type: 'Lecture Theatre', typeTag: 'LT', status: 'Occupied', occupancy: '110/120', utilization: 92, scheduleInfo: 'Free at 11:00 AM' },
    { id: 2, name: 'LT-102', description: 'Lecture Theatre 2', type: 'Lecture Theatre', typeTag: 'LT', status: 'Available', occupancy: '0/100', utilization: 68, scheduleInfo: 'Math-III at 2:00 PM' },
    { id: 3, name: 'LT-201', description: 'Lecture Theatre 3', type: 'Lecture Theatre', typeTag: 'LT', status: 'Occupied', occupancy: '78/80', utilization: 97, scheduleInfo: 'Free at 12:00 PM' },
    { id: 4, name: 'CR-201', description: 'Classroom 201', type: 'Classroom', typeTag: 'CR', status: 'Maintenance', occupancy: 'N/A', utilization: 0, scheduleInfo: 'Under Maintenance' },
    { id: 5, name: 'PHY-LAB', description: 'Physics Laboratory', type: 'Laboratory', typeTag: 'LAB', status: 'Occupied', occupancy: '28/30', utilization: 95, scheduleInfo: 'Free at 1:00 PM' },
    { id: 6, name: 'CS-LAB', description: 'Computer Science Lab', type: 'Laboratory', typeTag: 'LAB', status: 'Available', occupancy: '0/40', utilization: 80, scheduleInfo: 'DSA Lab at 11:00 AM' },
    { id: 7, name: 'EC-LAB', description: 'Electronics Lab', type: 'Laboratory', typeTag: 'LAB', status: 'Occupied', occupancy: '22/25', utilization: 88, scheduleInfo: 'Free at 4:00 PM' },
    { id: 8, name: 'CR-202', description: 'Classroom 202', type: 'Classroom', typeTag: 'CR', status: 'Available', occupancy: '8/40', utilization: 52, scheduleInfo: 'Free all day' },
    { id: 9, name: 'BIO-LAB', description: 'Biotechnology Lab', type: 'Laboratory', typeTag: 'LAB', status: 'Occupied', occupancy: '18/20', utilization: 90, scheduleInfo: 'Free at 3:00 PM' },
    { id: 10, name: 'MECH-LAB', description: 'Mechanical Workshop', type: 'Laboratory', typeTag: 'LAB', status: 'Occupied', occupancy: '25/30', utilization: 83, scheduleInfo: 'Free at 5:00 PM' },
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
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");
    const altTitle = "कक्षाएँ";
    const altSubtitle = "स्वागत है, व्यवस्थापक उपयोगकर्ता";
    const miniStatLabels = [
        lang === "hi" ? "कुल कक्षाएँ" : "Total Rooms",
        lang === "hi" ? "वर्तमान में व्यस्त" : "Currently Occupied",
        lang === "hi" ? "औसत उपयोग" : "Average Utilization",
        lang === "hi" ? "पीक घंटे" : "Peak Hours"
    ];
    return (
        <div className="page-layout">
            <SideBar activePage={"rooms"} />
            <main className="main-content">
                <Header
                    title="Rooms"
                    subtitle="Welcome back, Admin User"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="content-area">
                    <div className="stats-grid">
                        <MiniStatCard icon={<DoorOpen size={20} />} value={rooms.length} label={miniStatLabels[0]} iconBgClass="icon-blue" />
                        <MiniStatCard icon={<Building size={20} />} value={rooms.filter(r => r.status === 'Occupied').length} label={miniStatLabels[1]} iconBgClass="icon-green" />
                        <MiniStatCard icon={<Zap size={20} />} value={rooms.length > 0 ? `${Math.round(rooms.reduce((acc, r) => acc + (parseInt(r.utilization) || 0), 0) / rooms.length)}%` : '0%'} label={miniStatLabels[2]} iconBgClass="icon-yellow" />
                        <MiniStatCard icon={<Clock size={20} />} value="10-11 AM" label={miniStatLabels[3]} iconBgClass="icon-purple" />
                    </div>
                    <RoomFilters onFilterChange={handleFilterChange} lang={lang} />
                    <div className="room-grid">
                        {filteredRooms.map(room => (
                            <RoomCard
                                key={room.id}
                                {...room}
                                lang={lang}
                            />
                        ))}
                    </div>
                    <RoomHeatmap lang={lang} />
                </div>
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}

