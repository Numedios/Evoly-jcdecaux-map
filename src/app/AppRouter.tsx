import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../features/HomePage";
import StationsPage from "../features/stations/StationsPage";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,       // Layout avec Footer
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },   // page "/"
      { path: "stations", element: <StationsPage /> }, // page "/stations"
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
