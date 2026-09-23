import { Button, Col, Form, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart} from 'react-icons/fa';
function Header() {
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold"><FaShoppingCart className='me-4'></FaShoppingCart>SHOP FASHION</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Products</Nav.Link>
            <Nav.Link href="#link">Men</Nav.Link>
            <Nav.Link href="#link">Women</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      <Form >
        <Row>
          <Col xs="auto">
            <FaShoppingCart></FaShoppingCart>
          </Col>
          <Col xs="auto">
            <p>Cart (0) </p>
          </Col>
        </Row>
      </Form>
      </Container>

    </Navbar>
    )

}

export default Header;