import React from "react";

export default function PlaylistSong({ index }) {
  const { playlist } = location.state || {};
  return (
    <div className="playlist-song-container">
      <span>{index + 1}</span>
    </div>
  );
}
