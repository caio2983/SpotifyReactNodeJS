import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Vibrant } from "node-vibrant/browser";
import { Skeleton } from "@mui/material";
import PlaylistTools from "../PlaylistPage/PlaylistTools";

export default function TrackPage() {
  const { trackId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [track, setTrack] = useState([]);
  const [trackDominantColor, setDominantColor] = useState(null);
  const [gradientColor, setGradientColor] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const scrollContainerRef = useRef(null);

  const [artistImage, setArtistImage] = useState("");

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:3000/get-track/${trackId}`)
      .then((response) => {
        const trackData = response.data;
        setTrack(trackData);
        console.log("track", trackData);

        const artistIds = trackData?.artists?.map((artist) => artist.id);

        if (!artistIds || artistIds.length === 0) {
          throw new Error("Nenhum artista encontrado para esta faixa.");
        }

        return Promise.all(
          artistIds.map((id) =>
            axios
              .get(`http://localhost:3000/artist/${id}`)
              .then((res) => res.data)
          )
        );
      })
      .then((artistsData) => {
        console.log("artists", artistsData);
        setArtists(artistsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [trackId]);

  function hexToRgb(hex, alpha = 1) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function formatDuration(durationMs) {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    Vibrant.from(track?.album?.images?.[0]?.url)
      .getPalette()
      .then((palette) => {
        console.log("palette", palette);
        const darkerColor = palette.DarkVibrant.hex;
        setGradientColor(darkerColor);
        setDominantColor(hexToRgb(palette.DarkVibrant.hex));
      });
  }, [track]);

  return (
    <div className="main-container track-container" ref={scrollContainerRef}>
      <header className=" album-page-header">
        <section className="album-header-content">
          <figure
            className="album-image-wrapper"
            style={{
              boxShadow: isLoading
                ? "none"
                : "13px 10px 103px -18px rgba(0, 0, 0, 0.89)",
              WebkitBoxShadow: isLoading
                ? "none"
                : "13px 10px 103px -18px rgba(0, 0, 0, 0.89)",
              MozBoxShadow: isLoading
                ? "none"
                : "13px 10px 103px -18px rgba(0, 0, 0, 0.89)",
            }}
          >
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: "#888888",
                  borderRadius: "4px",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <img src={track?.album?.images?.[0]?.url} />
            )}
          </figure>

          <div className="album-header-text">
            <span className="playlist-description album-label">Música</span>
            <h1 className="album-title">
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ bgcolor: "#888888" }}
                  width={350}
                />
              ) : (
                track?.name
              )}
            </h1>

            <div className="album-details">
              <figure className="album-owner-image-wrapper">
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      bgcolor: "#888888",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <img
                    src={track && artists?.[0]?.images[0].url}
                    alt="artist-image"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </figure>
              <div className="playlist-details">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{
                      bgcolor: "#888888",
                      width: 250,
                      display: "inline-block",
                      verticalAlign: "middle",
                      borderRadius: 1,
                    }}
                  />
                ) : (
                  <>
                    <span className=" playlist-description  playlist-owner-name">
                      {artists?.[0]?.name}
                    </span>
                    <span className="separation-ball"></span>
                    <span className="playlist-description">
                      {track?.album?.name}
                    </span>
                    <span className="separation-ball"></span>
                    <span className="playlist-description">
                      {formatDuration(track?.duration_ms)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {!isLoading && (
          <div
            className="album-header-overlay"
            style={{
              backgroundColor: trackDominantColor || "#1d1d1e",
            }}
          ></div>
        )}
      </header>

      <div className="playlist-songs">
        <div
          className="songs-overlay"
          style={{
            background:
              !isLoading && gradientColor
                ? `linear-gradient(
            to bottom,
            ${hexToRgb(gradientColor, 0.6)} 0%,
            ${hexToRgb(gradientColor, 0.4)} 25%,
            ${hexToRgb(gradientColor, 0.25)} 50%,
            ${hexToRgb(gradientColor, 0.15)} 70%,
            ${hexToRgb(gradientColor, 0.0)} 85%,
            transparent 100%
          )`
                : "#1d1d1e",
          }}
        ></div>
        <PlaylistTools
          playSongs={{
            nextsongs: track,
            id: track?.id,
            type: "track",
          }}
          scrollContainerRef={scrollContainerRef}
          playlistDominantColor={trackDominantColor}
          type={"track"}
          data={track}
        ></PlaylistTools>

        <div className="track-content">
          {artists.map((artist, index) => (
            <div key={index} className="track-card">
              <img
                src={artist?.images?.[2]?.url}
                alt={artist?.name}
                className="track-card-artist-image"
              />

              <div className="track-card-text">
                <span>Artista</span>
                <span>{artist?.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
