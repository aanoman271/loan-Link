import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import Root from "../root/Root";
import AllLoan from "../pages/AllLoan";
import Login from "../pages/Login";

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
    ],
  },
]);
export default router;
