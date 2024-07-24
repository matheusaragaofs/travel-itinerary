'use client';
import ItineraryForm from '@/components/Form';
import Itinerary from './itinerary/page';
import { Provider } from '@/components/Provider';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded)
    return (
      <div className="flex h-full w-full items-center justify-center min-h-screen">
        <Spin />
      </div>
    );
  return (
    <Provider>
      <main className="flex min-h-screen justify-center items-center">
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
