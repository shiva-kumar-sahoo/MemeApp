import { View, Text, Image } from "react-native";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

const memeCard = ({ item }) => {
  const memeImage = item?.preview
    ? { uri: item?.preview[1] }
    : require("../assets/demo.jpg");
  console.log(item?.preview[1]);

  return (
    <View className="p-4 my-4 border">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-2">
          <View className="mx-5 w-10 h-10 rounded-full">
            <Image
              source={require("../assets/profile.jpeg")}
              className="w-10 h-10 rounded-full ml-4 "
            />
          </View>
          <Text>{item?.author}</Text>
        </View>
        <View>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>
      </View>
      <View className="flex p-2">
        <Text>{item?.title}</Text>
      </View>
      <View className="flex items-center my-5">
        <Image
          source={memeImage}
          className="w-60 h-40"
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View className="flex flex-row justify-between">
        <AntDesign name="hearto" size={24} color="black" />
        <AntDesign name="sharealt" size={24} color="black" />
        <Ionicons name="bookmark-outline" size={24} color="black" />
      </View>
    </View>
  );
};

export default memeCard;
