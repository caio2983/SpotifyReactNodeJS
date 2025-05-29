import React, { useEffect, useState } from "react";
import PlaylistTools from "../PlaylistPage/PlaylistTools";
import { useLocation, useParams } from "react-router-dom";
import { Vibrant } from "node-vibrant/browser";
import axios from "axios";
import ArtistSong from "./ArtistSong";
import { useGlobalContext } from "../../../GlobalContext";
import SwiperSpotify from "../../subcomponents/SwiperSpotify";
import ArtistSongSkeleton from "./ArtistSongSkeleton";

export default function ArtistPage() {
  const location = useLocation();
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

  function handleClick() {
    console.log("Popular tracks", popularTracks.tracks);
    setSong(popularTracks?.tracks[0]);

    setNextSongs({
      nextsongs: popularTracks.tracks,
      id: artist.id,
      type: "artist",
    });
  }

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
          backgroundImage: `url(${artist?.images[0]?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0 60px 120px -40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <section className="artist-header-content">
          <div className="artist-header-text">
            <h1 className="artist-title artist-text-glow">{artist?.name}</h1>
            <span className="artist-followers">
              {artist?.followers?.total?.toLocaleString("pt-BR")} seguidores
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
            ? `linear-gradient(
                to bottom,
                ${hexToRgb(gradientColor, 0.5)} 0%,
                ${hexToRgb(gradientColor, 0.3)} 10%,
                ${hexToRgb(gradientColor, 0.1)} 20%,
                transparent 50%
              )`
            : "#1d1d1e",
          height: "auto",
        }}
      >
        <div className="songs-overlay"></div>
        <div className="artist-tools-wrapper">
          <div className="play-button-green" onClick={handleClick}>
            <span>▶</span>
          </div>
          <button>Seguir</button>
        </div>
        <div className="songs-heading-container artist-songs-heading">
          <div className="song-list-container">
            <div className="artist-popular-tracks">
              <span>Populares</span>
              <div className="artist-popular-tracks-wrapper">
                {isLoading
                  ? Array(showAllTracks ? 10 : 5)
                      .fill(null)
                      .map((_, index) => <ArtistSongSkeleton key={index} />)
                  : popularTracks?.tracks
                      ?.slice(0, showAllTracks ? 10 : 5)
                      .map((track, index) => (
                        <ArtistSong
                          key={index + 1}
                          track={track}
                          index={index + 1}
                          tracks={popularTracks.tracks}
                          artist_id={artist?.id}
                        />
                      ))}
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
            type="square"
            data={albums?.[selectedAlbumType] || []}
            album={true}
            loading={isLoading}
          />
        </div>

        {albums?.appears_on && albums.appears_on.length > 0 && (
          <div className="swipers-wrapper artist-appears-on">
            <p className="discography">Aparece em</p>
            <SwiperSpotify
              type="square"
              data={albums.appears_on}
              album={true}
              loading={isLoading}
            />
          </div>
        )}

        {albums?.compilation && albums.compilation.length > 0 && (
          <div className="swipers-wrapper artist-compilation">
            <p className="discography">Com {artist?.name}</p>
            {selectedAlbumType && (
              <SwiperSpotify
                type="square"
                data={albums[selectedAlbumType] || []}
                album={true}
                loading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
