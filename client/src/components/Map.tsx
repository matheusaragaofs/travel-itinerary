'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Suspense, useMemo } from 'react';
import { Itinerary, Recommendations } from '@/types';
import { Description } from '@/utils/description';

interface Props {
  itinerary: Itinerary;
  recommended_accomodations: Recommendations[];
  recommended_restaurants: Recommendations[];
}
const Map = ({
  itinerary,
  recommended_accomodations,
  recommended_restaurants,
}: Props) => {
  console.log('itinerary:', itinerary);
  return (
    <MapContainer
      key={new Date().getTime()}
      center={{
        lat: -8.05,
        lng: -34.900002,
      }}
      zoom={14}
      style={{ height: '100%', width: '100%', borderRadius: 8 }}
    >
      <Suspense>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://worldtiles4.waze.com/tiles/{z}/{x}/{y}.png"
        />

        {recommended_accomodations.map((data) => (
          <Marker
            position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
          >
            <Popup>
              <Description label={'Nome'} value={data.name} />
              <Description label={'Tipo'} value={data.type} />
              <Description label={'Custo médio'} value={data.average_cost} />
              <Description label={'Endereço'} value={data.address} />
            </Popup>
          </Marker>
        ))}
        {recommended_restaurants.map((data) => (
          <Marker
            position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
          >
            <Popup>
              <Description label={'Nome'} value={data.name} />
              <Description label={'Tipo'} value={data.type} />
              <Description label={'Custo médio'} value={data.average_cost} />
              <Description label={'Endereço'} value={data.address} />
            </Popup>
          </Marker>
        ))}
      </Suspense>
    </MapContainer>
  );
};

export default Map;
