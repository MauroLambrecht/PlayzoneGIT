import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { GradientButton, GradientButtonRound } from "../misc/GradientComp";
import { RoundButton } from "../misc/RoundButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import instance from "../../services";
import { useNavigation } from "@react-navigation/native";

const ActiveGame = ({ game }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState("");
  const progress = 50;
  const navigation = useNavigation();

  useEffect(() => {
    const getUserID = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const account = await instance.get(`/account/${game.createdBy}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const accountData = account.data;
        setAccount(accountData);
      } catch (error) {
        setAccount([]);
      }
    };
    getUserID();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenGame = () => {
    navigation.navigate("GameScreen", game.IDGame);
  };

  const renderClosedState = () => {
    if (!account || !account.user) {
      // Handle the case when account or account.user is undefined or loading
      return null;
    }
    return (
      <TouchableOpacity onPress={handleToggle}>
        <View style={styles.Card2}>
          <View style={styles.gameCardHeader}>
            <Text style={styles.CreatedByText}>
              {account.user.username ?? ""}
            </Text>
            <Text style={styles.TimeText}>{game.time}</Text>
            <Text style={styles.GameTypeText}>{game.gameType}</Text>
          </View>
          <View style={styles.Details2}>
            <Text style={styles.DetailsText}>See more details</Text>
          </View>
          <TouchableOpacity onPress={handleOpenGame} style={styles.openButton}>
            <Text style={styles.openButtonText}>Open Game</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOpenState = () => {
    if (!account || !account.user) {
      // Handle the case when account or account.user is undefined or loading
      return null;
    }
    return (
      <TouchableOpacity onPress={handleToggle}>
        <View style={styles.Card}>
          <View style={styles.CreatedBy}>
            <Image
              source={require("../../assets/images/1slnr0.jpg")}
              style={styles.profileImage}
            />
            <Text style={styles.CreatedByText}>
              Created By: {account.user.username}
            </Text>
          </View>
          <View style={styles.DetailsContainer}>
            <View style={styles.DetailsItem}>
              <Text style={styles.DetailsLabel}>Game Type:</Text>
              <Text style={styles.DetailsValue}>{game.gameType}</Text>
            </View>
            <View style={styles.DetailsItem}>
              <Text style={styles.DetailsLabel}>Players:</Text>
              <Text style={styles.DetailsValue}>{game.currentPlayers}</Text>
            </View>
            <View style={styles.DetailsItem}>
              <Text style={styles.DetailsLabel}>Style:</Text>
              <Text style={styles.DetailsValue}>{game.gameStyle}</Text>
            </View>
            <View style={styles.DetailsItem}>
              <Text style={styles.DetailsLabel}>Location:</Text>
              <Text style={styles.DetailsValue}>{game.location}</Text>
            </View>
            <View style={styles.DetailsItem}>
              <Text style={styles.DetailsLabel}>Time:</Text>
              <Text style={styles.DetailsValue}>{game.time}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleOpenGame} style={styles.openButton}>
            <Text style={styles.openButtonText}>Open Game</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return isOpen ? renderOpenState() : renderClosedState();
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  DetailsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 10,
  },
  DetailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  DetailsLabel: {
    marginRight: 5,
    color: "#666666",
    fontSize: 15,
  },
  DetailsValue: {
    color: "#333333",
    fontSize: 15,
  },
  Card2: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  Details2: {
    color: "#333333",
    fontSize: 15,
    alignItems: "center",
  },
  OnderaanCard1Text: {
    fontSize: 16,
    padding: 5,
  },
  GameType: {},
  GameTypeText: {
    color: "#666666",
    fontSize: 15,
  },
  CurrentPlayers: {},
  CurrentPlayersText: {
    padding: 5,
  },
  GamesStyle: {},
  GamesStyleText: {
    padding: 5,
  },
  Location: {},
  LocationText: {
    padding: 5,
  },
  Time: {},
  TimeText: {
    color: "#666666",
    fontSize: 15,
  },
  CreatedBy: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  CreatedByText: {
    color: "#666666",
    fontSize: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  basketballImage: {
    width: 130,
    height: 130,
    alignItems: "center",
    marginLeft: "35%",
  },
  gameCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  openButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  openButtonText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ActiveGame;
