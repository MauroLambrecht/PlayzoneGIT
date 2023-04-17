import AsyncStorage from "@react-native-async-storage/async-storage";

import instance from "./index.js";

const signup = (user, mail, pass, firstName, lastName, dob) => {
  return instance
    .post("/signup", {
      username: user,
      email: mail,
      password: pass,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
    })
    .then((res) => console.log(res.data))
    .catch((error) => {
      console.error(error);
    });
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
        instance.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { signup, login };
