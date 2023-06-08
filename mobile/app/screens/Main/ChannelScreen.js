import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
  Chat,
} from "stream-chat-expo";

const ChannelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = useChatContext();
  const { channel } = route.params || {};

  useEffect(() => {
    if (channel) {
      navigation.setOptions({
        title: channel.name || "Channel",
      });
    }
  }, [channel, navigation]);

  const handleOnMessage = (event) => {
    console.log("Received message:", event);
  };

  if (!channel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Select a channel from the list!</Text>
      </View>
    );
  }

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <MessageList onMessage={handleOnMessage} />
        <MessageInput />
      </Channel>
    </Chat>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ChannelScreen;
