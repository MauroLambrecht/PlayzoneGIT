import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.111:8080/",
  headers: {
    Authorization: "Bearer " + AsyncStorage.getItem("userToken"),
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export default instance;
