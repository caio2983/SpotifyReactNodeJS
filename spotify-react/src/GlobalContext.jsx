import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [globalSearchResult, setGlobalSearchResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [songSelected, setSong] = useState(null);
  const [libraryItems, setLibraryItems] = useState([]);
  const [nextSongs, setNextSongs] = useState({
    nextsongs: [],
    id: null,
    type: null,
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [libraryReloadSignal, setLibraryReloadSignal] = useState(0);

  function signalLibraryReload() {
    setLibraryReloadSignal((prev) => prev + 1);
  }

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
        libraryReloadSignal,
        signalLibraryReload,
        libraryItems,
        setLibraryItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
