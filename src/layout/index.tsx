import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ children }: any) => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            User Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Admin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Content Area */}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
