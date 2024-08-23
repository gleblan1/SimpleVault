import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@components/Layout";
import { WelcomePage } from "./pages/WelcomePage";
import { VaultPage } from "@pages/VaultPage";
import { TokensPage } from "@pages/TokensPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: '/vault-page',
        element: <VaultPage/>
      },
      {
        path: '/tokens-page',
        element: <TokensPage/>
      }
    ],
  },
]);