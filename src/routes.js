/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import UserRoleTables from "views/UserRoleTable";
import UserCompanyMappingTables from "views/UserCompanyMappingTable";
import CompanyTables from "views/CompanyTables";
import AssignRole from "views/AssignRole";
import AssignCompany from "views/AssignCompany";
import EditUserCompanyMapping from "views/EditUserCompanyMapping";
import CreateCompany from "views/CreateCompany";
import EditCompany from "views/EditCompany";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    showInSidebar: true,
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  {
    path: "/user-role",
    name: "Table User Role",
    icon: "ni ni-single-02 text-red",
    component: <UserRoleTables />,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/user-company",
    name: "Table User Company",
    icon: "ni ni-single-02 text-purple",
    component: <UserCompanyMappingTables />,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/companies",
    name: "Table Companies",
    icon: "ni ni-building text-blue",
    component: <CompanyTables />,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    showInSidebar: false,
  },
  {
    path: "/user-role/assign",
    name: "AssignRole",
    icon: "ni ni-key-25 text-info",
    component: <AssignRole />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/user-company/assign",
    name: "AssignCompany",
    icon: "ni ni-key-25 text-info",
    component: <AssignCompany />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/user-company/edit/:user_company_id",
    name: "EditUserCompanyMapping",
    icon: "ni ni-key-25 text-info",
    component: <EditUserCompanyMapping />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "companies/create-company",
    name: "CreateCompany",
    icon: "ni ni-building text-info",
    component: <CreateCompany />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/edit-company/:company_id",
    name: "EditCompany",
    icon: "ni ni-building text-info",
    component: <EditCompany />,
    layout: "/admin",
    showInSidebar: false,
  },

];
export default routes;
