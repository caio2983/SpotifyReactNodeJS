import React from "react";

export default function PlaylistTools() {
  return (
    <div className="playlist-tools-container">
      <div className="tools-wrapper">
        <span className="play-button">
          <span className="play-triangle"></span>
        </span>
        <span>+ button</span>
        <span>3 points</span>
      </div>

      <div className="list-options">List</div>
    </div>
  );
}
