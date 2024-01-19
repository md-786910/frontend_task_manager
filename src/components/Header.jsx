import { Button, Col, Form, Nav, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import useSearchTag from "../context/SearchContext";

function Header() {
  const { handleSearch } = useSearchTag();

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
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Col>
              </Row>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
