import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import instance from "../../services";

const GameCard = ({ game }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const getUserID = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const account = await fetch(
          `http://app.darksync.org/account/${game.createdBy}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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

  const handleJoinGame = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await fetch(`http://app.darksync.org/joingame/${game.IDGame}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Successfully joined game");
      navigation.navigate("GameScreen", game.IDGame);
    } catch (error) {
      console.log(error);
    }
  };

  const renderClosedState = () => {
    // Extract date and time
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(game.time).toLocaleDateString("en-US", options);
    const time = new Date(game.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <TouchableOpacity onPress={handleToggle}>
        <View style={styles.gameCard}>
          <Image
            source={require("../../assets/images/basketball.png")}
            style={styles.basketballImage}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View style={styles.joinContainer}>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => handleJoinGame()}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
            <Text style={styles.remainingText}>{`${
              game.maxPlayers - game.currentPlayers
            } spots left`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOpenState = () => {
    // Extract date and time
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(game.time).toLocaleDateString("en-US", options);
    const time = new Date(game.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <TouchableOpacity onPress={handleToggle}>
        <View style={styles.gameCardOpen}>
          <View style={styles.gameCardHeader}>
            <View style={styles.username}>
              <Image
                source={require("../../assets/images/1slnr0.jpg")}
                style={styles.profileImage}
              />
              <Text style={styles.username}>{account.user.username ?? ""}</Text>
            </View>
            <View style={styles.joinContainer}>
              <TouchableOpacity
                style={styles.joinButtonOpen}
                onPress={() => handleJoinGame()}
              >
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.gameCardDetails}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsContainer}>
                <Text style={styles.dateText}>{date}</Text>
                <Text style={styles.timeText}>{time}</Text>
                <Text style={styles.locationText}>{`${
                  game.location
                }, ${"Brugge"}`}</Text>
              </View>
            </View>
            <Text style={styles.attendeesTitle}>Attendees:</Text>
            <View style={styles.attendeesContainer}>
              {game.Players.map((player, index) => (
                <View style={styles.attendeeContainer} key={index}>
                  <Image
                    source={require("../../assets/images/1slnr0.jpg")}
                    style={styles.attendeeImage}
                  />
                  <Text style={styles.attendeeName}>{player.username}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return isOpen ? renderOpenState() : renderClosedState();
};

const styles = StyleSheet.create({
  gameCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailsContainer: {
    marginLeft: 20,
  },
  username: {
    fontSize: 16,
    color: "#FF9800",
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  timeText: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  joinContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  joinButton: {
    backgroundColor: "#FF9800",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    alignSelf: "flex-end",
  },
  joinButtonOpen: {
    backgroundColor: "#FF9800",
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginBottom: 5,
    alignSelf: "flex-end",
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  remainingText: {
    color: "#666666",
    fontSize: 12,
  },
  gameCardOpen: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gameCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  gameCardDetails: {
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  basketballImage: {
    width: 50,
    height: 50,
  },
  attendeesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  attendeeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  attendeeImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  attendeeName: {
    fontSize: 14,
    color: "#333333",
  },
});

export default GameCard;
