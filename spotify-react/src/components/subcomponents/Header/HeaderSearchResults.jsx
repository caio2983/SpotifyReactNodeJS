import React from "react";
import ArtistResultCard from "./SearchResultsCards/ArtistResultCard";
import NonArtistResultCard from "./SearchResultsCards/NonArtistResultCard";

export default function HeaderSearchResults() {
  return (
    <div className="header-search-results">
      <div className="search-results-container">
        <span className="search-results-title">Buscas recentes</span>

        <div className="results-list">
          <ArtistResultCard></ArtistResultCard>

          <NonArtistResultCard></NonArtistResultCard>
        </div>
      </div>
    </div>
  );
}
