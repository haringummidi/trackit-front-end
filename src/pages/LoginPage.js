import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container } from "react-bootstrap";
import TrackItSVG from "../components/svg/TrackIt_logo";
import { loginUser } from "../service/AuthenticationService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform authentication logic here
    console.log(username, password);
    const response = await loginUser(username, password);
    console.log(response);

    if (response?.token) {
      const userInfo = {
        user: response.user_data,
        accessToken: response.token,
        refreshToken: response.token,
        roles: response.user_data?.roles,
      };
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      login(userInfo);
      navigate("/home", { replace: true });
    } else {
      // Handle login error
      console.error("Login failed");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="px-3 py-3 bg-body-tertiary" style={{ width: "24rem" }}>
        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
          <TrackItSVG height={72} width={72} />
          {/* <h1>TractIt</h1> */}
          <h2 className="mb-3">Login</h2>
        </div>
        {/* Divider line */}
        <div style={{ borderTop: "1px solid #ccc", margin: "0.5rem 0" }}></div>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Form onSubmit={handleSubmit} style={{ width: "90%" }}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="test"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
