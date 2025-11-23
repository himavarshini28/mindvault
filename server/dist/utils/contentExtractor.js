import { TwitterApi } from 'twitter-api-v2';
import { Innertube } from "youtubei.js";
export const extractYoutubeContent = async (url) => {
    try {
        console.log("📺 Extracting YouTube content");
        const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&]|$)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId)
            throw new Error("Invalid YouTube URL");
        console.log("🎬 Video ID:", videoId);
        const yt = await Innertube.create();
        const info = await yt.getInfo(videoId);
        console.log("📝 Fetching transcript...");
        const transcriptData = await info.getTranscript();
        const segments = transcriptData?.transcript?.content?.body?.initial_segments;
        if (!segments || segments.length === 0) {
            console.log("⚠️ No transcript found, falling back to video metadata");
            const title = info.basic_info.title || '';
            const description = info.basic_info.short_description || '';
            const content = `${title}. ${description}`;
            console.log("✅ Using metadata:", content.length, "chars");
            return content;
        }
        const fullText = segments
            .map((segment) => segment.snippet?.text || '')
            .filter((text) => text.length > 0)
            .join(' ');
        console.log("✅ Extracted transcript:", fullText.length, "chars");
        console.log("📄 Preview:", fullText.substring(0, 200));
        return fullText;
    }
    catch (error) {
        console.error("❌ YouTube extraction failed:", error);
        return "YouTube video - transcript not available";
    }
};
export const extractTwitterContent = async (url) => {
    try {
        console.log("🐦 Extracting Twitter content using API");
        const tweetIdMatch = url.match(/status\/(\d+)/);
        if (!tweetIdMatch)
            throw new Error("Invalid Twitter URL");
        const tweetId = tweetIdMatch[1];
        console.log("📝 Tweet ID:", tweetId);
        if (!tweetId)
            throw new Error("tweetId cant be fetched");
        const bearerToken = process.env.TWITTER_BEARER_TOKEN;
        if (!bearerToken) {
            throw new Error("TWITTER_BEARER_TOKEN not found in .env");
        }
        const client = new TwitterApi(bearerToken);
        // Fetch tweet data
        const tweet = await client.v2.singleTweet(tweetId, {
            'tweet.fields': ['text', 'author_id', 'created_at'],
        });
        const tweetText = tweet.data.text;
        console.log("✅ Extracted tweet:", tweetText.length, "chars");
        console.log("📄 Content:", tweetText);
        return tweetText;
    }
    catch (error) {
        console.error("❌ Twitter API failed:", error);
        throw error;
    }
};
//# sourceMappingURL=contentExtractor.js.map