import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";
import parse from "html-react-parser";
import PlaylistTools from "./PlaylistTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaylistSong from "./PlaylistSong";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function PlaylistPage() {
  const location = useLocation();
  const { playlist } = location.state || {};
  const [playlistDominantColor, setDominantColor] = useState(null);
  const [gradientColor, setGradientColor] = useState(null);

  const [miniImgSrc, setMiniImgSrc] = useState(
    playlist.owner.images[1]?.url || playlist.image[0]?.url
  );

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

  useEffect(() => {
    if (playlist?.image?.[0]?.url) {
      Vibrant.from(playlist.image[0].url)
        .getPalette()
        .then((palette) => {
          if (palette?.Vibrant?.hex) {
            const darkerColor = darkenHexColor(palette.Vibrant.hex, 0.1);
            const evenDarkerColor = darkenHexColor(palette.Vibrant.hex, 0.5);
            setGradientColor(evenDarkerColor);
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
            <img src={playlist.image[0]?.url} className="playlist-image" />
          </figure>
          <div className="playlist-header-text">
            <h1 className="playlist-title playlist-text-glow">
              {playlist.name}
            </h1>
            <span className="playlist-description ">
              {parse(playlist.description)}
            </span>
            <div className="playlist-details">
              <figure className="playlist-owner-image-wrapper">
                <img src={miniImgSrc} />
              </figure>
              <Link>
                <span className="playlist-text-glow playlist-owner-name">
                  {playlist.owner.display_name}
                </span>
              </Link>
              <span className="separation-ball"></span>

              <span className="playlist-description">
                {playlist.tracks.total} músicas
              </span>
              <span className="separation-ball"></span>
              <span className="playlist-description">
                {playlist.followers.total} seguidores
              </span>
            </div>
          </div>
        </section>
        <div className="playlist-header-overlay"></div>
      </header>

      <div
        className="playlist-songs"
        style={{
          background: gradientColor
            ? `linear-gradient(0deg, 
                rgba(29, 29, 30, 1) 90%, 
                ${hexToRgb(gradientColor, 0.9)} 110%)`
            : "#1d1d1e",
        }}
      >
        <div className="songs-overlay"></div>

        <PlaylistTools></PlaylistTools>

        <div className="songs-heading-container">
          <div className="songs-heading">
            <div className="column heading-title">
              <span className="hashtag">#</span>
              <span className="title">Título</span>
            </div>
            <div className="column heading-album">Álbum</div>
            <div className="column heading-added">Adicionada em</div>
            <div className="column heading-duration">
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
            </div>
          </div>

          <div className="song-list-container">
            {playlist.tracks.items.map((song, index) => (
              <PlaylistSong
                key={index}
                image={song.track.album.images[2].url}
                index={index}
                song={song.track}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
