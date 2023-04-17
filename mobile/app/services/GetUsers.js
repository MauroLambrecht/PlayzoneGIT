import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./index.js";

const handleSearch = async (searchQuery) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    let response;
    response = await instance.get(`/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        name: searchQuery,
      },
    });
    const users = response.data;

    setUsers(users);
    setIsLoading(false);
  } catch (error) {
    console.error(error);
    setUsers([]);
    setIsLoading(false);
  }
};

export default handleSearch;
