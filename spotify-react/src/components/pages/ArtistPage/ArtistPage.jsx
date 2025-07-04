import React, { useEffect, useRef, useState } from "react";
import PlaylistTools from "../PlaylistPage/PlaylistTools";
import { useParams } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";
import axios from "axios";
import ArtistSong from "./ArtistSong";
import { useGlobalContext } from "../../../GlobalContext";
import SwiperSpotify from "../../subcomponents/SwiperSpotify";
import ArtistSongSkeleton from "./ArtistSongSkeleton";
import { Skeleton } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function ArtistPage() {
  const { artistId } = useParams();

  // Inicializa artist com o item do location.state, se existir, ou null
  const [artist, setArtist] = useState(location.state?.item || null);
  const [artistDominantColor, setDominantColor] = useState(null);
  const [gradientColor, setGradientColor] = useState(null);
  const [popularTracks, setPopularTracks] = useState([]);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [albums, setAlbums] = useState({
    album: [],
    single: [],
    appears_on: [],
    compilation: [],
  });
  const { nextSongs, setNextSongs, setSong } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [selectedAlbumType, setSelectedAlbumType] = useState(null);

  function separateAlbums(albums) {
    const result = {
      album: [],
      single: [],
      appears_on: [],
      compilation: [],
    };

    for (const album of albums) {
      const type = album.album_type;
      if (Object.prototype.hasOwnProperty.call(result, type)) {
        result[type].push(album);
      }
    }

    return result;
  }

  // Caso não tenha o artista vindo pelo state, buscar via API usando artistId
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/artist/${artistId}`)
      .then((response) => {
        setArtist(response.data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  // Pegar paleta de cores para o header (depende do artista)
  useEffect(() => {
    if (!artist) return;

    Vibrant.from(artist?.images[1]?.url)
      .getPalette()
      .then((palette) => {
        if (palette?.Vibrant?.hex) {
          const darkerColor = darkenHexColor(palette.DarkVibrant.hex, 0.1);
          const evenDarkerColor = darkenHexColor(palette.Vibrant.hex, 0.3);
          setGradientColor(evenDarkerColor);
          setDominantColor(darkerColor);
        }
      });
  }, [artist]);

  // Buscar faixas populares do artista
  useEffect(() => {
    if (!artist?.id) return;

    axios
      .get(`http://localhost:3000/artist-popular-tracks/${artist.id}`)
      .then((response) => {
        setPopularTracks(response.data);
      })
      .catch(console.error);
  }, [artist]);

  // Buscar álbuns do artista e separar por tipo
  useEffect(() => {
    if (!artist?.id) return;

    axios
      .get(`http://localhost:3000/artist-albums/${artist.id}`)
      .then((response) => {
        const separated_albums = separateAlbums(response.data.items);
        setAlbums(separated_albums);

        const firstAvailableType = Object.keys(separated_albums).find(
          (key) => separated_albums[key].length > 0
        );
        if (firstAvailableType) {
          setSelectedAlbumType(firstAvailableType);
        }
      })
      .catch(console.error);
  }, [artist]);

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
    <SimpleBar style={{ maxHeight: "100%" }}>
      <div className="main-container artist-container" ref={scrollContainerRef}>
        <header
          className="artist-page-header"
          style={{
            backgroundImage: `url(${artist?.images[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "0 60px 120px -40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="artist-header-content">
            <div className="artist-header-text">
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ bgcolor: "#888888" }}
                  width={350}
                  height={100}
                />
              ) : (
                <span className="artist-title artist-text-glow">
                  {artist?.name}
                </span>
              )}

              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ bgcolor: "#888888" }}
                  width={120}
                />
              ) : (
                <div className="artist-details">
                  <span className="artist-followers">
                    {artist?.followers?.total?.toLocaleString("pt-BR")}{" "}
                    seguidores
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="artist-header-overlay"></div>
        </header>

        <div className="artist-songs">
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
              nextsongs: popularTracks?.tracks,
              id: artist?.id,
              type: "artist",
            }}
            type={"artist"}
            data={artist}
            scrollContainerRef={scrollContainerRef}
            playlistDominantColor={artistDominantColor}
          ></PlaylistTools>
          <div className="songs-heading-container artist-songs-heading">
            <div className="song-list-container">
              <div className="artist-popular-tracks">
                <span>Populares</span>
                <div className="artist-popular-tracks-wrapper">
                  {isLoading ? (
                    <ArtistSongSkeleton />
                  ) : (
                    popularTracks?.tracks
                      ?.slice(0, showAllTracks ? 10 : 5)
                      .map((track, index) => (
                        <ArtistSong
                          key={index + 1}
                          track={track}
                          index={index + 1}
                          tracks={popularTracks.tracks}
                          artist_id={artist?.id}
                        />
                      ))
                  )}
                </div>
                {popularTracks?.tracks?.length > 5 && (
                  <button
                    onClick={() => setShowAllTracks(!showAllTracks)}
                    className="show-more-button"
                  >
                    {showAllTracks ? "Mostrar menos" : "Mostrar tudo"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="swipers-wrapper artist-discography">
            <p className="discography">Discografia</p>
            <div className="albuns-buttons">
              {["album", "single"].map((key) => {
                if (!albums[key] || albums[key].length === 0) return null;

                const labels = {
                  album: "Álbuns",
                  single: "Singles",
                };

                return (
                  <button
                    key={key}
                    className={`album-button ${
                      selectedAlbumType === key ? "active" : ""
                    }`}
                    onClick={() => setSelectedAlbumType(key)}
                  >
                    {labels[key]}
                  </button>
                );
              })}
            </div>
            <SwiperSpotify
              type="album"
              data={albums?.[selectedAlbumType] || []}
              album={true}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </SimpleBar>
  );
}
