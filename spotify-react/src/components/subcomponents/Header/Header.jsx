import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import spotifyLogo from "../../../assets/spotifyLogo.png";
import { Link } from "react-router-dom";
import HeaderSearchResults from "./HeaderSearchResults";
import { useGlobalContext } from "../../../GlobalContext";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setIsSearching } = useGlobalContext();
  const { setGlobalSearchResult } = useGlobalContext();

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
      console.log("SEARCHHHH", cleanedData);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() !== "") {
        fetchSearchResults(query);
        setIsSearching(true);
      } else {
        setSearchResults([]);
      }
    }, 400),
    [setIsSearching]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

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

      <div className="input-wrapper">
        <div className="semi-circle semi-circle-1"></div>

        <div className="input-and-results">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <HeaderSearchResults />
        </div>

        <div className="semi-circle semi-circle-2"></div>
      </div>
    </div>
  );
}
