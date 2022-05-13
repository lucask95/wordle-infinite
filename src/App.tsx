import { Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

const alphabetRegex = /^[A-Za-z]$/;

function App() {
  const [currentEntry, setCurrentEntry] = useState<string>("");

  const handleKeypress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (currentEntry.length > 0) {
          setCurrentEntry((val) => val.slice(0, -1));
        }
      } else if (alphabetRegex.test(e.key)) {
        if (currentEntry.length < 5) {
          setCurrentEntry((val) => val + e.key);
        }
      }
    },
    [currentEntry, setCurrentEntry]
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
      <Typography variant='h3'>{currentEntry}</Typography>
    </Container>
  );
}

export default App;
