import React, { useRef, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Animated,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "../config/colors";

import { useNavigation } from "@react-navigation/native";
import SettingsPage from "../screens/Settings/Settings.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileDrawer = ({ handleLogout, visible, onClose }) => {
  const [account, setAccount] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const getUserInfo = async () => {
      const userObject = await AsyncStorage.getItem("user");
      const parsedUserObject = JSON.parse(userObject); // Parse the JSON string into an object
      setAccount(parsedUserObject);

      const cachedPicture = await AsyncStorage.getItem("profilePicture");
      if (cachedPicture) {
        setProfilePicture(cachedPicture);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleOnClose = () => {
    Animated.timing(slideAnim, {
      toValue: -350,
      duration: 100,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
      >
        <View style={styles.fix}>
          <TouchableOpacity onPress={handleOnClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="gray" />
          </TouchableOpacity>
          <View style={styles.header}>
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("../assets/images/1slnr0.jpg")}
                style={styles.profileImage}
              />
            )}
            <View>
              <Text style={styles.profileName}>{account?.username}</Text>
              <Text style={styles.profileTag}>{account?.email}</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.row}>
              <View style={styles.profileFollowers}>
                <Text style={styles.profileFollowersCount}>10K</Text>
                <Text style={styles.profileFollowersLabel}>Followers</Text>
              </View>
              <View style={styles.profileFollowing}>
                <Text style={styles.profileFollowingCount}>100</Text>
                <Text style={styles.profileFollowingLabel}>Following</Text>
              </View>
            </View>
          </View>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Account");
              handleOnClose();
            }}
          >
            <Ionicons name="person-circle-outline" size={24} color="gray" />
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="gray"
            />
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="gray"
            />
            <Text style={styles.buttonText}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="ios-language-sharp" size={24} color="gray" />
            <Text style={styles.buttonText}>Language</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Entypo name="plus" size={24} color="gray" />
            <Text style={styles.buttonText}>Playzone Plus</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Settings");
              handleOnClose();
            }}
          >
            <Ionicons name="settings-outline" size={24} color="gray" />
            <Text style={styles.buttonText}>Preferences</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogout()}
          >
            <Entypo
              name="log-out"
              size={24}
              color="#E74C3C"
              style={styles.margin}
            />
            <Text style={styles.leaveText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    left: 0,
    top: 0,
    width: "75%",
    height: "110%",
    zIndex: 999,
    paddingTop: 80,
    paddingLeft: 20,
  },

  fix: {
    top: "0%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginleft: "",
    justifyContent: "space-around",
    alignItems: "center",
  },
  closeButton: {
    padding: 10,
    position: "absolute",
    left: "100%",
    top: "70%",
    backgroundColor: Colors.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
  },
  profileInfo: {
    marginLeft: 10,
    marginTop: 10,
  },
  profileName: {
    fontSize: 20,
    fontFamily: "QuicksandBold",
    color: Colors.orange,
    marginLeft: 20,
  },
  profileTag: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginLeft: 20,
    fontFamily: "QuicksandBold",
  },
  profileFollowers: {
    flexDirection: "row",
    marginLeft: "-10%",
    marginTop: "5%",
  },
  profileFollowersCount: {
    marginRight: 5,
    fontFamily: "QuicksandBold",
    marginTop: "5%",
  },
  profileFollowersLabel: {
    color: Colors.mediumGray,
    fontFamily: "QuicksandSemi",
    marginTop: "5%",
  },
  profileFollowing: {
    flexDirection: "row",
    marginTop: "5%",
  },
  profileFollowingCount: {
    marginRight: 5,
    fontFamily: "QuicksandBold",
    marginTop: "5%",
  },
  profileFollowingLabel: {
    color: Colors.mediumGray,
    fontFamily: "QuicksandSemi",
    marginTop: "5%",
  },
  line: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 30,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  bottom: {
    position: "absolute", // set the position to absolute
    bottom: 0, // set the bottom property to 0
    left: 0, // set the left property to 0
    right: 0, // set the right property to 0
    padding: 10,
  },
  margin: {
    marginLeft: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 16,
    color: "#333",
    fontFamily: "QuicksandSemi",
  },
  leaveText: {
    marginLeft: 20,
    fontSize: 16,
    color: "#E74C3C",
    fontFamily: "QuicksandSemi",
  },
});

export default ProfileDrawer;
