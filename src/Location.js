import React, { useState, useEffect } from 'react';

const Location = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      const googleMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 12
      });
      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: googleMap,
        title: 'Your Location'
      });
      setError(null);
    };

    const errorHandler = (error) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler, geoOptions);
    } else {
      setError('Geolocation is not supported by this browser.');
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0E_xu1VBpJ7gxVvfZ8bMXqmNe3advwes&libraries=places`;
    script.async = true;
    script.onload = () => {
      console.log('Google Maps API loaded');
    };
    document.body.appendChild(script);
      
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="map-container">
      <div className='head'>Location Tracker</div>
      {error && <p>Error: {error}</p>}
      <div id="map" className="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default Location;
