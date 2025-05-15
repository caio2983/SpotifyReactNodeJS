import React, { useEffect, useState } from "react";

export default function SongExpanded({ setIsSongExpanded }) {
  const [animateClass, setAnimateClass] = useState("collapsed");

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimateClass("expanded");
    });
  }, []);

  const handleClick = () => {
    setAnimateClass("collapsed");

    setTimeout(() => {
      setIsSongExpanded(false);
    }, 500);
  };

  return (
    <div className={`song-expanded-container ${animateClass}`}>
      Música Expandida!
      <button onClick={handleClick}>Voltar</button>
    </div>
  );
}
