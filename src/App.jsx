import React from "react";
import Html from "./components/Html";

const App = ({ children, head }) => {
  return <Html head={head}>{children}</Html>;
};

export default App;
