import React, { useState, useEffect } from 'react';
import '../css/disc-popup.css'; // Import CSS for styling

const DiscPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Show the popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    // Add the class to body when popup is shown
    if (showPopup) {
      document.body.classList.add('popup-active');
    } else {
      document.body.classList.remove('popup-active');
    }

    return () => {
      clearTimeout(timer); // Clean up the timer on unmount
      document.body.classList.remove('popup-active'); // Ensure class is removed on unmount
    };
  }, [showPopup]);

  const handleAgreeChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleAgree = () => {
    if (isChecked) {
      setIsAgreed(true);
      setShowPopup(false);
    }
  };

  if (!isAgreed) {
    return showPopup ? (
      <div className="popup-overlay">
        <div className="popup-content">
          <p>
            Welcome to our website! Please review our terms and conditions before proceeding.
          </p>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleAgreeChange}
            />
            I agree to the terms and conditions
          </label>
          <button onClick={handleAgree} disabled={!isChecked}>
            Continue
          </button>
        </div>
      </div>
    ) : null;
  }

  // Render the main content if the user has agreed
  return (
    <div>
      <h1>Welcome to the Main Content</h1>
      {/* Your main app content here */}
    </div>
  );
};

export default DiscPopup;
