import { useState } from "react";
import { Link } from "react-router-dom";

export const loader = () => {
  return {
    foo: "bar",
  };
};

const Page = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((counter) => counter + 1);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <h1>I am server rendered /about page </h1>
      <p>Counter: {counter}</p>
      <button onClick={handleClick}>Button</button>
    </div>
  );
};

export default Page;
