import words from "../data/wordsWithFrequency";

export const getRandomWord = () =>
  words[Math.floor(Math.random() * words.length)].word;
