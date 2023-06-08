import { Pressable, Text, StyleSheet, Image, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const UserListItem = ({ user, onPress, isSelected = false }) => {
  return (
    <Pressable style={styles.root} onPress={() => onPress(user)}>
      <Image
        source={require("../../assets/images/1slnr0.jpg")}
        style={styles.image}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        {isSelected && <AntDesign name="checkcircle" size={24} color="green" />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    color: "black",
    fontWeight: "bold",
  },
  email: {
    color: "black",
  },
});

export default UserListItem;
