import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

// *********[ COMPONENT IMPORTS ] *********
import HomeScreen from "../screens/Main/HomeScreen.js";
import LogScreen from "../screens/Main/LogScreen.js";
import PlayScreen from "../screens/Main/PlayScreen.js";
import RankScreen from "../screens/Main/RankScreen.js";
import ProfileDrawer from "./DrawerNavigator.js";
import Overlay from "../components/utils/overlay.js";
import ChannelScreen from "../screens/Main/ChannelScreen.js";
import Settings from "../screens/Main/Settings.js";
import TextMenu from "../screens/Main/ChannelListScreen.js";
import CreateGame from "../screens/Main/CreateGame.js";
import CreateGameFase2 from "../screens/Main/CreateGameFase2.js";
import GameScreen from "../screens/Main/GameScreen.js";
import AccountScreenStats from "../screens/Main/AccountScreen_Stats.js";

import { useProjectFonts } from "../config/fonts.js";
import { GradientText } from "../components/misc/GradientComp.js";
import { useNavigation } from "@react-navigation/native";
import { CachedImage } from "expo-cached-image";
import Colors from "../config/colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../services/index.js";

import LinkingConfiguration from "../../LinkingConfiguration.js";
import GameStarted from "../screens/Main/GameStarted.js";
import GameEnded from "../screens/Main/GameEnded.js";

const Tab = createBottomTabNavigator();

const HomeNavigator = ({ handleLogout, inPlayScreen }) => {
  const fontsLoaded = useProjectFonts();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showTextMenu, setShowTextMenu] = useState(false);
  const [profilePictureUri, setProfilePictureUri] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const cachedPicture = await AsyncStorage.getItem("profilePicture");

        if (!cachedPicture) {
          const token = await AsyncStorage.getItem("userToken");
          const response = await instance.get("/getProfilePicture", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const base64String = `data:image/jpeg;base64,${response.data}`;
          await AsyncStorage.setItem("profilePicture", base64String);
          setProfilePictureUri(cachedPicture);
        }

        setProfilePictureUri(cachedPicture);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    getUserInfo();
  }, []);

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return undefined;
  }

  // *********[ HEADER RIGHT COMPONENT ] *********
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
        <TouchableOpacity onPress={() => navigation.navigate("ChannelList")}>
          <AntDesign
            name="message1"
            size={26}
            color={"gray"}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowSubMenu(true)}>
          {profilePictureUri ? (
            <Image source={{ uri: profilePictureUri }} style={styles.profile} />
          ) : (
            <Image
              source={require("../assets/images/1slnr0.jpg")}
              style={styles.profile}
            />
          )}
        </TouchableOpacity>
        <View>
          {showSubMenu && (
            <ProfileDrawer
              isOpen={showSubMenu}
              handleLogout={handleLogout}
              onClose={() => setShowSubMenu(false)}
            />
          )}
          {/* Main component content */}
        </View>
      </View>
    ),
  };

  const headerOptionsWithTabs = {
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 10 }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    ),
  };

  // ********* [ MAIN NAVIGATOR ] *********
  return (
    <View style={styles.container}>
      <Tab.Navigator
        linking={LinkingConfiguration}
        screenOptions={() => ({
          tabBarLabelStyle: styles.labelStyle,
          headerShown: true,

          // ********* [ HEADER LEFT ] *********
          headerTitle: () => (
            <View style={styles.centerTitle}>
              <GradientText text="Playzone" style={styles.title} />
            </View>
          ),

          // *********[ HEADER RIGHT ] *********
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={"home"}
                size={30}
                color={focused ? Colors.orange : "grey"}
              />
            ),
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name="Rank"
          component={RankScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={"chart-bar"}
                size={30}
                color={focused ? Colors.orange : "grey"}
              />
            ),
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name="Play"
          component={PlayScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="basketball"
                size={40}
                color={focused ? Colors.orange : "gray"}
              />
            ),
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name="CreateGame"
          component={CreateGame}
          options={{
            ...headerOptionsWithTabs,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tab.Screen
          name="CreateGameFase2"
          component={CreateGameFase2}
          options={{
            ...headerOptionsWithTabs,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tab.Screen
          name="GameScreen"
          component={GameScreen}
          options={{
            ...headerOptionsWithTabs,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tab.Screen
          name="GameStarted"
          component={GameStarted}
          options={{
            ...headerOptionsWithTabs,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tab.Screen
          name="GameEnded"
          component={GameEnded}
          options={{
            ...headerOptionsWithTabs,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
          }}
        />

        <Tab.Screen
          name="Log"
          component={LogScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={"newspaper-sharp"}
                size={30}
                color={focused ? Colors.orange : "grey"}
              />
            ),
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreenStats}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={"account-circle"}
                size={30}
                color={focused ? Colors.orange : "grey"}
              />
            ),
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            ...headerOptionsWithTabs,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tab.Screen
          name="ChannelList"
          component={TextMenu}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tab.Screen
          name="Channel"
          component={ChannelScreen}
          options={{
            headerShown: true,
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
            ...headerOptionsWithTabs,
          }}
        />
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
  SelectedTab: {
    width: 30,
    height: 50,
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
