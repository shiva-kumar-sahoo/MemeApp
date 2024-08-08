import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import getSavedMemes from "../lib/getSavedMemes";
import SavedMeme from "../components/savedMeme";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const [savedMemeData, setSavedMemeData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMemeData = async () => {
    const data = await getSavedMemes();
    const parsedData = JSON.parse(data);
    setSavedMemeData(parsedData);
  };

  useEffect(() => {
    fetchMemeData();
  }, []);

  return (
    <View className="flex-1 mt-5">
      <View className="flex items-center justify-center py-5">
        <Text className="text-xl font-bold">Profile</Text>
      </View>
      <ProfileCard />
      <View className="flex pb-20">
        <FlatList
          renderItem={({ item }) => <SavedMeme item={item} />}
          data={savedMemeData}
          onEndReached={fetchMemeData}
          onEndReachedThreshold={2.5}
          showsVerticalScrollIndicator={false}
          numColumns={2}
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

export default Profile;
