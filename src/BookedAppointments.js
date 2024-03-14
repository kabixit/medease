import React from 'react';
import './BookedAppointments.css'; // Import CSS for styling

const BookedAppointments = ({ bookedAppointments, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Booked Appointments</h2>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
        <div className="appointment-list">
          {bookedAppointments.length === 0 ? (
            <p>No appointments booked.</p>
          ) : (
            <ul>
              {bookedAppointments.map((appointment, index) => (
                <li key={index}>
                  <p><span>Date:</span> {appointment.dateTime}</p>
                  <p><span>Provider:</span> {appointment.providerName}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedAppointments;
