import React from "react";
import { Card } from "react-bootstrap";

const ProductImage = ({ barcode }) => {
  const imageUrl = `http://localhost/images/2/${barcode}.jpg`;
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150?text=No+Image";
  };

  return (
    <Card.Img
      style={{
        height: "12rem",
        width: "10rem",
        objectFit: "cover",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
      variant="top"
      src={imageUrl}
      onError={handleError}
    />
  );
};

export default ProductImage;
