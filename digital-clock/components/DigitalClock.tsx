"use client";
import { useState, useEffect, ChangeEvent, useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

function DigitalClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, mounted]);

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-tl from-purple-500/10 to-zinc-700/10 flex justify-center items-center">
        <div className="w-full max-w-md bg-zinc-400 shadow-2xl shadow-purple-400 p-8 rounded-lg space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold mb-3">
                Digital Clock
              </CardTitle>
              <CardDescription className="text-center text-sm  mb-4">
                Display current time in hours, minutes, and seconds.
              </CardDescription>
              <CardContent className="flex justify-center items-center flex-col">
                <div className="text-5xl font-bold tracking-tight text-center mt-2">
                  {formattedTime}
                </div>
                <div className="flex justify-center items-center">

                  <div className="mt-4 flex items-center">
                    <Button
                      variant={is24Hour ? "default" : "outline"}
                      className="mr-2 font-bold"
                      onClick={() => setIs24Hour(true)}
                    >
                      24-Hour Format
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Button
                      variant={is24Hour ? "outline" : "default"}
                      className="mr-2 font-bold"
                      onClick={() => setIs24Hour(false)}
                    >
                      12-Hour Format
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DigitalClock;
