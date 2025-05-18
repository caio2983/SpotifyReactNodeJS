import React, { useEffect, useState } from "react";

export default function Song({ setIsSongExpanded, selectedSong }) {
  const handleClick = () => {
    setIsSongExpanded(true);
  };

  return (
    <div className="song-container">
      <button onClick={handleClick}>Expandir</button>
      <div className="song-image-container">
        <img
          className="song-image"
          src={selectedSong?.images[0].url}
          alt="Song thumbnail"
        />
      </div>
    </div>
  );
}
