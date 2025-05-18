import React, { useState } from "react";
import LibraryExpanded from "./LibraryExpanded";

export default function Library({ setIsExpanded }) {
  const handleClick = () => {
    setIsExpanded(true);
  };

  return (
    <>
      <div className="library-container">
        Library
        <button onClick={handleClick}>Expandir</button>
      </div>
    </>
  );
}
