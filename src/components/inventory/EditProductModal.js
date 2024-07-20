// EditProductModal.js
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditProductModal = ({
  show,
  handleClose,
  handleChange,
  handleSubmit,
  formData,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="barcode">
            <Form.Label>Bar Code</Form.Label>
            <Form.Control
              type="text"
              value={formData.barcode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="quantityInStock">
            <Form.Label>Quantity In Stock</Form.Label>
            <Form.Control
              type="number"
              value={formData.quantityInStock}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
