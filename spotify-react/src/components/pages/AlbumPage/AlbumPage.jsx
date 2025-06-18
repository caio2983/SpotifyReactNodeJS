import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Vibrant } from "node-vibrant/browser";
import { Skeleton } from "@mui/material";
import PlaylistTools from "../PlaylistPage/PlaylistTools";
import PlaylistSongSkeleton from "../PlaylistPage/PlaylistSongSkeleton";
import PlaylistSong from "../PlaylistPage/PlaylistSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function AlbumPage() {
  const { albumId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [album, setAlbum] = useState([]);
  const [albumDominantColor, setDominantColor] = useState(null);
  const [gradientColor, setGradientColor] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const scrollContainerRef = useRef(null);
  const [artistImage, setArtistImage] = useState("");

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:3000/get-album/${albumId}`)
      .then((response) => {
        const albumData = response.data;
        setAlbum(albumData);

        const artistId = albumData?.artists?.[0]?.id;
        if (artistId) {
          return axios.get(`http://localhost:3000/artist/${artistId}`);
        } else {
          throw new Error("Artista não encontrado no álbum.");
        }
      })
      .then((albumResponse) => {
        setArtistImage(albumResponse.data.images[2].url);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (album?.tracks?.items?.length > 0) {
      const fetchTrackDetails = async () => {
        try {
          const trackPromises = album.tracks.items.map((track) =>
            axios.get(`http://localhost:3000/get-track/${track.id}`)
          );
          const trackResponses = await Promise.all(trackPromises);
          const fullTracks = trackResponses.map((res) => res.data);
          console.log("FULL TRACKSSSS", fullTracks);
          setPlaylist(fullTracks);
        } catch (error) {
          console.error("Erro ao buscar detalhes das faixas:", error);
        }
      };

      fetchTrackDetails();
    }
  }, [album]);

  function hexToRgb(hex, alpha = 1) {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  useEffect(() => {
    if (album?.images?.[0]?.url) {
      Vibrant.from(album?.images?.[0]?.url)
        .getPalette()
        .then((palette) => {
          console.log("palette", palette);

          const darkerColor = palette.DarkVibrant.hex;

          setGradientColor(darkerColor);
          setDominantColor(hexToRgb(palette.DarkVibrant.hex));
        });
    }
  }, [album]);

  return (
    <div className="main-container album-container" ref={scrollContainerRef}>
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
              <img src={album?.images?.[0]?.url} />
            )}
          </figure>

          <div className="album-header-text">
            <span className="playlist-description album-label">Álbum</span>
            <h1 className="album-title">
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ bgcolor: "#888888" }}
                  width={350}
                />
              ) : (
                album?.name
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
                    src={album && artistImage}
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
                    <Link to={`/artist/${album?.artists?.[0]?.id}`}>
                      <span className=" playlist-description  playlist-owner-name">
                        {album?.artists?.[0]?.name}
                      </span>
                    </Link>
                    <span className="separation-ball"></span>
                    <span className="playlist-description">
                      {album?.release_date}
                    </span>
                    <span className="separation-ball"></span>
                    <span className="playlist-description">
                      {album?.total_tracks} músicas
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
              backgroundColor: albumDominantColor || "#1d1d1e",
            }}
          ></div>
        )}
      </header>

      <div className="playlist-songs">
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
            nextsongs: album?.tracks?.items,
            id: album?.id,
            type: "album",
          }}
          type={"album"}
          data={album}
          scrollContainerRef={scrollContainerRef}
          playlistDominantColor={albumDominantColor}
        ></PlaylistTools>
        <div className="songs-heading-container">
          <div className="songs-heading">
            <div className="column heading-title">
              <span className="hashtag">#</span>
              <span className="title">Título</span>
            </div>
            <div className="column heading-album">Álbum</div>
            <div className="column heading-added">Adicionada em</div>
            <div className="column heading-duration">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>

          <div className="song-list-container">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <PlaylistSongSkeleton key={index} />
                ))
              : playlist?.map((song, index) => (
                  <PlaylistSong
                    key={index}
                    image={song.album.images[2].url}
                    index={index}
                    song={song}
                    playlist={playlist}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
