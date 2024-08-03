import axios from "axios";

export default async function getMeme() {
  const response = await axios.get("https://meme-api.com/gimme/50");
  const data = response.data.memes;
  return data;
}
