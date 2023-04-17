import React from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { useProjectFonts } from "../../config/fonts";

const PlayerRank = ({ player }) => {
  const { rank, name, points } = player;

  console.log(rank, name, points);

  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.number}>{rank}</Text>

        <View style={styles.profilePicWrapper}>
          <Image
            source={require("../../assets/images/1slnr0.jpg")}
            style={styles.profilePic}
          />
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.playerName}>{name}</Text>
          <Text style={styles.points}>{points}</Text>
        </View>
        <View style={styles.line}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    marginRight: 25,
  },
  rank: {
    fontSize: 13,
    color: "#ACACAC",
    fontFamily: "QuicksandBold",
    marginRight: 10,
  },
  number: {
    fontSize: 13,
    color: "#ACACAC",
    fontFamily: "QuicksandBold",
    marginRight: 20,
    width: 20,
    textAlign: "left",
  },
  profilePicWrapper: {
    width: 30,
    height: 30,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 20,
  },
  profilePic: {
    width: 30,
    height: 30,
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerName: {
    fontSize: 13,
    color: "#ACACAC",
    fontFamily: "QuicksandBold",
    marginRight: 10,
  },
  points: {
    fontSize: 13,
    color: "#F88F24",
    fontFamily: "QuicksandBold",
  },
  line: {
    height: 1,
    backgroundColor: "#CCCCCC",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default PlayerRank;
