import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useProjectFonts } from "../../config/fonts.js";
import RoundButton from "../../components/RoundButton.js";
import Colors from "../../config/colors.js";

import { useNavigation } from "@react-navigation/native";
import PlayerRank from "../../components/PlayerRank.js";

const RankScreen = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View>
      <Text>Rankings</Text>
      <Text>
        This is the Official Point Ranking. Set Filter on different rankings
      </Text>
      <View style={styles.filters}>
        <Text>Players</Text>
        <Image source={"../../assets/images/6488674.png"}></Image>
        <Text></Text>
      </View>
      <PlayerRank></PlayerRank>
      <Leaderboard></Leaderboard>
    </View>
  );
};
const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    opacity: 0.5,
  },
});

export default RankScreen;
