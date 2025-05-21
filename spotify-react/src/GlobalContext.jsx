import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const [song, setSong] = useState(null);

  return (
    <GlobalContext.Provider value={{ song, setSong }}>
      {children}
    </GlobalContext.Provider>
  );
}
