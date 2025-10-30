import { Innertube } from "youtubei.js";

export const extractYoutubeContent = async (url: string): Promise<string> => {
  try {
    console.log("📺 Extracting YouTube content");

    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[?&]|$)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (!videoId) throw new Error("Invalid YouTube URL");

    console.log("🎬 Video ID:", videoId);

    const yt = await Innertube.create();
    const info = await yt.getInfo(videoId);

    console.log("📝 Fetching transcript...");
    
    // Get transcript - the API returns a different structure
    const transcriptData = await info.getTranscript();
    
    // Access the transcript content correctly
    const segments = transcriptData?.transcript?.content?.body?.initial_segments;
    
    if (!segments || segments.length === 0) {
      console.log("⚠️ No transcript found, falling back to video metadata");
      
      // Fallback to title + description
      const title = info.basic_info.title || '';
      const description = info.basic_info.short_description || '';
      const content = `${title}. ${description}`;
      
      console.log("✅ Using metadata:", content.length, "chars");
      return content;
    }

    // Extract text from segments
    const fullText = segments
      .map((segment: any) => segment.snippet?.text || '')
      .filter((text: string) => text.length > 0)
      .join(' ');

    console.log("✅ Extracted transcript:", fullText.length, "chars");
    console.log("📄 Preview:", fullText.substring(0, 200));
    
    return fullText;

  } catch (error) {
    console.error("❌ YouTube extraction failed:", error);
    
    // If transcript fails completely, return a basic message
    // This prevents the whole process from crashing
    return "YouTube video - transcript not available";
  }
};

// Test
extractYoutubeContent("https://www.youtube.com/watch?v=z6kta72-RpQ&t=1s")
  .then(result => {
    console.log("\n🎉 Final result length:", result.length);
  })
  .catch(err => {
    console.error("Test failed:", err);
  });

