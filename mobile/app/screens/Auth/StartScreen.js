import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useProjectFonts } from "../../config/fonts.js";
import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";

const Startscreen = () => {
  const navigation = useNavigation();

  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/mybg.png")}
      style={styles.container}
    >
      <View style={styles.logo}>
        <Image
          source={require("../../assets/images/mylogo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.title}>Playzone</Text>
        <Text style={styles.subtitle}>Play Basketball today!</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Welcome")}
        style={styles.StartContainer}
      >
        <Entypo
          name="chevron-thin-down"
          size={30}
          color="white"
          style={styles.icon}
        />
        <View>
          <Text style={styles.starttext}>Start</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -80,
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: "5%",
  },
  image: {
    width: 120,
    height: 120,
    marginLeft: 40,
  },
  title: {
    fontSize: 48,
    fontFamily: "QuicksandBold",
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 19,
    fontFamily: "QuicksandSemi",
    textAlign: "center",
    color: "#eee",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  buttonWrapper: {
    width: "40%",
  },
  color: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent white
  },
  orangetext: {
    color: "#f60",
  },
  color2: {
    backgroundColor: "transparent",
    borderColor: "#f60",
    borderWidth: 2,
  },
  StartContainer: {
    bottom: "7%",
    alignItems: "center",
  },
  icon: {
    bottom: 20,
  },
  starttext: {
    textDecorationLine: "underline",
    color: "#fff",
    fontSize: 24,
    fontFamily: "QuicksandSemi",
  },
});

export default Startscreen;
