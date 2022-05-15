import { Typography } from "@mui/material";
import React, { useMemo } from "react";

type Props = {
  guess: string;
  mysteryWord: string;
  guessFinalized: boolean;
};

const styles = {
  box: {
    width: 50,
    height: 50,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: "#3a3a3c",
    margin: "25px 5px",
    borderRadius: 3,
  },
  letterInWord: {
    backgroundColor: "#b59f3b",
  },
  correctSpace: {
    backgroundColor: "#538d4e",
  },
};

const convertToMap = (word: string): Record<string, number> => {
  const dict: Record<string, number> = {};

  word.split("").forEach((c) => {
    if (c in dict) {
      dict[c]++;
    } else {
      dict[c] = 1;
    }
  });

  return dict;
};

const getStyles = (
  guessSoFar: string,
  mysteryWord: string,
  mysteryWordMap: Record<string, number>
) => {
  return { ...styles.box, ...styles.correctSpace };
};

const GuessDisplay = ({ guess, mysteryWord, guessFinalized }: Props) => {
  const mysteryWordMap = useMemo(
    () => convertToMap(mysteryWord),
    [mysteryWord]
  );

  return (
    <div>
      {guess
        .toUpperCase()
        .padEnd(5)
        .split("")
        .map((char, i) => (
          <div
            style={
              guessFinalized
                ? getStyles(guess.slice(0, i + 1), mysteryWord, mysteryWordMap)
                : styles.box
            }
          >
            <Typography variant='h5'>{char}</Typography>
          </div>
        ))}
    </div>
  );
};

export default GuessDisplay;
