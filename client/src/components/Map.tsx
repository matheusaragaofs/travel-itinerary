'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useRef } from 'react';

const Map = () => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (mapRef.current != undefined) {
      mapRef.current.remove();
    }
  }, [mapRef]);

  if (!mapRef.current)
    return (
      <MapContainer
        ref={mapRef}
        center={{
          lat: -8.05,
          lng: -34.900002,
        }}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://worldtiles4.waze.com/tiles/{z}/{x}/{y}.png"
        />
        <Marker position={[-8.05, -34.900002]}>
          <Popup>Hey ! you found me</Popup>
        </Marker>
      </MapContainer>
    );
};

export default Map;
