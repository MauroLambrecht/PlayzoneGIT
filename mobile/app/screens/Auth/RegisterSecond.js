import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../config/colors.js";
import RoundButton from "../../components/misc/RoundButton.js";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import PasswordChecker from "../../components/utils/PasswordChecker.js";
import auth from "../../services/Authentication.js";

const SignupScreen2 = ({ route, handleLogin }) => {
  const { firstName, lastName, email, dob } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [pwVisable, setPwVisable] = useState(false);
  const [cpwVisable, setCpwVisable] = useState(false);

  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await auth.signup(
        username,
        email,
        password,
        firstName,
        lastName,
        dob
      );
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
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Your Username"
        onChangeText={(text) => setUsername(text)}
      ></TextInput>
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Your Password"
        secureTextEntry={pwVisable ? false : true}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <Ionicons
        name={pwVisable ? "eye-outline" : "eye-off-outline"}
        size={24}
        style={styles.eye}
        color="gray"
        onPress={() => setPwVisable((prev) => !prev)}
      />
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={cpwVisable ? false : true}
        onChangeText={(text) => setConfPassword(text)}
        value={confPassword}
      ></TextInput>
      <Ionicons
        name={cpwVisable ? "eye-outline" : "eye-off-outline"}
        size={24}
        style={styles.eye}
        color="gray"
        onPress={() => setCpwVisable((prev) => !prev)}
      />
      <PasswordChecker password={password} confirm={confPassword} />
      <View style={styles.buttonsContainer}>
        <RoundButton
          title="Create Account"
          onPress={handleSignup}
          buttonStyle={styles.orangeButton}
        />
      </View>

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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Quicksand",
    textAlign: "center",
    color: "#767676",
    marginTop: "50%",
    marginBottom: "10%",
  },
  input: {
    backgroundColor: Colors.white,
    marginBottom: "5%",
    width: "75%",
    alignSelf: "center",
    height: 50,
  },
  buttonsContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  orangeButton: {
    backgroundColor: Colors.orange,
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
  eye: {
    position: "relative",
    marginTop: -24,
    top: -34,
    left: "80%",
  },
});

export default SignupScreen2;
