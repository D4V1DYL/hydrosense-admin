import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import useAuth from "hooks/useAuth";

const EditCompany = () => {
  useAuth();

  const { company_id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://apihydrosense.localto.net/superadmin/companies/${company_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const company = response.data;
        setName(company.name);
        setDescription(company.description);
        setAddress(company.address);
        setEmail(company.email);
        setPhoneNumber(company.phone_number);
        setWebsite(company.website);
        setImage(company.image);
      } catch (error) {
        console.error("Error fetching company data", error);
      }
    };

    fetchCompany();
  }, [company_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("website", website);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://apihydrosense.localto.net/superadmin/companies/${company_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Company updated successfully");
      setError("");
      navigate("/admin/companies");
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
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Edit Company</h3>
                <Button color="primary" onClick={() => navigate("/admin/companies")}>
                  Back
                </Button>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                {message && <Alert color="success">{message}</Alert>}
                {error && <Alert color="danger">{error}</Alert>}
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-name">
                      Company Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-name"
                      placeholder="Company Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-description">
                      Description
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-description"
                      placeholder="Description"
                      type="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-address">
                      Address
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-address"
                      placeholder="Address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-email">
                      Email
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-phone-number">
                      Phone Number
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-phone-number"
                      placeholder="Phone Number"
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-website">
                      Website
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-website"
                      placeholder="Website"
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-image">
                      Company Image
                    </label>
                    {image && (
                      <div className="mb-3">
                        <img
                          src={image}
                          alt="Company"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                    <Input
                      className="form-control-alternative"
                      id="input-image"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Update Company
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

export default EditCompany;