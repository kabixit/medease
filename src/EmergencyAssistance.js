import React from 'react';
import './EmergencyAssistance.css'

const EmergencyAssistancePage = () => {
    const handleEmergencyClick = () => {
        // Replace '1234567890' with the phone number of the relative or emergency contact
        window.location.href = 'tel:1234567890';
    };

    return (
        <div className="emergency-assistance-page">
            <h1>Emergency Assistance</h1>
            <button className="sos-button" onClick={handleEmergencyClick}>SOS</button>
        </div>
    );
};

export default EmergencyAssistancePage;
