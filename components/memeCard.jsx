import { View, Text, Image, ToastAndroid, Alert } from "react-native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import saveMeme from "../lib/saveMeme";
import unSaveMeme from "../lib/unSaveMeme";
import downloadMeme from "../lib/downloadMeme";
import { ResizeMode, Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const memeCard = ({ item }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const memeImage = item?.url
    ? { uri: item?.url }
    : require("../assets/no-image.jpg");

  const memeShare = async () => {
    try {
      const fileExt = item?.isVideo ? ".mp4" : ".png";
      let shareOptions = {
        dialogTitle: item?.title,
      };

      const memeFileUri = `${FileSystem.documentDirectory}${item?.title}${fileExt}`;
      const { uri } = await FileSystem.downloadAsync(item.url, memeFileUri);
      const localUrl = uri;

      await Sharing.shareAsync(localUrl, shareOptions);
      await FileSystem.deleteAsync(localUrl);
    } catch (err) {
      Alert.alert("Problem In Sharing", err.message);
    }
  };

  const memeSave = async () => {
    const updatedItem = { ...item, saved: true, liked: like };
    await saveMeme(updatedItem);
    ToastAndroid.show("Saved", ToastAndroid.SHORT);
    setSave(true);
  };
  const memeUnSave = async () => {
    await unSaveMeme(item);
    ToastAndroid.show("UnSaved", ToastAndroid.SHORT);
    setSave(false);
  };
  const memeDownload = async () => {
    await downloadMeme(item);
  };
  const video = useRef(null);
  return (
    <View className="p-2 my-2 bg-white rounded-md">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-2 mt-2">
          <View className="mx-5 w-10 h-10 rounded-full">
            <Image
              source={require("../assets/profile.jpeg")}
              className="w-10 h-10 rounded-full ml-4"
            />
          </View>
          <View className="flex ">
            <Text className="font-bold text-base">{item?.author}</Text>
            <Text className="text-sm text-gray-400">{item?.subreddit}</Text>
          </View>
        </View>
        <View className="mx-4">
          <Feather
            name="download"
            size={28}
            color="black"
            onPress={memeDownload}
          />
        </View>
      </View>
      <View className="flex p-2">
        <Text className="font-semibold">{item?.title}</Text>
      </View>
      <TapGestureHandler
        onActivated={() => {
          setLike(true);
        }}
        numberOfTaps={2}
      >
        <View className="flex items-center ">
          {item?.isVideo ? (
            <Video
              ref={video}
              className="w-full h-96 rounded-lg "
              source={{
                uri: item?.url,
              }}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={true}
              isLooping
              isMuted={true}
            />
          ) : (
            <Image
              source={memeImage}
              className="w-full h-96 rounded-lg object-contain"
              contentFit="cover"
              resizeMode="contain"
              transition={1000}
            />
          )}
        </View>
      </TapGestureHandler>
      <View className="flex flex-row justify-between px-6 mt-2">
        <View className="flex items-center">
          {like ? (
            <AntDesign
              name="heart"
              size={30}
              color="#FFC0CB"
              onPress={() => {
                setLike(false);
              }}
            />
          ) : (
            <AntDesign
              name="hearto"
              size={30}
              color="black"
              onPress={() => {
                setLike(true);
              }}
            />
          )}
          <Text className="text-sm">{item?.ups ? item?.ups : ""}</Text>
        </View>
        <AntDesign
          name="sharealt"
          size={30}
          color="black"
          onPress={memeShare}
        />
        {save ? (
          <Ionicons
            name="bookmark"
            size={30}
            color="black"
            onPress={memeUnSave}
          />
        ) : (
          <Ionicons
            name="bookmark-outline"
            size={30}
            color="black"
            onPress={memeSave}
          />
        )}
      </View>
    </View>
  );
};

export default memeCard;
