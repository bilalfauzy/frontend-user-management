import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addUser, updateUser } from "../slices/users/reducer";

const FormUser: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useSelector((state: any) => state.users);

  const [formData, setFormData] = useState<User>({
    id: id ? parseInt(id) : Date.now(),
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" },
  });

  useEffect(() => {
    if (id) {
      const user = users.find((user: any) => user.id === parseInt(id));
      if (user) {
        setFormData(user);
      }
    }
  }, [id, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (id) {
      dispatch(updateUser(formData));
      // updateUser(formData);
    } else {
      // addUser(formData);
      dispatch(addUser(formData));
    }
    navigate("/");
  };

  return (
    <Container className="mt-4">
      <h4>{id ? "Edit User" : "Tambah User Baru"}</h4>
      <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <h5>Address</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      street: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Suite</Form.Label>
              <Form.Control
                type="text"
                name="address.suite"
                value={formData.address.suite}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      suite: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      city: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      zipcode: e.target.value,
                    },
                  }))
                }
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
                name="address.lat"
                value={formData.address.geo.lat}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      geo: {
                        ...prev.address.geo,
                        lat: e.target.value,
                      },
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="address.longitude"
                value={formData.address.geo.lng}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      geo: {
                        ...prev.address.geo,
                        lng: e.target.value,
                      },
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <h5>Company</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      name: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Catch Phrase</Form.Label>
              <Form.Control
                type="text"
                name="company.catchphrase"
                value={formData.company.catchPhrase}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      catchPhrase: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bs</Form.Label>
              <Form.Control
                type="text"
                name="company.bs"
                value={formData.company.bs}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      bs: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="w-100">
          {id ? "Update User" : "Tambah User"}
        </Button>
      </Form>
      <Link to="/" className="btn btn-secondary mt-3">
        Kembali
      </Link>
    </Container>
  );
};

export default FormUser;
