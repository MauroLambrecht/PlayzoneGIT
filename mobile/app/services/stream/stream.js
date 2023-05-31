// import StreamChat from "stream-chat";

// const client = new StreamChat("qdfeu46h59mx", {
//   timeout: 6000,
// });

// export const connectChatClient = async (userToken) => {
//   await client.setUser(
//     {
//       id: userToken.userID,
//       name: userToken.username,
//     },
//     userToken.userToken
//   );
//   return client;
// };

// export const createChannel = async (channelName) => {
//   const channel = client.channel("messaging", {
//     name: channelName,
//     created_by: { id: client.userID },
//   });
//   await channel.create();
//   return channel;
// };

// export const getChannels = async () => {
//   const filter = {
//     type: "messaging",
//     members: { $in: [client.userID] },
//   };
//   const sort = { last_message_at: -1 };
//   const channels = await client.queryChannels(filter, sort);
//   return channels;
// };
