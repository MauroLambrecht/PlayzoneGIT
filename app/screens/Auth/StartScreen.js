import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { useProjectFonts } from "../../config/fonts.js";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../config/colors.js";
import RoundButton from "../../components/misc/RoundButton.js";

const Startscreen = () => {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const [showButtons, setShowButtons] = useState(false);

  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  const startAnimation = () => {
    setShowButtons(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/8k.png")}
    >
      <View style={[styles.background, styles.logo]}>
        <Image
          source={require("../../assets/images/5.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.title}>
          Play
          <Text style={{ color: "#dc4d01" }}>zone</Text>
        </Text>
        <Text style={styles.subtitle}>Play Basketball today!</Text>
      </View>
      <View style={styles.startContainer}>
        <TouchableOpacity onPress={startAnimation}>
          <Animated.View style={[styles.icon, { opacity: opacity }]}>
            <Entypo name="chevron-thin-down" size={30} color="white" />
          </Animated.View>
          <Animated.View style={[styles.starttext, { opacity: opacity }]}>
            <Text style={styles.starttext}>Start</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      {showButtons && (
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
              onPress={() => navigation.navigate("SignUpScreen1")}
              buttonStyle={styles.color2}
              textStyle={styles.text}
            />
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  image: {
    height: 150,
    width: "100%",
    marginLeft: "10%",
  },
  title: {
    fontSize: 48,
    color: Colors.orange,
    fontFamily: "QuicksandBold",
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    fontFamily: "QuicksandSemi",
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
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
  startContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  icon: {
    bottom: 20,
    alignItems: "center",
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
