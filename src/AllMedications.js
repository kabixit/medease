import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseProvider';
import './AllMedications.css';
import Navbar from './Navbar' // Import the CSS file

const AllMedications = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const medicationsCollection = collection(db, 'medications');
        const querySnapshot = await getDocs(medicationsCollection);
        const medsData = [];
        querySnapshot.forEach((doc) => {
          medsData.push(doc.data());
        });
        setMedications(medsData);
      } catch (error) {
        console.error('Error retrieving medications:', error);
      }
    };

    fetchMedications();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="medications-container">
      <h1 className="medications-title">All Medications</h1>
      <p className='p-div'>"Unlock your well-being with organized medication routines: Daily doses, daily victories."</p>
      <div className="medications-list">
        {medications.map((medication, index) => (
          <div key={index} className="medication-item">
            <h2 className="medication-name">{medication.name}</h2>
            <p><strong>Dosage:</strong> {medication.dosage}</p>
            <p><strong>Frequency:</strong> {medication.frequency}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AllMedications;
