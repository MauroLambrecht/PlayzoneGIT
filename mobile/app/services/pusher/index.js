import Pusher from "pusher-js/react-native";

const pusher = new Pusher("48aa3e8e0036b906d56d", {
  cluster: "eu",
  authEndpoint: "http://192.168.1.111:8080/auth",
  encrypted: true,
});

export default pusher;
