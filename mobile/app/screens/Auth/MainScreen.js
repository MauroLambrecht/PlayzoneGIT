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
import RoundButton from "../../components/misc/RoundButton.js";
import Colors from "../../config/colors.js";

const Startscreen = () => {
  const navigation = useNavigation();

  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/images/mylogo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.title}>Playzone</Text>
        <Text style={styles.subtitle}>Play Basketball today!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <RoundButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
            buttonStyle={styles.color}
            textStyle={styles.text}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <RoundButton
            title="Register"
            onPress={() => navigation.navigate("Register")}
            buttonStyle={styles.color2}
            textStyle={styles.text}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.orange,
  },
  background: {
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
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  buttonWrapper: {
    width: 400,
    alignItems: "center",
  },
  color: {
    backgroundColor: "#A71286",
  },
  color2: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 4,
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
  text: {
    fontFamily: "QuicksandBold",
  },
});

export default Startscreen;
