import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [globalSearchResult, setGlobalSearchResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [songSelected, setSong] = useState(null);
  const [nextSongs, setNextSongs] = useState({
    nextsongs: [],
    id: null,
    type: null,
  });
  const [recentSearches, setRecentSearches] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        songSelected,
        setSong,
        nextSongs,
        setNextSongs,
        isSearching,
        setIsSearching,
        globalSearchResult,
        setGlobalSearchResult,
        searchTerm,
        setSearchTerm,
        recentSearches,
        setRecentSearches,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
