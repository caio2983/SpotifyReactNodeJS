import React, { useState } from "react";
import LibraryExpanded from "./LibraryExpanded";
import { faArrowsLeftRightToLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtistResultCard from "../Header/SearchResultsCards/ArtistResultCard";
import NonArtistResultCard from "../Header/SearchResultsCards/NonArtistResultCard";
import LibrarySmall from "./LibrarySmall";
import { useGlobalContext } from "../../../GlobalContext";
import { useEffect } from "react";
import axios from "axios";

export default function Library({ setIsExpanded, currentWidth, data }) {
  const handleClick = () => {
    setIsExpanded(true);
  };

  const { libraryReloadSignal } = useGlobalContext();
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/library").then((res) => {
      setItems(res.data);
    });
  }, [libraryReloadSignal]);

  function teste() {
    console.log("ITEMSSSS", items);
  }

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
              className="song-expand-button library-expand-button"
              size="xl"
            ></FontAwesomeIcon>

            <span className="your-library">Sua Biblioteca</span>
          </div>

          <div className="library-tools">
            <div className="library-buttons-wrapper">
              <button onClick={teste}>Playlists</button>
              <button>Músicas</button>
              <button>Artistas</button>
            </div>
            <div className="library-search-wrapper">
              <span>Search Bar</span>
            </div>
          </div>

          <div className="results-list">
            {items.map((item, index) => {
              const { type } = item;

              return type === "artist" ? (
                <ArtistResultCard key={index} data={item} />
              ) : (
                <NonArtistResultCard key={index} data={item} />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
