import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

const AppNavContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
