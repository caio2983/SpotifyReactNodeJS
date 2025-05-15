import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import PlaylistCard from "./PlaylistCard";

export default function Main() {
  const [initialPlaylists, setInitialPlaylists] = useState([]);
  const [playlistGradientColor, setPlaylistGradientColor] = useState(null);
  const [initialGradientColor, setInitialGradientColor] = useState(null);
  const gradientRef = useRef(null);

  function hexToRgb(hex) {
    const sanitizedHex = hex.replace("#", "");
    const bigint = parseInt(sanitizedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  useEffect(() => {
    console.log("Requisição para playlists disparada");
    axios
      .get("http://localhost:3000/initial-playlists")
      .then((response) => {
        setInitialPlaylists(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main-container">
      <span
        ref={gradientRef}
        style={{
          background: playlistGradientColor
            ? `linear-gradient(
                180deg,
                rgba(${hexToRgb(playlistGradientColor)}, 0.5) 0%,
                rgba(${hexToRgb(playlistGradientColor)}, 0.3) 20%,
                rgba(29, 29, 30, 0) 100%
              )`
            : "transparent",
          height: "300px",
        }}
        className="main-container-gradient"
      />

      <div className="main-buttons-container">
        <button>Tudo</button>
        <button>Músicas</button>
        <button>Podcasts</button>
      </div>
      <div className="playlist-cards">
        {initialPlaylists.map((playlist, index) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            index={index}
            setPlaylistGradientColor={setPlaylistGradientColor}
            setInitialGradientColor={setInitialGradientColor}
            gradientRef={gradientRef}
          />
        ))}
      </div>
    </div>
  );
}
