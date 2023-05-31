import React, { useEffect, useState } from "react";
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
import LogCard from "../../components/sections/Log.js";
import instance from "../../services/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogScreen = () => {
  const [playerData, setPlayerData] = useState([]);

  //useeffect voor api request
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await instance.get("/getfinishedGame", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const myPlayerData = response.data;
        console.log(response.data);

        setPlayerData(myPlayerData);
      } catch (error) {
        setPlayerData([]);
      }
    };
    fetchPlayerData();
  }, []);

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
      <ScrollView>
        {Array.isArray(playerData.game) &&
          playerData.game.map((game) => (
            <LogCard key={game.IDGame} game={game} />
          ))}
      </ScrollView>
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
    width: "90%",
    alignSelf: "center",
  },
  settings: {
    paddingRight: 135,
  },
  Title: {
    fontSize: 28,
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  undertitle: {
    fontSize: 15,
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
    marginTop: 10,
    color: Colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default LogScreen;
