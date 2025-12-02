import React from "react";
import { useState, useEffect } from "react"
import '../styles/Home.css';
import ClubList from '../appCard/CardList.tsx';
import type { Club } from '../appCard/CardList.tsx';
import TestStatus from "../components/testStatus";
import { fetchClubsByStatus } from "../../utils/apiHelpers.ts";


function Home() {

  let categoryCount : number = 0;

  let applyingDisplay : React.JSX.Element | string = "No clubs in this category yet."
  let appliedDisplay : React.JSX.Element | string = "No clubs in this category yet."
  let considerDisplay : React.JSX.Element | string = "No clubs in this category yet."

  const [applyingClubs, setApplyingClubs] = useState<Club[]>([]);
  const [appliedClubs, setAppliedClubs] = useState<Club[]>([]);
  const [considerClubs, setConsiderClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClubs() {
      try {
        let res = await fetchClubsByStatus("applying");
        const applyingData = await res;
        console.log(applyingData);
        if (typeof applyingData == "string") {
          return;
        }
        setApplyingClubs(applyingData);
        res = await fetchClubsByStatus("applied");
        const appliedData = await res;
        if (typeof appliedData == "string") {
          return;
        }
        setAppliedClubs(appliedData);
        res = await fetchClubsByStatus("considering");
        const considerData = await res;
        if (typeof considerData == "string") {
          return;
        }
        setConsiderClubs(considerData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []); 

  if (loading) return <div>Loading...</div>;

  applyingDisplay = <ClubList filteredCards={applyingClubs}></ClubList>
  appliedDisplay = <ClubList filteredCards={appliedClubs}></ClubList>
  considerDisplay = <ClubList filteredCards={considerClubs}></ClubList>

  return (
    <div>
      <h1>Home Page</h1>

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