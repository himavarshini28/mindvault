import { TwitterApi } from 'twitter-api-v2';
import { Innertube } from "youtubei.js";


export const extractYoutubeContent = async (url: string): Promise<string> => {
  try {
    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&]|$)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (!videoId) throw new Error("Invalid YouTube URL");

    const yt = await Innertube.create();
    const info = await yt.getInfo(videoId);

    const transcriptData = await info.getTranscript();

    const segments = transcriptData?.transcript?.content?.body?.initial_segments;

    if (!segments || segments.length === 0) {
      const title = info.basic_info.title || '';
      const description = info.basic_info.short_description || '';
      const content = `${title}. ${description}`;
      return content;
    }

    const fullText = segments
      .map((segment: any) => segment.snippet?.text || '')
      .filter((text: string) => text.length > 0)
      .join(' ');

    return fullText;
  } catch (error) {
    console.error("YouTube extraction failed:", error);
    return "YouTube video - transcript not available";
  }
};


export const extractTwitterContent = async (url: string): Promise<string> => {
  try {
    const tweetIdMatch = url.match(/status\/(\d+)/);
    if (!tweetIdMatch) throw new Error("Invalid Twitter URL");

    const tweetId = tweetIdMatch[1];
    if (!tweetId) throw new Error("tweetId cant be fetched");

    const bearerToken = process.env.TWITTER_BEARER_TOKEN;
    if (!bearerToken) {
      throw new Error("TWITTER_BEARER_TOKEN not found in environment");
    }

    const client = new TwitterApi(bearerToken);

    const tweet = await client.v2.singleTweet(tweetId, {
      'tweet.fields': ['text', 'author_id', 'created_at'],
    });

    const tweetText = tweet.data.text;
    return tweetText;

  } catch (error) {
    console.error("Twitter API failed:", error);
    throw error;
  }
};



