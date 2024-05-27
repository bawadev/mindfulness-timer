"use client";
import Head from "next/head";
import { useState, useEffect, createContext, useContext, useRef, useCallback } from "react";
import Timer from "@/app/components/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const TimerContext = createContext();
export const useTimer = () => {
  return useContext(TimerContext);
};

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [toneUtils, setToneUtils] = useState(null);
  const [userInteracted, setUserInteraced] = useState(false);

  const audioImageArray = [
    {
      audio: "rain1.wav",
      image:
        "https://i.natgeofe.com/n/726708f7-f79d-47a5-ba03-711449823607/01-balance-of-nature.jpg",
    },
    {
      audio: "rain2.wav",
      image:
        "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=",
    },
    // Add more audio-image pairs here
  ];

  const loadToneUtils = async () => {
    if (!toneUtils) {
      const utils = await import("@/utils/toneUtils");
      await utils.initializeTone();
      utils.setToneStarted(true);
      setToneUtils(utils);
      return utils;
    } else {
      return toneUtils;
    }
  };

  const handleLeftClick = async () => {
    const utils = await loadToneUtils();
    if (!utils.getToneStarted()) {
      await utils.initializeTone();
      utils.setToneStarted(true);
    }
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + audioImageArray.length) % audioImageArray.length
    );
  };

  const handleRightClick = async () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % audioImageArray.length);
  };

  const toggleMute = async () => {
    setIsMuted((prevMuted) => {
      const newMuted = !prevMuted;
      if (!newMuted && isPlaying) {
        console.log("toggle play sound");
        playSound();
      } else {
        
        stopSound();
      }
      return newMuted;
    });
  };

  const playSound = useCallback(async () => {
    console.log("home start sound");
    const utils = await loadToneUtils();
    utils.playRainSound(`/sounds/${audioImageArray[currentIndex].audio}`);
  });

  const stopSound = useCallback(async () => {
    console.log("home stop sound");
    const utils = await loadToneUtils();
    utils.stopRainSound();
  });

  useEffect(() => {
    if (userInteracted) {
      if (isPlaying && userInteracted) {
        console.log("effect play");
        if (!isMuted) {
          playSound();
        }
        
      } else {
        console.log("effect stop");
        stopSound();
      }
    } 
    
    
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && !isMuted && toneUtils) {
      console.log("index change play");
      playSound();
    }
  }, [currentIndex]);

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${audioImageArray[currentIndex].image})`,
      }}
    >
      <Head>
        <title>Orue Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <div className="relative z-10 bg-gray-200 bg-opacity-50 p-8 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-4">
          Mindfulness Timer
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Find your inner calm in just a few minutes. <br />
          Let's focus, peace, and clarity to your life.
        </p>
        <TimerContext.Provider value={{ isPlaying, setIsPlaying , setUserInteraced}}>
          <Timer
            isPlaying={isPlaying}
          />
          <div className="flex justify-center mt-20">
            <button
              className="text-white hover:text-gray-200"
              onClick={handleLeftClick}
            >
              <FontAwesomeIcon icon={faAngleLeft} size="2x" />
            </button>
            <div className="flex-grow"></div> {/* Add this to create space */}
            <button
              className="text-white ml-4 mr-4 hover:text-gray-200"
              onClick={toggleMute}
            >
              <FontAwesomeIcon
                icon={isMuted ? faVolumeMute : faVolumeUp}
                size="2x"
              />
            </button>
            <div className="flex-grow"></div> {/* Add this to create space */}
            <button
              className="text-white hover:text-gray-200"
              onClick={handleRightClick}
            >
              <FontAwesomeIcon icon={faAngleRight} size="2x" />
            </button>
          </div>
        </TimerContext.Provider>
      </div>
    </div>
  );
}
