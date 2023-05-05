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
import RoundButton from "../../components/RoundButton.js";
import Colors from "../../config/colors.js";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import PlayerRank from "../../components/PlayerRank.js";

const RankScreen = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  const playerData = [
    { rank: 1, name: "Marc", points: 2000 },
    { rank: 2, name: "John Doe", points: 1000 },
    { rank: 3, name: "Jan Jansens", points: 900 },
    { rank: 4, name: "Mike Tiran", points: 800 },
    { rank: 5, name: "Fluppe van Frankrijk", points: 200 },
    { rank: 6, name: "Mohammed Abdel", points: 100 },
    { rank: 7, name: "Justin Timber", points: 50 },
    { rank: 8, name: "Daddy D", points: 25 },
    { rank: 9, name: "Eric Cartman", points: 20 },
    { rank: 10, name: "Just Pablo", points: 10 },
    { rank: 11, name: "Sarah Smith", points: 5 },
    { rank: 12, name: "Emily Johnson", points: 5 },
    { rank: 13, name: "Samantha Davis", points: 5 },
    { rank: 14, name: "Jessica Wilson", points: 5 },
    { rank: 15, name: "Ashley Martinez", points: 5 },
    { rank: 16, name: "Stephanie Rodriguez", points: 5 },
    { rank: 17, name: "Jennifer Hernandez", points: 5 },
    { rank: 18, name: "Elizabeth Brown", points: 5 },
    { rank: 19, name: "Alyssa Taylor", points: 5 },
    { rank: 20, name: "Lauren Miller", points: 5 },
  ];

  const renderItem = (item) => {
    return <PlayerRank player={item.item}></PlayerRank>;
  };

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
        renderItem={renderItem}
        keyExtractor={(item) => item.rank.toString()}
      ></FlatList>
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
  Points: {},
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default RankScreen;
