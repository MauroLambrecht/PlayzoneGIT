import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useState, useEffect } from "react";

const PasswordChecker = ({ password }) => {
  //useState to test the PassswordStrenght
  const [passwordStrength, setPasswordStrength] = useState("weak");

  //default color for passwordchecker
  const [color1, setColor1] = useState("#D3D3D3");
  const [color2, setColor2] = useState("#D3D3D3");
  const [color3, setColor3] = useState("#D3D3D3");

  //Check Password
  const checkPasswordStrength = (password) => {
    if (password.length == 0) {
      setPasswordStrength("none");
      setColor1("#D3D3D3");
      setColor2("#D3D3D3");
      setColor3("#D3D3D3");
    }
    if (password.length <= 8 && password.length != 0) {
      setPasswordStrength("weak");
      setColor1("red");
      setColor2("#D3D3D3");
      setColor3("#D3D3D3");
    } else if (
      password.length >= 10 &&
      password.match(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.*[a-zA-Z]).{12,}$/
      )
    ) {
      setPasswordStrength("strong");
      setColor1("green");
      setColor2("green");
      setColor3("green");
    } else if (
      password.length >= 8 &&
      (password.match(/^(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/) ||
        password.match(/^(?=.*[0-9])(?=.*[a-zA-Z]).{10,}$/))
    ) {
      setPasswordStrength("medium");
      setColor1("orange");
      setColor2("orange");
      setColor3("#D3D3D3");
    }
  };

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  return (
    <View>
      <View style={styles.centerPasswordChecker}>
        <View
          style={[
            styles.passwordCheckerRect,
            {
              backgroundColor: color1,
            },
          ]}
        />
        <View
          style={[
            styles.passwordCheckerRect,
            {
              backgroundColor: color2,
            },
          ]}
        />
        <View
          style={[
            styles.passwordCheckerRect,
            {
              backgroundColor: color3,
            },
          ]}
        />
      </View>
      <Text style={styles.passwordStrengthText}>
        {passwordStrength === "none"
          ? "Please fill in your password"
          : passwordStrength === "weak"
          ? "Your password is too weak"
          : passwordStrength === "medium"
          ? "Your password is medium"
          : "Your password is strong"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordCheckerRect: {
    width: "20%",
    height: 5,
    marginLeft: 5,
    borderRadius: 2,
  },
  passwordStrengthText: {
    color: "gray",
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
    flexDirection: "column",
  },
  centerPasswordChecker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weak: {
    backgroundColor: "red",
  },
  medium: {
    backgroundColor: "orange",
  },
  strong: {
    backgroundColor: "green",
  },
});

export default PasswordChecker;
