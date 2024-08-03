import { View, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import getMeme from "../lib/getMeme";
import MemeCard from "../components/memeCard";

const Home = () => {
  const [memeData, setMemeData] = useState([]);

  useEffect(() => {
    const fetchMemeData = async () => {
      const data = await getMeme();
      setMemeData(data);
    };

    fetchMemeData();
  }, []);

  return (
    <View className="flex-1 mt-5">
      <View className="flex items-center justify-center py-5">
        <Text className="text-xl font-bold">MemeApp</Text>
      </View>
      <View className="px-2 bg-slate-300">
        <FlatList
          renderItem={({ item }) => {
            return <MemeCard item={item} />;
          }}
          estimatedItemSize={50}
          data={memeData}
        />
      </View>
    </View>
  );
};

export default Home;
