import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

//TODO add animation
const Overlay = ({ visible, onPress }) => {
  return (
    visible && (
      <TouchableOpacity style={styles.overlay} onPress={onPress}>
        <View style={styles.overlayBackground}></View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default Overlay;
