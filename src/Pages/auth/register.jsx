import "./register.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Sun, ArrowLeft, Brain, Mail, Lock, User2, GraduationCap, Briefcase, Settings } from "lucide-react";
import tickIcon from "../../assets/icons/tick.svg";


function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("student"); // Default role is 'student'

  const handleGoHome = () => {
    navigate("/");
  };
  
  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="register-page-wrapper">
      <header className="sdpf-wrapper">
        <div className="sdpf-left" onClick={handleGoHome}>
          <ArrowLeft size={18} strokeWidth={2} color="white" />
          <span className="sdpf-sitemotto">Back To Home</span>
        </div>
        <div className="sdpf-right">
          <button className="sdpf-theme">
            <Sun size={18} />
          </button>
        </div>
      </header>

      {/* Main Registration Content */}
      <main className="register-container">
        <div className="register-header">
          <Brain size={40} color="white" />
          <div className="header-text-wrapper">
            <h1>EduSync</h1>
            <p>AI-Powered Scheduling</p>
          </div>
        </div>

        <div className="register-title">
          <h2>Create Account</h2>
          <p>Join EduSync and optimize your scheduling</p>
        </div>

        {/* --- Role Selection Section --- */}
        <div className="role-selection-section">
          <p className="role-prompt">I am a:</p>
          <div className="role-cards-container">

            {/* Student Card */}
            <div
              className={`role-card ${selectedRole === "student" ? "selected" : ""}`}
              onClick={() => setSelectedRole("student")}
            >
              <div className="role-info">
                <div className={`role-icon-wrapper ${selectedRole === "student" ? "selected" : ""}`}>
                  <GraduationCap size={24} color={selectedRole === "student" ? "black" : "white"} />
                </div>
                <div className="role-details">
                  <span className="role-name">Student</span>
                  <p className="role-description">Access your timetables and assignments</p>
                </div>
              </div>
              {selectedRole === "student" && (
                <div className="selected-check">
                  <img src={tickIcon} alt="tickIcon" className="selected-option"/>
                </div>
              )}
            </div>

            {/* Teacher Card */}
            <div
              className={`role-card ${selectedRole === "teacher" ? "selected" : ""}`}
              onClick={() => setSelectedRole("teacher")}
            >
              <div className="role-info">
                <div className={`role-icon-wrapper ${selectedRole === "teacher" ? "selected" : ""}`}>
                  <Briefcase size={24} color={selectedRole === "teacher" ? "black" : "white"} />
                </div>
                <div className="role-details">
                  <span className="role-name">Teacher</span>
                  <p className="role-description">Manage your classes and schedules</p>
                </div>
              </div>
               {selectedRole === "teacher" && (
                <div className="selected-check">
                  <img src={tickIcon} alt="tickIcon" className="selected-option"/>
                </div>
              )}
            </div>

            {/* Admin Card */}
             <div
              className={`role-card ${selectedRole === "admin" ? "selected" : ""}`}
              onClick={() => setSelectedRole("admin")}
            >
              <div className="role-info">
                <div className={`role-icon-wrapper ${selectedRole === "admin" ? "selected" : ""}`}>
                  <Settings size={24} color={selectedRole === "admin" ? "black" : "white"} />
                </div>
                <div className="role-details">
                  <span className="role-name">Admin</span>
                  <p className="role-description">Full system access and management</p>
                </div>
              </div>
               {selectedRole === "admin" && (
                <div className="selected-check">
                  <img src={tickIcon} alt="tickIcon" className="selected-option"/>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Registration Form */}
        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                    <Mail size={16} className="input-icon" />
                    <input type="email" id="email" placeholder="Enter your email" />
                </div>
            </div>
             <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-wrapper">
                    <User2 size={16} className="input-icon" />
                    <input type="text" id="fullName" placeholder="Enter your full name" />
                </div>
            </div>
             <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                    <Lock size={16} className="input-icon" />
                    <input type="password" id="password" placeholder="Create a password" />
                </div>
            </div>
             <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                    <Lock size={16} className="input-icon" />
                    <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                </div>
            </div>
            <button type="submit" className="register-button">
                Create Account & Send OTP
            </button>
        </form>

        <div className="signin-link-register">
          <p>
            Already have an account? <span onClick={handleSignIn}>Sign in</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;