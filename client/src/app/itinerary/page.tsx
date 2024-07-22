'use client';

import { ItineraryResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
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
  const { data, isFetching } = useQuery({
    queryKey: [`get-itinerary-${currentLocation}`],
    queryFn: () => getItinerary(),
  });

  return (
    <main className="flex min-h-screen justify-center p-24 w-full">
      <div className="flex">
        {isFetching ? 'CARREGANDO!' : 'carregou'}
        <div className="w-[30rem] border border-black">
          roteirosdsd asas
          <div>manha</div>
          <div>tarde</div>
          <div>noite</div>
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
