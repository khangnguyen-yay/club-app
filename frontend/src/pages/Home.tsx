import React from "react";
import TestStatus from "../components/testStatus";
function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page! This is the main landing page of your app.</p>
      <TestStatus />
    </div>
  );
}

export default Home;