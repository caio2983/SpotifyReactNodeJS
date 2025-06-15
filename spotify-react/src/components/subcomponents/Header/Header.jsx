import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import spotifyLogo from "../../../assets/spotifyLogo.png";
import { Link, useNavigate } from "react-router-dom";
import HeaderRecentSearchResults from "./HeaderRecentSearchResults";
import { useGlobalContext } from "../../../GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [searchResults, setSearchResults] = useState([]);

  const { setIsSearching } = useGlobalContext();
  const { setGlobalSearchResult, setSearchTerm, searchTerm, recentSearches } =
    useGlobalContext();

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/search/${query}`);
      const cleanedData = {
        ...response.data,

        // Removes null items from playlists data
        playlists: {
          ...response.data.playlists,
          items:
            response.data.playlists?.items?.filter((item) => item !== null) ||
            [],
        },
      };

      setGlobalSearchResult(cleanedData);
      setIsSearching(false);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() !== "") {
        fetchSearchResults(query);
        setIsSearching(true);
        navigate(`/search/${encodeURIComponent(query)}`);
      } else {
        setSearchResults([]);
      }
    }, 400),
    [setIsSearching]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="header">
      <Link
        to="/"
        className="logo-wrapper"
        onClick={() => {
          setIsSearching(false);
          setSearchTerm("");
        }}
      >
        <img src={spotifyLogo} alt="Spotify Logo" />
      </Link>
      <div className="home-and-input">
        <Link
          to="/"
          onClick={() => {
            setIsSearching(false);
            setSearchTerm("");
          }}
        >
          <div className="home-button">
            <FontAwesomeIcon icon={faHouse} size="xl"></FontAwesomeIcon>
          </div>
        </Link>
        <div className="input-wrapper">
          <div
            className="semi-circle semi-circle-1"
            onClick={handleFocusInput}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleFocusInput()}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="2xl"
              className="magnifying-glass"
            />
          </div>
          <div className="input-and-results">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {recentSearches.length > 0 && (
              <HeaderRecentSearchResults></HeaderRecentSearchResults>
            )}
          </div>
          <div
            className="semi-circle semi-circle-2"
            onClick={handleFocusInput}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleFocusInput()}
          ></div>
        </div>
      </div>
    </div>
  );
}
