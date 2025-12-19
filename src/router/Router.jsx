import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import AllLoan from "../pages/AllLoan";
import Login from "../pages/Login";
import Home from "../pages/Home";
import DashBoardLayout from "../Dashboard/DashBoardLayout";

import AddLoanManager from "../Dashboard/dashboardPages/manager/AddLoanManager";

import ManageLoans from "../Dashboard/dashboardPages/manager/ManageLoans";
import LoanDetailsPage from "../pages/LoanDeatailsPage";
import UpdateLoan from "../Dashboard/dashboardPages/manager/UpdateLoan";
import ApplyLoan from "../pages/ApplyLoan";
import PendingLoan from "../Dashboard/dashboardPages/manager/PendingLoan";
import LoanApplicationDetails from "../Dashboard/dashboardPages/manager/LoanApplicationDetails";
import ApprovedLoan from "../Dashboard/dashboardPages/manager/ApprovedLoan";
import ManagerProfile from "../Dashboard/dashboardPages/manager/ManagerProfile";
import PrivetRoute from "../PrivetRote/PrivetRoute";
import ErrorPage from "../components/ErrorPage";
import MyLoan from "../Dashboard/dashboardPages/brower/MyLoan";
import ApplicationDeatails from "../Dashboard/dashboardPages/brower/applicationDeatail";
import PaymentSuccess from "../Dashboard/dashboardPages/brower/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/loanDeatail/:id",
        element: (
          <PrivetRoute>
            {" "}
            <LoanDetailsPage></LoanDetailsPage>
          </PrivetRoute>
        ),
      },
      {
        path: "laonApplication",
        element: (
          <PrivetRoute>
            <ApplyLoan></ApplyLoan>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashBoardLayout />
      </PrivetRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        // path: "/managerProfile",
        index: true,
        element: (
          <PrivetRoute>
            <ManagerProfile />
          </PrivetRoute>
        ),
      },

      {
        path: "add-Loan",
        element: (
          <PrivetRoute>
            {" "}
            <AddLoanManager></AddLoanManager>
          </PrivetRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <PrivetRoute>
            {" "}
            <ManageLoans />
          </PrivetRoute>
        ),
      },
      {
        path: "pending-loan",
        element: (
          <PrivetRoute>
            <PendingLoan />{" "}
          </PrivetRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <PrivetRoute>
            {" "}
            <ApprovedLoan />
          </PrivetRoute>
        ),
      },
      {
        path: "update-loan/:id",
        element: (
          <PrivetRoute>
            <UpdateLoan />
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/loan-application/:id",

        element: <LoanApplicationDetails />,
      },
      {
        path: "my-Loan",
        element: (
          <PrivetRoute>
            <MyLoan></MyLoan>
          </PrivetRoute>
        ),
      },
      {
        path: "applicationDeatails/:id",
        element: (
          <PrivetRoute>
            <ApplicationDeatails></ApplicationDeatails>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
export default router;
