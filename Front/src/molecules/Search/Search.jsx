import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";

function Search({ value, onChange }) {
  return (
    <div className="search">
      <SearchIcon />
      <input
        placeholder="Search Artist/Album"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search__input"
      />
    </div>
  );
}

export default Search;
