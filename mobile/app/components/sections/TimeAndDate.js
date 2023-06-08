import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../config/colors";

const TimeAndDate = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00 PM");

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    const formattedTime = formatTime(selectedTime);
    const selectedDateTime = `${formattedDate} ${formattedTime}`;
    onDateSelect(selectedDateTime);
  }, [selectedDate, selectedTime, onDateSelect]);

  // Generate an array of dates from today to 7 days further
  const dateArray = [];
  for (let i = 0; i < 32; i++) {
    const date = new Date();
    date.setDate(selectedDate.getDate() + i);
    dateArray.push(date);
  }

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDay = (date) => {
    const options = { weekday: "short" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate.substring(0, 3).toUpperCase();
  };

  const formatTime = (time) => {
    // Extract the hour and minute from the time string
    const [hour, minute] = time.split(":");

    // Convert the hour to 24-hour format
    let formattedHour = parseInt(hour, 10);
    if (hour.endsWith("PM") && formattedHour !== 12) {
      formattedHour += 12;
    } else if (hour.endsWith("AM") && formattedHour === 12) {
      formattedHour = 0;
    }

    // Construct the formatted time string
    return `${formattedHour.toString().padStart(2, "0")}:${minute}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="date-range"
          size={24}
          color={Colors.orange}
          style={styles.icon}
        />
        <Text style={styles.headerText}>Set Date</Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dateArray.map((date, index) => (
            <View
              key={index}
              style={[
                styles.dateCard,
                selectedDate.toDateString() === date.toDateString() &&
                  styles.selectedDateCard,
              ]}
              onTouchEndCapture={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate.getDate() === date.getDate() &&
                    styles.selectedDateText,
                ]}
              >
                {formatDate(date)}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  selectedDate.getDate() === date.getDate() &&
                    styles.selectedDayText,
                ]}
              >
                {formatDay(date)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.timeContainer}>
          <Picker
            style={styles.timePicker}
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            <Picker.Item label="12:00 AM" value="12:00 AM" />
            <Picker.Item label="1:00 AM" value="1:00 AM" />
            <Picker.Item label="2:00 AM" value="2:00 AM" />
            <Picker.Item label="3:00 AM" value="3:00 AM" />
            <Picker.Item label="4:00 AM" value="4:00 AM" />
            <Picker.Item label="5:00 AM" value="5:00 AM" />
            <Picker.Item label="6:00 AM" value="6:00 AM" />
            <Picker.Item label="7:00 AM" value="7:00 AM" />
            <Picker.Item label="8:00 AM" value="8:00 AM" />
            <Picker.Item label="9:00 AM" value="9:00 AM" />
            <Picker.Item label="10:00 AM" value="10:00 AM" />
            <Picker.Item label="11:00 AM" value="11:00 AM" />
            <Picker.Item label="12:00 PM" value="12:00 PM" />
            <Picker.Item label="1:00 PM" value="1:00 PM" />
            <Picker.Item label="2:00 PM" value="2:00 PM" />
            <Picker.Item label="3:00 PM" value="3:00 PM" />
            <Picker.Item label="4:00 PM" value="4:00 PM" />
            <Picker.Item label="5:00 PM" value="5:00 PM" />
            <Picker.Item label="6:00 PM" value="6:00 PM" />
            <Picker.Item label="7:00 PM" value="7:00 PM" />
            <Picker.Item label="8:00 PM" value="8:00 PM" />
            <Picker.Item label="9:00 PM" value="9:00 PM" />
            <Picker.Item label="10:00 PM" value="10:00 PM" />
            <Picker.Item label="11:00 PM" value="11:00 PM" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
  icon: {
    marginRight: 10,
    marginTop: 3,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#F59E0B",
    marginLeft: 10,
  },
  bottomContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  dateCard: {
    width: "5%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  selectedDateCard: {
    backgroundColor: "#f0f0f0",
  },
  dateText: {
    fontSize: 18,
    fontFamily: "QuicksandBold",
    color: "#a9a9a9",
  },
  selectedDateText: {
    color: "#000000",
  },
  dayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    fontFamily: "Quicksand",
    color: "#a9a9a9",
  },
  selectedDayText: {
    color: Colors.purple,
    fontFamily: "QuicksandSemi",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  timePicker: {
    flex: 1,
    height: 50,
    backgroundColor: "#f0f0f0",
  },
});

export default TimeAndDate;
