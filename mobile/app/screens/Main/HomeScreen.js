import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Colors from "../../config/colors";
import { GradientText } from "../../components/misc/GradientComp.js";
import ActiveGame from "../../components/sections/ActiveGames.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../services";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [playerData, setPlayerData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setPlayerData([]);
      fetchPlayerData();
    }, [])
  );

  const fetchPlayerData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await instance.get("/mygames", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const myPlayerData = response.data;
      console.log(response.data);
      setPlayerData(myPlayerData);
    } catch (error) {
      setPlayerData([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Games</Text>
      </View>
      <ScrollView>
        {playerData.map((game) => (
          <ActiveGame key={game.IDGame} game={game} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  timerIcon: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#333",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "QuicksandSemi",
    marginLeft: 10,
  },
  settingsButton: {
    position: "absolute",
    top: 30,
    right: 20,
  },
});

export default HomeScreen;
