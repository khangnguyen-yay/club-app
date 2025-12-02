import React, { useEffect, useState } from "react";
import ClubList from "../appCard/CardList";
import type { Club } from "../appCard/CardList";
import { fetchClubsByStatus } from "../../utils/apiHelper";
import "../styles/Home.css";
import TestStatus from "../components/testStatus";


const Home: React.FC = () => {
  const [appliedClubs, setAppliedClubs] = useState<Club[]>([]);
  const [applyingClubs, setApplyingClubs] = useState<Club[]>([]);
  const [considerClubs, setConsiderClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Step 2: fetch data from backend when Home mounts ---
  useEffect(() => {
    const loadClubs = async () => {
      setLoading(true);
      setError(null);

      try {
        const [appliedRes, applyingRes, considerRes] = await Promise.all([
          fetchClubsByStatus("applied"),
          fetchClubsByStatus("applying"),
          fetchClubsByStatus("considering"),
        ]);

        if (typeof appliedRes === "string") throw new Error(appliedRes);
        if (typeof applyingRes === "string") throw new Error(applyingRes);
        if (typeof considerRes === "string") throw new Error(considerRes);

        setAppliedClubs(appliedRes);
        setApplyingClubs(applyingRes);
        setConsiderClubs(considerRes);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Error loading clubs:", msg);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, []);

  // --- Step 3: handle loading / error states ---
  if (loading) {
    return (
      <div className="homePage">
        <h1>Home Page</h1>
        <p>Loading your clubs…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homePage">
        <h1>Home Page</h1>
        <p className="error">Failed to load clubs: {error}</p>
        <TestStatus />
      </div>
    );
  }

  // --- Step 4: helper to render each status section ---
  const renderSection = (title: string, clubs: Club[], sectionClass: string) => (
    <div className={sectionClass}>
      <div className="categoryBlock">
        <span className="dot"></span>
        <h2>{title}</h2>
        <span className="countBox">{clubs.length}</span>
      </div>

      {clubs.length === 0 ? (
        <p className="emptyCategory">No clubs in this category yet.</p>
      ) : (
        <ClubList filteredCards={clubs} />
      )}
    </div>
  );

  // --- Step 5: render all three categories ---
  return (
    <div className="homePage">
      <h1>Home Page</h1>
      <p>Welcome to the Home page! This is the main landing page of your app.</p>

      {renderSection("Applied", appliedClubs, "appliedSection")}
      {renderSection("Applying", applyingClubs, "applyingSection")}
      {renderSection("Considering", considerClubs, "considerSection")}

      <TestStatus />
    </div>
  );
};

export default Home;