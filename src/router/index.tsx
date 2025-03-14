import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  AboutPage,
  DashboardNewProductPage,
  DashboardOrdersPage,
  DashboardProductSlugPage,
  DashboardProductsPage,
  HomePage,
  LoginPage,
  OrdersUserPage,
  OrderUserPage,
  ProductPage,
  ProductsPage,
  RegisterPage,
  ThankyouPage,
} from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";
import { CheckoutPage } from "../pages/CheckoutPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardOrderPage } from "../pages/dashboard/DashboardOrderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "productos",
        element: <ProductsPage />,
      },
      {
        path: "productos/:slug",
        element: <ProductPage />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <RegisterPage />,
      },
      {
        path: "account",
        element: <ClientLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/account/pedidos" />,
          },
          {
            path: "pedidos",
            element: <OrdersUserPage />,
          },
          {
            path: "pedidos/:id",
            element: <OrderUserPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/checkout/:id/thank-you",
    element: <ThankyouPage />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/productos" />,
      },
      {
        path: "productos",
        element: <DashboardProductsPage />,
      },
      {
        path: "productos/new",
        element: <DashboardNewProductPage />,
      },
      {
        path: "productos/editar/:slug",
        element: <DashboardProductSlugPage />,
      },
      {
        path: 'ordenes',
        element: <DashboardOrdersPage />,
      },
      {
        path: 'ordenes/:id',
        element: <DashboardOrderPage />
      }
    ],
  },
]);
