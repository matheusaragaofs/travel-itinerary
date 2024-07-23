'use client';

import { Recommendations } from '@/components/Recommendations';
import DayItineraryCards from '@/components/DayItineraryCards';
import { mocked_response } from '@/mock_response';
import { ItineraryResponse } from '@/types';
import { Card, Tabs, TabsProps } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Description } from '@/utils/description';
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
    console.log(weekdays[Number(key)].key);
  };

  const weekdays = [
    {
      day: 'Segunda',
      itinerary: mocked_response.itinerary.monday,
      key: 'monday',
    },
    {
      day: 'Terça',
      itinerary: mocked_response.itinerary.tuesday,
      key: 'tuesday',
    },
    {
      day: 'Quarta',
      itinerary: mocked_response.itinerary.wednesday,
      key: 'wednesday',
    },
    {
      day: 'Quinta',
      itinerary: mocked_response.itinerary.thursday,
      key: 'thursday',
    },
    {
      day: 'Sexta',
      itinerary: mocked_response.itinerary.friday,
      key: 'friday',
    },
    {
      day: 'Sábado',
      itinerary: mocked_response.itinerary.saturday,
      key: 'saturday',
    },
    {
      day: 'Domingo',
      itinerary: mocked_response.itinerary.sunday,
      key: 'sunday',
    },
  ];

  const items: TabsProps['items'] = weekdays.map((weekday, index) => ({
    key: index.toString(),
    label: `${weekday.day} ${format(
      parseISO(weekday.itinerary.date_day),
      'dd/MM'
    )}`,
    children: <DayItineraryCards data={weekday.itinerary} />,
  }));

  return (
    <main className="flex flex-col gap-3 min-h-screen justify-center w-full p-12">
      <Card className="w-full h-32">
        <Description label="Destino" value={mocked_response.destination} />
        <Description label="Orçamento" value={mocked_response.budget} />
        <Description
          label="Período da viagem"
          value={mocked_response.travel_period}
        />
        <Description
          label="Moeda local"
          value={mocked_response.local_currency}
        />
      </Card>
      <div className="flex w-full gap-5">
        <div className="w-[40%]">
          <Card>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
          </Card>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="h-[25rem]">
            <Map
              itinerary={mocked_response.itinerary}
              recommended_accomodations={
                mocked_response.recommended_accommodations
              }
              recommended_restaurants={mocked_response.recommended_restaurants}
            />
          </div>
          <div className="flex gap-5">
            <Recommendations
              title="Acomodações"
              data={mocked_response.recommended_accommodations}
            />
            <Recommendations
              title="Restaurantes"
              data={mocked_response.recommended_restaurants}
            />
            {/* <Recommendations
              title="Atividades extras baseadas na preferência da viagem"
              data={mocked_response.extra_activities_based_on_preffered_travel_styles}
            /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
