import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../../GlobalContext";
import axios from "axios";

export default function PlaylistTools({ playSongs, type }) {
  const { setNextSongs, setSong } = useGlobalContext();

  function handleClick() {
    if (type == "album") {
      axios
        .get(`http://localhost:3000/get-track/${playSongs?.nextsongs?.[0].id}`)
        .then((response) => {
          const track = response.data;
          setSong(track);
        });
    } else if (type == "track") {
      setSong(playSongs.nextsongs);
    } else {
      setSong(playSongs?.nextsongs?.[0].track);
    }

    setNextSongs({
      nextsongs: playSongs.nextsongs,
      id: playSongs.id,
      type: { type },
    });
  }

  return (
    <div className="playlist-tools-container">
      <div className="tools-wrapper">
        <div className="play-button-green" onClick={handleClick}>
          <span>▶</span>
        </div>
      </div>
    </div>
  );
}
