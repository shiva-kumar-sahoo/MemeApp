import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons/";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfileModal from "./EditProfileModal";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const ProfileCard = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    profileImage: null,
  });

  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);
  const loadProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem("personalInfo");
      if (profileData) {
        setProfile(JSON.parse(profileData));
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleProfileSave = (newProfile) => {
    setProfile(newProfile);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("access_token");
            console.log("Logging out...");
            setIsLoggedIn(false);
          } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  const fullName = `${profile?.firstName || "Name"} ${profile?.lastName || ""}`;

  return (
    <View className="py-6 px-4 bg-indigo-600 rounded-lg shadow-md my-2 mx-2">
      {/* Profile Info and Edit Button */}
      <View className="flex flex-row items-center">
        <View className="mr-4">
          <Image
            source={
              profile?.profileImage
                ? { uri: profile.profileImage }
                : require("../assets/profile.jpeg")
            }
            className="w-24 h-24 rounded-full border-2 border-white"
          />
        </View>

        <View className="flex-1">
          <Text className="font-bold text-xl text-white mb-1">{fullName}</Text>

          <TouchableOpacity
            onPress={() => setIsEditModalVisible(true)}
            className="flex flex-row items-center bg-indigo-500 self-start px-3 py-2 rounded-md mt-2"
          >
            <AntDesign name="edit" size={16} color="white" />
            <Text className="text-white ml-2 font-medium">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="flex flex-row items-center justify-center mt-6 px-4 py-3 rounded-md bg-white"
      >
        <Ionicons name="log-out-outline" size={20} color="#6366F1" />
        <Text className="text-indigo-600 ml-2 font-medium">Logout</Text>
      </TouchableOpacity>

      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleProfileSave}
        initialProfile={profile}
      />
    </View>
  );
};

export default ProfileCard;
