import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../config/colors.js";
import RoundButton from "../../components/misc/RoundButton.js";
import { useNavigation } from "@react-navigation/native";

const SignupScreen2 = ({ route }) => {
  const { firstName, LastName, email, dob } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await auth.signup(
        username,
        email,
        password,
        firstName,
        LastName,
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
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
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
    marginTop: "10%",
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
});

export default SignupScreen2;
