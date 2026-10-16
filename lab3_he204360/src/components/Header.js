import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Header({ isDark, onToggleTheme }) {
  return (
    <Navbar expand="sm" className="app-header gap-3" aria-label="Điều hướng chính">
      <Navbar.Brand as={Link} to="/" className="fw-semibold fs-3 me-0">
        ProductStore
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navigation" />
      <Navbar.Collapse id="main-navigation">
        <Nav className="me-auto gap-sm-2 ms-sm-3">
          <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
          <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
        </Nav>
        <Button type="button" onClick={onToggleTheme} aria-label="Đổi giao diện sáng tối">
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
