import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";

export default function PlaylistPage() {
  const location = useLocation();
  const { playlist } = location.state || {};
  const [playlistDominantColor, setDominantColor] = useState(null);

  function hexToRgb(hex, alpha = 1) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  function darkenHexColor(hex, amount = 0.2) {
    // Remove # se existir
    hex = hex.replace("#", "");

    // Converte para RGB
    var num = parseInt(hex, 16);
    var r = (num >> 16) & 0xff;
    var g = (num >> 8) & 0xff;
    var b = num & 0xff;

    // Escurece (multiplica pelo fator < 1)
    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));

    // Converte de volta para HEX
    var darkHex =
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");

    return darkHex;
  }

  useEffect(() => {
    if (playlist?.image?.[0]?.url) {
      Vibrant.from(playlist.image[0].url)
        .getPalette()
        .then((palette) => {
          if (palette?.Vibrant?.hex) {
            const darkerColor = darkenHexColor(palette.Vibrant.hex, 0.2);
            setDominantColor(darkerColor);
          }
        });
    }
  }, [playlist]);

  return (
    <div className="main-container playlist-container">
      <header
        className="playlist-page-header"
        style={{
          backgroundColor: playlistDominantColor || "#1d1d1e",
          boxShadow: "0 60px 120px -40px rgba(0, 0, 0, 0.5)",
        }}
      >
        <section className="playlist-header-content">
          <figure className="playlist-image-wrapper">
            <img src={playlist.image[0].url} className="playlist-image" />
          </figure>
          <div className="playlist-header-text">
            <h1 className="playlist-title">{playlist.name}</h1>
          </div>
        </section>
        <div className="playlist-header-overlay"></div>
      </header>

      <div
        className="playlist-songs"
        style={{
          background: playlistDominantColor
            ? `linear-gradient(0deg, 
                rgba(29, 29, 30, 1) 40%, 
                ${hexToRgb(playlistDominantColor, 0.6)} 120%)`
            : "#1d1d1e",

          height: "1000px",
        }}
      >
        <div className="songs-overlay"></div>
      </div>
    </div>
  );
}
