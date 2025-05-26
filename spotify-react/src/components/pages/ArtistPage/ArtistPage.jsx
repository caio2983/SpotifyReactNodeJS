import React, { useEffect, useState } from "react";
import PlaylistTools from "../PlaylistPage/PlaylistTools";
import { useLocation } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";

export default function ArtistPage() {
  const location = useLocation();
  const artist = location.state?.item;
  const [artistDominantColor, setDominantColor] = useState(null);
  const [gradientColor, setGradientColor] = useState(null);

  useEffect(() => {
    console.log("ARTIST CLICKED", location.state.item);
    console.log("artist images:", location.state.item);

    Vibrant.from(artist?.images[1]?.url)
      .getPalette()
      .then((palette) => {
        if (palette?.Vibrant?.hex) {
          const darkerColor = darkenHexColor(palette.Vibrant.hex, 0.2);
          const evenDarkerColor = darkenHexColor(palette.Vibrant.hex, 0.3);
          setGradientColor(evenDarkerColor);
          setDominantColor(darkerColor);
        }
      });
  }, []);

  function hexToRgb(hex, alpha) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function darkenHexColor(hex, amount) {
    hex = hex.replace("#", "");

    var num = parseInt(hex, 16);
    var r = (num >> 16) & 0xff;
    var g = (num >> 8) & 0xff;
    var b = num & 0xff;

    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));

    var darkHex =
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");

    return darkHex;
  }

  return (
    <div className="main-container artist-container">
      <header
        className="artist-page-header"
        style={{
          backgroundColor: artistDominantColor || "#1d1d1e",
          boxShadow: "0 60px 120px -40px rgba(0, 0, 0, 0.5)",
        }}
      >
        <section className="artist-header-content">
          <figure className="artist-image-wrapper">
            <img src={artist?.images[1]?.url} className="artist-image" />
          </figure>
          <div className="artist-header-text">
            <h1 className="artist-title artist-text-glow">{artist?.name}</h1>
            <span className="artist-followers">
              {artist?.followers.total} seguidores
            </span>
            <div className="artist-details"></div>
          </div>
        </section>
        <div className="artist-header-overlay"></div>
      </header>

      <div
        className="artist-songs"
        style={{
          background: gradientColor
            ? `linear-gradient(0deg, 
                rgba(29, 29, 30, 1) 0%, 
                ${hexToRgb(gradientColor, 0.5)} 110%)`
            : "#1d1d1e",
          height: "100vh",
        }}
      >
        <div className="songs-overlay"></div>

        <div className="songs-heading-container">
          <div className="song-list-container"></div>
        </div>
      </div>
    </div>
  );
}
