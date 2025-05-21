import React from "react";
import { useGlobalContext } from "../../../GlobalContext";

export default function Playing() {
  const { songSelected, setSong } = useGlobalContext();

  return (
    <div className="playing-container">
      <div className="playing-wrapper">
        <div className="playing-details">
          <div className="playing-image">
            <img src={songSelected?.album?.images[2].url} alt="Image" />
          </div>
          <div className="playing-name-artist">
            <span className="playing-name text-glow">{songSelected?.name}</span>
            <span className="playing-artist">
              {songSelected?.artists[0].name}
            </span>
          </div>
        </div>

        <div className="playing-tools-center"></div>

        <div className="playing-tools-right"></div>
      </div>
    </div>
  );
}
