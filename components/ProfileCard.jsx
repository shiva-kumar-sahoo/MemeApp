import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons/";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfileModal from "./EditProfileModal";

const ProfileCard = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    profileImage: null,
  });

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

  return (
    <View className="py-4 bg-slate-400">
      <View className="flex flex-row items-center gap-2 ">
        <View className="px-2">
          <Image
            source={
              profile?.profileImage
                ? { uri: profile.profileImage }
                : require("../assets/profile.jpeg")
            }
            className="w-20 h-20 rounded-full"
          />
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Text className="font-semibold text-lg text-white">
            {profile?.firstName ? profile.firstName : "First Name"}
          </Text>
          <Text className="font-semibold text-lg text-white">
            {profile?.lastName ? profile.lastName : "Last Name"}
          </Text>
          <AntDesign
            name="edit"
            size={24}
            color="white"
            onPress={() => setIsEditModalVisible(true)}
          />
        </View>
      </View>
      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleProfileSave}
      />
    </View>
  );
};

export default ProfileCard;
