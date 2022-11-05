export const loader = () => {
  return {
    foo: "bar",
  };
};

const Page = () => {
  const handleClick = () => {
    console.log("clicekd");
  };

  return (
    <div>
      <h1>I am server rendered /about page </h1>
      <button onClick={handleClick}>Button</button>
    </div>
  );
};

export default Page;
