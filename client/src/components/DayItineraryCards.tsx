'use client';

import { ItineraryDay } from '@/types';
import { Flex } from 'antd';
import { ActivityCard } from './ActivityCard';
import { LatLngExpression } from 'leaflet';

interface Props {
  data: ItineraryDay;
  map?: L.Map | null;
}

export default function DayItineraryCards({ data, map }: Props) {
  const handleOnClick = (latLong: LatLngExpression) => {
    map?.flyTo(latLong, 18);
  };
  return (
    <Flex
      gap="middle"
      align="start"
      vertical
      style={{
        width: '100%',
      }}
    >
      <ActivityCard onClick={handleOnClick} data={data} type="morning" />
      <ActivityCard onClick={handleOnClick} data={data} type="afternoon" />
      <ActivityCard onClick={handleOnClick} data={data} type="night" />
    </Flex>
  );
}
