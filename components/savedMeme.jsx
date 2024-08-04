import { View, Image } from "react-native";
import React from "react";

const savedMeme = ({ item }) => {
  const memeImage = item?.preview
    ? { uri: item?.preview[1] }
    : require("../assets/demo.jpg");
  return (
    <View className="mx-2 mt-4 ">
      <View className="">
        <Image
          source={memeImage}
          className="w-40 h-40 rounded-lg object-contain"
          contentFit="cover"
          transition={1000}
        />
      </View>
    </View>
  );
};

export default savedMeme;
