import React, { useState, useEffect } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import './styles/Videocall.css'; // Import custom CSS for styling

const Videocall = () => {
  const [token, setToken] = useState(null);

  // Function to fetch Agora token
  const fetchAgoraToken = async () => {
    try {
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

  const rtcProps = {
    appId: 'e7f6e9aeecf14b2ba10e3f40be9f56e7',
    channel: 'test',
    token: token,
  };

  return (
    <div className="container">
      <div className="video-container">
        <AgoraUIKit rtcProps={rtcProps} />
      </div>
    </div>
  );
};

export default Videocall;
