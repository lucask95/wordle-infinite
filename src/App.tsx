import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

const handleKeypress = (e: KeyboardEvent) => {
  const re = /^[A-Za-z]$/;
  if (re.test(e.key)) {
    console.log(`Handle ${e.key.toLowerCase()}`);
  }
};

function App() {
  useEffect(() => {
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, []);

  return (
    <Container maxWidth='lg' style={{ padding: "25px 35px" }}>
      <Typography variant='h2'>Wordle but the way I like it</Typography>
    </Container>
  );
}

export default App;
