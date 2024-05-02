import { FC, useState, useEffect } from "react";


interface WeatherData {
    temp: number;  // Temperature in Celsius
}

const CurrentTime:FC = () => {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const fetchWeather = async () => {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const city = "Vancouver";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setWeather({ temp: data.main.temp });
        } catch (error) {
            console.error("Failed to fetch weather data", error);
        }
    };

    useEffect(() => {
        // Update the time state with the current time every 1000ms
        const tick = () => {
            setTime(new Date());
        };

        // Set up the interval to update the time every second
        const timerID = setInterval(tick, 1000);
        fetchWeather();

        // Clean up the interval on component unmount
        return () => {
            clearInterval(timerID);
        };
    }, []);


    return (
        <article id="current-time" className="flex flex-col gap-1 absolute bottom-[95px] left-[16px] md:bottom-[80px] md:left-[32px] lg:left-[48px]">
            <h4 className="font-semibold text-lg">Burnaby { weather && `| ${weather.temp.toFixed(0)}°C` }</h4>
            <p className="text-neutral-400">{ time.toLocaleDateString() }</p>
            <p className="text-neutral-400">{ time.toLocaleTimeString() }</p>
        </article>
    )
}

export default CurrentTime;