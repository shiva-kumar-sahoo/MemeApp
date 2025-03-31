import { View, Text, FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import getSavedMemes from "../lib/getSavedMemes";
import SavedMeme from "../components/savedMeme";
import ProfileCard from "../components/ProfileCard";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = () => {
  const [savedMemeData, setSavedMemeData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
      <View className="flex pb-20">
        <FlatList
          renderItem={({ item }) => <SavedMeme item={item} />}
          data={savedMemeData}
          onEndReached={fetchMemeData}
          onEndReachedThreshold={2.5}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={<ProfileCard />}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchMemeData();
            setRefreshing(false);
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
