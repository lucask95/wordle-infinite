import { Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import GuessDisplay from "./components/GuessDisplay";
import { getRandomWord, isValidGuess } from "./util/utils";

const alphabetRegex = /^[A-Za-z]$/;

function App() {
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [pastGuesses, setPastGuesses] = useState<Array<string>>([]);
  const [mysteryWord, setMysteryWord] = useState<string>(getRandomWord());

  const checkWord = useCallback(
    (guess: string) => {
      if (guess.length === 5 && isValidGuess(guess)) {
        setPastGuesses((current) => [...current, guess]);
        setCurrentEntry("");
      }
    },
    [setCurrentEntry, setPastGuesses]
  );

  const handleKeypress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (currentEntry.length > 0) {
          setCurrentEntry((val) => val.slice(0, -1));
        }
      } else if (e.key === "Enter" || e.key === "Return") {
        if (currentEntry.length === 5) {
          checkWord(currentEntry);
        }
      } else if (alphabetRegex.test(e.key)) {
        if (currentEntry.length < 5) {
          setCurrentEntry((val) => val + e.key);
        }
      }
    },
    [currentEntry, setCurrentEntry, checkWord]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <Container maxWidth='lg' style={{ padding: "25px 35px" }}>
      <Typography variant='h2'>Wordle but the way I like it</Typography>
      <Typography variant='h3'>mystery word is {mysteryWord}</Typography>
      {pastGuesses &&
        pastGuesses.map((guess) => (
          <GuessDisplay
            guess={guess}
            mysteryWord={mysteryWord}
            guessFinalized={true}
          />
        ))}
      <GuessDisplay
        guess={currentEntry}
        mysteryWord={mysteryWord}
        guessFinalized={false}
      />
    </Container>
  );
}

export default App;
