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

    const mediaUri = item?.url;
    const mediaExtension = item?.isVideo ? "mp4" : "jpg";

    if (!mediaUri) {
      Alert.alert("Error", "Image URL not found.");
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}${
      item?.title || "meme"
    }.${mediaExtension}`;

    const downloadResumable = FileSystem.createDownloadResumable(
      mediaUri,
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
