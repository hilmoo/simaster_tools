import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@mantine/core/styles.css";
import Root from "./routers/_index";
import PlannerRouter from "./routers/Planner/_router";
import WelcomeRouter from "./routers/Welcome/_router";
import ExtensionRouter from "./routers/Extension/_router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [WelcomeRouter, PlannerRouter, ExtensionRouter],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
