import Pusher from "pusher-js/react-native";

const pusher = new Pusher("48aa3e8e0036b906d56d", {
  cluster: "eu",
  encrypted: true,
});

export default pusher;
