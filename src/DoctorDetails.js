import React from 'react';
import './DoctorDetails.css'; // Import CSS for styling

const DoctorDetails = ({ doctor, onClose }) => {
  return (
    <div className="doctor-details-modal">
      <div className="doctor-details-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Doctor Details</h2>
        <div className="doctor-info">
          <img src={doctor.image} alt={doctor.providerName} />
          <div>
            <p><strong>Name:</strong> {doctor.providerName}</p>
            <p><strong>Role:</strong> {doctor.role}</p>
            <p><strong>Working Hospital:</strong> {doctor.workingHospital}</p>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <p><strong>Achievements:</strong> {doctor.achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
