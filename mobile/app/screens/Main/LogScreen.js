import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useProjectFonts } from "../../config/fonts.js";
import Colors from "../../config/colors.js";
import { FontAwesome } from "@expo/vector-icons";

const LogScreen = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Logs</Text>
      <Text style={styles.undertitle}>
        This were your lattest games, Filter on date or type.
      </Text>
      <View style={styles.filters}>
        <Text>filter </Text>
        <FontAwesome
          name="sliders"
          size={18}
          color="black"
          style={styles.settings}
        />
        <Text style={styles.Results}>Results</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  filters: {
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
    marginBottom: 25,
  },
  settings: {
    paddingRight: 155,
  },
  Title: {
    fontSize: 28,
    fontFamily: "QuicksandBold",
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  undertitle: {
    fontSize: 15,
    fontFamily: "QuicksandSemi",
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
    marginTop: 10,
    color: Colors.black,
  },
  Results: {},
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default LogScreen;
