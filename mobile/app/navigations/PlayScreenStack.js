import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlayScreen from "../screens/Main/PlayScreen";
import CreateGame from "../screens/Main/CreateGame";

const PlayStack = createNativeStackNavigator();

const PlayScreenStack = () => {
  return (
    <PlayStack.Navigator
      initialRouteName="Start"
      screenOptions={{
        animationEnabled: false,
        gestureEnabled: false,
      }}
    >
      <PlayStack.Screen
        name="PlayScreen"
        component={PlayScreen}
        options={{
          headerShown: false,
        }}
      />
      <PlayStack.Screen
        name="CreateGame"
        component={CreateGame}
        options={{
          headerShown: true, // show the header for this screen
          headerTitle: () => null,
        }}
      />
    </PlayStack.Navigator>
  );
};

export default PlayScreenStack;
