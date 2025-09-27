import { useState, useEffect, useMemo, useCallback } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import MiniStatCard from '../components/MiniStatCard';
import RoomFilters from '../components/RoomFilters';
import RoomCard from '../components/RoomCard';
import RoomHeatmap from '../components/RoomHeatmap';
import './Rooms.css';
import { DoorOpen, Building, Zap, Clock } from 'lucide-react';
import AIChat from '../components/AiChat';

const allRoomsData = [
    // ... (allRoomsData remains the same)
];

const hiText = {
    title: "कक्षाएँ",
    subtitle: "स्वागत है, व्यवस्थापक उपयोगकर्ता",
    stats: {
        total: "कुल कक्षाएँ",
        occupied: "वर्तमान में व्यस्त",
        utilization: "औसत उपयोग",
        peak: "पीक घंटे",
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}