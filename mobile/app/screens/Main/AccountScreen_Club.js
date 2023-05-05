import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import Colors from "../../config/colors.js";
import { useProjectFonts } from "../../config/fonts.js";
import RoundButton from "../../components/RoundButton.js";

const AccountScreenClub = () => {
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
      <Text style={styles.PlayerName}>Club name</Text>
      <Text style={styles.AllTimeBest}>Created at: 26/01/2023 </Text>
      <View style={styles.Select}>
        <TouchableOpacity>
          <Text style={styles.Player}> Player</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.Stats}>Stats</Text>
        </TouchableOpacity>
        <Text style={styles.Club}>Club</Text>
      </View>
      <View style={styles.NumberOfPlayersView}>
        <Text style={styles.NumberOfPlayersTekst}>Number Of players:</Text>
        <Text style={styles.NumerOfPlayers}> 5</Text>
      </View>
      <View style={styles.ClubGamesView}>
        <Text style={styles.ClubGamesTekst}>Club Games:</Text>
        <Text style={styles.ClubGames}>10</Text>
      </View>
      <View style={styles.ClubWinsView}>
        <Text style={styles.ClubWinsTekst}>Club Wins:</Text>
        <Text style={styles.ClubWins}>8 </Text>
      </View>
      <View style={styles.DescriptionView}>
        <Text style={styles.DescriptionTekst}>Description:</Text>
        <Text style={styles.Description}> Not Set</Text>
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
  AllTimeBest: {
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
  Club: {
    backgroundColor: Colors.orange,
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

  NumberOfPlayersView: {
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
  ClubGamesView: {
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
  ClubWinsView: {
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
  NumberOfPlayersTekst: {
    color: "#000",
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

export default AccountScreenClub;
