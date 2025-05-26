import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import PlaylistCard from "./PlaylistCard";
import { Routes, Route, Link } from "react-router-dom";
import PlaylistPage from "../../pages/PlaylistPage/PlaylistPage";
import SwiperSpotify from "../SwiperSpotify";
import ArtistPage from "../../pages/ArtistPage/ArtistPage";

export default function Main() {
  const [initialPlaylists, setInitialPlaylists] = useState([]);
  const [initialArtists, setInitialArtists] = useState([]);
  const [initialTracks, setInitialTracks] = useState([]);
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

  useEffect(() => {
    console.log("Requisição para artistas disparada");
    axios
      .get("http://localhost:3000/initial-artists")
      .then((response) => {
        setInitialArtists(response.data.artists);
      })
      .catch((error) => {
        console.error("Erro ao buscar artistas:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Requisição para artistas disparada");
    axios
      .get("http://localhost:3000/initial-tracks")
      .then((response) => {
        setInitialTracks(response.data.tracks);

        console.log("TRACKSSSSSS", response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar artistas:", error);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="main-container ">
            <div className="main-wrapper">
              <span
                ref={gradientRef}
                style={{
                  background: playlistGradientColor
                    ? `linear-gradient(
                      180deg,
                      rgba(${hexToRgb(playlistGradientColor)}, 0.75) 0%,
                      rgba(${hexToRgb(playlistGradientColor)}, 0.5) 5%,
                      rgba(${hexToRgb(playlistGradientColor)}, 0.25) 20%,
                      rgba(${hexToRgb(playlistGradientColor)}, 0.25) 30%,     
                      rgba(29, 29, 30, 0) 100%
                    )`
                    : "transparent",
                  height: "400px",
                }}
                className="main-container-gradient"
              />

              <div className="playlist-cards">
                {initialPlaylists.map((playlist, index) => (
                  <Link
                    to={`/playlist/${playlist.id}`}
                    state={{ playlist }}
                    key={playlist.id}
                  >
                    <PlaylistCard
                      playlist={playlist}
                      index={index}
                      setPlaylistGradientColor={setPlaylistGradientColor}
                      setInitialGradientColor={setInitialGradientColor}
                      gradientRef={gradientRef}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="swipers-wrapper">
              <SwiperSpotify
                type="circle"
                data={initialArtists}
              ></SwiperSpotify>
              <SwiperSpotify type="square" data={initialTracks}></SwiperSpotify>
            </div>
          </div>
        }
      />

      <Route path="/playlist/:id" element={<PlaylistPage />} />
      <Route path="/artist/:id" element={<ArtistPage></ArtistPage>} />
    </Routes>
  );
}
