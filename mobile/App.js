import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavContainer from "./app/navigations";
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppNavContainer></AppNavContainer>
      <FlashMessage position="center" />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    alignSelf: "center",
    margin: 50,
  },
});

export default App;
