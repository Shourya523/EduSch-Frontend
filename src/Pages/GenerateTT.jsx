import AddFile from '../components/AddFile';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import './GenerateTT.css';
import { Languages } from 'lucide-react';

export default function GenerateTT() {
    return (
        <div className="page-layout">
            <SideBar activePage={'gentt'}  />
            <main className="main-content">
                <Header 
                    title="Generate Timetable" 
                    subtitle="Welcome back, Admin User" 
                />
                <div className="content-area">
                    {/* This is the extra button shown in the screenshot */}
                    <div className="content-header">
                        <button className="language-toggle-btn">
                            <Languages size={18} />
                            <span>हिन्दी</span>
                        </button>
                    </div>

                    <AddFile 
                        title="Upload Timetable Data"
                        description="Upload an Excel file containing batch schedules and room allocations"
                    />
                </div>
            </main>
        </div>
    );
}