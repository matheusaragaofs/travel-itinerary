'use client';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Fragment, useRef } from 'react';
import { Itinerary, Recommendations } from '@/types';
import { Description } from '@/utils/description';
import { useQuery } from '@tanstack/react-query';
import { getDirections } from '@/utils/mapbox-directions';

interface Props {
  itinerary: Partial<Itinerary>;
  currentDayOfWeek: string;
  accomodations: Recommendations[];
  restaurants: Recommendations[];
  map: L.Map | null;
  setMap: (map: L.Map) => void;
}
const Map = ({
  itinerary,
  map,
  restaurants,
  accomodations,
  setMap,
  currentDayOfWeek,
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
  const itineraryLatLongs = Array.isArray(latLongByDays[0][1])
    ? latLongByDays[0][1]
        .map((data: any) => `${data.longitude},${data.latitude}`)
        .join(';')
    : '';

  const accomodationsLatLongs = accomodations
    .map((data) => `${data.longitude},${data.latitude}`)
    .join(';');

  const restaurantsLatLongs = restaurants
    .map((data) => `${data.longitude},${data.latitude}`)
    .join(';');

  const { data: itineraryCoordinates } = useQuery({
    queryKey: [`get-directions-${itinerary}-itinerary-${currentDayOfWeek}`],
    queryFn: () => getDirections({ latLongs: itineraryLatLongs }),
  });
  const { data: accomodationCoordinates } = useQuery({
    queryKey: [`get-directions-${itinerary}-accomodations`],
    queryFn: () => getDirections({ latLongs: accomodationsLatLongs }),
  });
  const { data: restaurantsCoordinates } = useQuery({
    queryKey: [`get-directions-${itinerary}-restaurants`],
    queryFn: () => getDirections({ latLongs: restaurantsLatLongs }),
  });

  const itineraryPolylines = itineraryCoordinates
    ? itineraryCoordinates?.routes?.[0]?.geometry?.coordinates.map(
        ([lat, long]: any) => [long, lat]
      )
    : null;

  const accomodationsPolyline = accomodationCoordinates
    ? accomodationCoordinates?.routes?.[0]?.geometry?.coordinates.map(
        ([lat, long]: any) => [long, lat]
      )
    : null;
  const restaurantsPolyline = restaurantsCoordinates
    ? restaurantsCoordinates?.routes?.[0]?.geometry?.coordinates.map(
        ([lat, long]: any) => [long, lat]
      )
    : null;
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
      whenReady={(map: any) => setMap(map.target)}
      key={`${JSON.stringify(accomodationsPolyline)} ${JSON.stringify(
        itineraryCoordinates
      )} ${JSON.stringify(restaurantsCoordinates)}`}
      center={latLongByDays ? latLongByDays[0][1][0].latLong : [0, 0]}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: 8 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://worldtiles4.waze.com/tiles/{z}/{x}/{y}.png"
      />

      {itineraryPolylines && (
        <Polyline positions={itineraryPolylines} color="#a11fec" weight={2} />
      )}

      {restaurantsPolyline && (
        <Polyline positions={restaurantsPolyline} color="#ee0047" weight={2} />
      )}

      {accomodationsPolyline && (
        <Polyline
          positions={accomodationsPolyline}
          weight={2}
          color="#7a380c"
        />
      )}
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
      {accomodations.map((data, i) => (
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

      {restaurants.map((data, i) => (
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
