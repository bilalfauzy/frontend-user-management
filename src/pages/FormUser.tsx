import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addUser, updateUser } from "../slices/users/reducer";
import { FaArrowLeft } from "react-icons/fa";

const FormUser: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useSelector((state: any) => state.users);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true);
    console.log("Form Data:", formData);
    console.log("is submit", isSubmitted);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;
    const zipcodeRegex = /^\d+$/;
    const latLngRegex = /^-?\d+(\.\d+)?$/;
    const websiteRegex =
      /^(https?:\/\/)?(www\.)?[\w-]+(\.[a-z]{2,})+([\/\w .-]*)*\/?$/i;
    const usernameRegex = /^[a-z0-9]+$/;

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.address.city ||
      !formData.address.street ||
      !formData.address.suite ||
      !formData.address.zipcode ||
      !formData.phone ||
      !formData.company.name
    ) {
      console.log("Form tidak valid, harap isi semua field.");
      alert("Form tidak valid, harap isi semua field.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      console.log("Format email tidak valid.");
      alert("Format email tidak valid.");
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      console.log("Nomor HP tidak valid.");
      alert("Nomor HP tidak valid.");
      return;
    }

    if (!zipcodeRegex.test(formData.address.zipcode)) {
      console.log("Format ZIP code tidak valid.");
      alert("Format ZIP code tidak valid.");
      return;
    }

    if (
      !latLngRegex.test(formData.address.geo.lat) ||
      !latLngRegex.test(formData.address.geo.lng)
    ) {
      console.log("Format latitude/longitude tidak valid.");
      alert("Format latitude/longitude tidak valid.");
      return;
    }

    if (!websiteRegex.test(formData.website)) {
      alert(
        "Format website tidak valid. Gunakan format yang benar, contoh: https://example.com"
      );
      return;
    }

    if (!usernameRegex.test(formData.username)) {
      alert("Username hanya boleh huruf kecil dan angka, tanpa spasi.");
      return;
    }

    formData.website = formData.website.toLowerCase();

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
      <Row className="justify-content-between">
        <Col>
          <h4>{id ? "Edit User" : "Tambah User Baru"}</h4>
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
      <Form
        onSubmit={handleSubmit}
        className="shadow p-4 rounded bg-light mt-3"
      >
        <h5>User Information</h5>
        <Container className="p-4">
          <Row>
            <Col md={5}>
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
                  isInvalid={isSubmitted && !formData.name}
                />
                <Form.Control.Feedback type="invalid">
                  Nama tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5}>
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
                  isInvalid={isSubmitted && !formData.username}
                />
                <Form.Control.Feedback type="invalid">
                  Username tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
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
                  isInvalid={isSubmitted && !formData.email}
                />
                <Form.Control.Feedback type="invalid">
                  Email tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  isInvalid={isSubmitted && !formData.phone}
                />
                <Form.Control.Feedback type="invalid">
                  Nomor hp tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
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
        </Container>

        <h5>Address</h5>
        <Container className="p-4">
          <Row>
            <Col md={5}>
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
                  required
                  isInvalid={isSubmitted && !formData.address.street}
                />
                <Form.Control.Feedback type="invalid">
                  Street tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5}>
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
                  required
                  isInvalid={isSubmitted && !formData.address.suite}
                />
                <Form.Control.Feedback type="invalid">
                  Suite tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
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
                  required
                  isInvalid={isSubmitted && !formData.address.city}
                />
                <Form.Control.Feedback type="invalid">
                  City tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5}>
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
                  required
                  isInvalid={isSubmitted && !formData.address.zipcode}
                />
                <Form.Control.Feedback type="invalid">
                  Zip code tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
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
            <Col md={5}>
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
        </Container>

        <h5>Company</h5>
        <Container className="p-4">
          <Row>
            <Col md={5}>
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
                  required
                  isInvalid={isSubmitted && !formData.company.name}
                />
                <Form.Control.Feedback type="invalid">
                  Company name tidak boleh kosong.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5}>
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
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>BS</Form.Label>
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
        </Container>
        <Col className="d-flex justify-content-end mt-4">
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            {id ? "Update" : "Save"}
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default FormUser;
