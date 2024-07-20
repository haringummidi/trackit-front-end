import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faBox,
  faChartLine,
  faUsers,
  faCog,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import custom styles

const cards = [
  { path: "/dashboard", icon: faChartPie, title: "Dashboard" },
  { path: "/inventory", icon: faBoxOpen, title: "Inventory Management" },
  { path: "/order", icon: faBox, title: "Order Management" },
  { path: "/report", icon: faChartLine, title: "Reporting" },
  { path: "/user-settings", icon: faUsers, title: "User Management" },
  // { path: "/settings", icon: faCog, title: "Settings" },
];

export default function Home() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-start align-items-center"
    >
      <h1 style={{ marginTop: "4rem" }}>Welcome to TrackIt</h1>
      <p>Your all-in-one inventory management and reporting system</p>
      <Row
        className="w-100 d-flex justify-content-center"
        style={{ marginTop: "4rem" }}
      >
        {cards.map((card, index) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={2}
            className="mb-4"
            key={index}
            onClick={() => handleCardClick(card.path)}
          >
            <Card className="text-center h-100 custom-card-height clickable-card">
              <Card.Body className="d-flex flex-column justify-content-start align-items-center custom-card-body">
                <FontAwesomeIcon icon={card.icon} size="3x" />
                <Card.Title className="mt-2 custom-card-title">
                  {card.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
