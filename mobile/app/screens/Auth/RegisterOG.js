import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";

import { useProjectFonts } from "../../config/fonts.js";
import RoundButton from "../../components/misc/RoundButton.js";
import Colors from "../../config/colors.js";
import PasswordChecker from "../../components/utils/PasswordChecker.js";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import auth from "../../services/Authentication.js";

const Register = ({ handleLogin }) => {
  //useState to get the email and password
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  //navigation
  const navigation = useNavigation();

  //fonts
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  const handleSignup = async () => {
    try {
      const response = await auth.signup(username, email, password);
      console.log(response);
      handleMyLogin();
    } catch (error) {
      console.log(error);
    }
  };

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
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        underlineColor="orange"
        highlightColor="transparent"
        style={styles.input}
        placeholder="Your Username"
        onChangeText={(text) => SetUsername(text)}
      ></TextInput>
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Your Email"
        onChangeText={(text) => SetEmail(text)}
      ></TextInput>
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Your Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          SetPassword(text);
        }}
      ></TextInput>
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Re-type your password"
        secureTextEntry={true}
      ></TextInput>
      <View style={styles.passwordcontainer}>
        <PasswordChecker password={password} />
      </View>

      <View style={styles.buttonsContainer}>
        <RoundButton
          title="Next"
          onPress={handleSignup}
          buttonStyle={styles.orangeButton}
        />
      </View>
      {/* <Text style={styles.orText}>OR</Text> */}
      {/* <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => console.log("Facebook")}>
          <Image
            source={require("../assets/images/FaceIcon.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Google")}>
          <Image
            source={require("../assets/images/GoogleIcon.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View> */}
      <View style={styles.center}>
        <Text styles={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.orange}>Log in</Text>
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
    marginTop: "20%",
    marginBottom: "1%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Quicksand",
    textAlign: "center",
    color: "#767676",
    marginBottom: "10%",
  },
  input: {
    backgroundColor: Colors.white,
    marginBottom: "5%",
    width: "75%",
    alignSelf: "center",
    height: 50,
  },
  passwordcontainer: {
    marginTop: 20,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  buttonsContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  orangeButton: {
    backgroundColor: Colors.orange,
  },
  orText: {
    marginTop: "5%",
    color: Colors.gray,
    alignSelf: "center",
    marginBottom: "1%",
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
  center: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
  },
  text: {
    fontSize: 20,
  },
  orange: {
    color: Colors.orange,
    borderBottomWidth: 1,
    borderColor: Colors.orange,
  },
});

export default Register;
