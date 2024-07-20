import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import TrackItSVG from "./svg/TrackIt_logo";

const AppHeader = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
      }}
    >
      <Container>
        <div>
          <Navbar.Brand
            className="d-flex flex-row justify-content-center align-items-center"
            as={NavLink}
            to="/home"
          >
            <TrackItSVG height={36} width={36} />
            <h3 className="mt-2">TrackIt</h3>
          </Navbar.Brand>
        </div>

        {isAuthenticated() ? (
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/inventory">
                  Inventory Management
                </Nav.Link>
                <Nav.Link as={NavLink} to="/order">
                  Order Management
                </Nav.Link>
                <Nav.Link as={NavLink} to="/report">
                  Reporting
                </Nav.Link>
                <NavDropdown title={`${user.username}`} id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="user-settings">
                    User Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        ) : (
          <Nav>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default AppHeader;
