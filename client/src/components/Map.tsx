'use client';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Fragment, useEffect, useRef } from 'react';
import { Itinerary, Recommendations } from '@/types';
import { Description } from '@/utils/description';

interface Props {
  itinerary: Partial<Itinerary>;
  recommended_accomodations: Recommendations[];
  recommended_restaurants: Recommendations[];
  map: L.Map | null;
  setMap: (map: L.Map) => void;
}
const Map = ({
  itinerary,
  map,
  recommended_accomodations,
  recommended_restaurants,
  setMap,
}: Props) => {
  const mapRef = useRef<L.Map>(null);

  const latLongByDays = Object.entries(itinerary).map(
    ([day, activities]: [string, any]) => [
      day,
      ['morning', 'afternoon', 'night'].map((period: any) => ({
        ...activities[period],
        latLong: [
          Number(activities[period].latitude),
          Number(activities[period].longitude),
        ],
      })),
    ]
  );
  console.log('latLongByDays:', latLongByDays);
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

  const ActivityIcon = new L.Icon({
    iconUrl: `/markers/location.svg`,
    iconRetinaUrl: `/markers/location.svg`,
    popupAnchor: [-0, -0],
    iconSize: [32, 40],
  });

  return (
    <MapContainer
      ref={mapRef}
      // @ts-ignore
      // whenReady={(map: any) => setMap(map.target)}
      key={new Date().getTime()}
      center={latLongByDays ? latLongByDays[0][1][0].latLong : [0, 0]}
      zoom={13}
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
                <Marker
                  key={`${day}-${index}`}
                  icon={ActivityIcon}
                  position={activity.latLong}
                >
                  <Popup>
                    <Description label={'Nome'} value={activity.activity} />
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
