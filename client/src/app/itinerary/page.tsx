'use client';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import { Recommendations } from '@/components/Recommendations';
import { TravelTips } from '@/components/TravelTips';
import { Budget } from '@/components/Budget';
import { Header } from '@/components/Header';
import { ItineraryDays } from '@/components/ItineraryDays';
import { ItineraryResponse } from '@/types';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Alert, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';

export default function Itinerary() {
  const [map, setMap] = useState<L.Map | null>(null);

  const getItinerary = async () => {
    try {
      const result = await axios.post(
        'http://127.0.0.1:5000/generate-itinerary',
        {
          destination: 'New York City',
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
    } catch (error) {
      alert('Erro ao buscar itinerário');
    }
  };
  const { data: itinerary, isFetching: loading } = useQuery({
    queryKey: [`get-itinerary`],
    queryFn: () => getItinerary(),
  });

  const [currentDayOfWeek, setCurrentDayOfWeek] = React.useState('monday');

  const onChangeItineraryDaysTab = (currrentDayOfWeek: string) => {
    setCurrentDayOfWeek(currrentDayOfWeek);
  };
  if (!loading && !itinerary) {
    return (
      <div className="m-12 flex items-center justify-center">
        <Alert
          message="Error"
          description="Erro ao buscar itinerário"
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-3 min-h-screen justify-center w-full p-12 ">
      {loading || !itinerary ? (
        <Skeleton.Input
          style={{
            height: '10rem',
            width: '100%',
          }}
          active
        />
      ) : (
        <Header
          travelStyles={itinerary.preferred_travel_style}
          destination={itinerary.destination}
          localCurrency={itinerary.local_currency}
          localCurrencySymbol={itinerary.local_currency_symbol}
          travelPeriod={itinerary.travel_period}
        />
      )}

      <div className="flex w-full gap-5 h-full">
        <div className="w-[40%] flex flex-col gap-3">
          {loading || !itinerary ? (
            <Skeleton.Input
              style={{
                height: '12rem',
                width: '100%',
              }}
              active
            />
          ) : (
            <Budget
              data={itinerary.budget_for_all_days}
              budget={itinerary.budget}
            />
          )}

          {loading || !itinerary ? (
            <Skeleton.Input
              style={{
                height: '30rem',
                width: '100%',
              }}
              active
            />
          ) : (
            <ItineraryDays
              data={itinerary.itinerary}
              onChange={onChangeItineraryDaysTab}
              map={map}
            />
          )}
          {loading || !itinerary ? (
            <Skeleton.Input
              style={{
                height: '18rem',
                width: '100%',
              }}
              active
            />
          ) : (
            <TravelTips data={itinerary.types_and_observations} />
          )}
        </div>
        <div className="w-full flex flex-col gap-5 ">
          {loading || !itinerary ? (
            <Skeleton.Input
              style={{
                height: '30rem',
                width: '100%',
              }}
              active
            />
          ) : (
            <div className="h-[30rem]">
              <Map
                map={map}
                setMap={setMap}
                currentDayOfWeek={currentDayOfWeek}
                itinerary={Object.fromEntries(
                  Object.entries(itinerary.itinerary).filter(
                    ([day]) => day === currentDayOfWeek
                  )
                )}
                accomodations={itinerary.recommended_accommodations}
                restaurants={itinerary.recommended_restaurants}
              />
            </div>
          )}
          {loading || !itinerary ? (
            <Skeleton.Input
              style={{
                height: '30.3rem',
                width: '100%',
              }}
              active
            />
          ) : (
            <div className="flex flex-row gap-5 ">
              <Recommendations
                map={map}
                title="Acomodações 🏨"
                data={itinerary.recommended_accommodations}
              />

              <Recommendations
                map={map}
                title="Restaurantes 🍝"
                data={itinerary.recommended_restaurants}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
