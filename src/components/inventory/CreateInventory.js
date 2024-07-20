import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useSupplierContext } from "../../context/SupplierContext";
import { getAllSuppliers } from "../../service/SupplierService";
import { createProduct } from "../../service/ProductService"; // Assuming you have a service to handle product creation
import CameraBarcodeScanner from "../CamersBarCodeScanner";
import {
  MdOutlineAddBox,
  MdOutlineAddAPhoto,
  MdOutlineAddLink,
} from "react-icons/md";
import Loader from "../Loader";

const CreateInventory = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { suppliers, setSuppliers } = useSupplierContext([]);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageLocation: "",
    barcode: "",
    quantityInStock: 0,
    price: "",
    supplier: null,
    company: user.company,
  });

  useEffect(() => {
    async function fetchAllSuppliers() {
      try {
        const response = await getAllSuppliers();
        if (response) {
          setSuppliers(response);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
        setSuppliers([]);
      }
    }

    fetchAllSuppliers();
  }, [setSuppliers]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "supplier") {
      const selectedSupplier = suppliers.find(
        (supplier) => supplier.id === parseInt(value)
      );
      setFormData((prevData) => ({
        ...prevData,
        supplier: selectedSupplier,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await createProduct(formData);
      if (response) {
        // Handle successful product creation, e.g., reset form, show a success message
        setFormData({
          name: "",
          description: "",
          imageLocation: "",
          category: "",
          quantityInStock: 0,
          price: "",
          supplier: null,
          company: user.company,
        });
        alert("Product created successfully!");
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  const handleBarcodeDetected = (barcode) => {
    if (barcode) {
      setFormData((prevData) => ({
        ...prevData,
        barcode: barcode,
      }));
      setShowCameraModal(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container fluid className="mt-4">
      {/* Add New Product Section */}
      <Row>
        <Col>
          <h2>Add New Product</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm p-3 mb-4 bg-white rounded">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <InputGroup className="mb-3" controlId="barcode">
                  <Form.Control
                    type="text"
                    placeholder="Bar Code"
                    value={formData.barcode}
                    onChange={handleChange}
                  />
                  <MdOutlineAddAPhoto
                    size="2rem"
                    color="636363"
                    style={{ cursor: "pointer", marginLeft: "2rem" }}
                    onClick={() => setShowCameraModal(true)}
                  />
                </InputGroup>
                <Form.Group className="mb-3" controlId="quantityInStock">
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    value={formData.quantityInStock}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="supplier">
                  <Form.Label>Supplier</Form.Label>
                  <Form.Select
                    value={formData.supplier ? formData.supplier.id : ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Supplier...</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button variant="dark" type="submit">
                  Add Product
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CameraBarcodeScanner
        show={showCameraModal}
        onHide={() => setShowCameraModal(false)}
        onBarcodeDetected={handleBarcodeDetected}
      />
    </Container>
  );
};

export default CreateInventory;
