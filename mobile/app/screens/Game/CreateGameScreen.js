//use this to make GameModal

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const StartGameModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLocationEnabled, setLocationEnabled] = useState(true);
  const [location, setLocation] = useState({});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleLocationToggle = () => {
    setLocationEnabled(!isLocationEnabled);
  };

  const handleLocationSelect = (data, details) => {
    setLocation({
      name: details.name,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create a Game</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Date:</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.todayButton}>
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.selectDateButton}
          >
            <Text style={styles.selectDateText}>Select Date</Text>
            <Ionicons name="chevron-down" size={20} color="black" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <Text style={styles.label}>Time:</Text>
        <View style={styles.timeContainer}>
          <TouchableOpacity style={styles.arrowButton}>
            <Ionicons name="ios-arrow-up" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.timeLabel}>{date.toLocaleTimeString()}</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <Ionicons name="ios-arrow-down" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Location:</Text>
        <View style={styles.locationContainer}>
          <View style={styles.locationToggle}>
            <Text style={styles.locationToggleText}>Use Closest Location</Text>
            <Switch
              value={isLocationEnabled}
              onValueChange={handleLocationToggle}
              trackColor={{ false: "#767577", true: "#FFA500" }}
              thumbColor={isLocationEnabled ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          {isLocationEnabled ? (
            <GooglePlacesAutocomplete
              placeholder="Enter Location"
              fetchDetails={true}
              onPress={handleLocationSelect}
              query={{
                key: "YOUR_API_KEY",
                language: "en",
              }}
              styles={{
                textInput: styles.locationPicker,
                poweredContainer: styles.poweredContainer,
              }}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Next" onPress={handleModalClose} />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Text>This is the start game dialog</Text>
          <Button title="Close" onPress={handleModalClose} />
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  todayButton: {
    backgroundColor: "#FFA500",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  todayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectDateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectDateText: {
    fontSize: 16,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  arrowButton: {
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  timeLabel: {
    fontSize: 20,
  },
  locationContainer: {
    width: "100%",
  },
  locationToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  locationToggleText: {
    fontSize: 16,
  },
  locationPicker: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  poweredContainer: {
    display: "none",
  },
  footer: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default StartGameModal;
