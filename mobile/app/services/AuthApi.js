import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
var qs = require("qs");

const instance = axios.create({
  baseURL: "http://192.168.0.202:8080/",
  headers: {
    Authorization: "Bearer 5000",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  timeout: 10000,
});

function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}

const signup = (user, mail, pass) => {
  return instance
    .post("/signup", {
      username: user,
      email: mail,
      password: pass,
    })
    .then((res) => console.log(res.data))
    .catch(handleError);
};

const login = (mail, pass) => {
  return instance
    .post("/login", {
      email: mail,
      password: pass,
    })
    .then((res) => {
      if (res.data.token) {
        AsyncStorage.setItem("userToken", res.data.token);
      }
      return res.data;
    })
    .catch(handleError);
};

export default { signup, login };
