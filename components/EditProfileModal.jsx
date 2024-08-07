import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const EditProfileModal = ({ visible, onClose, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await AsyncStorage.getItem("personalInfo");
        if (profileData) {
          const { firstName, lastName, profileImage } = JSON.parse(profileData);
          setFirstName(firstName);
          setLastName(lastName);
          setProfileImage(profileImage);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    if (visible) {
      loadProfile();
    }
  }, [visible]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const profileData = { firstName, lastName, profileImage };
    try {
      await AsyncStorage.setItem("personalInfo", JSON.stringify(profileData));
      onSave(profileData);
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to save profile information");
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-5 rounded-lg w-4/5">
          <Text className="text-lg font-bold my-4">Edit Profile</Text>
          <View className="flex items-center justify-center my-4">
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../assets/profile.jpeg")
                }
                className="w-20 h-20 rounded-full mb-4"
              />
              <Text className="text-blue-500">Change Profile Picture</Text>
            </TouchableOpacity>
          </View>
          <View className="my-4">
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              className="border-b border-gray-300 mb-4"
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              className="border-b border-gray-300 mb-4"
            />
          </View>
          <View>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
