import { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <Container
      fluid
      style={{
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
        <h3 style={{ margin: 0 }}>Mini Movie Manager</h3>
        <Button
          type="button"
          onClick={toggleTheme}
          style={{ marginLeft: "auto" }}
        >
          {isDark ? "🌙 Dark" : "🔆 Light"}
        </Button>
      </header>
    </Container>
  );
}

export default Header;
