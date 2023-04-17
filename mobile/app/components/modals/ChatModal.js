import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../config/colors";
import MessageModal from "./MessageModal";
import UserItem from "../misc/UserItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../services";

//TODO add smooth Y-overflow

const TextMenu = ({ handleClose }) => {
  const [users, setUsers] = useState([]);

  const [showMessages, setShowMessages] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setShowMessages(true);
  };

  const handleCloseMessages = () => {
    setSelectedUser(null);
    setShowMessages(false);
  };

  const handleFriendUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    AsyncStorage.setItem("friends", JSON.stringify(updatedUsers));
  };

  const handleChatUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    AsyncStorage.setItem("friends", JSON.stringify(updatedUsers));
  };

  const getUsers = async (searchQuery) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      let response = await instance.get(`/users/${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const users = response.data.users;
      setUsers(users);
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  renderUserItem = ({ item }) => {
    return <UserItem user={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleClose()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>@MLambrecht</Text>
        <TouchableOpacity>
          <AntDesign name="plus" size={26} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.searchContainerWrapper}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => {
                getUsers(searchQuery);
              }}
            >
              <MaterialIcons name="search" size={20} color="#8e8e93" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchText}
              placeholder={"Search"}
              onChangeText={(text) => setSearchQuery(text)}
            ></TextInput>
          </View>
        </View>
        <View style={styles.OnlineListContainer}>
          <FlatList
            data={users}
            renderItem={this.renderUserItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={95}
            snapToAlignment={"start"} // snap to the beginning of each item
            decelerationRate={"fast"} // make the snapping feel fast
            style={styles.SubItem}
          />
        </View>
        <View style={styles.subMenuContainer}>
          <View style={styles.subMenuHeader}>
            <Text style={styles.subMenuTitle}>Groups</Text>
            <TouchableOpacity>
              <AntDesign name="plus" size={26} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.noteam}>You aren't in any groups or teams</Text>
          <View style={styles.subMenu}>{/* List of groups */}</View>
          <View style={styles.subMenuHeader}>
            <Text style={styles.subMenuTitle}>Messages</Text>
            <TouchableOpacity>
              <AntDesign name="plus" size={26} color="black" />
            </TouchableOpacity>
          </View>
          {users.map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() => handleUserPress(user)}
              style={styles.userContainer}
            >
              <Image
                source={require("../../assets/images/1slnr0.jpg")}
                style={styles.avatar}
              />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.username}</Text>
                <Text style={styles.lastMessage}>Last message from user</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Modal
          animationType="slide"
          visible={selectedUser !== null}
          onRequestClose={handleCloseMessages}
        >
          <MessageModal
            user={selectedUser}
            onClose={handleCloseMessages}
            currentUser={users}
          />
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  searchContainerWrapper: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
    marginTop: 25,
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#8e8e93",
    width: "90%",
  },
  OnlineListContainer: {
    marginTop: 20,
    width: "100%",
    overflow: "hidden", // hide the items that go beyond the container's width
    paddingHorizontal: 15,
  },
  noteam: {
    color: Colors.gray,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  subMenuContainer: {
    flex: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  subMenuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  subMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subMenu: {},
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#8e8e93",
  },
  gap: {
    height: "20%",
    backgroundColor: "transparent",
  },
};

export default TextMenu;
