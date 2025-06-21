import React, { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

import { useGlobalContext } from "../../../GlobalContext";

export default function SongExpanded({ setIsSongExpanded, selectedSong }) {
  const [animateClass, setAnimateClass] = useState("collapsed");
  const [songDominantColor, setSongDominantColor] = useState(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimateClass("expanded");
    });
  }, []);

  const { songSelected, setSong } = useGlobalContext();
  const fac = new FastAverageColor();

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = songSelected?.album?.images[0]?.url;

    img.onload = () => {
      const color = fac.getColor(img);
      setSongDominantColor(color.rgba);
    };
  }, [songSelected]);
  const handleClick = () => {
    setAnimateClass("collapsed");

    setTimeout(() => {
      setIsSongExpanded(false);
    }, 500);
  };

  return (
    <div
      className={`song-expanded-container ${animateClass}`}
      style={{
        background: `linear-gradient(to top, #1d1d1e -20%, ${songDominantColor} 100%)`,
      }}
    >
      <div className="expanded-black-background"></div>
      <button onClick={handleClick} className="expanded-button">
        Voltar
      </button>

      <div className="song-image-container song-image-container-expanded">
        <img
          className="song-image song-image-expanded"
          src={songSelected?.album?.images[0].url}
          alt="Song thumbnail"
        />
      </div>
    </div>
  );
}
