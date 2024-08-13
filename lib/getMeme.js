import axios from "axios";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default async function getMeme() {
  // const response = await axios.get("https://meme-api-five.vercel.app/api/meme");
  // const data = response.data.data;
  // return data;
  const memeSubReddits = [
    "IndianDankMemes",
    "desimemes",
    "DesiVideoMemes",
    "ProgrammerHumor",
    "HindiMemes",
    "funnyIndia",
    "DirtyMemes",
    "AdultMeme",
    "NSFWMemes",
  ];

  try {
    const memePromises = memeSubReddits.map(async (subreddit) => {
      let memes = [];
      const response = await axios.get(
        `https://www.reddit.com/r/${subreddit}/new.json?limit=10`
      );
      const memeRes = response.data.data.children;
      // console.log(`Fetched ${memeRes.length} memes from ${subreddit}`);
      memeRes.forEach((meme) => {
        const data = meme.data;

        if (data) {
          const memeData = {
            title: data.title,
            url: data.is_video
              ? data.media.reddit_video.fallback_url
              : data.url_overridden_by_dest,
            author: data.author,
            subreddit: data.subreddit,
            ups: data.ups,
            downs: data.downs,
            isVideo: data.is_video,
          };

          memes.push(memeData);
        }
      });
      return memes;
    });

    const memeResults = await Promise.all(memePromises);
    const flattenedMemes = memeResults.flat();
    shuffleArray(flattenedMemes);

    return flattenedMemes;
  } catch (error) {
    console.log("Something went wrong");
  }
}
