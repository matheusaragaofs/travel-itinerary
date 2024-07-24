/* eslint-disable @next/next/no-img-element */

import ItineraryForm from '@/components/Form';
import './css/home.css'
import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic, { LoaderComponent } from 'next/dynamic';
import { ComponentType } from 'react';
import '../app/css/form.css';

export default function Home() {
  return (
    <>
      <main className="Body">
        <div className="Box-Foto">
          <div className="logo">
            <img src="/img/logo.png" alt="Travel with AI Logo" />
          </div>
          <div className="form">
            <ItineraryForm />
          </div>
        </div>
      </main>
    </>
  );
};
