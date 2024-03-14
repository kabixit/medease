import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import BookedAppointments from './BookedAppointments'; // Import the BookedAppointments component
import './AppointmentScheduler.css'; // Import CSS for styling
import DoctorDetails from './DoctorDetails';
import Navbar from './Navbar';

// Sample images for doctors
import doctor1Image from './images/doctor1.jpg';
import doctor2Image from './images/doctor2.jpg';
import doctor3Image from './images/doctor3.jpg';

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, dateTime: '2024-03-15 10:00 AM', providerName: 'Dr. Smith', role: 'Heart Specialist', image: doctor1Image },
    { id: 2, dateTime: '2024-03-16 2:00 PM', providerName: 'Dr. Johnson', role: 'Neurosurgeon', image: doctor2Image },
    { id: 3, dateTime: '2024-03-17 11:30 AM', providerName: 'Dr. Davis', role: 'Orthopedic Surgeon', image: doctor3Image },
  ]);

  // State for managing selected appointment and patient details
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    reason: '',
    age: '',
    gender: '',
    height: '',
    weight: ''
  });

  // State for tracking booking count
  const [bookingCount, setBookingCount] = useState(0);

  // State for managing booked appointments
  const [bookedAppointments, setBookedAppointments] = useState([]);

  // Function to handle selecting an appointment
  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Function to handle booking appointment
  const handleBookAppointment = () => {
    // Implement booking logic here
    console.log('Booking appointment:', selectedAppointment);
    console.log('Patient details:', patientDetails);
    // Increment booking count
    setBookingCount(bookingCount + 1);
    // Add booked appointment to the list
    setBookedAppointments([...bookedAppointments, selectedAppointment]);
    // Reset selected appointment and patient details after booking
    setSelectedAppointment(null);
    setPatientDetails({
      name: '',
      reason: '',
      age: '',
      gender: '',
      height: '',
      weight: ''
    });
  };

  // Function to handle canceling appointment
  const handleCancelAppointment = () => {
    // Implement canceling logic here
    console.log('Canceling appointment:', selectedAppointment);
    // Reset selected appointment after canceling
    setSelectedAppointment(null);
  };

  // State for managing the display of booked appointments modal
  const [showBookedAppointments, setShowBookedAppointments] = useState(false);

  // Function to toggle the display of booked appointments modal
  const toggleBookedAppointmentsModal = () => {
    setShowBookedAppointments(!showBookedAppointments);
  };

  return (
    <>
    <Navbar/>
    <div className="appointment-scheduler">
      {/* FontAwesome icon for storing appointment details */}
      <div className="icon-container" onClick={toggleBookedAppointmentsModal}>
        <FontAwesomeIcon icon={faListAlt} size="3x" />
        {bookingCount > 0 && <span className="booking-count">{bookingCount}</span>}
      </div>

      {/* Modal for displaying booked appointments */}
      {showBookedAppointments && (
        <BookedAppointments bookedAppointments={bookedAppointments} onClose={toggleBookedAppointmentsModal} />
      )}

      <h1>Available Appointments</h1>
      <div className="appointments-container">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-info">
              <img src={appointment.image} alt={appointment.providerName} />
              <div>
                <p>{appointment.providerName}</p>
                <p>{appointment.role}</p> {/* Display doctor's role */}
                <p>{appointment.dateTime}</p>
              </div>
            </div>
            <div className="button-container">
              <button className="book-button" onClick={() => handleAppointmentSelect(appointment)}>Book</button>
              <button className="view-details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for booking appointment */}
      {selectedAppointment && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Booking</h2>
            <p>{`Are you sure you want to book an appointment with ${selectedAppointment.providerName} on ${selectedAppointment.dateTime}?`}</p>
            <div className="input-group">
              <label>Patient Name:</label>
              <input type="text" value={patientDetails.name} onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Reason for Visit:</label>
              <input type="text" value={patientDetails.reason} onChange={(e) => setPatientDetails({ ...patientDetails, reason: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Age:</label>
              <input type="number" value={patientDetails.age} onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Gender:</label>
              <select value={patientDetails.gender} onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Height:</label>
              <input type="text" value={patientDetails.height} onChange={(e) => setPatientDetails({ ...patientDetails, height: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Weight:</label>
              <input type="text" value={patientDetails.weight} onChange={(e) => setPatientDetails({ ...patientDetails, weight: e.target.value })} />
            </div>
            <div className="modal-buttons">
              <button onClick={handleBookAppointment}>Book</button>
              <button onClick={() => setSelectedAppointment(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Appointment;
