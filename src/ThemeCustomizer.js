
import React from "react";
import styled from "styled-components";

const CustomizerBox = styled.div`
  background: #f4f7fa;
  border-radius: 10px;
  padding: 18px 14px 10px 14px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Label = styled.label`
  font-weight: 500;
  min-width: 120px;
`;

function ThemeCustomizer({ theme, setTheme }) {
  // Only allow editing if in 'Custom' mode (detected by setTheme being a custom handler)
  // If setTheme is not the default, assume custom mode
  const isCustom = typeof setTheme === 'function' && setTheme.name === 'handleCustomTheme';

  const handleChange = (e) => {
    const newTheme = { ...theme, [e.target.name]: e.target.value };
    setTheme(newTheme);
  };

  return (
    <CustomizerBox>
      <h3 style={{margin:0, marginBottom:8, fontWeight:600, fontSize:'1.1rem'}}>Customize Theme</h3>
      <Row>
        <Label>Primary Color</Label>
        <input type="color" name="primary" value={theme.primary} onChange={handleChange} disabled={!isCustom} />
      </Row>
      <Row>
        <Label>Secondary Color</Label>
        <input type="color" name="secondary" value={theme.secondary} onChange={handleChange} disabled={!isCustom} />
      </Row>
      <Row>
        <Label>Accent Color</Label>
        <input type="color" name="accent" value={theme.accent} onChange={handleChange} disabled={!isCustom} />
      </Row>
      <Row>
        <Label>Font Color</Label>
        <input type="color" name="font" value={theme.font} onChange={handleChange} disabled={!isCustom} />
      </Row>
      {!isCustom && (
        <div style={{fontSize:'0.95rem', color:'#888', marginTop:8}}>
          Select <b>Custom</b> from the theme dropdown to edit colors.
        </div>
      )}
    </CustomizerBox>
  );
}

export default ThemeCustomizer;
