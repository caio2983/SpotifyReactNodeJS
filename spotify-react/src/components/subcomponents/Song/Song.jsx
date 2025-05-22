import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRightToLine } from "@fortawesome/free-solid-svg-icons";

export default function Song({ setIsSongExpanded }) {
  const handleClick = () => {
    setIsSongExpanded(true);
  };

  const { songSelected, setSong } = useGlobalContext();

  return (
    <div className="song-container">
      <div className="song-header">
        <FontAwesomeIcon
          icon={faArrowsLeftRightToLine}
          onClick={handleClick}
          className="song-expand-button"
          size="xl"
        ></FontAwesomeIcon>

        <span className="song-name-header">{songSelected?.name}</span>
      </div>

      <div className="song-image-container">
        <img
          className="song-image"
          src={songSelected?.album?.images[0].url}
          alt="Song thumbnail"
        />
      </div>

      <div className="song-title-artist">
        <div className="scroll-wrapper">
          <div className="scroll-content">
            <span className="song-name-big">{songSelected?.name}</span>
          </div>
          <span className="song-artist-big">
            {songSelected?.artists[0].name}
          </span>
        </div>
      </div>
    </div>
  );
}
