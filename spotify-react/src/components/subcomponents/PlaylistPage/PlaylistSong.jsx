import React from "react";

export default function PlaylistSong({ index, image }) {
  const { playlist } = location.state || {};
  return (
    <div className="playlist-song-container">
      <span className="song-index">{index + 1}</span>
      <div className="song-image-wrapper">
        <img src={image}></img>
      </div>
    </div>
  );
}
