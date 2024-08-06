import { View, Text, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons/";
import PreferenceModal from "./PreferenceModal";
import loadPreferences from "../lib/loadPreferences";

const ProfileCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const loadPref = async () => {
    try {
      setPreferences(await loadPreferences());
    } catch (error) {
      console.error("Failed to load preferences:", error);
    }
  };
  useEffect(() => {
    loadPref();
  }, [preferences]);
  return (
    <View className="py-4 bg-slate-400">
      <View className="flex flex-row items-center gap-2 ">
        <View className="">
          <Image
            source={require("../assets/profile.jpeg")}
            className="w-20 h-20 rounded-full"
          />
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Text className="font-semibold text-lg text-white">First Name</Text>
          <Text className="font-semibold text-lg text-white">Last Name</Text>
        </View>
      </View>
      <View className="flex flex-row gap-1 items-center justify-end m-2">
        <Text className="text-base font-semibold text-white">
          {preferences.length ? "Edit Preferences" : "Add Preferences"}
        </Text>
        <Feather
          name="edit"
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
    </View>
  );
};

export default ProfileCard;
