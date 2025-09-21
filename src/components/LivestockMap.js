// src/components/LivestockMap.js
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const LivestockMap = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], // Centered on India
      zoom: 5,
    });

    // Add livestock farming locations as markers
    const locations = [
      { lng: 77.0369, lat: 28.7041, title: 'Delhi' },
      { lng: 72.5714, lat: 23.0225, title: 'Gujarat' },
      { lng: 78.9629, lat: 20.5937, title: 'Maharashtra' },
      { lng: 77.0369, lat: 28.7041, title: 'Tamil Nadu' },
      { lng: 77.0369, lat: 28.7041, title: 'Haryana' },
    ];

    locations.forEach(location => {
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.title}</h3>`))
        .addTo(map);
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default LivestockMap;
