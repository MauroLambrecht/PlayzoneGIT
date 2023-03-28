// import React from "react";
// import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import HomeScreen from "../screens/Main/HomeScreen.js";

// const BottomNavBar = () => {
//   const navigation = useNavigation();
//   const Tab = createBottomTabNavigator();

//   return (
//     <View style={styles.container}>
//       <Tab.Navigator>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({ focused }) => {
//               return (
//                 <Image
//                   style={styles.image}
//                   source={
//                     focused
//                       ? require("../assets/images/houseorange.png")
//                       : require("../assets/images/housewhite.png")
//                   }
//                 />
//               );
//             },
//           }}
//         />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "space-around",
//     height: 60,
//     paddingVertical: 10,
//     elevation: 8,
//   },
//   image: {
//     width: 40,
//     height: 40,
//   },
// });

// export default BottomNavBar;
