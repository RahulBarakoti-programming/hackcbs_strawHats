import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import { PrivateRoute, AuthRoute } from "./components/RouteProtection.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { Toaster } from "@/components/ui/sonner";
import DataSubmission from "./components/DataSubmission.jsx";
import Requests from "./components/Requests.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    // element: (
    //   <PrivateRoute>
    //     <Dashboard />
    //   </PrivateRoute>
    // ),
  },
  {
    path: "/login",
    element: (
      // <AuthRoute>
      <Login />
      // </AuthRoute>
    ),
  },
  {
    path: "/submission",
    element: <DataSubmission />,
  },
  {
    path: "/requests",
    element: <Requests />,
  },
  {
    path: "/my-data",
    element: <Requests />,
  },
  {
    path: "/purchased-data",
    element: <Requests />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
