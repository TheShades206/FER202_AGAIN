import { useState } from "react";
import { Container } from "react-bootstrap";

function Header() {
  const [isDark, setIsDark] = useState(false);
  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: isDark ? "#222" : "#fff",
        color: isDark ? "#fff" : "#000",
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ margin: 0 }}>Mini Task Manager</h3>
        <button type="button" onClick={handleToggle} style={{ marginLeft: "auto" }}>
          {isDark ? "🌙 Dark" : "🔆 Light"}
        </button>
      </header>
    </Container>
  );
}

export default Header;
