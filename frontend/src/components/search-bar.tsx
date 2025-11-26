import React from "react";
//import "../styles/search-bar.css";

interface SearchBarInterface {
    placeholderText: string;
    query?: string;
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarInterface> = ({placeholderText = "Search club names...", query, onSearch}) => {
    return (
        <input
            className="search-bar"
            data-testid="search-bar"
            type="text"
            placeholder={placeholderText}
            value={query}
            onChange={(e) => onSearch && onSearch(e.target.value)}
        />
    );
};
export default SearchBar;