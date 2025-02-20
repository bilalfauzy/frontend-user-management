import React from "react";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const users = useSelector((state: any) => state.users.users);

  // Cari user berdasarkan ID
  const user = users.find((u: any) => u.id.toString() === id);

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">User tidak ditemukan!</Alert>
        <Link to="/" className="btn btn-secondary mt-3">
          Kembali
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-between">
        <Col>
          <h4>{user.name}</h4>
        </Col>

        <Col className="d-flex justify-content-end">
          <Link to="/">
            <Button variant="secondary">
              <FaArrowLeft className="me-2" />
              Kembali
            </Button>
          </Link>
        </Col>
      </Row>
      <Form className="shadow p-4 rounded bg-light mt-3">
        <h5>User Information</h5>

        <Container className="p-4">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" value={user.name} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={user.username} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={user.email} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={user.phone} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control type="text" value={user.website} readOnly />
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <h5>Address</h5>
        <Container className="p-4">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  value={user.address?.street}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Suite</Form.Label>
                <Form.Control
                  type="text"
                  value={user.address?.suite}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={user.address?.city} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  value={user.address?.zipcode}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  value={user.address?.geo?.lat}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  value={user.address?.geo?.lng}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <h5>Company</h5>
        <Container className="p-4">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" value={user.company?.name} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Catch Phrase</Form.Label>
                <Form.Control
                  type="text"
                  value={user.company?.catchPhrase}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>BS</Form.Label>
                <Form.Control type="text" value={user.company?.bs} readOnly />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  );
};

export default ViewUser;
