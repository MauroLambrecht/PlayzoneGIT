import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../config/colors";
import { useProjectFonts } from "../../config/fonts";
import { ActivityIndicator } from "react-native-paper";
import GameCard from "../../components/sections/GameCard";
import EnterCodeModal from "../../components/modals/EnterCodeModal.js";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlayScreen = () => {
  const navigation = useNavigation();
  const fontsLoaded = useProjectFonts();
  const [showSuboptions, setShowSuboptions] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [scannedQrCode, setScannedQrCode] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch("http://app.darksync.org/OpenGames", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  if (!fontsLoaded || loading) {
    return <ActivityIndicator />;
  }

  const toggleSuboptions = () => {
    setShowSuboptions(!showSuboptions);
  };

  const openScannerModal = () => {
    setShowScannerModal(true);
  };

  const closeScannerModal = () => {
    setShowScannerModal(false);
  };

  const openCodeModal = () => {
    setShowCodeModal(true);
  };

  const closeCodeModal = () => {
    setShowCodeModal(false);
  };

  const handleQRCodeScan = (data) => {
    setScannedQrCode(data);
    closeScannerModal();
    console.log("Scanned QR Code:", data);
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.searchContainer, { marginRight: 8 }]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for game"
              placeholderTextColor="#A4A4A4"
            />
            <Ionicons name="search" size={24} color="#A4A4A4" />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleSuboptions}
          >
            <Ionicons name="filter" size={24} color="#A4A4A4" />
          </TouchableOpacity>
        </View>
        {showSuboptions && (
          <View style={styles.suboptionsContainer}>
            <TouchableOpacity
              style={styles.suboptionButton}
              onPress={openScannerModal}
            >
              <Text style={styles.suboptionText}>Scan QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suboptionButton}
              onPress={openCodeModal}
            >
              <Text style={styles.suboptionText}>Enter Unique Code</Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView style={styles.scrollContainer}>
          {games.map((game) => (
            <GameCard key={game.IDGame} game={game} style={styles.card} />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateGame")}
        >
          <Ionicons name="ios-add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={showScannerModal}
        onRequestClose={closeScannerModal}
        animationType="slide"
      >
        <View style={styles.scannercontainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeScannerModal}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <BarCodeScanner
            onBarCodeScanned={handleQRCodeScan}
            style={styles.scanner}
          />
          <View style={styles.footer}>
            <Text style={styles.scanText}>Scan QR Code</Text>
          </View>
        </View>
      </Modal>
      <EnterCodeModal visible={showCodeModal} onClose={closeCodeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    position: "relative",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#000000",
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  suboptionsContainer: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 8,
    marginBottom: 20,
  },
  suboptionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  suboptionText: {
    fontSize: 16,
    color: "#000000",
  },
  addButton: {
    backgroundColor: "#A71286",
    borderRadius: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: -10,
    margin: 16,
    elevation: 10,
  },
  card: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannercontainer: {
    flex: 1,
    backgroundColor: "#000000",
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
  scanner: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    padding: 16,
  },
  scanText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default PlayScreen;
