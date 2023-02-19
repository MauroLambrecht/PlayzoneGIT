import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        title="Select Date"
        onPress={showDatePicker}
        style={styles.ButtonStyle}
      >
        <Text style={styles.TextStyle}>
          {selectedDate
            ? moment(selectedDate).format("MM/DD/YYYY")
            : "Select Date"}
        </Text>
        <AntDesign
          style={styles.IconStyle}
          name="caretdown"
          size={18}
          color="#C9C9C9"
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D3D3D3",
    width: "90%",
    paddingVertical: 16,
    marginLeft: 20,
    flexDirection: "row",
  },

  TextStyle: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: "700",
    color: "#C9C9C9",
  },
  IconStyle: {
    marginLeft: "35%",
  },
});

export default DateTimePicker;
