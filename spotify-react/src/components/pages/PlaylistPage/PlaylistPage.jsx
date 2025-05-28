import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";
import parse from "html-react-parser";
import PlaylistTools from "./PlaylistTools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaylistSong from "./PlaylistSong";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../../GlobalContext";
import axios from "axios";

export default function PlaylistPage() {
  const location = useLocation();

  const [playlist, setPlaylist] = useState(location.state?.item || null);
  const [playlistDominantColor, setDominantColor] = useState(null);
  const [gradientColor, setGradientColor] = useState(null);
  const { nextSongs, setNextSongs } = useGlobalContext();

  const { playlistId } = useParams();

  // const [miniImgSrc, setMiniImgSrc] = useState(
  //   playlist?.images[0]?.url || playlist?.owner
  // );

  function hexToRgb(hex, alpha = 1) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  useEffect(() => {
    setNextSongs({
      nextsongs: playlist?.tracks.items,
      id: playlist?.id,
    });
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
    if (playlist?.images?.[0]?.url) {
      Vibrant.from(playlist.images[0].url)
        .getPalette()
        .then((palette) => {
          console.log("palette", palette);

          const darkerColor = darkenHexColor(palette.DarkVibrant.hex, 0.1);

          setGradientColor(darkerColor);
          setDominantColor(hexToRgb(palette.DarkVibrant.hex));
        });
    }
  }, [playlist]);

  // Caso não tenha a playlist vindo pelo state, buscar via API usando playlistId ( que é ujm parâmetro passado na url)
  useEffect(() => {
    if (!playlist) {
      console.log("TESTEEEEE");
      axios
        .get(`http://localhost:3000/playlist/${playlistId}`)
        .then((response) => {
          setPlaylist(response.data);
          console.log("PLAYLISTTTT", response.data);
        })
        .catch(console.error);
    }
  }, []);

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
            <img src={playlist?.images[0]?.url} className="playlist-image" />
          </figure>
          <div className="playlist-header-text">
            <h1 className="playlist-title playlist-text-glow">
              {playlist?.name}
            </h1>
            <span className="playlist-description ">
              {playlist && parse(playlist.description)}
            </span>
            <div className="playlist-details">
              <figure className="playlist-owner-image-wrapper">
                <img
                  src={
                    (playlist && playlist.owner.images?.[0]?.url) ||
                    (playlist && playlist?.images[0]?.url)
                  }
                />
              </figure>
              <Link>
                <span className="playlist-text-glow playlist-owner-name">
                  {playlist?.owner?.display_name}
                </span>
              </Link>
              <span className="separation-ball"></span>

              <span className="playlist-description">
                {playlist?.tracks.total} músicas
              </span>
              <span className="separation-ball"></span>
              <span className="playlist-description">
                {playlist?.followers.total} seguidores
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
            ? `linear-gradient(
                to bottom,
          
                ${hexToRgb(gradientColor, 0.5)} 0%,
                ${hexToRgb(gradientColor, 0.3)} 20%,
                ${hexToRgb(gradientColor, 0.1)} 35%,
           transparent 50%
              )`
            : "#1d1d1e",
          height: "auto",
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
            {playlist?.tracks.items.map((song, index) => (
              <PlaylistSong
                key={index}
                image={song.track.album.images[2].url}
                index={index}
                song={song.track}
                playlist={playlist}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
