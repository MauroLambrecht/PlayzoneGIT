import api from "../index.js";

export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendFriendRequest = async (friendId) => {
  try {
    const response = await api.post("/friendRequests", {
      friendId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGameInvite = async (inviteCode) => {
  try {
    const response = await api.get(`/gameInvites/${inviteCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
