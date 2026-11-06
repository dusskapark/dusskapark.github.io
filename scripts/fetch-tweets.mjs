// Snapshots every <TweetEmbed> post into content/tweets.json so pages render
// tweets without loading X/Twitter scripts or calling its API at runtime.
// Run `pnpm fetch:tweets` after adding or changing a TweetEmbed.
import fs from "node:fs/promises";
import path from "node:path";
import { getTweet } from "react-tweet/api";

const root = process.cwd();
const output = path.join(root, "content", "tweets.json");
const existing = JSON.parse(await fs.readFile(output, "utf8").catch(() => "{}"));
const ids = new Set();
for (const name of await fs.readdir(path.join(root, "content"), { recursive: true })) {
  if (!name.endsWith(".mdx")) continue;
  const text = await fs.readFile(path.join(root, "content", name), "utf8");
  for (const match of text.matchAll(/<TweetEmbed[^>]*?\/status\/(\d+)/g)) ids.add(match[1]);
}

const tweets = {};
for (const id of [...ids].sort()) {
  try {
    const tweet = await getTweet(id);
    if (tweet) tweets[id] = tweet;
    else if (existing[id]) tweets[id] = existing[id];
  } catch (error) {
    // Keep the last good snapshot; the authored quotation remains the fallback.
    if (existing[id]) tweets[id] = existing[id];
    console.warn(`Could not fetch tweet ${id}: ${error.message}`);
  }
}
await fs.writeFile(output, `${JSON.stringify(tweets, null, 2)}\n`);
console.log(`Saved ${Object.keys(tweets).length} of ${ids.size} tweets to content/tweets.json.`);
