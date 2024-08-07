import { View, Text, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons/";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PreferenceModal from "./PreferenceModal";
import EditProfileModal from "./EditProfileModal";
import loadPreferences from "../lib/loadPreferences";

const ProfileCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [preferences, setPreferences] = useState([]);
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

  const loadPref = async () => {
    try {
      setPreferences(await loadPreferences());
    } catch (error) {
      console.error("Failed to load preferences:", error);
    }
  };

  useEffect(() => {
    loadProfile();
    loadPref();
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
              profile.profileImage
                ? { uri: profile.profileImage }
                : require("../assets/profile.jpeg")
            }
            className="w-20 h-20 rounded-full"
          />
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Text className="font-semibold text-lg text-white">
            {profile.firstName || "First Name"}
          </Text>
          <Text className="font-semibold text-lg text-white">
            {profile.lastName || "Last Name"}
          </Text>
          <AntDesign
            name="edit"
            size={24}
            color="white"
            onPress={() => setIsEditModalVisible(true)}
          />
        </View>
      </View>
      <View className="flex flex-row gap-1 items-center justify-between border-t-2 border-gray-300 mt-4 mx-2 p-2">
        <Text className="text-base font-semibold text-slate-200">
          {preferences.length ? "Edit Preferences" : "Add Preferences"}
        </Text>
        <AntDesign
          name="right"
          size={24}
          color="white"
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      {preferences.length ? (
        <View className="mt-1 px-2">
          <Text className="text-base font-semibold text-white">
            Preferences:
          </Text>
          <FlatList
            data={preferences}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View className="bg-blue-400 p-2 m-1 rounded-md">
                <Text className="text-white">{item}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}

      <PreferenceModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleProfileSave}
      />
    </View>
  );
};

export default ProfileCard;
