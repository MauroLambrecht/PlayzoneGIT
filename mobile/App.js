import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Streami18n,
} from "stream-chat-expo";

import { StreamChat } from "stream-chat";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavContainer from "./app/navigations";
import FlashMessage from "react-native-flash-message";

const API_KEY = "qdfeu46h59mx";
const client = StreamChat.getInstance(API_KEY);

const App = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  const onChannelPressed = (channel) => {
    setSelectedChannel(channel);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <OverlayProvider>
        <Chat client={client}>
          <AppNavContainer></AppNavContainer>
        </Chat>
      </OverlayProvider>
      <FlashMessage position="center" />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    alignSelf: "center",
    margin: 50,
  },
});

export default App;
