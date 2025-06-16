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
  const wrapperRef = useRef(null);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

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
                size="l"
                className="library-magnifying-glass"
                onClick={() => setShowSearch((prev) => !prev)}
                style={{ cursor: "pointer" }}
              />

              <div
                className={` library-input-wrapper animated-search ${
                  showSearch ? "expanded" : "collapsed"
                }`}
                ref={wrapperRef}
              >
                <div className="input-and-results library-input-and-results">
                  <input
                    ref={inputRef}
                    type="text"
                    className="search-input library-search-input"
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
