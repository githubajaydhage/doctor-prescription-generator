import React from "react";

function ThemeCustomizer({ theme, setTheme }) {
  const handleChange = (e) => {
    setTheme({ ...theme, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Customize Theme</h3>
      <label>
        Primary Color: <input type="color" name="primary" value={theme.primary} onChange={handleChange} />
      </label>
      <label>
        Secondary Color: <input type="color" name="secondary" value={theme.secondary} onChange={handleChange} />
      </label>
      <label>
        Accent Color: <input type="color" name="accent" value={theme.accent} onChange={handleChange} />
      </label>
      <label>
        Font Color: <input type="color" name="font" value={theme.font} onChange={handleChange} />
      </label>
    </div>
  );
}

export default ThemeCustomizer;
