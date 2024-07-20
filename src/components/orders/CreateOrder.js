// CreateOrder.js
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import {
  searchCustomerByPhone,
  createCustomer,
  createOrder,
  saveOrderDetails,
} from "../../service/OrderService"; // Assume these service functions are implemented
import { getProductByBarcode } from "../../service/ProductService";
import { FaUserPlus } from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import {
  MdOutlineAddBox,
  MdOutlineAddAPhoto,
  MdOutlineAddLink,
} from "react-icons/md";
import CameraBarcodeScanner from "../CamersBarCodeScanner";

const CreateOrder = () => {
  const [customerPhone, setCustomerPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [products, setProducts] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [total, setTotal] = useState(0);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);

  const handleReset = () => {
    setCustomerPhone("");
    setCustomer(null);
    setCustomerForm({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    setProducts([]);
    setBarcode(0);
    setTotal(0);
  };

  const handleCustomerSearch = async () => {
    try {
      const response = await searchCustomerByPhone(customerPhone);
      if (response) {
        setCustomer(response);
      } else {
        setCustomer(null);
      }
    } catch (error) {
      console.error("Failed to search customer:", error);
      setCustomer(null);
    }
  };

  const handleCustomerCreate = async () => {
    try {
      const response = await createCustomer(customerForm);
      if (response) {
        setCustomer(response);
        setShowCustomerModal(false);
      }
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  const handleAddProduct = async (barcode) => {
    try {
      const response = await getProductByBarcode(barcode);
      if (response) {
        const existingProduct = products.find((p) => p.id === response.id);
        if (existingProduct) {
          setProducts(
            products.map((p) =>
              p.id === response.id ? { ...p, quantity: p.quantity + 1 } : p
            )
          );
        } else {
          setProducts([...products, { ...response, quantity: 1 }]);
        }
        setBarcode("");
      } else {
        console.log("Product not found for " + barcode);
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      if (productId) {
        const existingProduct = products.find((p) => p.id === productId);
        if (existingProduct) {
          if (existingProduct.quantity > 1) {
            setProducts(
              products.map((p) =>
                p.id === existingProduct.id
                  ? { ...p, quantity: p.quantity - 1 }
                  : p
              )
            );
          } else {
            setProducts(products.filter((p) => p.id !== productId));
          }
          setBarcode("");
        } else {
          console.log("Product not found for " + productId);
        }
      } else {
        console.log("Product ID is invalid");
      }
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const order = {
        customer,
        totalAmount: total,
      };
      const response = await createOrder(order);
      if (response) {
        try {
          const orderDetailsToSave = products.map((product) => ({
            id: {
              orderId: response.id,
              productId: product.id,
            },
            quantity: product.quantity,
            price: product.price,
          }));
          const response1 = await saveOrderDetails(orderDetailsToSave);
          if (response1) {
            alert("Order created successfully!");
            handleReset();
          }
        } catch (error) {
          console.error("Failed to add product:", error);
        }
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const handleBarcodeDetected = (barcode) => {
    if (barcode) {
      handleAddProduct(barcode);
      setShowCameraModal(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddProduct(barcode);
    }
  };

  useEffect(() => {
    setTotal(
      products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      )
    );
  }, [products]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [barcode]);

  return (
    <Container fluid className="mt-4">
      <h2>Order</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Enter customer phone number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <RiUserSearchLine
            size="2rem"
            color="636363"
            style={{ cursor: "pointer", marginLeft: "1rem" }}
            onClick={handleCustomerSearch}
          />
          {customer ? (
            <></>
          ) : (
            <FaUserPlus
              size="2rem"
              color="636363"
              style={{ cursor: "pointer", marginLeft: "2rem" }}
              onClick={() => setShowCustomerModal(true)}
            />
          )}
        </Col>
      </Row>
      {customer && (
        <Row className="mb-4">
          <Col>
            <h5>Customer Details</h5>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phoneNumber}</p>
          </Col>
        </Row>
      )}
      <Modal
        show={showCustomerModal}
        onHide={() => setShowCustomerModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="customerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={customerForm.name}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="customerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={customerForm.email}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="customerPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={customerForm.phoneNumber}
                onChange={(e) =>
                  setCustomerForm({
                    ...customerForm,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="customerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={customerForm.address}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, address: e.target.value })
                }
              />
            </Form.Group>
            <Button onClick={handleCustomerCreate}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Scan barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <MdOutlineAddBox
            size="2.2rem"
            color="636363"
            style={{ cursor: "pointer" }}
            onClick={() => handleAddProduct(barcode)}
          />
          <MdOutlineAddAPhoto
            size="2rem"
            color="636363"
            style={{ cursor: "pointer", marginLeft: "2rem" }}
            onClick={() => setShowCameraModal(true)}
          />
          <MdOutlineAddLink
            size="2.2rem"
            color="636363"
            style={{ cursor: "pointer", marginLeft: "2rem" }}
            onClick={() => setShowScannerModal(true)}
          />
        </Col>
      </Row>
      <Table bordered={false} className="mt-4">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.imageLocation} // Replace with actual image URL
                  alt={product.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <span>${(product.price * product.quantity).toFixed(2)} </span>
                <IoMdCloseCircle
                  size="1.5rem"
                  color="636363"
                  style={{ cursor: "pointer", marginLeft: "2rem" }}
                  onClick={() => handleRemoveProduct(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={{ textAlign: "right" }}>
              <strong>Total:</strong>
            </td>
            <td>
              <strong>${total.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Button variant="success" onClick={handleCreateOrder}>
        Pay via Cash
      </Button>
      <CameraBarcodeScanner
        show={showCameraModal}
        onHide={() => setShowCameraModal(false)}
        onBarcodeDetected={handleBarcodeDetected}
      />
      <Modal show={showScannerModal} onHide={() => setShowScannerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Use Barcode Scanner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Use your barcode scanner to scan the product barcode.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowScannerModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateOrder;
