import { Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import GuessDisplay from "./components/GuessDisplay";
import { getRandomWord, isValidGuess } from "./util/utils";

const alphabetRegex = /^[A-Za-z]$/;

const styles = {
  root: {
    backgroundColor: "whitesmoke",
    width: "100vw",
    height: "100vh",
    textAlign: "center" as const,
  },
  innerContainer: { padding: "25px 35px" },
  guessContainer: {
    margin: "30px 0",
  },
};

function App() {
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [pastGuesses, setPastGuesses] = useState<Array<string>>([]);
  const [mysteryWord, setMysteryWord] = useState<string>(getRandomWord());
  const [betweenWords, setBetweenWords] = useState<boolean>(false);

  const checkWord = useCallback(
    (guess: string) => {
      if (guess.length === 5 && isValidGuess(guess)) {
        setPastGuesses((current) => [...current, guess]);
        setCurrentEntry("");
        if (guess === mysteryWord) {
          setBetweenWords(true);
        }
      }
    },
    [setCurrentEntry, setPastGuesses, setBetweenWords, mysteryWord]
  );

  const handleKeypress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (currentEntry.length > 0) {
          setCurrentEntry((val) => val.slice(0, -1));
        }
      } else if (e.key === "Enter" || e.key === "Return") {
        if (betweenWords) {
          setMysteryWord(getRandomWord());
          setBetweenWords(false);
          setPastGuesses([]);
        } else if (currentEntry.length === 5) {
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
    <div style={styles.root}>
      <Container maxWidth='lg' style={styles.innerContainer}>
        <Typography variant='h2'>Wordle but the way I like it</Typography>
        <Typography variant='h3'>
          mystery word is {mysteryWord.toUpperCase()}
        </Typography>
        <div style={styles.guessContainer}>
          {pastGuesses &&
            pastGuesses.map((guess) => (
              <GuessDisplay
                guess={guess}
                mysteryWord={mysteryWord}
                guessFinalized={true}
              />
            ))}
          {!betweenWords && (
            <GuessDisplay
              guess={currentEntry}
              mysteryWord={mysteryWord}
              guessFinalized={false}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
