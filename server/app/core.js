const fs = require("fs");
const path = require("path");

const createWordDataset = () => {
  const cache = {};

  const getCommonWordSet = () => {
    const commonWords = fs
      .readFileSync(path.join(__dirname, "/commonwords.txt"))
      .toString()
      .split("\r")
      .map((word) => word.replace("\n", ""));
    return new Set(commonWords);
  };

  const loadWords = () => {
    if (!cache.words) {
      cache.words = JSON.parse(
        fs.readFileSync(path.join(__dirname, "/wordset.json"))
      );
    }

    if (!cache.commonwords) {
      cache.commonwords = getCommonWordSet();
    }

    return cache;
  };

  return { loadWords };
};

const cleanSentence = (sentence) => {
  return sentence
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
};

const filterCommonWords = (words, commonWords) => {
  const commonWordSet = new Set(commonWords);
  return [...words].filter((word) => !commonWordSet.has(word));
};

const createMatcher = () => {
  const dataset = createWordDataset().loadWords();

  const calculateMatches = (query) => {
    const cleanQuery = cleanSentence(query);
    const queryKeywords = filterCommonWords(
      cleanQuery.split(" "),
      dataset.commonwords
    );

    const matches = [];

    for (const word in dataset.words) {
      const keywords = dataset.words[word];
      const score = keywords.reduce((score, keyword) => {
        if (
          queryKeywords.some((queryKeyword) => keyword.includes(queryKeyword))
        ) {
          score += 1;
        }
        return score;
      }, 0);
      if (score > 1) {
        matches.push({ word, score });
      }
    }

    return matches.sort((matchA, matchB) => matchB.score - matchA.score);
  };
  return { calculateMatches };
};

module.exports = { createMatcher };
