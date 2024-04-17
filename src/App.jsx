import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./user/home.jsx";
import Admin from "./admin/dashboard.jsx";

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/admin", element: <Admin /> },
  ]);
  return <RouterProvider router={router} />;
}
