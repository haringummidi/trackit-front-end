import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext";
import "./ListInventory.css";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../../service/ProductService"; // Import the deleteProduct method
import EditProductModal from "./EditProductModal"; // Import the modal component
import ProductImage from "./ProductImage";
import Loader from "../Loader";

const ListInventory = () => {
  const { products, setProducts } = useProductContext([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantityInStock: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await getAllProducts();
        if (response) {
          setProducts(response);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    }

    fetchAllProducts();
  }, [setProducts]);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      barcode: product.barcode,
      price: product.price,
      quantityInStock: product.quantityInStock,
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...selectedProduct,
        name: formData.name,
        description: formData.description,
        barcode: formData.barcode,
        price: formData.price,
        quantityInStock: formData.quantityInStock,
      };
      const response = await updateProduct(updatedProduct);
      if (response) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        handleClose();
        alert("Product updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        await deleteProduct(product.id);
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => {
      if (filterOption === "lowStock") {
        return product.quantityInStock < 10;
      } else if (filterOption === "outOfStock") {
        return product.quantityInStock === 0;
      } else {
        return true;
      }
    });

  if (loading) {
    return <Loader />;
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <Row>
            <Col>
              <h2>List of Products</h2>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <strong>Count:</strong> {products.length.toLocaleString("en-US")}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h6>Search:</h6>
              <Form.Control
                type="text"
                placeholder="Search products by name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-4"
              />
            </Col>
            <Col>
              <h6>Filter by Stock:</h6>
              <Form.Select
                value={filterOption}
                onChange={handleFilterChange}
                className="mb-4"
              >
                <option value="all">All Products</option>
                <option value="lowStock">Low on Inventory</option>
                <option value="outOfStock">Out of Stock</option>
              </Form.Select>
            </Col>
            <hr />
          </Row>
        </Col>
      </Row>
      <Row className="scrollable-list">
        {filteredProducts.map((product) => (
          <Col md={6} key={product.id} className="mb-4">
            <Card className="product-card shadow-sm p-2 rounded">
              <Row noGutters>
                <Col md={4} className="d-flex align-items-center">
                  <ProductImage barcode={product.imageLocation} />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title className="product-name">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="product-description">
                      {product.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Supplier:</strong> {product.supplier.name}
                      <br />
                      <strong>Price:</strong> {product.price}
                      <br />
                      <strong>Quantity:</strong> {product.quantityInStock}
                    </Card.Text>
                    <ButtonGroup className="float-right">
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="dark"
                        onClick={() => handleShow(product)}
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <EditProductModal
        show={show}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </Container>
  );
};

export default ListInventory;
