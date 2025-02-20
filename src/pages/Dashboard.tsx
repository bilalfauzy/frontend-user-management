// import UserList from '@/components/UserList';
import { AppDispatch } from "@/slices/store";
import { deleteUser, getUsers, setSearchQuery } from "@/slices/users/reducer";
import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Navbar,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, searchQuery } = useSelector((state: any) => state.users);

  useEffect(() => {
    console.log("Current Users in Store:", users);
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, users.length]);

  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container>
      <h4>Dashboard User</h4>
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs={12} md={6} lg={4}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </Col>
        <Col xs="auto">
          <Link to="/add">
            <Button variant="primary">Add User</Button>
          </Link>
        </Col>
      </Row>

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
            <th colSpan={3} className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: any) => (
            <tr key={user.id} className="bg-base-200">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.company.name}</td>
              <td>
                <Link to={`/view/${user.id}`}>
                  <Button variant="secondary">View</Button>
                </Link>
              </td>

              <td>
                <Link to={`/edit/${user.id}`}>
                  <Button btn-primary>Edit</Button>
                </Link>
              </td>
              <td className="p-2">
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
