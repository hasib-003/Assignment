import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import UserService from "../Services/UserService";
import { useNavigate, Navigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    birthDate: "",
    password: "",
  });

  const navigate = useNavigate();
  const userService = new UserService();

  const [allEmails, setAllEmails] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  useEffect(() => {
    async function fetchAllEmails() {
      let emails = await userService.getAllEmails();
      setAllEmails(emails);
      console.log(emails);
    }
    console.log("started ");
    fetchAllEmails();
  }, []);
  if (userService.is_loggedin()) {
    const redirectPath = userService.is_admin() ? "/admin" : "/profile";
    return <Navigate replace to={redirectPath} />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      setEmailAlreadyExists(allEmails.find((email) => email === value) != null);
       let re =
         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (re.test(value)) {
         setIsValidEmail(true);
       } else setIsValidEmail(false);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userService.registerUser(formData);
    navigate("/login");
  };

  return (
    <Container
      className="border border-dark-subtle mt-3"
      style={{ width: "500px" }}
    >
      <Row className="text-center border-bottom border-dark-subtle">
        <h3>Signup</h3>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-1" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              onChange={handleInputChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="m-1" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              onChange={handleInputChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="m-1" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              onChange={handleInputChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="m-1" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phonne number"
              name="phone"
              onChange={handleInputChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="m-1" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              name="email"
              onChange={handleInputChange}
              required
            ></Form.Control>
            {emailAlreadyExists && (
              <Form.Text style={{ color: "red" }} className="ms-3">
                Email already exists.
              </Form.Text>
            )}
            {!isValidEmail && (
              <Form.Text style={{ color: "red" }} className="ms-3">
                Email is not valid.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="m-1" controlId="birthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter your birthdate"
              name="birthDate"
              onChange={handleInputChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="m-1" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleInputChange}
              required
            ></Form.Control>
          </Form.Group>

          <Container>
            <Row className="text-center">
              <Col className="justify-content-end">
                <Button
                  className="m-1"
                  variant="primary"
                  type="submit"
                  disabled={isValidEmail && emailAlreadyExists}
                >
                  Submit
                </Button>
              </Col>
              <Col className="justify-content-start">
                <Button className="m-1" variant="danger" type="reset">
                  Cancel
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Row>
    </Container>
  );
}

export default Signup;
