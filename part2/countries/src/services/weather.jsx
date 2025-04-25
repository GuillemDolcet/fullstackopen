import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCity = (name) => {
    return axios.get(`${baseUrl}?q=${name}&appid=${api_key}&units=metric`)
}

export default {
    getCity
}