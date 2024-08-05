import { View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const savedMeme = ({ item }) => {
  const memeImage = item?.preview
    ? { uri: item?.preview[1] }
    : require("../assets/demo.jpg");
  const navigation = useNavigation();
  return (
    <View className="mx-2 mt-4 ">
      <Pressable
        onPress={() => {
          navigation.navigate("ViewSavedMeme", { item });
        }}
      >
        <Image
          source={memeImage}
          className="w-40 h-40 rounded-lg object-contain"
          contentFit="cover"
          transition={1000}
        />
      </Pressable>
    </View>
  );
};

export default savedMeme;
