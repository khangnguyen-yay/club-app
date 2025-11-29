import React from "react";
import './Home.css';
import CardList from '../appCard/CardList.tsx';
import type { Club } from '../appCard/CardList.tsx';
import TestStatus from "../components/testStatus";


function Home() {

  let categoryCount : number = 0;

  let categoryDisplay : React.JSX.Element | string = "No clubs in this category yet."

  const testClub : Club = {
    club_name: "Pilipinos In Engineering and Science",
    type: "Academic",
    ig: "https://www.instagram.com/pierrethepiebear/",
    website: "https://piesucla.wixsite.com/pies",
    notes : ''
  }

  categoryDisplay = <CardList filteredCards={[testClub]}></CardList>

  return (
    <div>
      <h1>Home Page</h1>

      <div className="appliedSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applied</h2>
          <span className="countBox">{categoryCount}</span>
        </div>
        <h3>{categoryDisplay}</h3>
      </div>

      <div className="applyingSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applying</h2>
          <span className="countBox">{categoryCount}</span>
        </div>
        <h3>{categoryDisplay}</h3>
      </div>
      <div className="considerSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Considering</h2>
          <span className="countBox">{categoryCount}</span>
        </div>
        <h3>{categoryDisplay}</h3>
      </div>

      <TestStatus />
    </div>
  );
}

export default Home;