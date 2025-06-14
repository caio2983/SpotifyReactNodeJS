import React from "react";
import ArtistResultCard from "./SearchResultsCards/ArtistResultCard";
import NonArtistResultCard from "./SearchResultsCards/NonArtistResultCard";
import { useGlobalContext } from "../../../GlobalContext";

export default function HeaderRecentSearchResults() {
  const { recentSearches } = useGlobalContext();

  return (
    <div className="header-search-results">
      <div className="search-results-container">
        <span className="search-results-title">Buscas recentes</span>

        <div className="results-list">
          {recentSearches.map((item, index) => {
            const { type } = item;

            return type === "artist" ? (
              <ArtistResultCard key={index} data={item} />
            ) : (
              <NonArtistResultCard key={index} data={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
