import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import spotifyLogo from "../../../assets/spotifyLogo.png";
import { Link, useNavigate } from "react-router-dom";
import HeaderRecentSearchResults from "./HeaderRecentSearchResults";
import { useGlobalContext } from "../../../GlobalContext";

export default function Header() {
  const [searchResults, setSearchResults] = useState([]);
  const [recentsearches, setRecentSearches] = useState([]);
  const { setIsSearching } = useGlobalContext();
  const { setGlobalSearchResult, setSearchTerm, searchTerm } =
    useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/recentsearches")
      .then((response) => {
        setRecentSearches(response);
      })
      .catch((error) => {
        console.error("Erro ao conseguir busxas recentes:", error);
      });
  }, []);

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

  return (
    <div className="header">
      <Link
        to="/"
        className="logo-wrapper"
        onClick={() => {
          setIsSearching(false);
          searchTerm("");
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

          <HeaderRecentSearchResults
            recentSearchResults={recentsearches}
          ></HeaderRecentSearchResults>
        </div>

        <div className="semi-circle semi-circle-2"></div>
      </div>
    </div>
  );
}
