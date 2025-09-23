import AddFile from '../../components/AddFile';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import StatCard from '../../components/StatCard';
import './DashBoard.css';
import { RectangleHorizontal, Users, Clock, UserSquare2 } from "lucide-react";

export default function DashBoard() {
    return (
        <div className="dashboard-layout">
            <SideBar />
            <main className="main-content">
                <Header />
                <div className="content-area">
                    <div className="stats-grid">
                        <StatCard
                            title="Classroom Utilization"
                            icon={<RectangleHorizontal />}
                            value="78%"
                            description="+2% from last week"
                            progressPercent={78}
                        />
                        <StatCard
                            title="Faculty Workload"
                            icon={<Users />}
                            value="16.8h"
                            description="Average per week"
                            progressPercent={65}
                        />
                        <StatCard
                            title="Peak Hours"
                            icon={<Clock />}
                            value="10-12 AM"
                            description="Highest utilization"
                        />
                        <StatCard
                            title="Total Faculty"
                            icon={<UserSquare2 />}
                            value="142"
                            description="5 on leave"
                            progressPercent={95}
                        />
                    </div>
                    
                    {/* The AddFile component is now included below */}
                    <AddFile />

                </div>
            </main>
        </div>
    );
}