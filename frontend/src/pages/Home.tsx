import React from "react";
import TestStatus from "../components/testStatus";
import "../styles/Home.css";

function Home() {

  let categoryCount : number = 0;

  let applyingDisplay : React.JSX.Element | string = "No clubs in this category yet."
  let appliedDisplay : React.JSX.Element | string = "No clubs in this category yet."
  let considerDisplay : React.JSX.Element | string = "No clubs in this category yet."

  return (
    <div>

      <h1>Home Page</h1>
      <p>Welcome to the Home page! This is the main landing page of your app.</p>

      <div className="appliedSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applied</h2>
          <span className="countBox">{categoryCount}</span>
        </div>
        <h3>{appliedDisplay}</h3>
      </div>

      <div className="applyingSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applying</h2>
          <span className="countBox">{categoryCount}</span>
        </div>
        <h3>{applyingDisplay}</h3>
      </div>
      <div className="considerSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Considering</h2>
          <span className="countBox">{categoryCount}</span>
        </div>
        <h3>{considerDisplay}</h3>
      </div>
      
      <TestStatus />
    </div>
  );
}

export default Home;