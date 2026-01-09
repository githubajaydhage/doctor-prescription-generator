import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionPreview from "./PrescriptionPreview";
import ThemeCustomizer from "./ThemeCustomizer";

const defaultTheme = {
  primary: "#1976d2",
  secondary: "#fff",
  accent: "#e91e63",
  font: "#222"
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  background: ${(p) => p.theme.secondary};
  color: ${(p) => p.theme.font};
  min-height: 100vh;
`;

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [prescription, setPrescription] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h1>Fake Doctor Prescription Generator</h1>
        <ThemeCustomizer theme={theme} setTheme={setTheme} />
        <PrescriptionForm setPrescription={setPrescription} />
        {prescription && <PrescriptionPreview prescription={prescription} theme={theme} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
