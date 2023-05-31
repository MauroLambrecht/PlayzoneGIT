import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, Text, Switch, Platform, StyleSheet } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Feather from "react-native-vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../config/colors";

const Location = ({ onLocationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [closestLocation, setClosestLocation] = useState(false);
  const dropdownController = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await fetch("http://app.darksync.org/getLocations");
    const items = await response.json();
    const suggestions = items
      .filter((item) => item.Address.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.IDLocation,
        title: item.Address,
      }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);

  const handleToggleClosestLocation = (value) => {
    setClosestLocation(value);
  };

  const getSelectedLocation = useCallback(() => {
    if (selectedItem) {
      const selected = suggestionsList.find((item) => item.id === selectedItem);
      return selected ? selected.title : null;
    }
    return null;
  }, [selectedItem, suggestionsList]);

  useEffect(() => {
    const selectedLocation = getSelectedLocation();
    onLocationSelect(selectedLocation);
  }, [getSelectedLocation, onLocationSelect]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5
          name="location-arrow"
          size={20}
          color={Colors.orange}
          style={styles.icon}
        />
        <Text style={styles.headerText}>New Game</Text>
      </View>
      <View style={styles.closestLocationContainer}>
        <Text style={styles.closestLocationText}>Closest Location:</Text>
        <Switch
          value={closestLocation}
          onValueChange={handleToggleClosestLocation}
          trackColor={{ true: Colors.orange, false: Colors.gray }}
          thumbColor={closestLocation ? Colors.orange : Colors.gray}
        />
      </View>
      <View
        style={[
          styles.autocompleteContainer,
          Platform.OS === "ios" && styles.autocompleteContainerIOS,
        ]}
      >
        <AutocompleteDropdown
          ref={dropdownController}
          direction={Platform.OS === "ios" ? "down" : "up"}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            item && setSelectedItem(item.id);
          }}
          debounce={600}
          onClear={onClearPress}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false}
          textInputProps={{
            placeholder: "Type 3+ letters",
            autoCorrect: false,
            autoCapitalize: "none",
            style: styles.input,
          }}
          inputContainerStyle={styles.inputContainer}
          suggestionsListContainerStyle={styles.suggestionsListContainer}
          containerStyle={styles.dropdownContainer}
          renderItem={(item, text) => (
            <Text style={styles.suggestionItem}>{item.title}</Text>
          )}
          ChevronIconComponent={
            <Feather name="chevron-down" size={20} color={Colors.black} />
          }
          ClearIconComponent={
            <Feather name="x-circle" size={18} color="#FFFFFF" /> // Change to white
          }
          inputHeight={40}
          showChevron={false}
          closeOnBlur={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
  title: {
    fontSize: 24,
    color: Colors.black,
    fontFamily: "Quicksand",
  },
  closestLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  closestLocationText: {
    fontSize: 16,
    marginRight: 10,
  },
  autocompleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  autocompleteContainerIOS: {
    zIndex: 1,
  },
  inputContainer: {
    backgroundColor: Colors.DarkGray,
    borderWidth: 0,
  },
  input: {
    borderRadius: 8,
    backgroundColor: Colors.DarkGray,
    paddingLeft: 18,
    height: 50,
    color: "#FFFFFF",
  },

  suggestionsListContainer: {
    backgroundColor: Colors.DarkGray,
    marginTop: 10,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  suggestionItem: {
    backgroundColor: Colors.lightGrey,
    borderBottomColor: Colors.purple, // Add white bottom line
    borderBottomWidth: 3, // Adjust the thickness of the line as needed
    elevation: 16,
    padding: 15,
  },

  dropdownContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Location;
