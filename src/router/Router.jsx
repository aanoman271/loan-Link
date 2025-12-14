import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import AllLoan from "../pages/AllLoan";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import DashBoardLayout from "../Dashboard/DashBoardLayout";

import AddLoanManager from "../Dashboard/dashboardPages/manager/AddLoanManager";
import ManageLolanManager from "../Dashboard/dashboardPages/manager/ManageLolanManager";
import PendingAppManager from "../Dashboard/dashboardPages/manager/PendingAppManager";
import ApprovedAppManager from "../Dashboard/dashboardPages/manager/ApprovedAppManager";
import ProfileManager from "../Dashboard/dashboardPages/manager/ProfileManager";

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
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      { path: "/dashboard", element: <AddLoanManager></AddLoanManager> },
      { path: "managerManageloan", element: <ManageLolanManager /> },
      { path: "managerPendingapp", element: <PendingAppManager /> },
      { path: "approvedAppManager", element: <ApprovedAppManager /> },
      { path: "managerProfile", element: <ProfileManager /> },
    ],
  },
]);
export default router;
