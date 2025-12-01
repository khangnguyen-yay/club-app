import React from "react";
import { useState, useEffect } from "react"
import './Home.css';
import CardList from '../appCard/CardList.tsx';
import type { Club } from '../appCard/CardList.tsx';
import TestStatus from "../components/testStatus";
import { fetchClubsByStatus } from "../apiHelpers.ts";"../apiHelpers.ts";


function Home() {

  let categoryCount : number = 0;

  let categoryDisplay : React.JSX.Element | string = "No clubs in this category yet."

  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const res = await fetchClubsByStatus("applying");
        const data = await res;
        if (typeof data == "string") {
          return;
        }
        setClubs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []); 

  if (loading) return <div>Loading...</div>;

  categoryDisplay = <CardList filteredCards={clubs}></CardList>
  console.log(clubs);


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