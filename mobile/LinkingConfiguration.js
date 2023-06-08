import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: "home",
      Profile: "profile",
      Rank: "rank",
      Play: "play",
      CreateGame: "create-game",
      CreateGameFase2: "create-game-fase2",
      GameScreen: "game-screen",
      GameStarted: "game-started",
      GameEnded: "game-ended",
      Log: "log",
      Account: "account",
      Settings: "settings",
      ChannelList: "channel-list",
      Channel: "channel",
    },
  },
};
