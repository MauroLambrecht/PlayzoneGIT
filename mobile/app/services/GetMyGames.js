import AsyncStorage from "@react-native-async-storage/async-storage";

import instance from "./index.js";

const getMyGames = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await instance.get("/opengames", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const games = response.data;
    return games;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getMyGames;
