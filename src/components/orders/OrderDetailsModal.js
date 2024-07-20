// OrderDetailsModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Container, Row, Col } from "react-bootstrap";
import { getOrderDetails } from "../../service/OrderService"; // Assuming you have this service method
import {
  getAllProducts,
  getProductsByOrder,
} from "../../service/ProductService";
import { useProductContext } from "../../context/ProductContext";

const OrderDetailsModal = ({ show, handleClose, order }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { products, setProducts } = useProductContext([]);

  useEffect(() => {
    if (order) {
      async function fetchAllProducts() {
        try {
          const response = await getAllProducts();
          if (response) {
            setProducts(response);
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
          setProducts([]);
        }
      }

      fetchAllProducts();
      async function fetchOrderDetails() {
        try {
          const response = await getOrderDetails(order.id);
          if (response) {
            setOrderDetails(response);
          }
        } catch (error) {
          console.error("Failed to fetch order details:", error);
          setOrderDetails([]);
        }
      }
      //   async function fetchProducts() {
      //     try {
      //       const response = await getProductsByOrder(order.id);
      //       if (response) {
      //         setProducts(response);
      //       }
      //     } catch (error) {
      //       console.error("Failed to fetch products:", error);
      //       setProducts([]);
      //     }
      //   }
      fetchOrderDetails();
      //   fetchProducts();
    }
  }, [order]);

  const findProductById = (id) => {
    return products.find((p) => p.id === id) || {};
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order #{order?.id} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h5
                style={{
                  textDecoration: "underline",
                  textDecorationThickness: "0.2rem",
                }}
              >
                Order Information
              </h5>
              <p>
                <strong>Order Date:</strong> {order?.orderDate}
                <br />
                <strong>Status:</strong> {order?.status || "Delivered"}
              </p>
            </Col>
            <Col>
              <h5
                style={{
                  textDecoration: "underline",
                  textDecorationThickness: "0.2rem",
                }}
              >
                Customer Information
              </h5>
              <p>
                <strong>Name:</strong> {order?.customer?.name}
                <br />
                <strong>Phone Number:</strong> {order?.customer?.phoneNumber}
                <br />
                <strong>Email:</strong> {order?.customer?.email}
                <br />
                <strong>Address:</strong> {order?.customer?.address}
              </p>
            </Col>
          </Row>
          <Table bordered={false} className="mt-4">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Status</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item) => {
                const product = findProductById(item.id.productId);
                return (
                  <tr key={item.id.productId}>
                    <td>
                      <img
                        src={product.imageLocation} // Replace with actual image URL
                        alt={product.name}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{item.quantity}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>Delivered</td>
                    <td>${(product.price * item.quantity).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{ textAlign: "right" }}>
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>
                    $
                    {orderDetails
                      .reduce((sum, item) => {
                        const product = findProductById(item.id.productId);
                        return sum + product.price * item.quantity;
                      }, 0)
                      .toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
