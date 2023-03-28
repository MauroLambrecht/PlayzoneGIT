import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../config/colors.js";
import { useProjectFonts } from "../../config/fonts.js";

const AccountScreenPlayer = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <Text style={styles.PlayerName}>Playername**</Text>

        <View style={styles.Verander}>
          <View>
            <Text style={styles.info}>lvl. *| * years old</Text>
          </View>
        </View>
        <View style={styles.Select}>
          <Text> Player</Text>
          <Text>Stats</Text>
          <Text>Club</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.TotalDescription}>Description:</Text>
          <Text style={styles.description}>**/not set</Text>
        </View>
        <View style={styles.TotalGames}>
          <Text style={styles.Gameinfo}>Games Played</Text>
          <Text style={styles.Games}>** games</Text>
        </View>
        <View style={styles.TotalWins}>
          <Text style={styles.WinsInfo}>Wins:</Text>
          <Text style={styles.Wins}>** wins</Text>
        </View>
        <View style={styles.Losses}>
          <Text style={styles.LossesInfo}>Losses:</Text>
          <Text style={styles.Losses}>** losses</Text>
        </View>

        <View styles={styles.button}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Select: {
    backgroundColor: Colors.gray,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  description: {
    backgroundColor: Colors.gray,
    MarginBottom: 12,
  },
  TotalGames: {},
  WinsInfo: {
    PaddingLeft: 0,
  },
  TotalWins: {
    PaddingRight: 0,
  },
});

export default AccountScreenPlayer;
