import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../config/colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../services/index.js";
import { useFocusEffect, useRoute } from "@react-navigation/native";

const AccountScreenStats = () => {
  const [playerData, setPlayerData] = useState();
  const [gameCount, setGameCount] = useState();
  const [ProfilePictureUri, setProfilePictureUri] = useState();
  const [account, setAccount] = useState();

  const routes = useRoute();

  useFocusEffect(
    useCallback(() => {
      setPlayerData([]);
      setGameCount("");
      setProfilePictureUri("");
      setAccount([]);
    }, [])
  );

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        if (routes.params) {
          setAccount(routes.params);
        }

        if (!account || !routes.params) {
          const userObject = await AsyncStorage.getItem("user");
          const parsedUserObject = JSON.parse(userObject);
          setAccount(parsedUserObject.IDUser);
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayerData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setProfilePictureUri("");
      getUserInfo();
    }, [account])
  );

  const getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (account) {
        const response = await instance.get(`/getProfilePicture/${account}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the response contains the base64 image data
        const profilePictureData = response.data;
        console.log("Profile picture received.");
        setProfilePictureUri(`data:image/jpeg;base64, ${profilePictureData}`);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account) {
          const token = await AsyncStorage.getItem("userToken");
          const response = await instance.get(`/account`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const ran = response.data;

          if (!ran.gameCount) {
            setGameCount("0");
          }

          console.log("Account data received.");
          setPlayerData(ran.user);
          setGameCount(ran.gameCount);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchData();
  }, [account]);

  if (!playerData) {
    return null; // Return something meaningful if playerData is not available
  }

  const averagePoints =
    gameCount && playerData.points ? gameCount / playerData.points : 0;

  const roundedAveragePoints = averagePoints.toFixed(2); // Round to 2 decimal places

  let RankP = "beginner";

  if (playerData.points >= 200 && playerData.points < 500) {
    RankP = "intermediate";
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
        {ProfilePictureUri ? (
          <Image
            source={{ uri: ProfilePictureUri }}
            style={styles.profilePicture}
          />
        ) : (
          <Image
            source={require("../../assets/images/1slnr0.jpg")}
            style={styles.profilePicture}
          />
        )}
        <Text style={styles.playerName}>{playerData.username}</Text>
      </View>

      <View style={styles.RankView}>
        <Text style={styles.RankTekst}>Rank:</Text>
        <Text style={styles.Rank}> {RankP}</Text>
      </View>
      <View style={styles.GamesView}>
        <Text style={styles.GamesTekst}>Games:</Text>
        <Text style={styles.Games}> {gameCount}</Text>
      </View>
      <View style={styles.GamesAvarageView}>
        <Text style={styles.GamesAvarageTekst}>Game Average:</Text>
        <Text style={styles.GamesAvarage}> {roundedAveragePoints} PT</Text>
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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginTop: 100,
    marginBottom: 10,
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
  playerName: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
    marginBottom: 40,
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
});

export default AccountScreenStats;
