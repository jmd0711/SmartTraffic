import axios from "axios"

const apiURL = "http://localhost:8080/"

export const getEvents = async () => {
    return axios
    .get(apiURL + "event/getAll")
    .then((res) => {
        return res.data;
    })
    .catch((err) => console.log(err));
}