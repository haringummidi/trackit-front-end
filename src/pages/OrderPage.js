import React from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Order() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-2">
      <ButtonGroup aria-label="Inventory Buttons">
        <Button as={Link} to="/order" variant="dark">
          Orders
        </Button>
        <Button as={Link} to="/order/create" variant="outline-dark">
          Create Order
        </Button>
        {/* <Button as={Link} to="/inventory/edit" variant="dark">
          Edit
        </Button> */}
      </ButtonGroup>

      <Outlet />
    </Container>
  );
}
