import axios from "axios"

const apiURL = "http://localhost:8080/"

export const signup = (newUser) => {
    return axios
        .post(apiURL + 'user/signup', newUser)
        .then((res) => {
            window.alert("You've successfully signed up.")
            localStorage.setItem("userToken", JSON.stringify(res.data.data))
            return res.data.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const login = (user) => {
    return axios
      .post(apiURL + 'user/login', user)
      .then((res) => {
        localStorage.setItem("userToken", JSON.stringify(res.data.data));
        return res.data.data;
      })
      .catch((err) => {
        console.log(err)
      })
  };
  