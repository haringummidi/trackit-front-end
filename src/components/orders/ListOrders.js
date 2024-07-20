import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./ListOrders.css";
import { getAllOrders } from "../../service/OrderService";
import OrderDetailsModal from "./OrderDetailsModal"; // Import the modal component
import PaginationComponent from "../pagination/pagination";
import Loader from "../Loader";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllOrders() {
      try {
        const response = await getAllOrders(currentPage, pageSize);
        if (response) {
          setOrders(response.content); // Assuming your API response has a `content` field for paged data
          setTotalPages(response.totalPages); // Assuming your API response has a `totalPages` field
          setTotalOrders(response.totalElements); // Assuming your API response has a `totalElements` field
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      }
    }

    fetchAllOrders();
  }, [currentPage, pageSize]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h2>List of Orders</h2>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <strong>Total Orders:</strong> {totalOrders.toLocaleString("en-US")}
          <br />
          <strong>Orders in page:</strong> {orders.length}
        </Col>
      </Row>
      <div className="scrollable-list">
        <Row>
          {orders.map((order, index) => (
            <Col md={6} key={order.id} className="mb-4">
              <Card
                className={`shadow-sm p-3 mb-4 text-white rounded custom-card-${
                  index % 4
                }`}
              >
                <Card.Body>
                  <Card.Text className="d-flex justify-content-between">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <br />
                      Order Date: {order.orderDate}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      Customer: {order.customer.name}
                      <br />
                      Status: Delivered
                    </div>
                  </Card.Text>
                  <Button
                    variant="light"
                    onClick={() => handleShowModal(order)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="pagination-container">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          show={showModal}
          handleClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </Container>
  );
};

export default ListOrders;
