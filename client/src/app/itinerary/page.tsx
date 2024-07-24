'use client';

import { Recommendations } from '@/components/Recommendations';
import DayItineraryCards from '@/components/DayItineraryCards';
import { mocked_response } from '@/mock_response';
import { ItineraryResponse } from '@/types';
import {
  Badge,
  Card,
  Descriptions,
  DescriptionsProps,
  List,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Description } from '@/utils/description';
import { ExtraActivities } from '@/components/ExtraActivities';
export default function Itinerary() {
  const [map, setMap] = useState<L.Map | null>(null);
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
  const [currentDayOfWeek, setCurrentDayOfWeek] = React.useState('monday');
  const onChange = (key: string) => {
    const dayOfWeek = weekdays[Number(key)].key;
    setCurrentDayOfWeek(dayOfWeek);
  };

  const items2: DescriptionsProps['items'] = [
    {
      key: 'Atividades',
      label: 'Atividades',
      children: mocked_response.budget_for_all_days.activities_average_cost,
    },
    {
      key: 'Alimentação',
      label: 'Alimentação',
      children: mocked_response.budget_for_all_days.food_average_cost,
    },

    {
      key: 'Transporte',
      label: 'Transporte',
      children: mocked_response.budget_for_all_days.transportation_average_cost,
    },
    {
      key: 'Hospedagem',
      label: 'Hospedagem',
      children: mocked_response.budget_for_all_days.hosting_average_cost,
    },
    {
      key: '5',
      label: 'Total',
      span: 4,
      children: mocked_response.budget_for_all_days.total_average_cost,
    },
  ];
  const travelPeriod = mocked_response.travel_period;
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
    children: <DayItineraryCards data={weekday.itinerary} map={map} />,
  }));
  const colors = [
    'purple',
    'magenta',
    'blue'
  ];
  return (
    <main className="flex flex-col gap-3 min-h-screen justify-center w-full p-12 ">
      <Card className="flex">
        <Description
          label="Destino"
          value={`${mocked_response.destination}`}
          labelFontsize="1.3rem"
          valueFontsize="1.3rem"
        />
        <Description
          label="Período da viagem"
          labelFontsize="1rem"
          valueFontsize="1rem"
          value={travelPeriod}
        />
        <Description
          label="Moeda local"
          labelFontsize="1rem"
          valueFontsize="1rem"
          value={mocked_response.local_currency}
        />
        <Description
          label="Estilos de viagem preferidos"
          labelFontsize="1rem"
          valueFontsize="1rem"
          value={mocked_response.preferred_travel_style
            .split(',')
            .map((style, index) => (
              <Tag
                bordered={false}
                color={colors[index]}
              >
                {style}
              </Tag>
            ))}
          // value={
          //   <div>
          //     <Tag bordered={false} color="cyan">
          //       cyan
          //     </Tag>
          //     <Tag bordered={false} color="blue">
          //       blue
          //     </Tag>
          //     <Tag bordered={false} color="geekblue">
          //       geekblue
          //     </Tag>
          //     <Tag bordered={false} color="purple">
          //       purple
          //     </Tag>
          //   </div>
          // }
        />
      </Card>
      <div className="flex w-full gap-5 h-full">
        <div className="w-[40%] flex flex-col gap-3">
          <Card className="w-fit">
            <Descriptions
              style={{}}
              layout="vertical"
              title={`Orçamento de ${mocked_response.budget} para toda a viagem`}
              size="small"
              items={items2}
            />
          </Card>
          <Card>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Card>

          <Card title="Dicas de viagem 💡">
            <List
              itemLayout="horizontal"
              dataSource={mocked_response.types_and_observations}
              renderItem={(item, index) => (
                <List.Item className=" hover:bg-slate-200 transition-all duration-75 cursor-pointer rounded-lg ">
                  <List.Item.Meta
                    className="px-3 "
                    title={
                      <div className="text-neutral-700 ">
                        • {'  '} {item}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <div className="w-full flex flex-col gap-5 h-full">
          <div className="h-[30rem]">
            <Map
              map={map}
              setMap={setMap}
              itinerary={Object.fromEntries(
                Object.entries(mocked_response.itinerary).filter(
                  ([day]) => day === currentDayOfWeek
                )
              )}
              recommended_accomodations={
                mocked_response.recommended_accommodations
              }
              recommended_restaurants={mocked_response.recommended_restaurants}
            />
          </div>
          <div className="flex gap-5 h-full ">
            <Recommendations
              map={map}
              title="Acomodações 🏨"
              data={mocked_response.recommended_accommodations}
            />
            <Recommendations
              map={map}
              title="Restaurantes 🍝"
              data={mocked_response.recommended_restaurants}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
