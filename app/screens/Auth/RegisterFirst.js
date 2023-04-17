import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../../config/colors.js";
import RoundButton from "../../components/misc/RoundButton.js";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen1 = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("SignUpScreen2", {
      firstName,
      lastName,
      email,
      dob,
    });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/8k.png")}
    >
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        underlineColor="orange"
        style={styles.input}
        placeholder="Date of Birth (MM/DD/YYYY)"
        onChangeText={(text) => setDob(text)}
      />

      <View style={styles.center}>
        <RoundButton
          title="Next"
          onPress={handleNext}
          buttonStyle={styles.orangeButton}
        />
      </View>

      <View style={styles.center}>
        <Text styles={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.orange}>Log in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
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

export default SignUpScreen1;
