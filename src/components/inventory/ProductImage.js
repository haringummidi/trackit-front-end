import React from "react";
import { Card } from "react-bootstrap";

const ProductImage = ({ barcode }) => {
  // const imageUrl = `http://localhost/images/2/${barcode}.jpg`;
  const imageUrl = barcode;
  const handleError = (e) => {
    e.target.onerror = null;
    // e.target.src = "https://via.placeholder.com/150?text=No+Image";
    e.target.src =
      "https://i5.walmartimages.com/seo/Fresh-Cravings-Roasted-Red-Pepper-Hummus-Dip-17-oz-Plastic-Tub-Gluten-Free-2-Tbsp-32g_d4b05329-f952-4668-99ca-f322145fdef8.ccfb9328177a527a1ff2f73cb6ecbc5f.png?odnHeight=212&odnWidth=212&odnBg=FFFFFF";
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
