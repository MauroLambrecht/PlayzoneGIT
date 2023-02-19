import React from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import { useProjectFonts } from "../../config/fonts.js";
import RoundButton from "../../components/RoundButton.js";
import Colors from "../../config/colors.js";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
  // Font hook
  const navigation = useNavigation();
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo2.png")}
        />
        <Text style={styles.title}>Playzone</Text>
        <Text style={styles.subtitle}>Play Basketball today!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <RoundButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
          buttonStyle={styles.color}
        />
        <RoundButton
          title="Register"
          onPress={() => navigation.navigate("Register")}
          buttonStyle={styles.color2}
          textStyle={styles.orangetext}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  color: {
    backgroundColor: Colors.orange,
  },
  orangetext: {
    color: Colors.orange,
  },
  color2: {
    backgroundColor: Colors.white,
    borderColor: Colors.orange,
    borderWidth: 2,
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: "stretch",
    alignSelf: "center",
    marginTop: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Quicksand",
    textAlign: "center",
    color: "#767676",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Quicksand",
    textAlign: "center",
    color: Colors.gray,
  },
  buttonsContainer: {
    marginBottom: 100,
    alignItems: "center",
  },
});

export default MainScreen;
