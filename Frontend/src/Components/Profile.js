import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserService from "../Services/UserService";

function Profile() {
  const userService = new UserService();

  if (!userService.is_loggedin()) {
    return <Navigate replace to="/login" />;
  } else if (userService.is_admin()) {
    return <Navigate replace to="/admin" />;
  }

  const currentUser = userService.getCurrentUser();

  return (
    <Container style={{ width: "800px" }} className="mt-5">
      <Row className="text-center border border-dark-subtle">
        <h3>{currentUser.firstName}'s Profile</h3>
      </Row>

      <Row>
        <Table bordered className="text-start border border-dark-subtle">
          <tbody>
            <tr>
              <td>
                <h4>First Name</h4>
              </td>
              <td>
                <h5>{currentUser.firstName}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Last Name</h4>
              </td>
              <td>
                <h5>{currentUser.lastName}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Address</h4>
              </td>
              <td>
                <h5>{currentUser.address}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Phone Number</h4>
              </td>
              <td>
                <h5>{currentUser.phone}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Email</h4>
              </td>
              <td>
                <h5>{currentUser.email}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Birthdate</h4>
              </td>
              <td>
                <h5>{currentUser.birthDate}</h5>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default Profile;
