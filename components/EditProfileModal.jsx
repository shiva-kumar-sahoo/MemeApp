import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const EditProfileModal = ({ visible, onClose, onSave, initialProfile }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      // If initialProfile is provided, use it
      if (initialProfile) {
        setFirstName(initialProfile.firstName || "");
        setLastName(initialProfile.lastName || "");
        setProfileImage(initialProfile.profileImage);
      } else {
        // Otherwise load from storage
        loadProfile();
      }
    }
  }, [visible, initialProfile]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await AsyncStorage.getItem("personalInfo");
      if (profileData) {
        const { firstName, lastName, profileImage } = JSON.parse(profileData);
        setFirstName(firstName || "");
        setLastName(lastName || "");
        setProfileImage(profileImage);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      Alert.alert("Error", "Failed to load profile information");
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need camera roll permission to change your profile picture"
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSave = async () => {
    if (!firstName.trim()) {
      Alert.alert("Missing Information", "Please enter your first name");
      return;
    }

    try {
      setIsLoading(true);
      const profileData = { firstName, lastName, profileImage };
      await AsyncStorage.setItem("personalInfo", JSON.stringify(profileData));
      onSave(profileData);
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to save profile information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form and close modal
    if (initialProfile) {
      setFirstName(initialProfile.firstName || "");
      setLastName(initialProfile.lastName || "");
      setProfileImage(initialProfile.profileImage);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl w-11/12 max-w-md overflow-hidden">
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-xl font-bold text-indigo-700">
                Edit Profile
              </Text>
              <TouchableOpacity onPress={handleCancel} className="p-1">
                <Ionicons name="close" size={24} color="#6366F1" />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <View className="py-8 items-center justify-center">
                <ActivityIndicator size="large" color="#6366F1" />
              </View>
            ) : (
              <ScrollView className="px-4">
                {/* Profile Image */}
                <View className="items-center justify-center my-6">
                  <TouchableOpacity
                    onPress={pickImage}
                    className="relative"
                    activeOpacity={0.8}
                  >
                    <Image
                      source={
                        profileImage
                          ? { uri: profileImage }
                          : require("../assets/profile.jpeg")
                      }
                      className="w-28 h-28 rounded-full"
                    />
                    <View className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full shadow-md border-2 border-white">
                      <AntDesign name="camera" size={18} color="white" />
                    </View>
                  </TouchableOpacity>
                  <Text className="text-indigo-600 mt-3 font-medium">
                    Change Profile Picture
                  </Text>
                </View>

                {/* Form */}
                <View className="mb-6">
                  <View className="mb-4">
                    <Text className="text-gray-600 mb-1 font-medium">
                      First Name
                    </Text>
                    <TextInput
                      placeholder="Enter your first name"
                      value={firstName}
                      onChangeText={setFirstName}
                      className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="text-gray-600 mb-1 font-medium">
                      Last Name
                    </Text>
                    <TextInput
                      placeholder="Enter your last name"
                      value={lastName}
                      onChangeText={setLastName}
                      className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                    />
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row justify-between mb-6">
                  <TouchableOpacity
                    onPress={handleCancel}
                    className="flex-1 mr-2 py-3 rounded-lg bg-gray-200"
                  >
                    <Text className="text-center font-medium text-gray-700">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSave}
                    className="flex-1 ml-2 py-3 rounded-lg bg-indigo-600"
                  >
                    <Text className="text-center font-medium text-white">
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditProfileModal;
