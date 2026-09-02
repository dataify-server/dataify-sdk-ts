import { loadDataifySdk } from "./_load-sdk.mjs";
import { getApiKey, optionalEnv, printSummary } from "./_helpers.mjs";

const { DataifyClient } = await loadDataifySdk();
const client = new DataifyClient({ apiKey: getApiKey() });

const redditKeyword = optionalEnv("DATAIFY_TEST_REDDIT_KEYWORD") || "datascience";
const reddit = await client.tools.redditPostsByKeywords({
  keyword: redditKeyword,
  num_of_posts: "3",
});
printSummary("Reddit posts by keyword result", reddit);

const youtubeKeyword = optionalEnv("DATAIFY_TEST_YOUTUBE_KEYWORD") || "top videos";
const youtube = await client.tools.youtubeVideoPostByKeyword({
  keyword: youtubeKeyword,
  num_of_posts: "3",
});
printSummary("YouTube videos by keyword result", youtube);