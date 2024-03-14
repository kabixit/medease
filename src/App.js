import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { app } from './FirebaseProvider';
import SignupPage from './RegisterPage';
import AllMedications from './AllMedications'; // Import the AllMedications component
import MedicationReminderPage from './MedicationReminderPage';
import HealthTrackingPage from './HealthTrackingPage';
import Videocall from './VideoCall';
import Appointment from './Appointment';
import VoiceCallPage from './VoiceCall';
import EmergencyAssistance from './EmergencyAssistance';
import Location from './Location';
import FamilyCreatePage from './FamilyCreatePage';
import Dashboard from './Dashboard';
import FamilyProfileListPage from './FamilyProfileListPage';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(getAuth(app), provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(getAuth(app), provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signOut = () => {
    firebaseSignOut(getAuth(app)).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/home" element={user ? <HomePage user={user} /> : <Navigate to="/" />} />
        <Route path="/" element={<LoginPage auth={getAuth(app)} signInWithGoogle={signInWithGoogle} signInWithFacebook={signInWithFacebook} />} />
        <Route path="signup" element={<SignupPage auth={getAuth(app)} signInWithGoogle={signInWithGoogle} signInWithFacebook={signInWithFacebook} />} />
        <Route path="medications" element={<AllMedications />} />
        <Route path="medicationsreminder" element={<MedicationReminderPage />} />
        <Route path="Healthtracker" element={<HealthTrackingPage />} />
        <Route path="Video" element={<Videocall />}/>
        <Route path="appointment" element={<Appointment/>}/>
        <Route path='VoiceCall' element={<VoiceCallPage/>}/>
        <Route path='EmergencyAssistance' element={<EmergencyAssistance/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='Location' element={<Location/>}/>  
        <Route path='FamilyCreate' element={<FamilyCreatePage/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='FamilyProfile' element={<FamilyProfileListPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;