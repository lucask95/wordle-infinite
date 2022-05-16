import { Container, Snackbar, Typography } from "@mui/material";
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
  const [invalidMessageOpen, setInvalidMessageOpen] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);

  const checkWord = useCallback(
    (guess: string) => {
      if (guess.length === 5 && isValidGuess(guess)) {
        if (guess === mysteryWord) {
          setBetweenWords(true);
        } else if (pastGuesses.length === 5) {
          setBetweenWords(true);
          setIsGameEnded(true);
        }
        setPastGuesses((current) => [...current, guess]);
        setCurrentEntry("");
      } else {
        setInvalidMessageOpen(true);
      }
    },
    [mysteryWord, pastGuesses]
  );

  const handleKeypress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (isGameEnded) return;
        if (currentEntry.length > 0) {
          setCurrentEntry((val) => val.slice(0, -1));
        }
      } else if (e.key === "Enter" || e.key === "Return") {
        if (betweenWords) {
          setMysteryWord(getRandomWord());
          setBetweenWords(false);
          setPastGuesses([]);
          setIsGameEnded(false);
        } else if (currentEntry.length === 5) {
          checkWord(currentEntry);
        } else {
          setInvalidMessageOpen(true);
        }
      } else if (alphabetRegex.test(e.key)) {
        if (isGameEnded) return;
        if (currentEntry.length < 5) {
          setCurrentEntry((val) => val + e.key);
        }
      }
    },
    [currentEntry, setCurrentEntry, checkWord, betweenWords, isGameEnded]
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
          Mystery word is {mysteryWord.toUpperCase()}
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
          {!betweenWords && !isGameEnded && (
            <GuessDisplay
              guess={currentEntry}
              mysteryWord={mysteryWord}
              guessFinalized={false}
            />
          )}
        </div>
        <Snackbar
          open={invalidMessageOpen}
          autoHideDuration={2500}
          onClose={() => {
            setInvalidMessageOpen(false);
          }}
          message='Invalid word.'
        />
      </Container>
    </div>
  );
}

export default App;
