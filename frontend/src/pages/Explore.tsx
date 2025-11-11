import React, { useState } from "react";
import type { ClubCard } from "../filter-view/data";
import {cards} from "../filter-view/data";
import CategoryFilter from "../filter-view/filter-view";

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: string[] = ["All", ...Array.from(new Set(cards.map(c => c.category)))];

  const filteredClubs: ClubCard[] =
    selectedCategory === "All"
      ? cards
      : cards.filter((club) => club.category === selectedCategory);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Explore Clubs</h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="border rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <h2 className="font-bold text-lg">{club.name}</h2>
            <p className="text-gray-600">{club.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
