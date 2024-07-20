import React from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "./InventoryManagement.css"; // Import custom styles

export function InventoryLayout() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-2">
      <ButtonGroup aria-label="Inventory Buttons">
        <Button as={Link} to="/inventory" variant="dark">
          Products
        </Button>
        <Button as={Link} to="/inventory/create" variant="outline-dark">
          Create
        </Button>
        {/* <Button as={Link} to="/inventory/edit" variant="dark">
          Edit
        </Button> */}
      </ButtonGroup>

      <Outlet />
    </Container>
  );
}
