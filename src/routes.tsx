import { Navigate, RouteObject } from "react-router";
import ProductListPage from "./pages/products";
import MainLayout from "@layouts/main";
import ProductCreatePage from "@pages/products/create";
import ProductUpdatePage from "@pages/products/update";

export default [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" />,
      },
      {
        path: "/products",
        element: <ProductListPage />,
      },
      {
        path: "/products/create",
        element: <ProductCreatePage />,
      },
      {
        path: "/products/:id",
        element: <ProductUpdatePage />,
      },
    ],
  },
] as RouteObject[];
