import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import AllLoan from "../pages/AllLoan";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

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
]);
export default router;
