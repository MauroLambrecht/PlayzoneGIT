import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://app.darksync.org/",
  headers: {
    Authorization: "Bearer " + AsyncStorage.getItem("userToken"),
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default instance;
