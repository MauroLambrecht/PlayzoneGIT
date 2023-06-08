import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SettingsPage = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handlePrivacyToggle = () => {
    setPrivacyEnabled(!privacyEnabled);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleBuyPlayzonePlus = () => {
    // Handle the Buy Playzone Plus action here
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Notification Settings</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={handleNotificationToggle}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Privacy Settings</Text>
        <Switch value={privacyEnabled} onValueChange={handlePrivacyToggle} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Language Settings</Text>
        <Picker selectedValue={language} onValueChange={handleLanguageChange}>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="French" value="French" />
        </Picker>
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={handleBuyPlayzonePlus}>
          <Text style={styles.title}>Buy Playzone Plus</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Other Preferences</Text>
        {/* Add your other preferences here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsPage;
