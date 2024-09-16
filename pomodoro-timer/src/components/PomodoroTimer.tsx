"use client";

import React, { useState, useEffect, useRef } from "react";

// Import custom UI components and icons from the UI directory and Lucide React library
import { Button } from "@/components/ui/button";
import {
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

//* define the types for the timer status and session type
type TimerStatus = "idole" | "running" | "paused";
type SessionType = "work" | "break";

interface PomodoroStatus {
  workDuration: number;
  breakDuration: number;
  currentTimer: number;
  currentSession: SessionType;
  timerStatus: TimerStatus;
}

const PomodoroTimer = () => {
  const [state, setState] = useState<PomodoroStatus>({
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
    currentTimer: 25 * 60,
    currentSession: "work",
    timerStatus: "idole",
  });

  const timeRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (state.timerStatus === "running" && state.currentTimer > 0) {
      timeRef.current = setInterval(() => {
        setState((prevTask) => ({
          ...prevTask,
          currentTimer: prevTask.currentTimer - 1,
        }));
      }, 1000);
    } else if (state.currentTimer === 0) {
      clearInterval(timeRef.current as NodeJS.Timeout);
      handleSessionSwitch();
    }
    return () => clearInterval(timeRef.current as NodeJS.Timeout);
  }, [state.currentTimer, state.timerStatus]);

  const handleSessionSwitch = (): void => {
    setState((prevTask) => {
      const isWorkSession = prevTask.currentSession === "work";
      return {
        ...prevTask,
        currentSession: isWorkSession ? "break" : "work",
        currentTimer: isWorkSession
          ? prevTask.breakDuration
          : prevTask.workDuration,
      };
    });
  };
  const handleStartPause = (): void => {
    if (state.timerStatus === "running") {
      setState((prevTask) => {
        return {
          ...prevTask,
          timerStatus: "paused",
        };
      });
      clearInterval(timeRef.current as NodeJS.Timeout);
    } else {
      setState((prevTask) => {
        return {
          ...prevTask,
          timerStatus: "running",
        };
      });
    }
  };

  const handleReset = (): void => {
    clearInterval(timeRef.current as NodeJS.Timeout);
    setState((prevTask) => ({
      ...prevTask,
      currentTimer: prevTask.workDuration,
      currentSession: "work",
      timerStatus: "idole",
    }));
  };

  const handleDurationChange = (
    type: SessionType,
    increment: boolean
  ): void => {
    setState((prevTask: PomodoroStatus) => {
      const durationChange = increment ? 60 : -60;
      if (type === "work") {
        return {
          ...prevTask,
          workDuration: Math.max(60, prevTask.workDuration + durationChange),
          currentTimer: prevTask.currentSession === "work"
              ? Math.max(60, prevTask.workDuration + durationChange)
              : prevTask.currentTimer,
        };
      } else {
        return {
          ...prevTask,
          breakDuration: Math.max(60, prevTask.breakDuration + durationChange),
          currentTime:
            prevTask.currentSession === "break"
              ? Math.max(60, prevTask.breakDuration + durationChange)
              : prevTask.currentTimer,
        };
      }
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}: ${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center bg-slate-300 min-h-screen dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-xl">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold">Pomodoro Timer</h1>
          <p>A Timer for the Pomodoro Technique</p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center font-medium text-2xl">
              <span
                className={`text-${
                  state.currentSession === "work"
                    ? "text-xl tracking-tighter font-bold text-green-500"
                    : "ext-xl tracking-tighter font-bold text-red-500"
                }`}
              >
                {" "}
                {state.currentSession === "work" ? "Work" : "Break"}{" "}
              </span>
            </div>
            <div className="text-8xl font-bold">
              {formatTime(state.currentTimer)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7 justify-center mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDurationChange("work", false)}
          >
            <MinusIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDurationChange("work", true)}
          >
            <PlusIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleStartPause()}
          >
            {state.timerStatus === "running" ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </Button>
          <Button onClick={handleReset}>
            <RefreshCwIcon className="h-6 w-6" />
          </Button>{" "}
        </div>
        <div className="p-2  flex items-center justify-center mt-4 " >
          <AlertDialog >
            <AlertDialogTrigger asChild>
              <Button className="bg-gray-400 hover:bg-slate-400 font-medium transition-all hover:scale-x-110 duration-300" variant="outline">What is Pomodoro Technique?</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full max-w-2xl p-4 md:p-6 bg-black text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {" "}
                  <strong> ➡️ Explanation of Pomodoro Technique 🔥</strong>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  {" "}
                  <strong>The Pomodoro Technique </strong>is a time management
                  method that uses a timer to break work into intervals called
                  Pomodoros. The Pomodoro timer is traditionally set for 25
                  minutes, but can be customized to fit your needs. The basic
                  steps are:
                  <br />
                  <br />
                  <ol>
                    <strong>
                      <li>1. Select a single task to focus on.</li>
                      <li>
                        2. Set a timer for 25-30 min. and work continuously
                        until the timer goes off.
                      </li>
                      <li>
                        3. Take a productive 5 min. break—walk around, get a
                        snack, relax.
                      </li>
                      <li>4. Repeat steps 2 & 3 for 4 rounds.</li>
                      <li>5. Take a longer (20-30 min.) break.</li>
                    </strong>
                  </ol>
                  <br />
                  <Button className="text-black bg-purple-600 hover:bg-purple-500 p-2 font-bold transition-all hover:scale-105 duration-500"  >
                    <a
                      href="https://github.com/MANI-WEBDEVE"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     My GITHUB
                    </a>
                  </Button>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-center mt-4 font-semibold text-purple-500 "><Link href="https://github.com/MANI-WEBDEVE" target="_blank">Developed by Muhammad Inam</Link></div>
      </Card>
    </div>
  );
};

export default PomodoroTimer;
