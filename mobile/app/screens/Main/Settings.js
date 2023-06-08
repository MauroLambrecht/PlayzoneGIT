import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  I18nManager,
} from "react-native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import Colors from "../../config/colors";
import instance from "../../services";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import i18n from "i18n-js";

const Settings = () => {
  const [profilePictureUri, setProfilePicture] = useState(null);
  const [selectedModal, setSelectedModal] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [account, setAccount] = useState();
  const [inputValue, setInputValue] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("NL");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  useEffect(() => {
    const loadProfilePicture = async () => {
      try {
        const userObject = await AsyncStorage.getItem("user");
        const parsedUserObject = JSON.parse(userObject);
        setAccount(parsedUserObject);

        const cachedPicture = await AsyncStorage.getItem("profilePicture");
        if (cachedPicture) {
          setProfilePicture(cachedPicture);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    loadProfilePicture();
  }, []);

  const handleProfilePictureChange = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled) {
      return;
    }

    const selectedImage = pickerResult.assets[0];
    const selectedImageUri = selectedImage.uri;

    setProfilePicture(selectedImageUri);
    handleDatabaseProfilePicture(selectedImageUri);
  };

  const handleDatabaseProfilePicture = async (selectedImageUri) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const formData = new FormData();
      formData.append("profilePicture", {
        uri: selectedImageUri,
        name: "profilePicture.jpg",
        type: "image/jpeg",
      });
      await instance.patch("/changeprofilepicture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Get the base64 string from the selected image
      const image = await FileSystem.readAsStringAsync(selectedImageUri, {
        encoding: "base64",
      });
      const base64String = `data:image/jpeg;base64,${image}`;

      // Save the base64 string as the profile picture in AsyncStorage
      await AsyncStorage.setItem("profilePicture", base64String);

      showMessage({
        message: "Profile picture was changed successfully!",
        type: "success",
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        showMessage({
          message: "Server isn't reachable or Image is too big",
          type: "danger",
        });
      } else {
        showMessage({
          message: "Failed to change profile picture",
          type: "danger",
        });
      }
    }
  };

  const handleSignOut = () => {
    // Implement sign out logic here
  };

  const handleChangeEmail = () => {
    setSelectedModal("email");
    setInputValue("");
    setModalVisible(true);
  };

  const handleChangeUsername = () => {
    setSelectedModal("username");
    setInputValue("");
    setModalVisible(true);
  };

  const handleChangePassword = () => {
    setSelectedModal("password");
    setInputValue("");
    setVerificationPassword("");
    setModalVisible(true);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);

    showMessage({
      message: `Language preference updated to ${language}.`,
      type: "info",
    });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const passwordMatch = await instance.post(
        "/verify",
        { password: verificationPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (passwordMatch.data.isPasswordMatch) {
        if (selectedModal === "email") {
          await instance.patch(
            "/changeEmail",
            { newEmail: inputValue },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else if (selectedModal === "username") {
          await instance.patch(
            "/changeUsername",
            { newUsername: inputValue },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else if (selectedModal === "password") {
          await instance.patch(
            "/changePassword",
            { newPassword: inputValue },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
        showMessage({
          message: `${selectedModal} was changed successfully!`,
          type: "success",
        });
      } else {
        showMessage({
          message: "Password verification failed",
          type: "danger",
        });
      }
    } catch (error) {
      setModalVisible(false);
    }
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={handleProfilePictureChange}>
              <View style={styles.profileImageContainer}>
                {profilePictureUri ? (
                  <Image
                    source={{ uri: profilePictureUri }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/images/1slnr0.jpg")}
                    style={styles.profileImage}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{account?.username}</Text>
              <Text style={styles.userEmail}>{account?.email}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Change User Info</Text>
        <View style={styles.userSettingsContainer}>
          <TouchableOpacity onPress={handleProfilePictureChange}>
            <View style={styles.userSetting}>
              <Feather
                name="user"
                size={24}
                color="black"
                style={styles.userSettingIcon}
              />
              <View style={styles.userSettingTextContainer}>
                <Text style={styles.userSettingText}>
                  Change Profile Picture
                </Text>
                <Feather
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.rightArrowIcon}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangeEmail}>
            <View style={styles.userSetting}>
              <Feather
                name="mail"
                size={24}
                color="black"
                style={styles.userSettingIcon}
              />
              <View style={styles.userSettingTextContainer}>
                <Text style={styles.userSettingText}>Change Email</Text>
                <Feather
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.rightArrowIcon}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleChangeUsername}>
            <View style={styles.userSetting}>
              <Feather
                name="user"
                size={24}
                color="black"
                style={styles.userSettingIcon}
              />
              <View style={styles.userSettingTextContainer}>
                <Text style={styles.userSettingText}>Change Username</Text>
                <Feather
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.rightArrowIcon}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleChangePassword}>
            <View style={styles.userSetting}>
              <Feather
                name="lock"
                size={24}
                color="black"
                style={styles.userSettingIcon}
              />
              <View style={styles.userSettingTextContainer}>
                <Text style={styles.userSettingText}>Change Password</Text>
                <Feather
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.rightArrowIcon}
                />
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.title}>Other Preferences</Text>

          <TouchableOpacity>
            <View style={styles.userSetting}>
              <Feather
                name="bell"
                size={24}
                color="black"
                style={styles.userSettingIcon}
              />
              <View style={styles.userSettingTextContainer}>
                <Text style={styles.userSettingText}>
                  Notification Settings
                </Text>
                <Feather
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.rightArrowIcon}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <View style={styles.userSetting}>
              <Feather
                name="globe"
                size={24}
                color="black"
                style={styles.userSettingIcon}
              />
              <View style={styles.userSettingTextContainer}>
                <Text style={styles.userSettingText}>Language Preferences</Text>
                <Feather
                  name={showLanguageDropdown ? "chevron-down" : "chevron-right"}
                  size={24}
                  color="black"
                  style={styles.rightArrowIcon}
                />
              </View>
            </View>
          </TouchableOpacity>

          {showLanguageDropdown && (
            <View style={styles.languageDropdown}>
              <TouchableOpacity onPress={() => handleLanguageSelect("NL")}>
                <Text style={styles.languageOption}>NL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageSelect("Eng")}>
                <Text style={styles.languageOption}>Eng</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLanguageSelect("FR")}>
                <Text style={styles.languageOption}>FR</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Modal */}
        <Modal visible={isModalVisible} animationType="none" transparent>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={24} color={Colors.orange} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              {selectedModal === "password" ? (
                <View>
                  <Text style={styles.label}>Enter your new password:</Text>
                  <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder="Enter new password"
                    secureTextEntry
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={setVerificationPassword}
                    placeholder="Enter old password"
                    secureTextEntry
                  />
                </View>
              ) : (
                <View>
                  <Text style={styles.label}>Enter your {selectedModal}:</Text>
                  <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder={`Enter new ${selectedModal}`}
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={setVerificationPassword}
                    placeholder="Enter password"
                    secureTextEntry
                  />
                </View>
              )}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  languagePicker: {
    width: 150,
  },
  languageDropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
    marginBottom: 50,
  },
  languageOption: {
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
    marginRight: 16,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  emptyProfileImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
  },
  addPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
  },
  signOutButton: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  title: {
    marginTop: 30,
    padding: 16,
    fontWeight: "bold",
    fontSize: 15,
  },
  userSettingsContainer: {
    borderTopColor: "#ccc",
  },
  closeButton: {
    padding: 16,
    alignItems: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    color: "red",
  },
  userSetting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userSettingIcon: {
    marginRight: 8,
  },
  userSettingTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userSettingText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 32,
  },
  saveButton: {
    backgroundColor: Colors.orange,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
