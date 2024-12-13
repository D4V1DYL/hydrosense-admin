import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

const Dashboard = () => {

  useAuth();

  const [data, setData] = useState({
    total_products_tested: 0,
    total_users_registered: 0,
    total_companies_registered: 0,
    total_products_registered: 0,
    average_property_value_tested: 0,
    tests_conducted_this_month: 0,
    most_active_company: "",
    testing_activity_over_time: [],
    products_tested_by_month: [],
    top_products_by_tests: [],
    top_companies_by_activity: [],
    companies: [],
    total_revenue: 0,
    top_performing_products: [],
    top_performing_companies: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://apihydrosense.localto.net/superadmin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://apihydrosense.localto.net/superadmin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired or unauthorized
          localStorage.removeItem("token");
          navigate("/auth/login");
        } else {
          console.error("Error fetching data", error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Top Products by Tests</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Tests Conducted</th>
                    <th scope="col">Average Property Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_products_by_tests.map((product, index) => (
                    <tr key={index}>
                      <td>{product.product_name}</td>
                      <td>{product.tests_conducted}</td>
                      <td>{product.average_property_value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Top Companies by Activity</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Tests Conducted</th>
                    <th scope="col">Product Count</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_companies_by_activity.map((company, index) => (
                    <tr key={index}>
                      <td>{company.company_name}</td>
                      <td>{company.tests_conducted}</td>
                      <td>{company.product_count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Testing Activity Over Time</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Month</th>
                    <th scope="col">Tests Conducted</th>
                  </tr>
                </thead>
                <tbody>
                  {data.testing_activity_over_time.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.year}</td>
                      <td>{activity.month}</td>
                      <td>{activity.tests_conducted}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;