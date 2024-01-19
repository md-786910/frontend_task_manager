import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex  align-items-center me-auto">
            <Nav.Link>
              <NavLink to="/">Task</NavLink>
            </Nav.Link>
            <Nav.Link>
              <Link to="/create-task">
                <Button>Add Task</Button>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
