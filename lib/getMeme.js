import axios from "axios";

export default async function getMeme() {
  const response = await axios.get("https://meme-api-five.vercel.app/api/meme");
  const data = response.data.data;
  return data;
}
