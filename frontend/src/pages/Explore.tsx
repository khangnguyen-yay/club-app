import React, { useState } from "react";
import type { ClubCard } from "../filter-view/data";
import {cards} from "../filter-view/data";
import { CardList } from "../appCard/CardList";
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

      <CardList filteredCards={filteredClubs} />
    </div>
  );
};

export default ExplorePage;
