import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../config/colors";

const UserStatus = ({ status }) => {
  let color = "#FFFFFF"; // white by default

  if (status === "online") {
    color = "#43b581"; // green for online status (discord's color code)
  } else if (status === "dnd") {
    color = "#f04747"; // red for dnd status (discord's color code)
  }

  return (
    <View style={[styles.statusIndicator, { backgroundColor: color }]}></View>
  );
};

const styles = StyleSheet.create({
  statusIndicator: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    borderWidth: 0,
    elevation: 2,
    borderColor: Colors.gray,
  },
});

export default UserStatus;
