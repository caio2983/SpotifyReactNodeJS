import React from "react";
import { useState, useEffect } from "react";
import { Vibrant } from "node-vibrant/browser";

export default function PlaylistCard({
  playlist,
  setPlaylistGradientColor,
  setInitialGradientColor,
  index,
  gradientRef,
}) {
  useEffect(() => {
    if (playlist?.image?.[0]?.url) {
      Vibrant.from(playlist.image[0].url)
        .getPalette()
        .then((palette) => {
          if (palette?.Vibrant?.hex) {
            setDominantColor(palette.Vibrant.hex);
            if (index == 0) {
              setInitialGradientColor(palette.Vibrant.hex);
            }
          }
        });
    }
  }, [playlist]);

  const [playlistDominantColor, setDominantColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      key={playlist.id}
      onMouseEnter={() => {
        setIsHovered(true);

        setTimeout(() => {
          if (gradientRef?.current) {
            gradientRef.current.classList.add(
              "main-container-gradient-visible"
            );

            gradientRef.current.classList.remove(
              "main-container-gradient-invisible"
            );
          }
          setPlaylistGradientColor(playlistDominantColor);
        }, 100);
      }}
      onMouseLeave={() => {
        setIsHovered(false);

        setTimeout(() => {
          if (gradientRef?.current) {
            gradientRef.current.classList.remove(
              "main-container-gradient-visible"
            );
            gradientRef.current.classList.add(
              "main-container-gradient-invisible"
            );
          }
          setPlaylistGradientColor(playlistDominantColor);
        }, 100);
      }}
      className="playlist-card"
    >
      {isHovered ? <span className="playlist-card-hovered"></span> : ""}

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
      <span className="playlist-card-text glow-white">{playlist.name}</span>
    </span>
  );
}
