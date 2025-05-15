import React from "react";

export default function Song({ setIsSongExpanded }) {
  const handleClick = () => {
    setIsSongExpanded(true);
  };

  return (
    <div className="song-container">
      Música
      <button onClick={handleClick}>Expandir</button>
    </div>
  );
}
