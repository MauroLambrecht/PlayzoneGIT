import React from "react";
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

const LogCard = () => {
  return (
    <View style={styles.gameCard}>
      <View style={styles.matchTitle}>
        <Text style={styles.matchTitleText}>1v1 Match</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.matchPlayer}>Mauro</Text>
        <Text style={styles.matchDate}>114 - 86</Text>
        <Text style={styles.matchPlayer}>Thomas</Text>
      </View>
      <View style={styles.matchLocation}>
        <Text style={styles.locationText}>
          -t Veld: Eikdelber 3, 8340 Damme
        </Text>
        <Text style={styles.attendees}>Present: 2</Text>
      </View>
    </View>
  );
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
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  matchTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  matchTitleText: {
    fontSize: 18,
    fontFamily: "QuicksandBold",
  },
  matchPlayer: {
    fontSize: 16,
    fontFamily: "QuicksandSemi",
  },
  matchDate: {
    fontSize: 14,
    color: "#999999",
    fontFamily: "QuicksandSemi",
    verticalAlign: "middle",
  },
  matchLocation: {
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 40,
  },
  locationText: {
    fontSize: 14,
    fontFamily: "QuicksandSemi",
  },
  attendees: {
    fontSize: 12,
    color: "#999999",
    fontFamily: "QuicksandSemi",
  },
  wrapper: {
    marginTop: 40,
    width: "50%",
  },
  joinButton: {
    alignSelf: "center",
  },
});

export default LogCard;
