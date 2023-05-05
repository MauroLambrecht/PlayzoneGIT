import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Auth/Login.js";
import Welcome from "../screens/Auth/MainScreen.js";
import Register from "../screens/Auth/Register.js";
import Start from "../screens/Auth/StartScreen.js";

const AuthNavigator = ({ handleLogin }) => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator initialRouteName="Start">
      <AuthStack.Screen
        name="Start"
        component={Start}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="Login" options={{ title: "Log In" }}>
        {(props) => <Login {...props} handleLogin={handleLogin} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
