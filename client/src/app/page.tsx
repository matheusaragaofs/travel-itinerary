'use client'
import ItineraryForm from '@/components/Form';
import dynamic, { LoaderComponent } from 'next/dynamic';
import { ComponentType } from 'react';
import Itinerary from './itinerary/page';
import { Provider } from '@/components/Provider';

export default function Home() {
  return (
    <Provider>
      <main className="flex min-h-screen justify-center items-center ">
        <div className="flex flex-col w-full">
          <div className="xl:h-[50rem] h-[25rem] bg-red-300 rounded-xl  w-full flex ">
            <div className="h-full w-1/2 rounded-lg"></div>
            <div className="flex border border-black items-center justify-center rounded-tr-lg rounded-br-lg h-full w-1/2">
              <ItineraryForm />
            </div>
          </div>
          <Itinerary />
        </div>
      </main>
    </Provider>
  );
}
