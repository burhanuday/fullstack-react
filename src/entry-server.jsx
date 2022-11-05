import React, { Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
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

export function render({ url, res, head }) {
  const router = createMemoryRouter(
    routes.map(({ path, component: Component }) => ({
      path: path,
      element: <Component />,
    })),
    { initialEntries: [url] }
  );

  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;
  // const data = createServerData();

  const stream = ReactDOMServer.renderToPipeableStream(
    <App head={head}>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </App>,
    {
      onShellReady() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      },
    }
  );

  setTimeout(() => stream.abort(), 3000);
}
