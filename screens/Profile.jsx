import { View, Text, Image } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View className="flex-1 mt-5">
      <View className="flex items-center justify-center py-5">
        <Text className="text-xl font-bold">Profile</Text>
      </View>
      <View className="flex flex-row items-center gap-2 px-2 py-4 bg-blue-400">
        <View className="">
          <Image
            source={require("../assets/profile.jpeg")}
            className="w-20 h-20 rounded-full"
          />
        </View>
        <View className="flex flex-row gap-2 items-center">
          <View className="flex flex-row gap-1">
            <Text className="font-semibold text-sm text-white">First Name</Text>
            <Text className="font-semibold text-sm text-white">Last Name</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
