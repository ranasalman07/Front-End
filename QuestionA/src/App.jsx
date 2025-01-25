import React, { useState, useEffect } from 'react';
import './App.css'

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  // Effect to handle the timer updates
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Function to format time into mm:ss:ms
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 200).toString().padStart(2, '0');
    const milliseconds = Math.floor(time % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  // Handlers
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`text-4xl font-bold py-4 px-8 rounded-lg shadow-lg transition-colors duration-500 ${
          isRunning ? 'text-green-500 bg-white' : 'text-red-500 bg-gray-200'
        }`}
      >
        {formatTime(time)}
      </div>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleToggle}
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
