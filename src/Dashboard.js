import React, { useState, useEffect } from 'react';
import './styles/Dashboard.css'; 
import Chart from 'chart.js/auto'; // Import Chart.js

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Generate mock data when the component mounts
    const mockData = generateMockData();
    setUserData(mockData);
  }, []);

  useEffect(() => {
    // Draw charts when userData changes
    if (userData) {
      drawCharts();
    }
  }, [userData]);

  const generateMockData = () => {
    const mockData = [];
    for (let i = 1; i <= 10; i++) {
      mockData.push({
        timestamp: `Day ${i}`,
        weight: Math.floor(Math.random() * (100 - 50 + 1)) + 50, // Random weight between 50 and 100 kg
        bloodPressure: [Math.floor(Math.random() * (140 - 90 + 1)) + 90, Math.floor(Math.random() * (90 - 60 + 1)) + 60], // Random systolic/diastolic between 90/60 and 140/90
        bloodSugar: Math.floor(Math.random() * (200 - 70 + 1)) + 70, // Random blood sugar between 70 and 200 mg/dL
        exerciseTime: Math.floor(Math.random() * (120 - 30 + 1)) + 30, // Random exercise time between 30 and 120 minutes
        caloriesConsumed: Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000, // Random calories consumed between 1000 and 3000
        sleepHours: Math.random() * (9 - 5) + 5, // Random sleep hours between 5 and 9
        waterIntake: Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000, // Random water intake between 1000 and 4000 ml
        stressLevel: Math.floor(Math.random() * (10 - 1 + 1)) + 1, // Random stress level between 1 and 10
      });
    }
    return mockData;
  };

  const drawCharts = () => {
    const labels = userData.map((data) => data.timestamp);
    const weights = userData.map((data) => data.weight);
    const bloodPressures = userData.map((data) => data.bloodPressure);
    const bloodSugars = userData.map((data) => data.bloodSugar);
    const exerciseTimes = userData.map((data) => data.exerciseTime);
    const caloriesConsumed = userData.map((data) => data.caloriesConsumed);
    const sleepHours = userData.map((data) => data.sleepHours);
    const waterIntake = userData.map((data) => data.waterIntake);
    const stressLevel = userData.map((data) => data.stressLevel);

    const weightCtx = document.getElementById('weightChart').getContext('2d');
    new Chart(weightCtx, {
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

    const bloodPressureCtx = document.getElementById('bloodPressureChart').getContext('2d');
    new Chart(bloodPressureCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Blood Pressure',
            data: bloodPressures.map(([systolic, diastolic]) => systolic),
            borderColor: 'rgba(54, 162, 235, 1)',
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

    const bloodSugarCtx = document.getElementById('bloodSugarChart').getContext('2d');
    new Chart(bloodSugarCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
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

    const exerciseTimeCtx = document.getElementById('exerciseTimeChart').getContext('2d');
    new Chart(exerciseTimeCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Exercise Time (minutes)',
            data: exerciseTimes,
            borderColor: 'rgba(255, 205, 86, 1)',
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

    const caloriesConsumedCtx = document.getElementById('caloriesConsumedChart').getContext('2d');
    new Chart(caloriesConsumedCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Calories Consumed',
            data: caloriesConsumed,
            borderColor: 'rgba(153, 102, 255, 1)',
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

    const sleepHoursCtx = document.getElementById('sleepHoursChart').getContext('2d');
    new Chart(sleepHoursCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sleep Hours',
            data: sleepHours,
            borderColor: 'rgba(255, 159, 64, 1)',
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

    const waterIntakeCtx = document.getElementById('waterIntakeChart').getContext('2d');
    new Chart(waterIntakeCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Water Intake (ml)',
            data: waterIntake,
            borderColor: 'rgba(54, 162, 235, 1)',
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

    const stressLevelCtx = document.getElementById('stressLevelChart').getContext('2d');
    new Chart(stressLevelCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Stress Level',
            data: stressLevel,
            borderColor: 'rgba(255, 99, 132, 1)',
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
      <div className="charts-container">
        <div className="chart-card">
          <h2>Weight Chart</h2>
          <canvas id="weightChart"></canvas>
        </div>
        <div className="chart-card">
          <h2>Blood Pressure Chart</h2>
          <canvas id="bloodPressureChart"></canvas>
        </div>
        <div className="chart-card">
          <h2>Blood Sugar Chart</h2>
          <canvas id="bloodSugarChart"></canvas>
        </div>
        <div className="chart-card">
          <h2>Exercise Time Chart</h2>
          <canvas id="exerciseTimeChart"></canvas>
        </div>
        <div className="chart-card">
          <h2>Calories Consumed Chart</h2>
          <canvas id="caloriesConsumedChart"></canvas>
        </div>
        <div className="chart-card">
          <h2>Sleep Hours Chart</h2>
          <canvas id="sleepHoursChart"></canvas>
        </div>
        <div className="chart-card">
          <h2>Water Intake Chart</h2>
          <canvas id="waterIntakeChart"></canvas>
        </div>
        <div className="chart-card">
          <h2>Stress Level Chart</h2>
          <canvas id="stressLevelChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
