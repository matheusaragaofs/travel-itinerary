'use client';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import { Recommendations } from '@/components/Recommendations';
import { TravelTips } from '@/components/TravelTips';
import { Budget } from '@/components/Budget';
import { Header } from '@/components/Header';
import { ItineraryDays } from '@/components/ItineraryDays';
import { mocked_response } from '@/mock_response';
import { ItineraryResponse } from '@/types';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

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

  const onChangeItineraryDaysTab = (currrentDayOfWeek: string) => {
    setCurrentDayOfWeek(currrentDayOfWeek);
  };

  return (
    <main className="flex flex-col gap-3 min-h-screen justify-center w-full p-12 ">
      <Header
        travelStyles={mocked_response.preferred_travel_style}
        destination={mocked_response.destination}
        localCurrency={mocked_response.local_currency}
        localCurrencySymbol={mocked_response.local_currency_symbol}
        travelPeriod={mocked_response.travel_period}
      />

      <div className="flex w-full gap-5 h-full">
        <div className="w-[40%] flex flex-col gap-3">
          <Budget
            data={mocked_response.budget_for_all_days}
            budget={mocked_response.budget}
          />
          <ItineraryDays
            data={mocked_response.itinerary}
            onChange={onChangeItineraryDaysTab}
            map={map}
          />

          <TravelTips data={mocked_response.types_and_observations} />
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
