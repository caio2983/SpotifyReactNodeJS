import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Song({ setIsSongExpanded }) {
  const handleClick = () => {
    setIsSongExpanded(true);
  };

  const [initialTrack, setInitialTrack] = useState(null);

  useEffect(() => {
    console.log("Requisição para track inicial disparada");
    axios
      .get("http://localhost:3000/initial-track")
      .then((response) => {
        setInitialTrack(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(initialTrack);

  return (
    <div className="song-container">
      <button onClick={handleClick}>Expandir</button>
      <div className="song-image-container">
        <img
          className="song-image"
          src={initialTrack?.images[0].url}
          alt="Song thumbnail"
        />
      </div>
    </div>
  );
}
