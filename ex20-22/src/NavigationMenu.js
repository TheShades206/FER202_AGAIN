import { useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
} from 'reactstrap';

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar color="dark" dark expand="md" className="px-3" aria-label="Main navigation">
        <NavbarBrand tag={Link} to="/" onClick={() => setIsOpen(false)}>Logo</NavbarBrand>
        <NavbarToggler
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-controls="main-navigation"
          aria-expanded={isOpen}
        />
        <Collapse isOpen={isOpen} navbar id="main-navigation">
          <Nav className="ms-auto" navbar>
            {[
              ['/', 'Home'], ['/about', 'About'], ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <NavItem key={to}>
                <NavLink tag={RouterNavLink} to={to} end={to === '/'} onClick={() => setIsOpen(false)}>
                  {label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
      <nav className="demo-navigation" aria-label="Exercise navigation">
        <RouterNavLink to="/products">Products</RouterNavLink>
        <RouterNavLink to="/users">Users</RouterNavLink>
        <RouterNavLink to="/dishes">Dishes</RouterNavLink>
        <RouterNavLink to="/profile" end>Profile</RouterNavLink>
        <RouterNavLink to="/profile/2">Profile with ID</RouterNavLink>
      </nav>
    </>
  );
}
