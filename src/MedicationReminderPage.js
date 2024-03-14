import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from './FirebaseProvider'; // Assuming you have Firebase auth in FirebaseProvider
import './MedicationReminderPage.css'; // Import the CSS file

const MedicationReminderPage = () => {
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [reminderTimes, setReminderTimes] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const medicationsCollection = collection(db, 'medications');
        const snapshot = await getDocs(medicationsCollection);
        const fetchedMedications = snapshot.docs.map((doc) => doc.data().name);
        setMedications(fetchedMedications);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };
    fetchMedications();
  }, []);

  const addReminder = () => {
    if (newReminder.trim() !== '') {
      setReminderTimes([...reminderTimes, newReminder]);
      setNewReminder('');
    }
  };

  const removeReminder = (index) => {
    setReminderTimes(reminderTimes.filter((_, i) => i !== index));
  };

  const saveReminders = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !selectedMedication || reminderTimes.length === 0) {
        console.error('Invalid data for reminders');
        return;
      }

      const remindersCollection = collection(db, 'reminders');
      await addDoc(remindersCollection, {
        userId: currentUser.email,
        medication: selectedMedication,
        reminderTimes: reminderTimes,
      });

      setSelectedMedication('');
      setReminderTimes([]);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="section-container1">
      <h1 className="section-title">
        Set Medication Reminders
      </h1>
      <div className="section-hero glassmorphism">
        <div className="stack-container">
          <select
            value={selectedMedication}
            onChange={(e) => setSelectedMedication(e.target.value)}
            className="select-box"
          >
            <option value="" disabled>Select medication</option>
            {medications.map((medication, index) => (
              <option key={index} value={medication}>
                {medication}
              </option>
            ))}
          </select>
          <div className="reminder-list">
            {reminderTimes.map((reminder, index) => (
              <div key={index} className="reminder-item">
                <button
                  className="remove-reminder-button"
                  onClick={() => removeReminder(index)}
                >
                  -
                </button>
                <span>{reminder}</span>
              </div>
            ))}
          </div>
          <div className="input-row">
            <input
              type="time"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Enter reminder time"
              className="input-time"
            />
            <button className="add-reminder-button" onClick={addReminder}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button className="save-reminders-button" onClick={saveReminders}>
            Save Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicationReminderPage;