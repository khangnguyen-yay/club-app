import React from "react";
import './Home.css';
import ClubList from "../components/testClubList";

function Home() {

  let categoryCount : number = 0;

  let categoryDisplay : string = "No clubs in this category yet."

  return (
    <div>
      <h1>Home Page</h1>

      <div className="categoryBlock">
        <span className="dot"></span>
        <h2>Applied</h2>
        <span className="countBox">{categoryCount}</span>
      </div>
      <h3>{categoryDisplay}</h3>

      <div className="categoryBlock">
        <span className="dot"></span>
        <h2>Applying</h2>
        <span className="countBox">{categoryCount}</span>
      </div>
      <h3>{categoryDisplay}</h3>

      <div className="categoryBlock">
        <span className="dot"></span>
        <h2>Considering</h2>
        <span className="countBox">{categoryCount}</span>
      </div>
      <h3>{categoryDisplay}</h3>
      <ClubList />
    </div>
  );
}

export default Home;