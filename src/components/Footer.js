import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="Footer mt-auto py-3 bg-dark text-white">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>About Us</h5>
            <p className="text-justify">
              TrackIt is your all-in-one inventory management and reporting
              system designed to streamline your operations and enhance
              productivity.
            </p>
          </Col>
          <Col md={1}></Col>
          <Col md={5} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <Row>
              <Col md={5}>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/dashboard" className="text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/inventory" className="text-white">
                      Inventory Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/order" className="text-white">
                      Order Management
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/report" className="text-white">
                      Reporting
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-settings" className="text-white">
                      User Management
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col md={2} className="text-md-end">
            <h5>Contact Us</h5>
            <p>
              Email: info@trackit.com <br />
              Phone: +1 234 567 890
            </p>
            <div>
              <a href="https://facebook.com" className="text-white me-2">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://twitter.com" className="text-white me-2">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://linkedin.com" className="text-white me-2">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a href="https://github.com" className="text-white">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 TrackIt. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
