const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1574135",
  key: "48aa3e8e0036b906d56d",
  secret: "e28c7fb13e241aad4d6d",
  cluster: "eu",
  useTLS: true,
});

module.exports = pusher;
