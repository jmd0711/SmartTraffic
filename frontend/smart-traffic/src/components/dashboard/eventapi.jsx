import axios from "axios"

const apiURL = "http://54.215.68.185:8080/"

export const getEvents = async () => {
    return axios
        .get(apiURL + "event/getAll")
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
}
export const searchEvents = async (query) => {
    return axios
        .get(`apiURL + "event/search?locationName=${query}&id=${parseInt(query.replace(/[^\d.]/g, ''))}`)
        .then((res) => {
            console.log(res);
            return res.data;
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

export const getCCTVs = async () => {
    return axios
        .get(apiURL + "cctv/getAll")
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
}

export const getDrones = async () => {
    return axios
        .get(apiURL + "drone/getAll")
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
}

export const getIoTs = async () => {
    return axios
        .get(apiURL + "iot/getAll")
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
}

// Weather API

export const getForecast = async (lat, lng) => {
    const url = await axios.get("https://api.weather.gov/points/" + lat + ',' + lng)
    const data = await getWeatherData(url.data.properties.forecast)
    return data
}

const getWeatherData = async (url) => {
    return axios
        .get(url)
        .then((res) => {
            return res.data.properties.periods[0]
        })
        .catch((err) => console.log(err))
}