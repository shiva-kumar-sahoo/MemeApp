import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function loadPreferences() {
  try {
    const savedTypes = await AsyncStorage.getItem("memeTypes");

    if (savedTypes) {
      return JSON.parse(savedTypes);
    }
  } catch (error) {
    console.error("Failed to load preferences:", error);
  }
}
