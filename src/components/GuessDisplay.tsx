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
    backgroundColor: "darkgray",
    margin: "25px 5px",
    borderRadius: 3,
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
        .map((char) => (
          <div style={styles.box}>
            <Typography variant='h5'>{char}</Typography>
          </div>
        ))}
    </div>
  );
};

export default GuessDisplay;
