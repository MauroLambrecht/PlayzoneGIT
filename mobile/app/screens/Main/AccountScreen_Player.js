import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import Colors from "../../config/colors.js";
import { useProjectFonts } from "../../config/fonts.js";
import RoundButton from "../../components/misc/RoundButton.js";

const AccountScreenPlayer = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/1slnr0.jpg")}
        style={styles.ClubPic}
      />
      <Text style={styles.PlayerName}>Playername</Text>

      <Text style={styles.info}>lvl. 15| 17 years old</Text>

      <View style={styles.Select}>
        <Text style={styles.Player}> Player</Text>
        <TouchableOpacity>
          <Text style={styles.Stats}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.Club}>Club</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.DescriptionView}>
        <Text style={styles.DescriptionTekst}>Description:</Text>
        <Text style={styles.Description}> not set</Text>
      </View>
      <View style={styles.TotalGames}>
        <Text style={styles.Gameinfo}>Games Played</Text>
        <Text style={styles.Games}>20 games</Text>
      </View>
      <View style={styles.TotalWins}>
        <Text style={styles.WinsInfo}>Wins:</Text>
        <Text style={styles.Wins}>13 wins</Text>
      </View>
      <View style={styles.LossesView}>
        <Text style={styles.LossesInfo}>Losses:</Text>
        <Text style={styles.Losses}>4 losses</Text>
      </View>

      <View style={styles.KnoppenOnderaan}>
        <View style={styles.bottomContainerMessage}>
          <RoundButton
            title="Message"
            onPress={console.log("message")}
            buttonStyle={styles.orangeButton}
          />
        </View>

        <View style={styles.bottomContainerInvite}>
          <RoundButton
            title="invite"
            onPress={console.log("invite")}
            buttonStyle={styles.whiteButton}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  info: {
    fontSize: 10,
    fontFamily: "QuicksandBold",
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  PlayerName: {
    fontSize: 18,
    fontFamily: "QuicksandBold",
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  Verander: {
    flexDirection: "row",
    fontSize: 10,
    fontFamily: "QuicksandBold",
    color: Colors.black,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  Select: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 0,
    marginTop: 10,
  },
  Player: {
    backgroundColor: Colors.orange,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  Club: {
    backgroundColor: Colors.gray,
    color: "#000000",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  Stats: {
    backgroundColor: Colors.gray,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  TotalGames: {
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
  TotalWins: {
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

  LossesView: {
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

  DescriptionView: {
    justifyContent: "space-between",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  Description: {
    marginTop: 5,
    backgroundColor: Colors.gray,
    paddingBottom: 50,
    borderRadius: 5,
  },
  ClubPic: {
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 20,
    marginLeft: 140,
  },

  KnoppenOnderaan: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 25,
  },
  orangeButton: {
    backgroundColor: Colors.orange,
    marginRight: 100,
  },
  whiteButton: {
    backgroundColor: Colors.black,
    marginRight: 100,
    borderColor: Colors.orange,
  },
});

export default AccountScreenPlayer;
