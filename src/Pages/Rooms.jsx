import { useState, useEffect, useMemo, useCallback } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import MiniStatCard from '../components/MiniStatCard';
import RoomFilters from '../components/RoomFilters';
import RoomCard from '../components/RoomCard';
import RoomHeatmap from '../components/RoomHeatmap';
import './Rooms.css';
import { DoorOpen, Building, Zap, Clock, Sparkles } from 'lucide-react';
import AIChat from '../components/AiChat';

// --- ADD THIS MOCK DATA ---
const allRoomsData = [
    { id: 'LT-1', name: 'LT-1', description: 'Lecture Theatre 1', type: 'Lecture Theatre', typeTag: 'LT', status: 'Occupied', occupancy: '95/120', utilization: '85', scheduleInfo: 'Free at 11:00 AM' },
    { id: 'LT-2', name: 'LT-2', description: 'Lecture Theatre 2', type: 'Lecture Theatre', typeTag: 'LT', status: 'Available', occupancy: '0/100', utilization: '72', scheduleInfo: 'Math-III at 2:00 PM' },
    { id: 'LT-3', name: 'LT-3', description: 'Lecture Theatre 3', type: 'Lecture Theatre', typeTag: 'LT', status: 'Occupied', occupancy: '65/80', utilization: '90', scheduleInfo: 'Free at 12:00 PM' },
    { id: 'C-101', name: 'C-101', description: 'Classroom 101', type: 'Classroom', typeTag: 'CR', status: 'Available', occupancy: '0/45', utilization: '65', scheduleInfo: 'Next: Physics at 1:00 PM' },
    { id: 'CSL-A', name: 'CS Lab-A', description: 'Computer Science Lab A', type: 'Laboratory', typeTag: 'LAB', status: 'Maintenance', occupancy: 'N/A', utilization: '55', scheduleInfo: 'Unavailable Today' },
    { id: 'C-204', name: 'C-204', description: 'Classroom 204', type: 'Classroom', typeTag: 'CR', status: 'Occupied', occupancy: '40/45', utilization: '88', scheduleInfo: 'Free at 3:00 PM' },
];

const hiText = {
    title: "कक्षाएँ",
    subtitle: "स्वागत है, व्यवस्थापक उपयोगकर्ता",
    stats: {
        total: "कुल कक्षाएँ",
        occupied: "वर्तमान में व्यस्त",
        utilization: "औसत उपयोग",
        peak: "व्यस्ततम घंटे",
        peakValue: "10-11 सुबह"
    }
};

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filters, setFilters] = useState({
        type: 'All Types',
        status: 'All Status'
    });
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    useEffect(() => {
        setRooms(allRoomsData);
    }, []);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    const filteredRooms = useMemo(() => {
        return rooms.filter(room => {
            const typeMatch = filters.type === 'All Types' || room.type === filters.type;
            const statusMatch = filters.status === 'All Status' || room.status === filters.status;
            return typeMatch && statusMatch;
        });
    }, [filters, rooms]);

    const miniStatData = {
        total: rooms.length,
        occupied: rooms.filter(r => r.status === 'Occupied').length,
        utilization: rooms.length > 0 ? `${Math.round(rooms.reduce((acc, r) => acc + (parseInt(r.utilization) || 0), 0) / rooms.length)}%` : '0%',
        peak: lang === 'hi' ? hiText.stats.peakValue : "10-11 AM"
    };

    return (
        <div className="page-layout">
            <SideBar activePage={"rooms"} />
            <main className="main-content">
                <Header
                    title="Rooms"
                    subtitle="Welcome back, Admin User"
                    altTitle={hiText.title}
                    altSubtitle={hiText.subtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="content-area">
                    <div className="stats-grid">
                        <MiniStatCard icon={<DoorOpen size={20} />} value={miniStatData.total} label={lang === 'hi' ? hiText.stats.total : "Total Rooms"} iconBgClass="icon-blue" />
                        <MiniStatCard icon={<Building size={20} />} value={miniStatData.occupied} label={lang === 'hi' ? hiText.stats.occupied : "Currently Occupied"} iconBgClass="icon-green" />
                        <MiniStatCard icon={<Zap size={20} />} value={miniStatData.utilization} label={lang === 'hi' ? hiText.stats.utilization : "Average Utilization"} iconBgClass="icon-yellow" />
                        <MiniStatCard icon={<Clock size={20} />} value={miniStatData.peak} label={lang === 'hi' ? hiText.stats.peak : "Peak Hours"} iconBgClass="icon-purple" />
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
                    <Sparkles
                        size={24} // Adjust size as needed, using the default 24x24 viewBox
                        strokeWidth={2}
                        aria-label="AI Sparkles Icon" // Good practice for accessibility
                    />
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}