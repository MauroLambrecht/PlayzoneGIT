import { useFonts } from "expo-font";

export const useProjectFonts = () => {
  const [fontsLoaded] = useFonts({
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    Monstserrat: require("../assets/fonts/Montserrat.ttf"),
    Quicksand: require("../assets/fonts/Quicksand.ttf"),
    QuicksandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuicksandSemi: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    RobotoLight: require("../assets/fonts/Roboto-Light.ttf"),
  });
  return fontsLoaded;
};
