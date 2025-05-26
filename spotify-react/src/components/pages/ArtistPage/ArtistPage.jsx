import React from "react";
import PlaylistTools from "../PlaylistPage/PlaylistTools";

export default function ArtistPage() {
  const { artist } = location.state || {};

  return (
    <div className="main-container artist-container">
      <header
        className="artist-page-header"
        style={{
          backgroundColor: "#1d1d1e",
          boxShadow: "0 60px 120px -40px rgba(0, 0, 0, 0.5)",
        }}
      >
        <section className="artist-header-content">
          <figure className="artist-image-wrapper">
            <img
              src="https://via.placeholder.com/200"
              className="artist-image"
            />
          </figure>
          <div className="artist-header-text">
            <h1 className="artist-title artist-text-glow">Nome do Artista</h1>
            <span className="artist-description">
              Biografia ou descrição breve do artista.
            </span>
            <div className="artist-details">
              <figure className="artist-owner-image-wrapper">
                <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" />
              </figure>
              <span className="artist-text-glow artist-owner-name">
                Nome do Dono
              </span>
              <span className="separation-ball"></span>
              <span className="artist-description">58 músicas</span>
              <span className="separation-ball"></span>
              <span className="artist-description">1.200.000 seguidores</span>
            </div>
          </div>
        </section>
        <div className="artist-header-overlay"></div>
      </header>

      <div
        className="artist-songs"
        style={{
          background: `linear-gradient(0deg, rgba(29, 29, 30, 1) 90%, rgba(100, 100, 150, 0.9) 110%)`,
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
            <div className="column heading-duration">⏱</div>
          </div>

          <div className="song-list-container">
            <div className="song-card">
              <div className="song-index-album">
                <div className="song-index-number">1</div>
                <div className="song-play-triangle">▶</div>
                <figure className="song-image-wrapper">
                  <img
                    className="song-image"
                    src="https://via.placeholder.com/64"
                  />
                </figure>
                <div className="name-artist-wrapper">
                  <span className="song-name">Nome da Música</span>
                  <span className="song-artist">Nome do Artista</span>
                </div>
              </div>
              <div className="song-album">
                <span>Nome do Álbum</span>
              </div>
              <div className="song-date">01/01/2024</div>
              <div className="song-duration">3:45</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
