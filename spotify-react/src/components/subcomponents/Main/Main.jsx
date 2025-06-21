import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import PlaylistCard from "./PlaylistCard";
import { Routes, Route, Link } from "react-router-dom";
import PlaylistPage from "../../pages/PlaylistPage/PlaylistPage";
import SwiperSpotify from "../SwiperSpotify";
import ArtistPage from "../../pages/ArtistPage/ArtistPage";
import PlaylistCardSkeleton from "./PlaylistCardSkeleton";
import SearchingPage from "../../pages/SearchingPage/SearchingPage";
import TrackPage from "../../pages/TrackPage/TrackPage";
import AlbumPage from "../../pages/AlbumPage/AlbumPage";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
export default function Main({ currentWidth }) {
  const [initialPlaylists, setInitialPlaylists] = useState([]);
  const [initialArtists, setInitialArtists] = useState([]);
  const [initialTracks, setInitialTracks] = useState([]);

  const [playlistCardsLoading, setPlaylistCardsLoading] = useState(true);
  const [artistsLoading, setArtistsLoading] = useState(true);
  const [albumsLoading, setAlbumsLoading] = useState(true);

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
    setPlaylistCardsLoading(true);
    console.log("Requisição para playlists disparada");

    axios
      .get("http://localhost:3000/initial-playlists")
      .then((response) => {
        setInitialPlaylists(response.data);
        setPlaylistCardsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setPlaylistCardsLoading(false);
      });
  }, []);

  useEffect(() => {
    setArtistsLoading(true);
    console.log("Requisição para artistas disparada");

    axios
      .get("http://localhost:3000/initial-artists")
      .then((response) => {
        setInitialArtists(response.data.artists);
        setArtistsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar artistas:", error);
        setArtistsLoading(false);
      });
  }, []);

  useEffect(() => {
    setAlbumsLoading(true);
    console.log("Requisição para faixas disparada");

    axios
      .get("http://localhost:3000/initial-tracks")
      .then((response) => {
        setInitialTracks(response.data.tracks);
        setAlbumsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar faixas:", error);
        setAlbumsLoading(false);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SimpleBar style={{ maxHeight: "100%" }}>
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
                    height: "500px",
                  }}
                  className="main-container-gradient"
                />

                <div
                  className="playlist-cards"
                  style={{
                    gridTemplateColumns:
                      currentWidth < 70 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                  }}
                >
                  {playlistCardsLoading &&
                    Array.from({ length: 8 }).map((_, index) => (
                      <PlaylistCardSkeleton key={index} />
                    ))}
                  {!playlistCardsLoading &&
                    initialPlaylists.map((playlist, index) => (
                      <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
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
                  type="track"
                  data={initialTracks}
                  loading={albumsLoading}
                  currentWidth={currentWidth}
                />

                <SwiperSpotify
                  format="circle"
                  type="artist"
                  data={initialArtists}
                  loading={artistsLoading}
                  currentWidth={currentWidth}
                />
              </div>
            </div>
          </SimpleBar>
        }
      />

      <Route
        path="/playlist/:playlistId"
        element={<PlaylistPage currentWidth={currentWidth} />}
      />
      <Route path="/artist/:artistId" element={<ArtistPage />} />
      <Route path="/search/:query" element={<SearchingPage />} />
      <Route path="/track/:trackId" element={<TrackPage />} />
      <Route path="/album/:albumId" element={<AlbumPage />} />
    </Routes>
  );
}
