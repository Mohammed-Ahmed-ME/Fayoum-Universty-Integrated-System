import React, { useEffect, useState } from 'react';
import { useStateContext } from "../../../contexts/ContextProvider";

import clear from "../../../Images/clear.png";
import cloud from "../../../Images/cloud.png";
import mist from "../../../Images/mist.png";
import rain from "../../../Images/rain.png";
import snow from "../../../Images/snow.png";
import NotAvail from "../../../Images/404.png";
import {WeatherData} from "../../API/API";
export const Time = () => {
    const [currentTime, setCurrentTime] = useState('');
    const { currentColor } = useStateContext();
    useEffect(() => {

                const currentTime = new Date().toLocaleDateString([],{
                    day:"2-digit",
                    year:"numeric",
                    month:"long",
                });
                setCurrentTime(currentTime);
    }
    ,[]);
    return (
        <div className="flex items-center rounded-lg">
            <p style={{ color: currentColor }} className="text-3xl font-bold ml-4">
                {currentTime}
            </p>
        </div>
    );
};



export const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const { currentColor } = useStateContext();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    localStorage.setItem(
                        'weatherLocation',
                        JSON.stringify({ latitude, longitude })
                    );
                    getWeatherData(latitude, longitude);
                },
                function (error) {
                    console.log("Error requesting location:", error.message);
                    getWeatherData(29.3604, 30.90181);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const getWeatherData = (latitude, longitude) => {
        console.log(latitude + " " + longitude);
        WeatherData(latitude, longitude)
            .then((data) => {
                setWeatherData(data);
                setError(false);
            })
            .catch((error) => {
                console.log("Error fetching weather data:", error);
                setError(true);
            });
    };

    const getWeatherIcon = () => {
        if (weatherData) {
            const weatherCondition = weatherData.weather[0].main;
            switch (weatherCondition) {
                case 'Clear':
                    return <img src={clear} alt="Sun Icon" className="w-16 h-16" />;
                case 'Clouds':
                    return <img src={cloud} alt="Cloud Icon" className="w-16 h-16" />;
                case 'Mist':
                    return <img src={mist} alt="Mist Icon" className="w-16 h-16" />;
                case 'Rain':
                    return <img src={rain} alt="Rain Icon" className="w-16 h-16" />;
                case 'Snow':
                    return <img src={snow} alt="Snow Icon" className="w-16 h-16" />;
                default:
                    return <img src={NotAvail} alt="Not Found Icon" className="w-16 h-16" />;
            }
        }
        return null;
    };

    return (
        <div className="flex items-center">
            {error ? (
                <img src={NotAvail} alt="Not Found Icon" className="w-16 h-16" />
            ) : (
                <>
                    {getWeatherIcon()}
                    <p style={{ color: currentColor }} className="ml-6 text-2xl font-bold">
                        {weatherData?.main?.temp} °C
                    </p>
                </>
            )}
        </div>
    );
};

