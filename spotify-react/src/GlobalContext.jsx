import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
  const [songSelected, setSong] = useState(null);

  return (
    <GlobalContext.Provider value={{ songSelected, setSong }}>
      {children}
    </GlobalContext.Provider>
  );
}
