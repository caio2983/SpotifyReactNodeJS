import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PlaylistTools() {
  return (
    <div className="playlist-tools-container">
      <div className="tools-wrapper">
        <div className="play-button-green">
          <span>▶</span>
        </div>
        <span>+ button</span>
        <span>3 points</span>
      </div>

      <div className="list-options">List</div>
    </div>
  );
}
