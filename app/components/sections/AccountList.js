import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { getAccounts } from "../DB/test.js";

const AccountsList = () => {
  const navigation = useNavigation();
  const accounts = getAccounts();
  return (
    <View>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          //make a card that have the profile and make the card personal for every user
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { user: item })}
          >
            <View>
              <Image source={{ uri: item.avatar }} style={styles.picture} />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    width: 100,
    height: 100,
  },
});

export default AccountsList;
