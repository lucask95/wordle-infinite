import words from "../data/wordsWithFrequency";

export const getRandomWord = () => {
  const list = Object.keys(words);
  return list[Math.floor(Math.random() * list.length)];
};

export const isValidGuess = (guess: string) => guess in words;
