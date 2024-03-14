import React, { useState } from 'react';
import './styles/HealthTrackingPage.css'; 
import { collection, addDoc } from 'firebase/firestore';
import { db } from './FirebaseProvider';
import { auth } from './FirebaseProvider'; // Assuming you have an AuthProvider
import Dashboard from './Dashboard'; // Assuming you have a Dashboard component

const HealthTrackingPage = () => {
  const currentUser = auth.currentUser;

  // State variables for inputs
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [exerciseTime, setExerciseTime] = useState('');
  const [caloriesConsumed, setCaloriesConsumed] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [mood, setMood] = useState('');
  const [medication, setMedication] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
        console.error('User not authenticated.');
        return;
      }
      // Validate input values
      if (!validateInputs()) {
        console.error('Invalid input values.');
        return;
      }
      // Create a new document in the 'basic_health' collection with the form data and user ID
      await addDoc(collection(db, 'health'), {
        userId: currentUser.email,
        weight,
        bloodPressure,
        bloodSugar,
        exerciseTime,
        caloriesConsumed,
        sleepHours,
        waterIntake,
        stressLevel,
        mood,
        medication,
      });
      // Clear the form fields after successful submission
      clearFormFields();
      console.log('Form data successfully submitted to Firebase.');
    } catch (error) {
      console.error('Error submitting form data to Firebase:', error);
    }
  };

  // Function to validate input values
  const validateInputs = () => {
    // Define normal ranges for each metric
    const normalRanges = {
      weight: [40, 150],
      bloodPressure: [[90, 60], [120, 80]], // Systolic/Diastolic
      bloodSugar: [70, 140],
      exerciseTime: [0, Infinity], // Any positive value
      caloriesConsumed: [0, Infinity], // Any positive value
      sleepHours: [5, 9],
      waterIntake: [1000, 4000],
      stressLevel: [0, 10],
      mood: [], // No validation for text input
      medication: [], // No validation for text input
    };
  
    // Validate each input value against normal ranges
    for (const metric in normalRanges) {
      const [min, max] = normalRanges[metric];
      const value = parseFloat(eval(metric)); // Avoid using eval
      if (isNaN(value) || value < min || value > max) {
        return false; // Invalid value
      }
    }
    return true; // All values are valid
  };
  

  // Function to clear form fields
  const clearFormFields = () => {
    setWeight('');
    setBloodPressure('');
    setBloodSugar('');
    setExerciseTime('');
    setCaloriesConsumed('');
    setSleepHours('');
    setWaterIntake('');
    setStressLevel('');
    setMood('');
    setMedication('');
  };

  return (
    <div className="health-tracking-page">
      <h1>Health Tracking and Monitoring</h1>

      <form onSubmit={handleSubmit}>
        {/* Section 1: Basic health metrics */}
        <div className="health-metrics-section">
          <h2>Basic Health Metrics</h2>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure:</label>
            <input type="text" id="bloodPressure" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="bloodSugar">Blood Sugar (mg/dL):</label>
            <input type="number" id="bloodSugar" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="exerciseTime">Exercise Time (minutes):</label>
            <input type="number" id="exerciseTime" value={exerciseTime} onChange={(e) => setExerciseTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="caloriesConsumed">Calories Consumed:</label>
            <input type="number" id="caloriesConsumed" value={caloriesConsumed} onChange={(e) => setCaloriesConsumed(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="sleepHours">Sleep Hours:</label>
            <input type="number" id="sleepHours" value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="waterIntake">Water Intake (ml):</label>
            <input type="number" id="waterIntake" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} />
          </div>
        </div>

        {/* Section 2: Mental health metrics */}
        <div className="mental-health-section">
          <h2>Mental Health Metrics</h2>
          <div className="form-group">
            <label htmlFor="stressLevel">Stress Level:</label>
            <input type="number" id="stressLevel" value={stressLevel} onChange={(e) => setStressLevel(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="mood">Mood:</label>
            <input type="text" id="mood" value={mood} onChange={(e) => setMood(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="medication">Medication:</label>
            <input type="text" id="medication" value={medication} onChange={(e) => setMedication(e.target.value)} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
        <a href="/dashboard">Go to Dashboard</a>
      </form>
    </div>
  );
};

export default HealthTrackingPage;
