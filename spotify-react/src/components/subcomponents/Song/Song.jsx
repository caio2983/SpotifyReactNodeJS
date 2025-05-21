import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../GlobalContext";

export default function Song({ setIsSongExpanded }) {
  const handleClick = () => {
    setIsSongExpanded(true);
  };

  const { songSelected, setSong } = useGlobalContext();

  return (
    <div className="song-container">
      <button onClick={handleClick}>Expandir</button>
      <div className="song-image-container">
        <img
          className="song-image"
          src={songSelected?.album?.images[0].url}
          alt="Song thumbnail"
        />
      </div>
    </div>
  );
}
