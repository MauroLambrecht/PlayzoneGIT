import React from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";

const PlayerRank = () => {
  return (
    <View>
      <FlatList
        data={this.state.leaderboard}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.positionText}>{item.position}</Text>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.pointsText}>{item.points}</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  positionText: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 16,
  },
  nameText: {
    fontSize: 16,
    flex: 1,
  },
  pointsText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlayerRank;
