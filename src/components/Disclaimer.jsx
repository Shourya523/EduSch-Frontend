import React, { useState, useEffect } from 'react';
import './Disclaimer.css'; // Styles for the disclaimer popup

export default function DisclaimerPopup() {
  // The popup is visible only if 'disclaimerViewed' is not 'true' in localStorage.
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect to check localStorage only on the client-side after mount.
  useEffect(() => {
    if (localStorage.getItem('disclaimerViewed') !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleButtonClick = () => {
    // Set the flag in localStorage so it doesn't show again on future visits.
    localStorage.setItem('disclaimerViewed', 'true');
    // Hide the popup.
    setIsVisible(false);
  };

  // If the popup is not visible, render nothing.
  if (!isVisible) {
    return null;
  }

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-popup">
        {/* The 'X' button has been removed. */}

        <h2 className="disclaimer-heading">Welcome To EduSync</h2>

        <p className="disclaimer-text">
          Welcome to the demo! This site uses mock data to showcase the final design. Click <strong>Demo Dashboard</strong> to get started.
        </p>

        <div className="video-container">
          <video
            src="public/Sequence 04.mp4" // Placeholder video source
            autoPlay
            loop
            muted
            playsInline // Important for iOS compatibility
            className="disclaimer-video-header"
          />
        </div>

        {/* The new "Let's Go" button is at the bottom. */}
        <div className="button-div-disc">
            <button
          className="disclaimer-action-btn"
          onClick={handleButtonClick}
        >
          Let's Go
        </button>
        </div>
      </div>
    </div>
  );
}

