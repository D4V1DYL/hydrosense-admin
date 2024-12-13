import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import useAuth from "hooks/useAuth";

const AssignRole = () => {
  useAuth();

  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const token = localStorage.getItem("token");
        const usersResponse = await axios.get("https://apihydrosense.localto.net/superadmin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(usersResponse.data);

        const rolesResponse = await axios.get("https://apihydrosense.localto.net/superadmin/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoles(rolesResponse.data);
      } catch (error) {
        console.error("Error fetching users and roles", error);
      }
    };

    fetchUsersAndRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://apihydrosense.localto.net/superadmin/assign-role",
        { user_id: userId, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setError("");
      navigate("/admin/user-role");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "An error occurred";
      setError(Array.isArray(errorMessage) ? errorMessage.map(e => e.msg).join(", ") : errorMessage);
      setMessage("");
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col lg="10" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5 d-flex justify-content-between align-items-center">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Assign Role to User</small>
                </div>
                <Button color="primary" onClick={() => navigate("/admin/user-role")}>
                  Back
                </Button>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="userId">User</Label>
                    <Input
                      id="userId"
                      type="select"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="role">Role</Label>
                    <Input
                      id="role"
                      type="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.role_id} value={role.role_id}>
                          {role.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  {message && <div className="text-success">{message}</div>}
                  {error && <div className="text-danger">{error}</div>}
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Assign Role
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AssignRole;