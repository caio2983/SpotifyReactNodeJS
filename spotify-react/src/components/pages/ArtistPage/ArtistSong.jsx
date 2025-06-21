import React, { useEffect } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import { Link } from "react-router-dom";

export default function ArtistSong({ track, index, tracks, artist_id }) {
  const { songSelected, setSong } = useGlobalContext();
  const { nextSongs, setNextSongs } = useGlobalContext();

  function clickSong() {
    setSong(track);

    setNextSongs({
      nextsongs: tracks,
      id: artist_id,
      type: "artist",
    });
  }

  return (
    <div
      className="song-card"
      style={{ gridTemplateColumns: "auto 1fr auto", display: "grid" }}
      onClick={clickSong}
    >
      <div className="song-index-album">
        <div className="song-index-number" onClick={clickSong}>
          <div className="song-artist-index-wrapper">
            <span
              className="song-index"
              style={{
                marginBottom: "0",
                alignItems: "center",
              }}
            >
              {index}
            </span>
            <div
              className="song-play-triangle"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  marginBottom: "0",
                  alignItems: "center",
                }}
              >
                ▶
              </span>
            </div>
          </div>
        </div>

        <div className="song-image-wrapper">
          <img src={track?.album?.images[2].url}></img>
        </div>
        <div className="name-artist-wrapper">
          <Link to={`/track/${track.id}`}>
            <span className="song-name">{track.name}</span>
          </Link>
        </div>
      </div>

      <div className="gap-fill"></div>

      <span
        className="song-duration song-album-playlist"
        style={{
          textAlign: "center",
          justifySelf: "end",
        }}
      >
        <div style={{ marginRight: "16px" }}>
          {Math.floor(track.duration_ms / 60000)}:
          {Math.floor((track.duration_ms % 60000) / 1000)
            .toString()
            .padStart(2, "0")}
        </div>
      </span>
    </div>
  );
}
