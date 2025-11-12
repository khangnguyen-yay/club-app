import React, { useState, useEffect } from "react";
import type { Club } from "../appCard/CardList";
import ClubList from "../appCard/CardList";
import CategoryFilter from "../filter-view/filter-view";

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // Fetch data from backend
    fetch("http://localhost:3000/api/clubs")
    .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch clubs");
    return res.json();
    })
    .then((data: Club[]) => {
    setClubs(data);
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


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Explore Clubs</h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ClubList filteredCards={filteredClubs} />
    </div>
  );
};

export default ExplorePage;
