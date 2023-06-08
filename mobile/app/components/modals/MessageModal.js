import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Pusher from "pusher-js/react-native";
import getMessages from "../../services/pusher/getMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageModal = ({ isOpen, onClose, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [pusher, setPusher] = useState(null);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // Initialize Pusher when the component mounts
    const pusher = new Pusher("48aa3e8e0036b906d56d", {
      cluster: "eu",
      encrypted: true,
    });
    setPusher(pusher);

    // Subscribe to the "messages" channel
    const channelName = `private-1`;
    const channel = pusher.subscribe(channelName);

    console.log(`Subscribed to channel "${channelName}"`);

    // Bind the "new-message" event to update the local state
    channel.bind("new-message", ({ message, sender }) => {
      console.log("Received new message:", message, "from sender:", sender);
      setMessages([...messages, { text: message, isOwnMessage: false }]);
    });

    return () => {
      // Unsubscribe and disconnect from Pusher when the component unmounts
      channel.unbind_all();
      pusher.unsubscribe(channel);
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    getMessages();
  }, []);

  const handleMessageSend = () => {
    // Send the message using Pusher
    const channel = pusher.subscribe(`private-1`);
    console.log(`Triggering "client-new-message" event on channel "private-1"`);
    channel.trigger("client-new-message", {
      message,
      sender: "m4",
      receiver: currentUser[0].username,
    });

    // Add the message to the local state
    setMessages([...messages, { text: message, isOwnMessage: true }]);

    // Save user data to AsyncStorage
    const userData = {
      id: currentUser[0].id,
      username: currentUser[0].username,
      lastMessage: message,
    };
    AsyncStorage.getItem("usersData")
      .then((data) => {
        let usersData = [];
        if (data) {
          usersData = JSON.parse(data);
        }
        const existingUserIndex = usersData.findIndex(
          (u) => u.id === currentUser[0].id
        );
        if (existingUserIndex !== -1) {
          usersData[existingUserIndex].lastMessage = message;
        } else {
          usersData.push(userData);
        }
        AsyncStorage.setItem("usersData", JSON.stringify(usersData));
      })
      .catch((error) => console.error(error));

    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image
            source={require("../../assets/images/1slnr0.jpg")}
            style={styles.profilePic}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{currentUser[0].username}</Text>
            <Text style={styles.username}>@username</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.plus}>
            <Feather name="user-plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageContainer}>
            {message.isFirstMessage && (
              <View style={styles.profileContainer}>
                <Image
                  source={require("../../assets/images/1slnr0.jpg")}
                  style={styles.profilePic}
                />
                <View style={styles.profileInfo}>
                  <Text style={styles.name}>username</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewProfile}>View profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View
              style={[
                styles.message,
                message.isOwnMessage ? styles.ownMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity>
          <MaterialIcons name="photo-camera" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          onSubmitEditing={handleMessageSend}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleMessageSend}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1000,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 20,
  },
  headerText: {
    flexDirection: "column",
  },
  name: {
    fontWeight: "bold",
  },
  username: {
    color: "#888",
  },
  headerIcons: {
    flexDirection: "row",
  },
  plus: {
    marginRight: 10,
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 10,
  },
  viewProfile: {
    color: "blue",
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  ownMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#ccc",
  },
});

export default MessageModal;
