'use client';

import DayItineraryCards from '@/components/DayItineraryCards';
import { mocked_response } from '@/mock_response';
import { ItineraryResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Flex, Switch, Tabs, TabsProps } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import React from 'react';
export default function Itinerary() {
  const currentLocation = 'Recife, Pe';
  const getItinerary = async () => {
    const result = await axios.post(
      'http://127.0.0.1:5000/generate-itinerary',
      {
        destination: 'Recife, Pernambuco',
        travel_period: "['2024-07-21', '2024-07-27']",
        preffered_travel_styles: {
          'Vida Noturna':
            'Clubes, bares, música ao vivo e outras atividades noturnas.',
          'Natureza e Vida Selvagem':
            'Parques nacionais, safáris de vida selvagem, jardins botânicos.',
          'Festival/Eventos':
            'Participação em festivais locais, concertos, eventos esportivos ou outros grandes eventos.',
        },
        budget: 'R$ 2300',
      }
    );
    return result.data as ItineraryResponse;
  };
  // const { data, isFetching } = useQuery({
  //   queryKey: [`get-itinerary-${currentLocation}`],
  //   queryFn: () => getItinerary(),
  // });
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '0',
      label: `Domingo ${mocked_response.itinerary.sunday.date_day}`,
      children: <DayItineraryCards data={mocked_response.itinerary.sunday} />,
    },
    {
      key: '1',
      label: `Segunda ${mocked_response.itinerary.monday.date_day}`,
      children: <DayItineraryCards data={mocked_response.itinerary.monday} />,
    },
    {
      key: '2',
      label: `Terça ${mocked_response.itinerary.tuesday.date_day}`,
      children: <DayItineraryCards data={mocked_response.itinerary.tuesday} />,
    },
    {
      key: '3',
      label: `Quarta ${mocked_response.itinerary.wednesday.date_day}`,
      children: (
        <DayItineraryCards data={mocked_response.itinerary.wednesday} />
      ),
    },
    {
      key: '4',
      label: `Quinta ${mocked_response.itinerary.thursday.date_day}`,
      children: <DayItineraryCards data={mocked_response.itinerary.thursday} />,
    },
    {
      key: '5',
      label: `Sexta ${mocked_response.itinerary.friday.date_day}`,
      children: <DayItineraryCards data={mocked_response.itinerary.friday} />,
    },
    {
      key: '6',
      label: `Sábado ${mocked_response.itinerary.saturday.date_day}`,
      children: <DayItineraryCards data={mocked_response.itinerary.saturday} />,
    },
  ];

  const data = mocked_response;
  return (
    <main className="flex min-h-screen justify-center p-24 w-full">
      <div className="flex">
        <div className="w-[30rem] border border-black">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
        </div>
        <div>
          <div className="h-[30rem] w-[40rem]">
            <Map />
          </div>
          <div>recomendações</div>
        </div>
      </div>
    </main>
  );
}
