import { View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const savedMeme = ({ item }) => {
  const memeImage = item?.url
    ? { uri: item?.url }
    : require("../assets/no-image.jpg");
  const navigation = useNavigation();
  return (
    <View className="mx-2 mt-4 ">
      <Pressable
        onPress={() => {
          navigation.navigate("ViewSavedMeme", { item });
        }}
      >
        {item?.isVideo ? (
          <Video
            className="w-40 h-40 rounded-lg object-contain"
            source={{
              uri: item?.url,
            }}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
          />
        ) : (
          <Image
            source={memeImage}
            className="w-40 h-40 rounded-lg object-contain"
            contentFit="cover"
            transition={1000}
          />
        )}
      </Pressable>
    </View>
  );
};

export default savedMeme;
