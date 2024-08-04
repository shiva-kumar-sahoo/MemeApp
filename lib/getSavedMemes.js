import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getSavedMemes() {
  try {
    const memeData = await AsyncStorage.getItem("savedMemes");
    return memeData;
  } catch (error) {
    console.error("Error getting meme to AsyncStorage:", error);
  }
}
