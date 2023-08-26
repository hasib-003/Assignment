import React, { useState, useEffect } from "react";
import { Col, Container, FormControl, Row, Table } from "react-bootstrap";
import UserService from "../Services/UserService";

function AdminView() {
  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState("");

  const userService = new UserService();

  useEffect(() => {
    console.log("hi");
    async function fetchAllUsers() {
      const allUsers = await userService.getAllUsers();
      console.log(allUsers);
      setUsers(allUsers);
    }
    fetchAllUsers();
  },[]);

  return (
    <Container className="mt-5">
      <Row className="border">
        <Col>
          <h3 className="m-2">Users List</h3>
        </Col>
        <Col className="text-end">
          <FormControl
            type="text"
            className="m-2"
            placeholder="Enter search string"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => {
                return (
                  searchString === "" ||
                  user.name.includes(searchString) ||
                  user.email.includes(searchString) ||
                  user.phone.includes(searchString) ||
                  user.age.toString().includes(searchString)
                );
              })
              .map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default AdminView;
