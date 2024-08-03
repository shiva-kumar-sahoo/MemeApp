import { View, FlatList } from "react-native";
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
      <View className="px-2 bg-slate-400">
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
