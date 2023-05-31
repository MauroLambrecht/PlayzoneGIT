import axios from "axios";

const instance = axios.create({
  baseURL: "http://app.darksync.org/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default instance;
