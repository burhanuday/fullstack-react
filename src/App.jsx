import React, { Suspense, Fragment } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router-dom";

const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.jsx");
const PRESERVED = import.meta.globEager("/src/pages/(_app|404).jsx");

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

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.jsx$/g, "");
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

console.log(routes);

const App = () => {
  const _App = preserved?.["_app"] || Fragment;
  const _NotFound = preserved?.["404"] || Fragment;

  return (
    <_App>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Suspense>
          <Routes>
            {routes.map(({ path, component: Component = Fragment }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<_NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </_App>
  );
};

export default App;
