const { StreamChat } = require("stream-chat");

const apiKey = "ngdaaxg4xenm";
const apiSecret =
  "vc2qxxpwebfeh7gtrrnugw7q3h4efgenwecw6n82ech35tw4t88r6wrmnggw7dvm";

const streamClient = new StreamChat(apiKey, apiSecret);

const notificationClient = streamClient.notificationClient;

module.exports = {
  streamClient,
  notificationClient,
};
