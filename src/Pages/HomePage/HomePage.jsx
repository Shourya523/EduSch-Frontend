import TopBar from '../../components/TopBar.jsx'
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import {
    ArrowRight,
    CheckCircle,
    BarChart,
    BrainCircuit,
    CalendarDays,
    Users,
    Clock,
    Shield,
    Zap,
    XCircle
} from "lucide-react";
import DisclaimerPopup from '../../components/Disclaimer.jsx';

export default function HomePage() {
    const navigate =useNavigate();
    return (
        <>
        <DisclaimerPopup />
            {/* Hero Section */}
            <section className="hero fade-up">
                {/* ... (previous hero section code remains unchanged) ... */}
                <TopBar />
                <div className="hero-badge">AI-Powered Academic Scheduling</div>
                <div className="hero-title">
                    Smart Timetables <br /> for Modern Universities
                </div>
                <p className="hero-subtext">
                    Transform your academic scheduling with EduSync's intelligent AI
                    system. Optimize faculty workloads, maximize classroom utilization, and
                    eliminate scheduling conflicts automatically.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary-home" onClick={()=>navigate("/register")}>
                        Start Free Trial <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-secondary-demo-dashboard" onClick={()=>navigate("/roles")}>View Demo Dashboard</button>
                </div>
            </section>

            {/* Intelligent Academic Management Section */}
            <section className="features-section fade-up">
                {/* ... (previous features section code remains unchanged) ... */}
                <div className="features-container">
                    <div className="features-content">
                        <h2>Intelligent Academic Management</h2>
                        <p>
                            EduSync revolutionizes university scheduling with advanced AI
                            algorithms that understand the complexities of academic
                            environments. Our platform seamlessly integrates with your existing
                            systems to provide real-time optimization and conflict resolution.
                        </p>
                        <ul className="features-list">
                            <li>
                                <CheckCircle size={20} className="feature-icon" />
                                Automated conflict detection and resolution
                            </li>
                            <li>
                                <CheckCircle size={20} className="feature-icon" />
                                Real-time faculty workload balancing
                            </li>
                            <li>
                                <CheckCircle size={20} className="feature-icon" />
                                Optimal classroom and resource allocation
                            </li>
                        </ul>
                    </div>
                    <div className="features-dashboard-home">
                        <div className="dashboard-header">
                            <BarChart size={18} />
                            <span>Live Analytics Dashboard</span>
                        </div>
                        <div className="dashboard-metric">
                            <div className="metric-info">
                                <span>Classroom Utilization</span>
                                <span>87%</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: "87%" }}
                                ></div>
                            </div>
                        </div>
                        <div className="dashboard-metric">
                            <div className="metric-info">
                                <span>Faculty Satisfaction</span>
                                <span>94%</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: "94%" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- NEW: Powerful Features Grid Section --- */}
            <section className="grid-features-section fade-up">
                <div className="grid-features-header">
                    <h2>Powerful Features for Academic Excellence</h2>
                    <p>
                        Comprehensive tools designed specifically for the unique challenges
                        of university scheduling
                    </p>
                </div>
                <div className="features-grid">
                    {/* Card 1 */}
                    <div className="feature-card">
                        <BrainCircuit size={28} className="card-icon" />
                        <h3>AI-Powered Optimization</h3>
                        <p>
                            Advanced machine learning algorithms automatically optimize
                            schedules for maximum efficiency
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="feature-card">
                        <CalendarDays size={28} className="card-icon" />
                        <h3>Smart Timetable Generation</h3>
                        <p>
                            Generate conflict-free timetables in minutes, not hours, with
                            intelligent constraint handling
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="feature-card">
                        <Users size={28} className="card-icon" />
                        <h3>Faculty Management</h3>
                        <p>
                            Balance workloads, track preferences, and ensure fair distribution
                            of teaching responsibilities
                        </p>
                    </div>
                    {/* Card 4 */}
                    <div className="feature-card">
                        <Clock size={28} className="card-icon" />
                        <h3>Real-Time Updates</h3>
                        <p>
                            Instant notifications and automatic adjustments when changes occur
                            in your schedule
                        </p>
                    </div>
                    {/* Card 5 */}
                    <div className="feature-card">
                        <Shield size={28} className="card-icon" />
                        <h3>Secure & Compliant</h3>
                        <p>
                            Enterprise-grade security with full compliance to educational
                            data protection standards
                        </p>
                    </div>
                    {/* Card 6 */}
                    <div className="feature-card">
                        <Zap size={28} className="card-icon" />
                        <h3>Lightning Fast</h3>
                        <p>
                            Process complex scheduling requirements in seconds with our
                            optimized algorithms
                        </p>
                    </div>
                </div>
                {/* --- NEW: Comparison Section --- */}
                <section className="comparison-section fade-up">
                    <h2>From Chaos to Clarity</h2>
                    <div className="comparison-container">
                        {/* Problems Card */}
                        <div className="comparison-card problems-card">
                            <h3>Traditional Scheduling Problems</h3>
                            <ul>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Manual conflict resolution takes weeks
                                </li>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Unbalanced faculty workloads
                                </li>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Poor classroom utilization
                                </li>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Last-minute schedule changes cause chaos
                                </li>
                            </ul>
                        </div>

                        {/* Solutions Card */}
                        <div className="comparison-card solutions-card">
                            <h3>EduSync Solutions</h3>
                            <ul>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    Automated conflict resolution in minutes
                                </li>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    AI-balanced faculty workload distribution
                                </li>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    Optimized classroom and resource usage
                                </li>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    Real-time adaptation to changes
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
            <section className="cta-section fade-up">
                <h2>Ready to Transform Your Scheduling?</h2>
                <p>
                    Join hundreds of universities already using EduSync to streamline
                    their academic operations
                </p>
                <div className="cta-actions">
                    <button className="btn btn-cta-primary">
                        Start Your Free Trial <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-cta-secondary">
                        Sign In to Dashboard
                    </button>
                </div>
            </section>
        </>
    );
}