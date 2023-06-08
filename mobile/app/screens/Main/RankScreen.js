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
import RoundButton from "../../components/misc/RoundButton.js";
import Colors from "../../config/colors.js";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import PlayerRank from "../../components/sections/PlayerRank.js";
import instance from "../../services/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RankScreen = () => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    let transformedData = [];

    //fix c++ error on IOS
    const fetchPlayerData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await instance.get("/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const myPlayerData = response.data;

        transformedData = myPlayerData.leaderboard.map((player, index) => ({
          rank: index + 1,
          name: player.username,
          points: player.points,
        }));

        setPlayerData(transformedData);
      } catch (error) {
        transformedData = [];
      }
    };

    fetchPlayerData();
  }, []);

  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Rankings</Text>
      <Text style={styles.undertitle}>
        This is the Official Point Ranking. Set Filter on different rankings
      </Text>
      <View style={styles.filters}>
        <Text>Players </Text>
        <FontAwesome
          name="sliders"
          size={18}
          color="black"
          style={styles.settings}
        />
        <Text style={styles.Points}>Points</Text>
      </View>
      <FlatList
        data={playerData}
        renderItem={({ item }) => <PlayerRank player={item} />}
        keyExtractor={(item) => item.rank.toString()}
      />
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
    paddingRight: 140,
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default RankScreen;
