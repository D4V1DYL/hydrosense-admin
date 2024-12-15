import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  Alert,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import useAuth from "hooks/useAuth";
import config from "config";

const EditUserCompanyMapping = () => {
  useAuth();

  const { user_company_id } = useParams();
  const [userId, setUserId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersAndCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const usersResponse = await axios.get(`${config.apiBaseUrl}/superadmin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(usersResponse.data);

        const companiesResponse = await axios.get(`${config.apiBaseUrl}/superadmin/companies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(companiesResponse.data);
      } catch (error) {
        console.error("Error fetching users and companies", error);
      }
    };

    const fetchUserCompanyMapping = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${config.apiBaseUrl}/superadmin/user-company-mappings/${user_company_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const mapping = response.data;
        setUserId(mapping.user_id);
        setCompanyId(mapping.company_id);
      } catch (error) {
        console.error("Error fetching user-company mapping", error);
      }
    };

    fetchUsersAndCompanies();
    fetchUserCompanyMapping();
  }, [user_company_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://apihydrosense.localto.net/superadmin/user-company-mappings/${user_company_id}`,
        { user_id: userId, company_id: companyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("User-Company mapping updated successfully");
      setError("");
      navigate("/admin/user-company");
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
          <Col lg="8" md="10">
            <Card className="bg-secondary text-white shadow border-0">
              <CardHeader className="bg-transparent pb-5 d-flex justify-content-between align-items-center">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Edit User-Company Mapping</small>
                </div>
                <Button color="primary" onClick={() => navigate("/admin/user-company")}>
                  Back
                </Button>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                {message && <Alert color="success">{message}</Alert>}
                {error && <Alert color="danger">{error}</Alert>}
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
                    <Label for="companyId">Company</Label>
                    <Input
                      id="companyId"
                      type="select"
                      value={companyId}
                      onChange={(e) => setCompanyId(e.target.value)}
                      required
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                          {company.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Update Mapping
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

export default EditUserCompanyMapping;