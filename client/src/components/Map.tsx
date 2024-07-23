'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Fragment } from 'react';
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
  const latLongByDays = Object.entries(itinerary).map(([day, activities]) => [
    day,
    ['morning', 'afternoon', 'night'].map((period) => ({
      ...activities[period],
      latLong: [
        Number(activities[period].latitude),
        Number(activities[period].longitude),
      ],
    })),
  ]);

  const AccomodationIcon = new L.Icon({
    iconUrl: `/markers/accomodation.svg`,
    iconRetinaUrl: `/markers/accomodation.svg`,
    popupAnchor: [-0, -0],
    iconSize: [32, 40],
  });

  const RestaurantIcon = new L.Icon({
    iconUrl: `/markers/restaurant.svg`,
    iconRetinaUrl: `/markers/restaurant.svg`,
    popupAnchor: [-0, -0],
    iconSize: [32, 40],
  });
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
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://worldtiles4.waze.com/tiles/{z}/{x}/{y}.png"
      />
      {latLongByDays.map(([day, activities], i) => {
        return (
          <Fragment key={`${day}-${i}`}>
            {(activities as any).map((activity: any, index: any) => {
              return (
                <Marker key={`${day}-${index}`} position={activity.latLong}>
                  <Popup>
                    <Description label={'Nome'} value={activity.name} />
                    <Description label={'Tipo'} value={activity.type} />
                    <Description
                      label={'Custo médio'}
                      value={activity.average_cost}
                    />
                    <Description label={'Endereço'} value={activity.address} />
                  </Popup>
                </Marker>
              );
            })}
          </Fragment>
        );
      })}
      {recommended_accomodations.map((data, i) => (
        <Marker
          key={`${data.name}-${i}`}
          icon={AccomodationIcon}
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
      {recommended_restaurants.map((data, i) => (
        <Marker
          key={`${data.name}-${i}`}
          icon={RestaurantIcon}
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
    </MapContainer>
  );
};

export default Map;
