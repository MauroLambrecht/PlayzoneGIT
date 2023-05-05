import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Colors from "../../config/colors";
import { GradientText } from "../../components/GradientComp";

const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 31;

const HomeScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60); // update current date every hour
    return () => clearInterval(intervalId);
  }, []);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];
  let dayCount = 1;

  for (let i = 0; i < 6; i++) {
    const weekDays = [];
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        weekDays.push(<View style={styles.emptyDay} key={`${i}-${j}`} />);
      } else if (dayCount <= daysInMonth) {
        const dayStyle =
          currentDate.getDate() === dayCount &&
          currentDate.getMonth() === currentMonth &&
          currentDate.getFullYear() === currentYear
            ? styles.currentDay
            : styles.day;
        weekDays.push(
          <View style={dayStyle} key={`${i}-${j}`}>
            <Text style={styles.dayText}>{dayCount}</Text>
          </View>
        );
        dayCount++;
      } else {
        weekDays.push(<View style={styles.emptyDay} key={`${i}-${j}`} />);
      }
    }
    calendarDays.push(
      <View style={styles.week} key={i}>
        {weekDays}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Friendly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Competitive</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.title}>
          <Ionicons name="ios-add-circle" size={24} color="black" />
          <Text style={styles.titletext}>Add item</Text>
        </View>
        <View style={styles.containercalendar}>
          <Text style={styles.monthText}>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentYear}
          </Text>
          <View style={styles.daysOfWeek}>
            <Text style={styles.dayOfWeekText}>Sun</Text>
            <Text style={styles.dayOfWeekText}>Mon</Text>
            <Text style={styles.dayOfWeekText}>Tue</Text>
            <Text style={styles.dayOfWeekText}>Wed</Text>
            <Text style={styles.dayOfWeekText}>Thu</Text>
            <Text style={styles.dayOfWeekText}>Fri</Text>
            <Text style={styles.dayOfWeekText}>Sat</Text>
          </View>
          {calendarDays}
        </View>
        <View style={styles.title}>
          <GradientText
            text={"This Week"}
            style={styles.Gradient}
          ></GradientText>
          <FontAwesome
            name="sliders"
            size={24}
            color="gray"
            style={styles.settings}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  settings: {
    marginLeft: 10,
    verticalAlign: "middle",
    justifyContent: "center",
  },
  title: {
    flexDirection: "row",
    marginLeft: "7%",
    marginTop: 40,
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 10,
    width: "38%",
    paddingVertical: 15,
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontFamily: "QuicksandBold",
  },
  titletext: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontFamily: "QuicksandSemi",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  containercalendar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  dayOfWeekText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyDay: {
    width: 40,
    height: 40,
  },
  dayText: {
    fontSize: 14,
  },
  currentDay: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  Gradient: {
    fontSize: 20,
    fontFamily: "QuicksandBold",
  },
});

export default HomeScreen;
