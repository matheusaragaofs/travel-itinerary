'use client';

import { ItineraryDay } from '@/types';
import { Flex } from 'antd';
import { ActivityCard } from './ActivityCard';

interface Props {
  data: ItineraryDay;
}

export default function DayItineraryCards({ data }: Props) {
  return (
    <Flex
      gap="middle"
      align="start"
      vertical
      style={{
        width: '100%',
      }}
    >
      <ActivityCard data={data} type="morning" />
      <ActivityCard data={data} type="afternoon" />
      <ActivityCard data={data} type="night" />
    </Flex>
  );
}
