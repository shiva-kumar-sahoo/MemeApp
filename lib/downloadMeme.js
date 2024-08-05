import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

export default async function downloadMeme(item) {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to grant media library permissions to download the image."
      );
      return;
    }

    const imageUrl = item?.preview ? item.preview[2] : "";

    if (!imageUrl) {
      Alert.alert("Error", "Image URL not found.");
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}${item.title}.jpg`;

    const downloadResumable = FileSystem.createDownloadResumable(
      imageUrl,
      fileUri
    );
    const { uri } = await downloadResumable.downloadAsync();

    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync("Download");

    if (album == null) {
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    Alert.alert(
      "Download complete",
      "The Meme has been downloaded and saved to your gallery."
    );
  } catch (error) {
    console.error(error);
    Alert.alert(
      "Download failed",
      "An error occurred while downloading the Meme."
    );
  }
}
