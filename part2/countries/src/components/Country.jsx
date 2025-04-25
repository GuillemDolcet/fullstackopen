import {useEffect, useState} from "react";
import WeatherService from "../services/weather.jsx";
import Weather from "./Weather.jsx";

const Country = ({country, showAllInfo}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [weather, setWeather] = useState(null);

    const shouldShowDetails = showDetails || showAllInfo;
    
    useEffect(() => {
        if (shouldShowDetails) {
            WeatherService
                .getCity(country.name.common)
                .then(response => {
                    setWeather(response.data);
                })
                .catch(error => {
                    console.error("Error fetching weather:", error);
                });   
        }
    }, [showAllInfo, country.name.common, shouldShowDetails]);

    const handleClickShowAll = () => {
        setShowDetails(true);
    }

    if (shouldShowDetails) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>
                    <div>Capital {country.capital[0]}</div>
                    <div>Area {country.area}</div>
                </div>
                <h1>Languages</h1>
                <div>
                    <ul>
                        {
                            Object.values(country.languages).map((language) => (
                                <li key={language}>{language}</li>
                            ))
                        }
                    </ul>
                </div>
                <img src={country.flags.png} alt={country.name}/>
                <h1>Weather in {country.name.common}</h1>
                <Weather weather={weather}/>
            </div>
        )
    }

    return (
        <div>{country.name.common} <button onClick={handleClickShowAll}>show</button></div>
    )
}

export default Country