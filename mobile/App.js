import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

//screenss
import Login from "./app/screens/Auth/Login.js";
import Welcome from "./app/screens/Auth/MainScreen.js";
import Register from "./app/screens/Auth/Register.js";

import HomeScreen from "./app/screens/Main/HomeScreen.js";
import AccountScreen from "./app/screens/Main/AccountScreen.js";
import LogScreen from "./app/screens/Main/LogScreen.js";
import PlayScreen from "./app/screens/Main/PlayScreen.js";
import RankScreen from "./app/screens/Main/RankScreen.js";

import Game from "./app/screens/Game/GameModal.js";

import LoadingScreen from "./app/components/LoadingScreen.js";

import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Play" component={PlayScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Log" component={LogScreen} />
            <Stack.Screen name="Rank" component={RankScreen} />
            {/* other screens that should be accessible only when logged in */}
          </>
        ) : (
          <>
            <Stack.Screen name="game" component={Game} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
