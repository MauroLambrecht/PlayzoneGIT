import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Colors from "../../config/colors";

export const GradientText = (props) => {
  return (
    <MaskedView
      maskElement={
        //mask the text
        <Text style={[props.style, { backgroundColor: "transparent" }]}>
          {props.text}
        </Text>
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#A85656", "#FF8100"]}
      >
        {/*we need another text bc the width would be 0 but set the opacity to 0 so we don't see it*/}
        <Text style={[props.style, { opacity: 0 }]}>{props.text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export const GradientButton = (props) => {
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#A85656", "#FF8100"]}
      >
        <Text
          style={[
            props.style,
            {
              backgroundColor: "transparent",
              padding: 15,
              color: Colors.white,
              fontFamily: "QuicksandSemi",
            },
          ]}
        >
          {props.text}
        </Text>
      </LinearGradient>
    </View>
  );
};

export const GradientButtonRound = (props) => {
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#A85656", "#FF8100"]}
        style={{ borderRadius: 50 }}
      >
        <Text
          style={[props.style, { backgroundColor: "transparent", padding: 20 }]}
        >
          {props.text}
        </Text>
      </LinearGradient>
    </View>
  );
};
