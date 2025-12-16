import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import AllLoan from "../pages/AllLoan";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import DashBoardLayout from "../Dashboard/DashBoardLayout";

import AddLoanManager from "../Dashboard/dashboardPages/manager/AddLoanManager";

import ApprovedAppManager from "../Dashboard/dashboardPages/manager/ApprovedAppManager";
import ProfileManager from "../Dashboard/dashboardPages/manager/ProfileManager";
import ManageLoans from "../Dashboard/dashboardPages/manager/ManageLoans";
import LoanDetailsPage from "../pages/LoanDeatailsPage";
import UpdateLoan from "../Dashboard/dashboardPages/manager/UpdateLoan";
import ApplyLoan from "../pages/ApplyLoan";
import PendingLoan from "../Dashboard/dashboardPages/manager/PendingLoan";
import LoanApplicationDetails from "../Dashboard/dashboardPages/manager/LoanApplicationDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allLoan",
        Component: AllLoan,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/loanDeatail/:id",
        element: <LoanDetailsPage></LoanDetailsPage>,
      },
      {
        path: "laonApplication",
        element: <ApplyLoan></ApplyLoan>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      { path: "/dashboard", element: <AddLoanManager></AddLoanManager> },
      { path: "manage-loans", element: <ManageLoans /> },
      { path: "pending-loan", element: <PendingLoan /> },
      { path: "approvedAppManager", element: <ApprovedAppManager /> },
      { path: "managerProfile", element: <ProfileManager /> },
      { path: "update-loan/:id", element: <UpdateLoan /> },
      {
        path: "/dashboard/loan-application/:id",

        element: <LoanApplicationDetails />,
      },
    ],
  },
]);
export default router;
