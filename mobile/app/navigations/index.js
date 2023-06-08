import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import DefaultStack from "./HomeNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";

const tab = createNativeStackNavigator();

const AppNavContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      setIsLoggedIn(true);
      // await connectUser();
    }
  };

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
