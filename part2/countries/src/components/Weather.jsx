const Weather = ({weather}) => {
    if (!weather) {
        return null;
    }

    return (
        <div>
            <div>Temperature {weather.main.temp} Celsius</div>
            <div><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].main}/></div>
            <div>Wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather;