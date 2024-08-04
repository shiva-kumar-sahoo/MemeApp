import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveMeme(item) {
  try {
    const oldSavedMemes = await AsyncStorage.getItem("savedMemes");
    let savedMemes = [];

    if (oldSavedMemes) {
      savedMemes = JSON.parse(oldSavedMemes);
    }

    const index = savedMemes.findIndex((meme) => meme.url === item.url);

    if (index !== -1) {
      savedMemes.splice(index, 1);

      await AsyncStorage.setItem("savedMemes", JSON.stringify(savedMemes));
    }
  } catch (error) {
    console.error("Error removing meme from AsyncStorage:", error);
  }
}
