"use client";

import Head from 'next/head';
import { useState, useEffect } from 'react';
import  Timer from '@/app/components/Timer'

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(60); // Default 60 seconds
  const [showPopup, setShowPopup] = useState(false);


  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  const startTimer = () => {
    setIsPlaying(true);
  };


  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: 'url(https://i.natgeofe.com/n/726708f7-f79d-47a5-ba03-711449823607/01-balance-of-nature.jpg)' }}>
      <Head>
        <title>Orue Fimer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <div className="relative z-10 bg-gray-200 bg-opacity-50 p-8 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-4">
          Mindfulness Timer
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-2">
          peace in mind
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Bleniotsiven ακενιποιτάς τοιτ-DMSO
          <br />
          COTIRE RDA RDIOLI CHER GJONA
        </p>

        <Timer />

       
      </div>

      {showForm && (
        <div className="relative z-10 bg-gray-200 bg-opacity-50 p-8 rounded-lg shadow-md mt-6">
          <p className="text-gray-600 mb-4">
            Foercivvattathuot omnice senet erανατέσίσεις είνμe tot honor chanrotes aro, facitonitistaar borsar fee foccerun fremt bo19.000
            <br />
            Fatties Spe thee 601 21 AM back Forent retor omtuberice 1438 act on ondriem for a wry cometute nh kim cctor motrat mentins Moto
            <br />
            sone cantamwtren wenn es biter sifon cx of certina νοειοττιαποφυter Dernór bontot bor coralorous crenteabay cOO CƠ HOKI DOK
          </p>

          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              placeholder="Gastos Go"
              className="bg-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Fonts001 6025"
              className="bg-gray-300 rounded-md px-4 py-2"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <span className="sr-only">Submit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
