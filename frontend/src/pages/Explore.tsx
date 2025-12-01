import React, { useState, useEffect } from "react";
import type { Club } from "../appCard/CardList";
import ClubList from "../appCard/CardList";
import CategoryFilter from "../components/filter-view/filter-view";
import "../styles/explore.css";
import SearchBar from "../components/search-bar";
import { fetchClubsWithStatus } from "../apiHelpers";

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    // Fetch data from backend
    fetch("http://localhost:3000/api/clubs")
    .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch clubs");
    return res.json();
    })
    .then((data: Club[]) => {
    setClubs(data);
    console.log("ExplorePage clubs:", data);
    data.forEach((club, index) => {
      console.log(`Club ${index + 1}:`, club);
    });
    setLoading(false);
    })
    .catch((err: Error) => {
    setError(err.message);
    setLoading(false);
    });
  }, []);
      
  if (loading) return <p>Loading clubs...</p>;
  if (error) return <p>Error: {error}</p>;

  const categories: string[] = ["All", ...Array.from(new Set(clubs.map(c => c.type)))];

  const filteredClubs: Club[] =
    selectedCategory === "All"
      ? clubs
      : clubs.filter((club) => club.type === selectedCategory);
  
  const searchedClubs: Club[] = filteredClubs.filter((club) =>
    club.club_name.toLowerCase().includes(searchValue.toLowerCase())
  );  

  return (
    //p-6 for padding
    // text-2xl font-semibold mb-4
    <div className="explore-container"> 
      <h1 className="heading">Explore Clubs</h1>

      <div className="filters-row">
        <SearchBar query={searchValue} onSearch={setSearchValue} placeholderText="Search clubs..." />
      
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <ClubList filteredCards={searchedClubs} />
    </div>
  );
};

export default ExplorePage;
