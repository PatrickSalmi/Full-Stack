import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({})
    const [temp, setTemp] = useState(null)
    const [wind, setWind] = useState(null)
    const [icon, setIcon] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    useEffect(() => {
        if (!weather?.main?.temp) return
        setTemp(weather.main.temp)
    }, [weather])

    useEffect(() => {
        if (!weather?.wind?.speed) return
        setWind(weather.wind.speed)
    }, [weather])

    useEffect(() => {
        if (!weather?.weather) return
        setIcon(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    }, [weather])

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {temp} Celcius</p>
            <img src={icon}></img>
            <p>wind {wind} m/s</p>
        </div>
    )
}

export default Weather