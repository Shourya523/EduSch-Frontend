import React from 'react';
import './Disclaimer.css';

export default function DisclaimerPopup({ onClose }) {
  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-popup">
        <h2 className="disclaimer-heading">Welcome To EduSync</h2>
        <p className="disclaimer-text">
          Welcome to the demo! This site uses mock data to showcase the final design. Click <strong>Demo Dashboard</strong> to get started.
        </p>
        <div className="video-container">
          <video
            src="Sequence.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="disclaimer-video-header"
          />
        </div>
        <div className="button-div-disc">
          <button
            className="disclaimer-action-btn"
            onClick={onClose}
          >
            Let's Go
          </button>
        </div>
      </div>
    </div>
  );
}

