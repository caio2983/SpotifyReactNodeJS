import React, { useRef, useState } from "react";
import LibraryExpanded from "./LibraryExpanded";
import {
  faArrowsLeftRightToLine,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
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
  const inputRef = useRef(null);
  const [searchWord, setSearchWord] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { libraryReloadSignal } = useGlobalContext();
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/library").then((res) => {
      setItems(res.data);
    });
  }, [libraryReloadSignal]);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
              className="song-expand-button library-expand-button"
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

            <div className="glass-and-input">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                className="library-magnifying-glass"
                onClick={() => setShowSearch(true)}
                style={{ cursor: "pointer" }}
              />

              <div
                className={` library-input-wrapper animated-search ${
                  showSearch ? "expanded" : "collapsed"
                }`}
              >
                <div className="input-and-results">
                  <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                  />
                </div>
              </div>
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
