import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseProvider';
import './styles/AllMedications.css'; // Import the CSS file

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
    <div className="container">
      <h1 className="title">All Medications</h1>
      <div className="medications-container">
        {medications.map((medication, index) => (
          <div key={index} className="medication-card">
            <h2 className="medication-name">{medication.name}</h2>
            <p className="medication-details">
              <strong>Dosage:</strong> {medication.dosage}<br />
              <strong>Frequency:</strong> {medication.frequency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMedications;
