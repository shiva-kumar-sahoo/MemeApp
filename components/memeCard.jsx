import { View, Text, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

const memeCard = () => {
  const memeImage = require("../assets/demo.jpg");
  return (
    <View>
      <View className="flex flex-row justify-between items-center">
        <View>
          <Text>Author Name</Text>
        </View>
        <View>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>
      </View>
      <View className="flex items-center p-2">
        <Text>Title</Text>
      </View>
      <View>
        <Image
          source={memeImage}
          className=""
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </View>
    </View>
  );
};

export default memeCard;
