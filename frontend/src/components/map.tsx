import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '4px',
};

interface MapProps {
  locations: {
    lat?: number;
    lng?: number;
  }[];
}

function Map({ locations }: MapProps) {
  const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API_KEY || '';

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API,
  });

  if (locations.length === 0) return null;

  const center = {
    lat: locations[0].lat || 0,
    lng: locations[0].lng || 0,
  };

  if (loadError || !isLoaded) return null;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {locations.map(({ lat, lng }) => (
        <Marker
          key={`${lat}${lng}`}
          position={{
            lat: lat || 0,
            lng: lng || 0,
          }}
        />
      ))}
    </GoogleMap>
  );
}

export default React.memo(Map);
