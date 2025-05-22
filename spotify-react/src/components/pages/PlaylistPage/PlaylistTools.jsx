import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function PlaylistTools() {
  return (
    <div className="playlist-tools-container">
      <div className="tools-wrapper">
        <div className="play-button-green">
          <FontAwesomeIcon icon={faPlay} style={{ color: "black" }} size="xl" />
        </div>
        <span>+ button</span>
        <span>3 points</span>
      </div>

      <div className="list-options">List</div>
    </div>
  );
}
