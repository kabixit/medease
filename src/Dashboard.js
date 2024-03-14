import React, { useState, useEffect } from 'react';
import './styles/Dashboard.css'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirebaseProvider';
import { auth } from './FirebaseProvider'; // Assuming you have an AuthProvider
import Chart from 'chart.js/auto'; // Import Chart.js

const Dashboard = () => {
  const currentUser = auth.currentUser;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        // Fetch data from the 'basic_health' collection for the current user
        const q = query(collection(db, 'basic_health'), where('userId', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        const userDataArray = [];
        querySnapshot.forEach((doc) => {
          userDataArray.push(doc.data());
        });
        setUserData(userDataArray);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    // Draw charts when userData changes
    if (userData) {
      drawCharts();
    }
  }, [userData]);

  const drawCharts = () => {
    const labels = userData.map((data) => data.timestamp); // Assuming you have a timestamp field
    const weights = userData.map((data) => data.weight);
    const bloodPressures = userData.map((data) => data.bloodPressure);
    const bloodSugars = userData.map((data) => data.bloodSugar);

    const ctx = document.getElementById('healthChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Weight (kg)',
            data: weights,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1,
          },
          {
            label: 'Blood Pressure',
            data: bloodPressures,
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1,
          },
          {
            label: 'Blood Sugar (mg/dL)',
            data: bloodSugars,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      {userData && userData.length > 0 ? (
        <div className="user-data">
          <h2>Your Health Data</h2>
          <canvas id="healthChart"></canvas>
        </div>
      ) : (
        <p>No health data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
