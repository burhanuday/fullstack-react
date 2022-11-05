import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.jsx");
// const PRESERVED = import.meta.globEager("/src/pages/(_app|404).jsx");

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.jsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return {
    path,
    component: React.lazy(ROUTES[route]),
    // loader: ROUTES[route].loader,
  };
});

// const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
//   const key = file.replace(/\/src\/pages\/|\.jsx$/g, "");
//   return { ...preserved, [key]: PRESERVED[file].default };
// }, {});

const router = createBrowserRouter(
  routes.map(({ path, component: Component }) => ({
    path: path,
    element: <Component />,
  }))
);

ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <App>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </App>
);
