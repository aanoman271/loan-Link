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
import Register from "../pages/Register";
import ManageUser from "../Dashboard/Admin/ManageUser";
import AdminAllLoan from "../Dashboard/Admin/AdminAllLoan";
import LoanApplications from "../Dashboard/Admin/LoanApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "allLoan",
        element: <AllLoan></AllLoan>,
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
        element: <ManagerProfile />,
      },

      {
        path: "add-Loan",
        element: <AddLoanManager></AddLoanManager>,
      },
      {
        path: "manage-loans",
        element: <ManageLoans />,
      },
      {
        path: "pending-loan",
        element: <PendingLoan />,
      },
      {
        path: "approved-loans",
        element: <ApprovedLoan />,
      },
      {
        path: "update-loan/:id",
        element: <UpdateLoan />,
      },
      {
        path: "/dashboard/loan-application/:id",

        element: <LoanApplicationDetails />,
      },
      {
        path: "my-Loan",
        element: <MyLoan></MyLoan>,
      },
      {
        path: "applicationDeatails/:id",
        element: <ApplicationDeatails></ApplicationDeatails>,
      },
      {
        path: "manage-users",
        element: <ManageUser />,
      },
      {
        path: "manage-allLon",
        element: <AdminAllLoan></AdminAllLoan>,
      },
      {
        path: "manage-application",
        element: <LoanApplications></LoanApplications>,
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
