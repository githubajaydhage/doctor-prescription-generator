import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionPreview from "./PrescriptionPreview";
import ThemeCustomizer from "./ThemeCustomizer";


// Pre-built themes
const themes = {
  Default: {
    primary: "#1976d2",
    secondary: "#fff",
    accent: "#e91e63",
    font: "#222"
  },
  Dark: {
    primary: "#22223b",
    secondary: "#2a2a40",
    accent: "#f72585",
    font: "#fff"
  },
  Green: {
    primary: "#388e3c",
    secondary: "#e8f5e9",
    accent: "#ffb300",
    font: "#1b5e20"
  },
  Elegant: {
    primary: "#232526",
    secondary: "#f8fafc",
    accent: "#b993d6",
    font: "#232526"
  },
  Ocean: {
    primary: "#0093e9",
    secondary: "#e0f7fa",
    accent: "#00b4d8",
    font: "#023e8a"
  }
};


const Container = styled.div`
  font-family: 'Segoe UI', Arial, sans-serif;
  background: ${(p) => p.theme.secondary};
  color: ${(p) => p.theme.font};
  min-height: 100vh;
  padding: 0;
`;

const Header = styled.header`
  background: ${(p) => p.theme.primary};
  color: #fff;
  padding: 32px 0 16px 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Main = styled.main`
  max-width: 480px;
  margin: 32px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 24px 24px 24px;
  @media (max-width: 600px) {
    margin: 16px;
    padding: 16px 8px;
  }
`;



function App() {
  // Theme state
  const [theme, setTheme] = useState(themes.Default);
  const [selectedTheme, setSelectedTheme] = useState("Default");
  const [prescription, setPrescription] = useState(null);
  const [rxSymbol, setRxSymbol] = useState('℞');
  const [defaultMeds, setDefaultMeds] = useState([]);

  // Handle theme switch
  const handleThemeChange = (e) => {
    const name = e.target.value;
    setSelectedTheme(name);
    setTheme(themes[name]);
  };

  // Handle custom theme update
  const handleCustomTheme = (customTheme) => {
    setSelectedTheme("Custom");
    setTheme(customTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <h1 style={{margin: 0, fontWeight: 700, fontSize: '2.2rem', letterSpacing: 1}}>Fake Doctor Prescription Generator</h1>
          <div style={{fontSize: '1.1rem', fontWeight: 400, marginTop: 8, opacity: 0.85}}>Create, customize, and print a professional-looking prescription</div>
        </Header>
        <Main>
          {/* Theme Switcher */}
          <div style={{marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12}}>
            <label htmlFor="theme-select" style={{fontWeight: 500, minWidth: 120}}>Theme:</label>
            <select
              id="theme-select"
              value={selectedTheme}
              onChange={handleThemeChange}
              style={{padding: '6px 12px', borderRadius: 6, border: '1px solid #bbb', fontSize: '1rem'}}>
              {Object.keys(themes).map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
              <option value="Custom">Custom</option>
            </select>
            {selectedTheme === "Custom" && <span style={{fontSize: '0.95rem', color: theme.accent, fontWeight: 500}}>Customizing…</span>}
          </div>
          <ThemeCustomizer theme={theme} setTheme={handleCustomTheme} />
          <PrescriptionForm setPrescription={setPrescription} setRxSymbol={setRxSymbol} setDefaultMeds={setDefaultMeds} />
          {prescription && <PrescriptionPreview prescription={prescription} theme={theme} rxSymbol={rxSymbol} />}
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
