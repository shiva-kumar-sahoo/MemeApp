import { View, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import getMeme from "../lib/getMeme";
import MemeCard from "../components/memeCard";

const Home = () => {
  const [memeData, setMemeData] = useState([]);
  const fetchMemeData = async () => {
    const data = await getMeme();
    if (memeData.length > 0) {
      setMemeData([...memeData, ...data]);
    } else {
      setMemeData(data);
    }
  };
  useEffect(() => {
    fetchMemeData();
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 mt-5">
      <View className="flex items-center justify-center py-5">
        <Text className="text-xl font-bold">MemeApp</Text>
      </View>
      <View className="px-2 bg-slate-300">
        <FlatList
          renderItem={({ item }) => {
            return <MemeCard item={item} />;
          }}
          data={memeData}
          onEndReached={fetchMemeData}
          onEndReachedThreshold={2.5}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;
