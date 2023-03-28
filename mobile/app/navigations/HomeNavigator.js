import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

import HomeScreen from "../screens/Main/HomeScreen.js";
import LogScreen from "../screens/Main/LogScreen.js";
import PlayScreen from "../screens/Main/PlayScreen.js";
import RankScreen from "../screens/Main/RankScreen.js";
import ProfileDrawer from "./DrawerNavigator.js";
import Overlay from "../components/overlay.js";
import TextMenu from "../components/ChatModal.js";
import AccountScreenStats from "../screens/Main/AccountScreen_Stats.js";
import AccountScreenClub from "../screens/Main/AccountScreen_Club.js";
import AccountScreenPlayer from "../screens/Main/AccountScreen_Player.js";

import { useProjectFonts } from "../config/fonts.js";
import { GradientText } from "../components/GradientComp.js";
import Colors from "../config/colors.js";
import SettingsPage from "../screens/Settings/Settings.js";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeNavigator = ({ handleLogout }) => {
  const fontsLoaded = useProjectFonts();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showTextMenu, setShowTextMenu] = useState(false);

  if (!fontsLoaded) {
    return undefined;
  }

  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.title,
    headerTitleAlign: "left",
    headerLeft: () => <View style={styles.centerTitle}></View>,
    headerRight: () => (
      <View style={styles.icons}>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons
            name="bell-alert-outline"
            size={26}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* if no notifications: <MaterialCommunityIcons name="bell-check-outline" size={24} color="black" /> */}
        <TouchableOpacity onPress={() => setShowTextMenu(true)}>
          <AntDesign
            name="message1"
            size={26}
            color={"gray"}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowSubMenu(true)}>
          <Image
            source={require("../assets/images/1slnr0.jpg")}
            style={styles.profile}
          />
        </TouchableOpacity>
        <View>
          {showSubMenu && (
            <ProfileDrawer
              isOpen={showSubMenu}
              onClose={() => setShowSubMenu(false)}
            />
          )}
          {/* Main component content */}
        </View>

        <Modal visible={showTextMenu} animationType="fade">
          <TextMenu
            handleClose={() => setShowTextMenu(false)}
            handleLogout={handleLogout}
          />
        </Modal>
      </View>
    ),
  };
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarLabelStyle: styles.labelStyle,
        })}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: true,
            headerTitle: () => (
              <View style={styles.centerTitle}>
                <GradientText text="Home" style={styles.title} />
              </View>
            ),
            ...headerOptions,
            tabBarIcon: () => (
              <Ionicons name="home" size={24} color={Colors.orange} />
            ),
          }}
        >
          {() => <HomeScreen />}
        </Tab.Screen>
        <Tab.Screen
          name="Rank"
          labelStyle={{ display: "none" }}
          options={{
            headerShown: true,
            headerTitle: () => (
              <View style={styles.centerTitle}>
                <GradientText text="Rank" style={styles.title} />
              </View>
            ),
            ...headerOptions,
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="chart-bar"
                size={26}
                color={Colors.orange}
              />
            ),
          }}
        >
          {() => <RankScreen />}
        </Tab.Screen>
        <Tab.Screen
          name="Play"
          options={{
            headerShown: true,
            headerTitle: () => (
              <View style={styles.centerTitle}>
                <GradientText text="Play" style={styles.title} />
              </View>
            ),
            ...headerOptions,
            tabBarIcon: () => (
              <Ionicons name="basketball" size={40} color={Colors.orange} />
            ),
          }}
        >
          {(props) => <PlayScreen {...props} handleLogout={handleLogout} />}
        </Tab.Screen>
        <Tab.Screen
          name="Log"
          options={{
            headerShown: true,
            headerTitle: () => (
              <View style={styles.centerTitle}>
                <GradientText text="Log" style={styles.title} />
              </View>
            ),
            ...headerOptions,
            tabBarIcon: () => (
              <Ionicons
                name="newspaper-sharp"
                size={24}
                color={Colors.orange}
              />
            ),
          }}
        >
          {() => <LogScreen />}
        </Tab.Screen>
        <Tab.Screen
          name="Account"
          options={{
            headerShown: true,
            headerTitle: () => (
              <View style={styles.centerTitle}>
                <GradientText text="Account" style={styles.title} />
              </View>
            ),
            ...headerOptions,
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="account-circle"
                size={30}
                color={Colors.orange}
              />
            ),
          }}
        >
          {() => <AccountScreenStats />}
        </Tab.Screen>
      </Tab.Navigator>
      <Overlay visible={showSubMenu} onPress={() => setShowSubMenu(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    height: 100,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontFamily: "QuicksandBold",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 30,
    marginLeft: 20,
  },
  labelStyle: {
    display: "none",
  },
  subMenu: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  subMenuButton: {
    fontSize: 18,
    fontFamily: "QuicksandBold",
    marginVertical: 10,
  },
});

export default HomeNavigator;
