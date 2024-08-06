import { View, Text, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import getSavedMemes from "../lib/getSavedMemes";
import SavedMeme from "../components/savedMeme";
import ProfileCard from "../components/ProfileCard";
import { useFocusEffect } from "@react-navigation/native";

const Profile = () => {
  const [savedMemeData, setSavedMemeData] = useState([]);
  const fetchMemeData = async () => {
    const data = await getSavedMemes();
    const parsedData = JSON.parse(data);
    setSavedMemeData(parsedData);
  };
  useFocusEffect(
    useCallback(() => {
      fetchMemeData();
    }, [])
  );
  return (
    <View className="flex-1 mt-5">
      <View className="flex items-center justify-center py-5">
        <Text className="text-xl font-bold">Profile</Text>
      </View>

      <View className="flex items-center pb-20">
        <FlatList
          renderItem={({ item }) => {
            return <SavedMeme item={item} />;
          }}
          data={savedMemeData}
          onEndReached={fetchMemeData}
          onEndReachedThreshold={2.5}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={<ProfileCard />}
        />
      </View>
    </View>
  );
};

export default Profile;
