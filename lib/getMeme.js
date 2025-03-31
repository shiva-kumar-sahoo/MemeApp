import axios from "axios";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // Return array for method chaining
};

export default async function getMeme(options = {}) {
  // Default options
  const { limit = 20, includeNSFW = false, timeoutMs = 10000 } = options;

  // Separate SFW and NSFW subreddits
  const sfwSubreddits = [
    "IndianDankMemes",
    "desimemes",
    "DesiVideoMemes",
    "ProgrammerHumor",
    "HindiMemes",
    "funnyIndia",
  ];

  const nsfwSubreddits = ["DirtyMemes", "AdultMeme", "NSFWMemes"];

  // Select appropriate subreddits based on includeNSFW option
  const memeSubreddits = includeNSFW
    ? [...sfwSubreddits, ...nsfwSubreddits]
    : sfwSubreddits;

  try {
    console.log(`Fetching memes from ${memeSubreddits.length} subreddits...`);

    // Create an axios instance with timeout
    const instance = axios.create({
      timeout: timeoutMs,
      headers: { "User-Agent": "MemeApp/1.0" },
    });

    const memePromises = memeSubreddits.map(async (subreddit) => {
      try {
        const response = await instance.get(
          `https://www.reddit.com/r/${subreddit}/new.json?limit=10`
        );

        const memeRes = response.data.data.children;
        console.log(`Fetched ${memeRes.length} memes from ${subreddit}`);

        return memeRes
          .filter(
            (meme) =>
              meme.data &&
              (meme.data.is_video ||
                (meme.data.url_overridden_by_dest &&
                  /\.(jpg|jpeg|png|gif)$/i.test(
                    meme.data.url_overridden_by_dest
                  )))
          )
          .map((meme) => {
            const data = meme.data;
            return {
              id: data.id,
              title: data.title,
              url: data.is_video
                ? data.media.reddit_video.fallback_url
                : data.url_overridden_by_dest,
              author: data.author,
              subreddit: data.subreddit,
              ups: data.ups,
              downs: data.downs,
              num_comments: data.num_comments,
              isVideo: data.is_video,
              nsfw: data.over_18,
              created: data.created_utc,
            };
          });
      } catch (error) {
        console.error(`Error fetching from r/${subreddit}:`, error.message);
        return [];
      }
    });

    const memeResults = await Promise.all(memePromises);

    const flattenedMemes = memeResults.flat();

    const processedMemes = shuffleArray([...flattenedMemes])
      .slice(0, limit)
      .filter((meme) => meme && meme.url);

    console.log(`Returning ${processedMemes.length} memes`);
    return processedMemes;
  } catch (error) {
    console.error("Failed to fetch memes:", error.message);
    return [];
  }
}
