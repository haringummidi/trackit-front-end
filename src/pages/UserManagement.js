import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllRoles,
} from "../service/UserService";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import "./UserManagement.css"; // Import custom styles

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    role: null,
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const response = await getAllRoles();
    setRoles(response);
  };

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  const handleShowModal = (user = null) => {
    setCurrentUser(user);
    setFormData(
      user
        ? {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.roleDtos[0],
          }
        : { username: "", firstName: "", lastName: "", email: "", role: null }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      await updateUser(currentUser.id, formData);
    } else {
      console.log(roles, parseInt(formData.role));
      console.log(roles.find((r) => r.id === parseInt(formData.role)));
      await createUser({
        ...formData,
        roleDtos: [roles.find((r) => r.id === parseInt(formData.role))],
      });
    }
    fetchUsers();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>User Management</h2>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaUserPlus /> Add User
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.roleDtos.map((role) => role?.name).join(", ")}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowModal(user)}
                  className="mr-2"
                >
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role ? formData.role.id : ""}
                onChange={handleChange}
              >
                <option value="">Select Role...</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentUser ? "Update" : "Add"} User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserManagement;
