import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../../GlobalContext";

export default function PlaylistTools({ playSongs, type }) {
  const { setNextSongs, setSong } = useGlobalContext();

  function handleClick() {
    setNextSongs(playSongs);
    console.log(playSongs);

    setSong(playSongs?.nextsongs?.[0].track);

    setNextSongs({
      nextsongs: playSongs.nextsongs,
      id: playSongs.id,
      type: "playlist",
    });
  }

  return (
    <div className="playlist-tools-container">
      <div className="tools-wrapper">
        <div className="play-button-green" onClick={handleClick}>
          <span>▶</span>
        </div>
        <span>+ button</span>
        <span>3 points</span>
      </div>

      <div className="list-options">List</div>
    </div>
  );
}
