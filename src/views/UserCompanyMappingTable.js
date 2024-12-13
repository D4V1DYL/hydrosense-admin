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

const UserCompanyMappingTable = () => {
  useAuth();

  const [mappings, setMappings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'success' or 'danger'
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://apihydrosense.localto.net/superadmin/user-company-mappings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMappings(response.data);
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
    if (!selectedMapping) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://apihydrosense.localto.net/superadmin/user-company-mappings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: selectedMapping.user_id,
          company_id: selectedMapping.company_id,
        },
      });
      setAlertMessage("User-Company mapping deleted successfully");
      setAlertType("success");
      fetchData(); // Refresh data after deletion
      toggleModal();
    } catch (error) {
      console.error("Error deleting mapping", error);
      setAlertMessage("Failed to delete User-Company mapping");
      setAlertType("danger");
    }
  };

  const confirmDelete = (mapping) => {
    setSelectedMapping(mapping);
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
        message="Are you sure you want to delete this mapping?"
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                <h3 className="text-white mb-0">User Company Mappings</h3>
                <Button color="primary" onClick={() => navigate("/admin/user-company/assign")}>
                  Change Company
                </Button>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Company ID</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Company Image</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {mappings.map((mapping) => (
                    <tr key={`${mapping.user_id}-${mapping.company_id}`}>
                      <td>{mapping.user_id}</td>
                      <td>{mapping.user_name}</td>
                      <td>{mapping.company_id}</td>
                      <td>{mapping.company_name}</td>
                      <td>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={mapping.company_image}
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
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/admin/user-company/edit/${mapping.user_company_id}`);
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) => {
                                e.preventDefault();
                                confirmDelete(mapping);
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

export default UserCompanyMappingTable;
