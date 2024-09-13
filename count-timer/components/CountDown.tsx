"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
  
const CountDown = () => {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle setting the duration of the countdown

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };
  // Function to start the countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  // Function to Paused the Timer;
  const handlePaused = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
    }
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };

  //Function the rest Timer;
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? 0 : 0);
    setDuration("")
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };
  useEffect(() => {
    if (isActive && !isPaused) {
      timeRef.current = setInterval(() => {
        setTimeLeft((prevVal: number): number => {
          if (prevVal <= 1) {
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevVal - 1;
        });
      }, 1000);
    }

    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [isActive, isPaused]);

  // Function to format the time left into mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds
    // Return the formatted string
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to handle changes in the duration input field
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || ""); // Update the duration state
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-300/50  dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-md ">
          <h1 className="text-3xl font-bold text-center mb-6">
            Count Down Timer{" "}
          </h1>
          <div className="flex items-center mb-4 gap-2">
            <Input 
            type="number"
            value={duration}
            onChange={handleDurationChange}
            placeholder="Enter Your Time"

            />
            <Button onClick={handleSetDuration}>SET</Button>
          </div>
          <div className="text-6xl font-bold text-center dark:text-gray-950/60">
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center justify-center w-full gap-[50px] mt-2  ">
            <Button
              className="border border-black font-medium px-3 py-2 rounded-xl hover:bg-gray-600/5 hover:font-bold"
              variant="outline"
              onClick={handleStart}
            >
              START
            </Button>
            <Button
              className="border border-black font-medium px-3 py-2 rounded-xl hover:bg-gray-600/5 hover:font-bold"
              variant="outline"
              onClick={handlePaused}
            >
              PAUSED
            </Button>
            <Button
              className="border border-black font-medium px-3 py-2 rounded-xl hover:bg-gray-600/5 hover:font-bold"
              variant="outline"
              onClick={handleReset}
            >
              RESET
            </Button>
          </div>
           
        <p className="text-blue-400 text-center w-full">Developed by <a href="https://github.com/MANI-WEBDEVE" target="_blank">Muhammad Inam</a></p>
        </div>
      </div>
    </>
  );
};

export default CountDown;
