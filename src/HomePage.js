// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import AgoraUIKit from 'agora-react-uikit';

// Define your HomePage component
const HomePage = () => {
  // State to store token
  const [token, setToken] = useState(null);

  // Function to fetch Agora token
  const fetchAgoraToken = async () => {
    try {
      // Fetch token from your backend API or any token provider
      const response = await fetch('/api/agora/token'); // Replace with your token endpoint
      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error('Error fetching Agora token:', error);
    }
  };

  // Fetch Agora token on component mount
  useEffect(() => {
    fetchAgoraToken();
  }, []);

  // Configuration for Agora UIKit
  const rtcProps = {
    appId: 'e7f6e9aeecf14b2ba10e3f40be9f56e7',
    channel: 'test',
    token: token, // Pass the token obtained from the backend
  };

  // Render the Agora UIKit component
  return (
    <div>
      <h1>Video Call App</h1>
      <AgoraUIKit rtcProps={rtcProps} />
    </div>
  );
};

// Export the HomePage component
export default HomePage;

