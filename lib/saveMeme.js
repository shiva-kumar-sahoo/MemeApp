import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveMeme(item) {
  console.log(item);

  try {
    const oldSavedMeme = await AsyncStorage.getItem("savedMemes");
    let savedMemes = [];

    if (oldSavedMeme) {
      savedMemes = JSON.parse(oldSavedMeme);
    }

    savedMemes.push(item);

    await AsyncStorage.setItem("savedMemes", JSON.stringify(savedMemes));
  } catch (error) {
    console.error("Error saving meme to AsyncStorage:", error);
  }
}
