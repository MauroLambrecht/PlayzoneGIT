import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Auth/Login.js";
// import Register from "../screens/Auth/Register.js";
import Start from "../screens/Auth/StartScreen.js";
import SignUpScreen1 from "../screens/Auth/RegisterFirst.js";
import SignupScreen2 from "../screens/Auth/RegisterSecond.js";

const AuthNavigator = ({ handleLogin }) => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
      }}
    >
      <AuthStack.Screen name="Start" component={Start} />
      <AuthStack.Screen name="Login">
        {(props) => <Login {...props} handleLogin={handleLogin} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUpScreen1" component={SignUpScreen1} />
      <AuthStack.Screen name="SignupScreen2">
        {(props) => <SignupScreen2 {...props} handleLogin={handleLogin} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
