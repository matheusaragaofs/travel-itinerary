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
import { Card } from 'antd';

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

  const { data: itineraryCoordinates } = useQuery({
    queryKey: [`get-directions-${itinerary}-itinerary-${currentDayOfWeek}`],
    queryFn: () => getDirections({ latLongs: itineraryLatLongs }),
  });

  const itineraryPolylines = itineraryCoordinates
    ? itineraryCoordinates?.routes?.[0]?.geometry?.coordinates.map(
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

  const itineraryInfo = {
    distance: itineraryCoordinates?.routes?.[0]?.distance,
    duration: itineraryCoordinates?.routes?.[0]?.duration,
  };

  const secondsToHms = (d: number) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);

    return `${h}h ${m}m`;
  };

  const metersToKm = (d: number) => {
    d = Number(d);

    if (d < 999) {
      return `${d} m`;
    }

    const km = Math.floor(d / 1000);
    return `${km} km`;
  };

  return (
    <MapContainer
      ref={mapRef}
      // @ts-ignore
      whenReady={(map: any) => setMap(map.target)}
      key={`${JSON.stringify(itineraryCoordinates)}`}
      center={latLongByDays ? latLongByDays[0][1][0].latLong : [0, 0]}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: 8 }}
    >
      <Card
        style={{
          padding: 0,
        }}
        title="Informações do roteiro"
        className="absolute top-10 right-10 z-[999] p-1 "
      >
        <div>
          <Description
            label="Distância"
            value={metersToKm(itineraryInfo?.distance)}
          />
          <Description
            label="Duração"
            value={secondsToHms(itineraryInfo?.duration)}
          />
        </div>
      </Card>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://worldtiles4.waze.com/tiles/{z}/{x}/{y}.png"
      />

      {itineraryPolylines && (
        <Polyline positions={itineraryPolylines} color="#a11fec" weight={2} />
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
