import React, { useEffect } from "react";

export default function PlaylistSong({ index, image, song }) {
  useEffect(() => {
    console.log(song);
  }, []);
  return (
    <div className="song-card">
      <div className="song-index-album">
        <span className="song-index">{index + 1}</span>
        <div className="song-image-wrapper">
          <img src={image}></img>
        </div>
      </div>
      <span className="song-album">{song.album.name}</span>
    </div>
  );
}
