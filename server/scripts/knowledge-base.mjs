import { join } from "path";
import fetch from "node-fetch";
import { config } from "dotenv";
import { Scraper } from "agent-twitter-client";
import fs from "fs/promises";

const __dirname = new URL(".", import.meta.url).pathname;
const path = join(__dirname, "..", "..", ".env");

config({
  path: path,
});

// to be edited
const list = ["VitalikButerin", "BenArmstrongsX", "punk6529"];

const twitterCookiesPath = join(__dirname, "..", "..", "twitter-cookies.json");

const twitter_token = process.env.TWITTER_ACCESS_TOKEN_SECRET;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getLastTweets() {
  const response = await getRequest();
}

function groupTweets(tweets, maxWords = 200) {
  let currentChunk = "";
  const chunks = [];

  tweets.forEach((tweet) => {
    const text = tweet.text.trim();
    if (!text) return;

    if (text.split(" ").length > maxWords) {
      console.log(`Tweet ignoré (trop long) : ${text.substring(0, 50)}...`);
      return;
    }

    const currentChunkWordCount = currentChunk.split(" ").length;
    const tweetWordCount = text.split(" ").length;

    if (currentChunkWordCount + tweetWordCount > maxWords) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }

    currentChunk += " " + text;
  });

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

async function getRequest() {
  try {
    const cookieJson = await fs.readFile(twitterCookiesPath, "utf-8");
    const cookiesJSON = JSON.parse(cookieJson);
    const scraper = new Scraper();
    await scraper.setCookies(cookiesJSON.cookies);
    console.log("[TwitterService] Starting service with existing cookies...");
    const connected = await scraper.isLoggedIn();
    if (!connected) {
      throw new Error("Failed to login with existing cookies.");
    }
    const me = await scraper.me();
    console.log(me);

    const allTweets = [];

    for (const influencer of list) {
      const tweets = await scraper.getTweets(influencer, 30);
      for await (const tweet of tweets) {
        if (tweet.text) allTweets.push(tweet);
      }
    }

    const tweetChunks = groupTweets(allTweets);

    tweetChunks.forEach((chunk) => {
      fs.appendFile("./tweets.txt", chunk + "\n\n");
    });
  } catch (error) {
    console.log(error);
  }
}

(() => getLastTweets())();
