import React, { useState } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import cloud_icon from '../assets/cloud.png';
import humidity_icon from '../assets/humidity.png';
import clear_icon from '../assets/clear.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';






const Weather = () => {
    const [cityInput, setCityInput] = useState('London');
    const[cityIcon,setCityIcon] = useState(clear_icon);
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        windSpeed: '',
        temperature: '',
        location: '',
    });

    const search = async () => {
        if (cityInput === '') {
            alert("Please Enter City");
        }

        const api_key = '04bf8827f39e91a2e6bdbfa092696887';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${api_key}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            setWeatherData({
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} km/h`,
                temperature: `${data.main.temp}°C`,
                location: `${data.name}, ${data.sys.country}`,
            });


            const weatherIcon = data.weather[0].icon;

            if (weatherIcon === "01d" || weatherIcon === "01n") {
                setCityIcon(clear_icon);
            } else if (weatherIcon === "02d" || weatherIcon === "02n" || weatherIcon === "03d" || weatherIcon === "03n") {
                setCityIcon(clear_icon);
            } else if (weatherIcon === "09d" || weatherIcon === "04n") {
                setCityIcon(drizzle_icon);
            } else if (weatherIcon === "10d" || weatherIcon === "10n") {
                setCityIcon(rain_icon);
            } else if (weatherIcon === "13d" || weatherIcon === "13n") {
                setCityIcon(snow_icon);
            } else if (weatherIcon === "04" || weatherIcon === "04n") {
                setCityIcon(cloud_icon);
            }

        }

         catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    return (
        <div className="main-container">
            <div className="container">
                <div className="topBar">
                    <input
                        className="cityInput"
                        type="text"
                        placeholder="Search"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                    />
                    <div className="search-Icon" onClick={search}>
                        <img src={search_icon} alt="" />
                    </div>
                </div>
                <div className="weather-image">
                    <img src={cityIcon} alt="" />
                </div>
                <div className="weather-temp">{weatherData.temperature}</div>
                <div className="weather-location">{weatherData.location}</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="humdity-percentage">{weatherData.humidity}</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>

                    <div className="element">
                        <img src={wind_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-speed">{weatherData.windSpeed}</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
