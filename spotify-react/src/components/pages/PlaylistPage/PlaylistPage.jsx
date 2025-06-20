import React, { useRef, useState } from "react";
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

import PlaylistSongSkeleton from "./PlaylistSongSkeleton";
import { Skeleton } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function PlaylistPage() {
  const location = useLocation();

  const [playlist, setPlaylist] = useState(location.state?.item || null);
  const [playlistDominantColor, setDominantColor] = useState(null);
  const [gradientColor, setGradientColor] = useState(null);
  const { nextSongs, setNextSongs } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const scrollContainerRef = useRef(null);
  const { playlistId } = useParams();

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

  useEffect(() => {
    setNextSongs({
      nextsongs: playlist?.tracks.items,
      id: playlist?.id,
    });
  }, [playlist]);

  useEffect(() => {
    if (playlist?.images?.[0]?.url) {
      Vibrant.from(playlist?.images?.[0]?.url)
        .getPalette()
        .then((palette) => {
          console.log("palette", palette);

          const darkerColor = palette.Vibrant.hex;

          setGradientColor(darkerColor);
          setDominantColor(hexToRgb(palette.Vibrant.hex));
        });
    }
  }, [playlist]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/playlist/${playlistId}`)
      .then((response) => {
        setPlaylist(response.data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="main-container playlist-container" ref={scrollContainerRef}>
      <SimpleBar style={{ maxHeight: "100%", position: "relative", top: 0 }}>
        <header className="playlist-page-header">
          <div className="playlist-header-content">
            <figure
              className="playlist-image-wrapper"
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
                <img
                  src={playlist?.images[0]?.url}
                  className="playlist-image"
                />
              )}
            </figure>
            <div className="playlist-header-text">
              <span className="playlist-description album-label">
                Playlist pública
              </span>
              <h1 className="playlist-title ">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{
                      bgcolor: "#888888",
                    }}
                    width={350}
                  />
                ) : (
                  playlist?.name
                )}
              </h1>
              <span className="playlist-description">
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{
                      bgcolor: "#888888",
                    }}
                    width={200}
                  />
                ) : (
                  playlist && parse(playlist.description)
                )}
              </span>
              <div className="playlist-details">
                <figure className="playlist-owner-image-wrapper">
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
                      src={
                        (playlist && playlist.owner.images?.[0]?.url) ||
                        (playlist && playlist?.images[0]?.url)
                      }
                      alt="Playlist"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </figure>

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
                    <span className=" playlist-owner-name">
                      {playlist?.owner?.display_name}
                    </span>

                    <span className="separation-ball"></span>
                    <span className="playlist-description">
                      {playlist?.tracks?.total} músicas
                    </span>
                    <span className="separation-ball"></span>
                    <span className="playlist-description">
                      {playlist?.followers?.total} seguidores
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {!isLoading && (
            <div
              className="playlist-header-overlay"
              style={{
                backgroundColor: playlistDominantColor || "#1d1d1e",
              }}
            ></div>
          )}
        </header>

        <div className="playlist-songs" style={{ overflow: "visible" }}>
          {!isLoading && (
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
          )}

          <PlaylistTools
            playSongs={{
              nextsongs: playlist?.tracks.items,
              id: playlist?.id,
            }}
            type={"playlist"}
            data={playlist}
            scrollContainerRef={scrollContainerRef}
            playlistDominantColor={playlistDominantColor}
          />

          <div className="song-list-container">
            <div
              className={`song-cards-grid ${
                isLoading ? "song-cards-grid-skeleton" : ""
              }`}
            >
              <div className="column heading-title">
                <span className="hashtag">#</span>
                <span className="title">Título</span>
              </div>
              <div className="column heading-album">Álbum</div>
              <div className="column heading-added">Adicionada em</div>
              <div className="column heading-duration playlist-heading-duration">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="border-div"></div>
              {isLoading ? (
                <PlaylistSongSkeleton />
              ) : (
                playlist?.tracks?.items?.map((song, index) => (
                  <PlaylistSong
                    key={index}
                    image={song.track.album.images[2].url}
                    index={index}
                    song={song.track}
                    playlist={playlist}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
}
