import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Main() {
  const [initialPlaylists, setInitialPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/initial-playlists")
      .then((response) => {
        setInitialPlaylists(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main-container">
      <div className="main-buttons-container">
        <button>Tudo</button>
        <button>Músicas</button>
        <button>Podcasts</button>
      </div>
      <div className="playlist-cards">
        {initialPlaylists.map((playlist) => (
          <span key={playlist.id} className="playlist-card">
            {playlist.image?.[0]?.url ? (
              <div className="mini-playlist-image-container">
                <img src={playlist.image[0].url} alt={playlist.name} />
              </div>
            ) : (
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  backgroundColor: "#ccc",
                }}
              />
            )}
            <span className="playlist-card-text">{playlist.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
