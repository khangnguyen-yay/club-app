import React from "react";
import { useState, useEffect } from "react"
import '../styles/Home.css';
import ClubList from '../appCard/CardList.tsx';
import type { Club } from '../appCard/CardList.tsx';
import { fetchClubsByStatus } from "../../utils/apiHelpers.ts";


function Home() {

  type statusCounts = {
    applied : number,
    applying : number,
    consider : number
  }

  const [statusCounts, setStatusCounts] = useState<statusCounts>({
    applied : 0,
    applying : 0,
    consider : 0
})



  let applyingDisplay : React.JSX.Element;
  let appliedDisplay : React.JSX.Element;
  let considerDisplay : React.JSX.Element;

  const [applyingClubs, setApplyingClubs] = useState<Club[]>([]);
  const [appliedClubs, setAppliedClubs] = useState<Club[]>([]);
  const [considerClubs, setConsiderClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  async function getClubsByStatus(status : string) {
    try {
      let res = await fetchClubsByStatus(status);
        const clubs = await res;
        if (typeof clubs == "string") {
          return [];
        }
        const clubsWithStatus = clubs.map(club => ({
          ...club,
          preference: status
        }))
        return clubsWithStatus;
      } catch (err) {
        console.error(err);
        return [];
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      async function fetchClubs() {
        const applyingClubs = await getClubsByStatus("applying");
        setApplyingClubs(applyingClubs);
        const appliedClubs = await getClubsByStatus("applied");
        setAppliedClubs(appliedClubs);
        const considerClubs = await getClubsByStatus("considering");
        setConsiderClubs(considerClubs);
      }
      fetchClubs();
    }, []);

  useEffect(() => {
    setStatusCounts({
      applying: applyingClubs.length,
      applied: appliedClubs.length,
      consider: considerClubs.length
    })
  }, [applyingClubs, appliedClubs, considerClubs])

  if (loading) return <div>Loading...</div>;

  applyingDisplay = <ClubList filteredCards={applyingClubs}></ClubList>
  appliedDisplay = <ClubList filteredCards={appliedClubs}></ClubList>
  considerDisplay = <ClubList filteredCards={considerClubs}></ClubList>

  return (
    <div className="homeContainer">
      <h1 className="heading">Home</h1>

      <div className="appliedSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applied</h2>
          <span className="countBox">{statusCounts.applied}</span>
        </div>
        <h3>{appliedDisplay}</h3>
      </div>

      <div className="applyingSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Applying</h2>
          <span className="countBox">{statusCounts.applying}</span>
        </div>
        <h3>{applyingDisplay}</h3>
      </div>
      <div className="considerSection">
        <div className="categoryBlock">
          <span className="dot"></span>
          <h2>Considering</h2>
          <span className="countBox">{statusCounts.consider}</span>
        </div>
        <h3>{considerDisplay}</h3>
      </div>
    </div>
  );
}

export default Home;