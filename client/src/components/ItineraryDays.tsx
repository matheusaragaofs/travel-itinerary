import { Itinerary } from '@/types';
import { Card, Tabs, TabsProps } from 'antd';
import { parseISO, format } from 'date-fns';

import DayItineraryCards from './DayItineraryCards';

interface Props {
  data: Itinerary;
  map: L.Map | null;
  onChange: (key: string) => void;
}
export function ItineraryDays({ data, onChange, map }: Props) {
  const weekdays = [
    {
      day: 'Segunda',
      itinerary: data.monday,
      key: 'monday',
    },
    {
      day: 'Terça',
      itinerary: data.tuesday,
      key: 'tuesday',
    },
    {
      day: 'Quarta',
      itinerary: data.wednesday,
      key: 'wednesday',
    },
    {
      day: 'Quinta',
      itinerary: data.thursday,
      key: 'thursday',
    },
    {
      day: 'Sexta',
      itinerary: data.friday,
      key: 'friday',
    },
    {
      day: 'Sábado',
      itinerary: data.saturday,
      key: 'saturday',
    },
    {
      day: 'Domingo',
      itinerary: data.sunday,
      key: 'sunday',
    },
  ];

  const items: TabsProps['items'] = weekdays.map((weekday, index) => ({
    key: index.toString(),
    label: `${weekday.day} ${format(
      parseISO(weekday.itinerary.date_day),
      'dd/MM'
    )}`,
    children: <DayItineraryCards data={weekday.itinerary} map={map} />,
  }));

  return (
    <Card>
      <Tabs
        type="line"
        defaultActiveKey="0"
        items={items}
        onChange={(key) => {
          onChange(weekdays[Number(key)].key);
        }}
      />
    </Card>
  );
}
