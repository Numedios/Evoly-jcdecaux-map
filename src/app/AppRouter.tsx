// src/app/AppRouter.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../features/HomePage";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
