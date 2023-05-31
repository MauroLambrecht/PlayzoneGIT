import React, { useState, useRef, useEffect } from "react";
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
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Colors from "../../config/colors";
import UserItem from "../../components/misc/UserItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../services";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

//TODO add smooth Y-overflow

const TextMenu = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [userId, setUserId] = useState("");

  const { client } = useChatContext();
  const navigation = useNavigation();

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCloseMessages = () => {
    setSelectedUser(null);
    setShowMessages(false);
    if (!showMessages) {
      getChat();
      setUsers([]);
    }
  };

  const getUsers = async (searchQuery) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      let response;
      if (searchQuery != "") {
        response = await instance.get(`/users/${searchQuery}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = response.data.users;
        setUsers(users);
      } else {
        getChat();
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        // getUsers(text);
      }, 500)
    );
  };

  const startChannel = async (user) => {
    const userString = await AsyncStorage.getItem("user");
    setUserId(userString.email);
    if (userString) {
      parsedUser = JSON.parse(userString);
    }

    let channel = client.channel("messaging", {
      members: [parsedUser.email, user.id],
    });
    await channel.watch();

    navigation.navigate("Channel", { channel: channel });
  };

  const username = client.user?.name ?? "";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Play")}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{username}</Text>
        <TouchableOpacity>
          <AntDesign name="plus" size={26} color="black" />
        </TouchableOpacity>
      </View>
      {/* Move searchContainer view outside of header view */}
      <View style={styles.searchContainerWrapper}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={fetchUsers}>
            <MaterialIcons name="search" size={20} color="#8e8e93" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchText}
            placeholder={"Search"}
            value={searchQuery}
            onChangeText={handleSearch}
          ></TextInput>
        </View>
      </View>
      {searchQuery ? (
        // Render search bar and results when there is a search query

        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserItem user={item} onPress={startChannel} />
          )}
          refreshing={isLoading}
          onRefresh={fetchUsers}
          style={{ marginTop: 20 }}
        />
      ) : (
        // Render normal content when there is no search query
        <ScrollView>
          <View>
            <View style={styles.subMenuContainer}>
              <View style={styles.subMenuHeader}>
                <Text style={styles.subMenuTitle}>Groups</Text>
                <TouchableOpacity>
                  <AntDesign name="plus" size={26} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.noteam}>
                You aren't in any groups or teams
              </Text>
              <View style={styles.subMenu}>{/* List of groups */}</View>
            </View>
            <View style={styles.subMenuContainer}>
              <View style={styles.subMenuHeader}>
                <Text style={styles.subMenuTitle}>Messages</Text>
                <TouchableOpacity>
                  <AntDesign name="plus" size={26} color="black" />
                </TouchableOpacity>
              </View>
              {/* {chats.map((user) => (
                // Show messages section when there is no search query
                <View />
              ))} */}
            </View>
          </View>
        </ScrollView>
      )}
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
    top: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    marginTop: 50,
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
