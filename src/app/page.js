"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Orue Fimer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-200 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">
          316NFELAT NA THE
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Orue Fimer
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Bleniotsiven ακενιποιτάς τοιτ-DMSO
          <br />
          COTIRE RDA RDIOLI CHER GJONA
        </p>

        <div className="relative w-48 h-48 mx-auto">
          <Image
            src="/forest-circle.svg"
            alt="Forest Circle"
            layout="fill"
            objectFit="contain"
            priority
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-800">
            SIOTA JALETT
          </div>
        </div>

        <button onClick={handleShowForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
          Aeon mo inagssonk
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-200 p-8 rounded-lg shadow-md mt-6">
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