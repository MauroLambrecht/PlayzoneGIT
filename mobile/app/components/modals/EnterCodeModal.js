import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../config/colors";

const EnterCodeModal = ({ visible, onClose }) => {
  const [code, setCode] = useState("");

  const handleCodeChange = (text) => {
    setCode(text);
  };

  const handleConfirm = () => {
    // TODO: Handle the entered code
    console.log("Entered Code:", code);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Enter Unique Code</Text>
          <TextInput
            style={styles.codeInput}
            placeholder="Enter code"
            placeholderTextColor="#A4A4A4"
            onChangeText={handleCodeChange}
            value={code}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  closeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    marginBottom: 20,
  },
  codeInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "80%",
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#A71286",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default EnterCodeModal;
