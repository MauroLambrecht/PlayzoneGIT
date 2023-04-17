import React from "react";
import { View, StyleSheet, Image } from "react-native";
import UserStatus from "./UserStatus";

const UserItem = ({ user }) => {
  return (
    <View style={styles.userItem}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/1slnr0.jpg")}
          style={styles.userAvatar}
        />
        <View style={styles.statusContainer}>
          <UserStatus status={"dnd"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 3,
  },
  avatarContainer: {
    position: "relative",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  statusContainer: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2f3136",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default UserItem;
