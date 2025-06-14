import React, { useState } from "react";
import LibraryExpanded from "./LibraryExpanded";
import { faArrowsLeftRightToLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtistResultCard from "../Header/SearchResultsCards/ArtistResultCard";
import NonArtistResultCard from "../Header/SearchResultsCards/NonArtistResultCard";
import LibrarySmall from "./LibrarySmall";

export default function Library({ setIsExpanded, currentWidth }) {
  const handleClick = () => {
    setIsExpanded(true);
  };

  return (
    <>
      {currentWidth < 7 ? (
        <LibrarySmall setIsExpanded={setIsExpanded}></LibrarySmall>
      ) : (
        <div className="library-container">
          <div className="library-container-header">
            <FontAwesomeIcon
              icon={faArrowsLeftRightToLine}
              onClick={handleClick}
              className="song-expand-button"
              size="xl"
            ></FontAwesomeIcon>

            <span className="your-library">Sua Biblioteca</span>
          </div>

          <div className="library-tools">
            <div className="library-buttons-wrapper">
              <button>Playlists</button>
              <button>Músicas</button>
              <button>Artistas</button>
            </div>
            <div className="library-search-wrapper">
              <span>Search Bar</span>
            </div>
          </div>

          <div className="results-list">
            <ArtistResultCard></ArtistResultCard>

            <NonArtistResultCard></NonArtistResultCard>
          </div>
        </div>
      )}
    </>
  );
}
