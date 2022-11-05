import { Link } from "react-router-dom";

const Page = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <h1>I am server rendered / page</h1>
    </>
  );
};

export default Page;
