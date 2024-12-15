import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Alert,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import useAuth from "hooks/useAuth";
import ConfirmModal from "components/Modal/ConfirmModal";
import config from "config";

const CompanyTables = () => {
  useAuth();
  //Trigger

  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'success' or 'danger'
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.apiBaseUrl}/superadmin/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    if (!selectedCompany) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${config.apiBaseUrl}/superadmin/companies/${selectedCompany.company_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlertMessage("Company and all related data deleted successfully");
      setAlertType("success");
      fetchData(); // Refresh data after deletion
      toggleModal();
    } catch (error) {
      console.error("Error deleting company", error);
      setAlertMessage("Failed to delete company");
      setAlertType("danger");
    }
  };

  const confirmDelete = (company) => {
    setSelectedCompany(company);
    toggleModal();
  };

  return (
    <>
      <Header />
      {/* Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this company and all related data?"
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                <h3 className="text-white mb-0">Companies</h3>
                <Button color="primary" onClick={() => navigate("/admin/companies/create-company")}>
                  Create Company
                </Button>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Company ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Website</th>
                    <th scope="col">Image</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.company_id}>
                      <td>{company.company_id}</td>
                      <td>{company.name}</td>
                      <td>{company.description}</td>
                      <td>{company.address}</td>
                      <td>{company.email}</td>
                      <td>{company.phone_number}</td>
                      <td>{company.website}</td>
                      <td>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={company.image || "https://via.placeholder.com/150"}
                            />
                          </a>
                        </Media>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={() => navigate(`/admin/edit-company/${company.company_id}`)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) => {
                                e.preventDefault();
                                confirmDelete(company);
                              }}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {/* Alert */}
        {alertMessage && (
          <Alert color={alertType} toggle={() => setAlertMessage("")}>
            {alertMessage}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default CompanyTables;