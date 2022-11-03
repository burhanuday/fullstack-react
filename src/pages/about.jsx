export const loader = () => {
  return {
    foo: "bar",
  };
};

const Page = () => {
  return <h1>I am server rendered /about page</h1>;
};

export default Page;
