import React, { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";
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

  useEffect(() => {
    Vibrant.from(songSelected?.album?.images[0].url)
      .getPalette()
      .then((palette) => {
        if (palette?.Vibrant?.hex) {
          setSongDominantColor(palette.Vibrant.hex);
        }
      });
  }, [selectedSong]);

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
