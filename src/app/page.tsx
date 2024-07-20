import ItineraryForm from '@/components/Form';
import dynamic, { LoaderComponent } from 'next/dynamic';
import { ComponentType } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center ">
      <div className="xl:h-[50rem] h-[25rem] bg-red-300 rounded-xl  w-[80%] flex ">
        <div className="h-full w-1/2 rounded-lg"></div>
        <div className="flex border border-black items-center justify-center rounded-tr-lg rounded-br-lg h-full w-1/2">
          <ItineraryForm />
        </div>
      </div>
    </main>
  );
}
