import GoogleLogin from "../components/testLogin";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page! This is the main landing page of your app.</p>
      <GoogleLogin />
    </div>
  );
}

export default Home;