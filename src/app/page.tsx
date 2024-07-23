/* eslint-disable @next/next/no-img-element */
import ItineraryForm from '@/components/Form';
import './css/home.css'
import Head from 'next/head';
import dynamic, { LoaderComponent } from 'next/dynamic';
import { ComponentType } from 'react';

export default function Home() {
  return (
    <>
      <main className="Body">
        <div className="Box-Foto"></div>
          <div className="logo">
           
          </div>
          <div className="form">
            <ItineraryForm />
          </div>
      </main>
    </>
  );
};
