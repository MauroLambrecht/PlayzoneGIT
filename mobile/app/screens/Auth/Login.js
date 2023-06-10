import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

import { useProjectFonts } from "../../config/fonts.js";
import RoundButton from "../../components/misc/RoundButton.js";
import Colors from "../../config/colors.js";
import auth from "../../services/Authentication.js";
import { useNavigation } from "@react-navigation/native";

const Login = ({ handleLogin }) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  const handleMyLogin = async () => {
    try {
      const data = await auth.login(email, password);
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        handleLogin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo2.png")}
      />
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Enter your mail"
        value={email}
        onChangeText={(text) => SetEmail(text)}
        style={styles.input}
        underlineColor="orange"
      ></TextInput>

      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => SetPassword(text)}
        style={styles.input}
        underlineColor="orange"
        secureTextEntry={true}
      ></TextInput>

      <Text style={styles.input}>Stay logged in?</Text>

      <View style={styles.center}>
        <RoundButton
          title="Login"
          onPress={handleMyLogin}
          buttonStyle={styles.orangeButton}
        />
      </View>
      <Text style={styles.orText}>OR</Text>
      {/* <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => console.log("Facebook")}>
          <Image
            source={require("../../assets/images/FaceIcon.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Google")}>
          <Image
            source={require("../../assets/images/GoogleIcon.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View> */}
      <View style={styles.row}>
        <Text style={styles.Register}>Don't have an account yet? </Text>
        <TouchableOpacity
          style={styles.here}
          onPress={() => navigation.navigate("SignUpScreen1")}
        >
          <Text style={styles.orange}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: "stretch",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
    marginTop: "20%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Quicksand",
    textAlign: "center",
    color: "#767676",
    marginBottom: 30,
  },
  center: {
    alignItems: "center",
  },
  input: {
    backgroundColor: Colors.white,
    marginBottom: 20,
    width: "75%",
    alignSelf: "center",
    height: 60,
    color: Colors.orange,
  },
  orangeButton: {
    backgroundColor: Colors.orange,
    alignItems: "center",
    width: "75%",
  },
  Register: {
    marginTop: 20,
    color: Colors.gray,
    alignSelf: "center",
    marginBottom: 10,
  },
  orText: {
    marginTop: 20,
    color: Colors.gray,
    alignSelf: "center",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 0,
  },
  socialIcon: {
    width: 45,
    height: 45,
    marginHorizontal: 30,
  },
  here: {
    marginTop: 20,
    color: Colors.gray,
    alignSelf: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
  },
  orange: {
    color: Colors.orange,
    borderBottomWidth: 1,
    borderColor: Colors.orange,
  },
});

export default Login;
