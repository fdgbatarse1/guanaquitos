const Home = async () => {
  const test = await fetch(`http://backend:1337/api/careers/1`);
  const test_json = await test.json();
  console.log(test_json);
  return (
    <div className="page">
      <h1>{test_json?.data?.attributes?.title}</h1>
    </div>
  );
};

export default Home;
