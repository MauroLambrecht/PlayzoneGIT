import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useChatContext } from "stream-chat-expo";

import AuthNavigator from "./AuthNavigator";
import DefaultStack from "./HomeNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";

const tab = createNativeStackNavigator();

const AppNavContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { client } = useChatContext();

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      setIsLoggedIn(true);
      // await connectUser();
    }
  };

  // const connectUser = async () => {
  //   const token = await AsyncStorage.getItem("ChatToken");
  //   const userString = await AsyncStorage.getItem("user");
  //   console.log(userString);
  //   if (userString && token) {
  //     const user = JSON.parse(userString);
  //     console.log(user);

  //     //connecting user
  //     await client.connectUser(
  //       {
  //         id: user.email,
  //         name: user.username,
  //         image: require("../assets/images/1slnr0.jpg"),
  //       },
  //       token
  //     );
  //     console.log("User connected to chat app!");

  //     //create a channel
  //     // const channel = client.channel("messaging", "playzonedev", {
  //     //   name: "playzone.dev",
  //     // });
  //     // await channel.watch();
  //   } else {
  //     console.log("Couldn't authenticate to stream, not logged in!");
  //   }
  // };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    connectUser();
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("userToken");
    setIsLoggedIn(false);
    client.disconnectUser();
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <HomeNavigator handleLogout={handleLogout} />
      ) : (
        <AuthNavigator handleLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
};

export default AppNavContainer;
