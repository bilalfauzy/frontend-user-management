import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  FaFaceDizzy,
  FaFaceGrinHearts,
  FaFaceGrinStars,
  FaPerson,
} from "react-icons/fa6";
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
                <FaFaceGrinStars className="me-2" color="white" />
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

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-4">
        <Container>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} User Management System. All rights
            reserved. By bilalfauzy
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
