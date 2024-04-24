import axios from "axios"

const apiURL = "http://localhost:8080/"

export const signup = (newUser) => {
  return axios
    .post(apiURL + 'user/signup', newUser)
    .then((res) => {
      // Currently, response is wrapped in another response so have to check error within first success
      if (res.data.status == "200") {
        window.alert("You've successfully signed up.")
        localStorage.setItem("userToken", JSON.stringify(res.data.data))
        return res.data.data
      } else {
        console.log(res.data)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const login = (user) => {
  return axios
    .post(apiURL + 'user/login', user)
    .then((res) => {
      // Currently, response is wrapped in another response so have to check error within first success
      if (res.data.status == "200") {
      localStorage.setItem("userToken", JSON.stringify(res.data.data));
      return res.data.data;
      } else {
        console.log(res.data)
      }
    })
    .catch((err) => {
      console.log(err)
    })
};
