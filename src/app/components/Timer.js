import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRedo,
  faSyncAlt,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // Default 0 seconds
  const [initialDuration, setInitialDuration] = useState(0); // To store user's initial time
  const [showPopup, setShowPopup] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [inputHours, setInputHours] = useState(1);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [countDownKey, setCountDownKey] = useState(0);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleScroll = (e) => {
    if (e.deltaY !== 0 && !editingTime) {
      const increment = e.deltaY < 0 ? -5 : 5; // Increment or decrement by 5 minutes (300 seconds)
      setDuration((prevDuration) => Math.max(0, prevDuration + increment));
      setInitialDuration(() => setInitialDuration(duration)); //
    }
  };

  const handleTimerClick = () => {
    if (!isPlaying) {
        if (editingTime) {
            setEditingTime(false);
          } else {
            setEditingTime(true);
          }
          setInputHours(Math.floor(duration / 3600));
          setInputMinutes(Math.floor((duration % 3600) / 60));
    }
    
  };

  const handleInputBlur = (e) => {
    e.stopPropagation();
    const newDuration = inputHours * 3600 + inputMinutes * 60;
    setDuration(newDuration);
    setInitialDuration(newDuration);
    setEditingTime(false);
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
    if (!isPlaying) {
        setEditingTime(true);
    }
  };

  const handleInputChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "hours") {
      setInputHours(value);
    } else if (type === "minutes") {
      setInputMinutes(Math.min(parseInt(value), 60));
    }
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    setEditingTime(false);
    if (duration > 0) {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setDuration(0);
    setCountDownKey((prevKey) => prevKey + 1);
    setIsPlaying(false); // Reset to default 0 seconds
  };

  const handleStop = (e) => {
    e.stopPropagation();
    setDuration(0);
    setCountDownKey((prevKey) => prevKey + 1);
    setIsPlaying(false); // Update key to restart timer
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      setDuration(() => initialDuration);
      setCountDownKey((prevKey) => prevKey + 1); // Update key to restart timer
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <div className="relative w-64 h-64 mx-auto mb-6">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleScroll}
        onClick={handleTimerClick}
        style={{ cursor: "pointer" }}
      >
        <CountdownCircleTimer
          key={countDownKey}
          isPlaying={isPlaying}
          duration={duration}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
          onComplete={() => setIsPlaying(false)}
          size={256}
          strokeWidth={4}
          trailColor="#eee"
          trailStrokeWidth={4}
        >
          {({ remainingTime }) => (
            <div className="flex flex-col items-center justify-center text-center">
              {!editingTime ? (
                <div>
                  <span className="text-4xl">{formatTime(remainingTime)}</span>
                  <span className="block mt-1 text-sm text-gray-600">
                    Click to set time
                  </span>
                </div>
              ) : (
                <div>
                  <input
                    type="number"
                    value={inputHours}
                    onClick={handleInputClick}
                    onChange={(e) => handleInputChange(e, "hours")}
                    onBlur={handleInputBlur}
                    className="w-14 bg-gray-300 rounded-md px-2 py-1 text-center text-xl"
                  />
                  <span className="text-xl">h</span>
                  <span className="mx-1 text-xl"> : </span>
                  <input
                    type="number"
                    value={inputMinutes}
                    onClick={handleInputClick}
                    onChange={(e) => handleInputChange(e, "minutes")}
                    onBlur={handleInputBlur}
                    className="w-14 bg-gray-300 rounded-md px-2 py-1 text-center text-xl"
                  />
                  <span className="text-xl">m</span>
                </div>
              )}
            </div>
          )}
        </CountdownCircleTimer>
        {showPopup && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-75">
            Scroll up/down to set the time
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-8">
        {!isPlaying ? (
          <button
            onClick={handleReset}
            className="text-white hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faRedo} size="2x" />
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="text-white hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faStop} size="2x" />
          </button>
        )}
        <button
          onClick={handleRestart}
          className={`text-white hover:text-gray-200 ${
            !isPlaying ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isPlaying}
        >
          <FontAwesomeIcon icon={faSyncAlt} size="2x" />
        </button>
        <button
          onClick={handlePlayPause}
          className={`text-white hover:text-gray-200 ${
            duration === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={duration === 0}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="2x" />
        </button>
      </div>
    </div>
  );
}
