"use client"
import { getLocation } from '@/getGeoLocation';
import { useState, ChangeEvent, FormEvent } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

interface WhaeterApp {
    temperature: number;
    description: string;
    location: string;
    main: string;
}



function Weather() {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState<WhaeterApp | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // Handle Search Functonality;
    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimLocationData = location.trim();

        if (trimLocationData === "") {
            setError("Please Enter A Location");
            setWeather(null)
        }

        setLoading(true); // Set loading state to true
        setError(null); // Clear any previous error messages

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)

            if (!response) {
                setError("Please Enter a Valid Location");
                setWeather(null)
            }
            console.log(process.env.NEXT_PUBLIC_WEATHER_API_KEY)
            let data = await response.json()
            console.log(data);
            const wheaterData: WhaeterApp = {
                description: data.weather[0].description,
                temperature: data.main.temp,
                location: data.name,
                main: data.weather[0].main
            }
            setWeather(wheaterData)


        } catch (error) {
            console.log(`something Not Found You city: ${error}`)
            setError(`Country and City Not Found`)
            setWeather(null)
        } finally {
            setLoading(false)
        }

    };

    function getTemperatureMessage(temperature: number): string {
        if (temperature < 0) {
            return `It's freezing at ${temperature.toString()}°C! Bundle up!`;
        } else if (temperature < 10) {
            return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
        } else if (temperature < 20) {
            return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
        } else if (temperature < 30) {
            return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
        } else {
            return `It's hot at ${temperature}°C. Stay hydrated!`;
        }
    }

    function getDescriptionMessage(main: string): string {
        switch (main.toLowerCase()) {
            case "sunny":
                return "It's a beautiful sunny day!";
            case "partly cloudy":
                return "Expect some clouds and sunshine.";
            case "cloudy":
                return "It's cloudy today.";
            case "overcast":
                return "The sky is overcast.";
            case "rain":
                return "Don't forget your umbrella! It's raining.";
            case "thunderstorm":
                return "Thunderstorms are expected today.";
            case "snow":
                return "Bundle up! It's snowing.";
            case "mist":
                return "It's misty outside.";
            case "fog":
                return "Be careful, there's fog outside.";
            default:
                return main; // Default to returning the description as-is
        }
    }

    function getLocationMessage(location: string): string {
        const currentHour = new Date().getHours();
        const isNight = currentHour >= 18 || currentHour < 6; // Determine if it's night time

        return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
    }


    // async function printLocation() {
    //     try {
    //         const coords = await getLocation();
    //         console.log("Latitude:", coords.latitude);
    //         console.log("Longitude:", coords.longitude);
    //     } catch (error) {
    //         console.error("Error getting location:", (error as Error).message);
    //     }
    // }


    return (
        <div className='flex itmes-center justify-center h-screen'>
            <div className='flex justify-center items-center w-full flex-col gap-4'>
                <h1 className='text-4xl font-bold uppercase '>Check weather Now</h1>
                <Card className='w-full max-w-md mx-auto text-center h-[50%]'>
                    <CardHeader>
                        <CardTitle>weather App</CardTitle>
                        <CardDescription>Now Check you country and City weather</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className='flex items-center justify-center gap-2'>
                            <Input
                                placeholder='Enter Country Name'
                                value={location}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                            />
                            <Button type='submit' disabled={loading} >{loading ? <span className="loading loading-dots loading-md"></span> : "Search"}</Button>
                        </form>
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                        {weather && (
                            <div className='mt-4 grid gap-2'>
                                <div className='flex items-center gap-2'>
                                    <div className='flex items-center gap-2'>
                                        <ThermometerIcon className='w-6 h-6' />
                                        {getTemperatureMessage(weather.temperature)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CloudIcon className="w-6 h-6 " />
                                    <div>{getDescriptionMessage(weather.description)}</div>
                                </div>
                                {/* Display location message with icon */}
                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="w-6 h-6 " />
                                    <div>{getLocationMessage(weather.location)}</div>
                                </div>
                            </div>
                        )}
                    </CardContent>

                </Card>
            </div>



        </div>
    )
}

export default Weather
