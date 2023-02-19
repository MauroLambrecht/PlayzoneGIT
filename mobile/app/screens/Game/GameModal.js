import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

import { AntDesign, Fontisto } from "@expo/vector-icons";
import DatePicker from "../../components/DateSelector";

import { useProjectFonts } from "../../config/fonts.js";
import Colors from "../../config/colors.js";

const StartGameModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const fontsLoaded = useProjectFonts();

  if (!fontsLoaded) {
    return undefined;
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDatePicked = (date) => {
    setDatePickerVisible(false);
  };

  const handleCancelDatePick = () => {
    setDatePickerVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          {/* from here includes all the content from the modal */}

          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Create A Game</Text>
          </View>
          <View style={styles.dateContainer}>
            <Fontisto name="date" size={24} color="#D3D3D3" />
            <Text style={styles.dateText}>DATE</Text>
          </View>
          <View style={styles.SelectDateContainer}>
            <TouchableOpacity style={styles.todayButton}>
              <Text style={styles.todayText}>Today</Text>
            </TouchableOpacity>
            <DatePicker
              isVisible={datePickerVisible}
              onDatePicked={handleDatePicked}
              onCancel={handleCancelDatePick}
              style={styles.DatePickerStyle}
            />
          </View>
          <View style={styles.dateContainer}>
            <AntDesign name="clockcircleo" size={24} color="#D3D3D3" />
            <Text style={styles.dateText}>TIME</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    height: "94%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Quicksand",
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  dateContainer: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 20,
    color: "#D3D3D3",
    fontSize: 18,
    fontFamily: "Quicksand",
    fontWeight: "700",
  },
  SelectDateContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  todayButton: {
    padding: 16,
    backgroundColor: Colors.orange,
    borderRadius: 12,
    width: "35%",
  },
  todayText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Quicksand",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default StartGameModal;
