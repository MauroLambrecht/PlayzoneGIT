import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../services/index.js";

const AccountScreenStats = () => {
  const [playerData, setPlayerData] = useState();
  const [gameCount, setGamecount] = useState();
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await instance.get("/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { gameCount, user } = response.data;

        if (gameCount == "") {
          gameCount = "0";
        }

        const cachedPicture = await AsyncStorage.getItem("profilePicture");
        if (cachedPicture) {
          setProfilePicture(cachedPicture);
        }

        setPlayerData(user);
        setGamecount(gameCount);
      } catch (error) {
        setPlayerData([]);
      }
    };
    fetchPlayerData();
  }, []);

  if (!playerData || !gameCount) {
    return;
  }

  const avaragepoints =
    gameCount && playerData.points ? gameCount / playerData.points : 0;
  console.log(avaragepoints);

  let RankP = "beginner";

  if (playerData.points >= 200 && playerData.points < 500) {
    RankP = "intermedian";
  } else if (playerData.points >= 500) {
    RankP = "semi-pro";
  } else if (playerData.points >= 800) {
    RankP = "National";
  } else if (playerData.points >= 1000) {
    RankP = "Euroleague";
  } else if (playerData.points >= 1500) {
    RankP = "NBA";
  } else if (playerData.points >= 3000) {
    RankP = "All-star";
  }

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.ClubPic} />
        ) : (
          <Image
            source={require("../../assets/images/1slnr0.jpg")}
            style={styles.ClubPic}
          />
        )}
        <Text style={styles.PlayerName}>{playerData.username}</Text>

        <Text style={styles.AllTimeBestTekst}>All time best: **comming </Text>
      </View>

      <View style={styles.RankView}>
        <Text style={styles.RankTekst}>Rank:</Text>
        <Text style={styles.Rank}> {RankP}</Text>
      </View>
      <View style={styles.SeasonBestView}>
        <Text style={styles.SeasonBestTekst}>Season best:</Text>
        <Text style={styles.SeasonBest}> **comming </Text>
      </View>
      <View style={styles.GamesView}>
        <Text style={styles.GamesTekst}>Games:</Text>
        <Text style={styles.Games}> {gameCount}</Text>
      </View>
      <View style={styles.WLRView}>
        <Text style={styles.WLRTekst}>WLR:</Text>
        <Text style={styles.WLR}>**comming</Text>
      </View>
      <View style={styles.GamesAvarageView}>
        <Text style={styles.GamesAvarageTekst}>Game Avarage:</Text>
        <Text style={styles.GamsAvarage}> {avaragepoints} PT</Text>
      </View>
      <View style={styles.TotalPointsView}>
        <Text style={styles.TotalPointsTekst}>Total Points:</Text>
        <Text style={styles.TotalPoints}>{playerData.points} PT</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  AllTimeBestTekst: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  center: {
    alignSelf: "center",
  },
  PlayerName: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  text: {
    backgroundColor: Colors.gray,
    opacity: 0.5,
    borderRadius: 5,
    paddingVertical: "8%",
    textAlign: "center",
  },
  RankView: {
    color: Colors.black,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  SeasonBestView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  GamesView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  WLRView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  GamesAvarageView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  TotalPointsView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  ClubPic: {
    marginTop: 20,
    borderRadius: 60,
    marginTop: 60,
    width: 120,
    height: 120,
    alignSelf: "center",
  },
});

export default AccountScreenStats;
