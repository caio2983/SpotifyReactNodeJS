import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalContext";

import Main from "./subcomponents/Main/Main";
import "../App.css";
import Playing from "./subcomponents/Main/Playing";
import LibraryExpanded from "./subcomponents/Library/LibraryExpanded";
import Song from "./subcomponents/Song/Song";
import SongExpanded from "./subcomponents/Song/SongExpanded";
import axios from "axios";
import Library from "./subcomponents/Library/Library";

export default function Home() {
  const { songSelected, setSong } = useGlobalContext();
  const { nextSongs, setNextSongs } = useGlobalContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSongExpanded, setIsSongExpanded] = useState(false);

  // Gets the default selected song
  useEffect(() => {
    console.log("Requisição para track inicial disparada");
    axios
      .get("http://localhost:3000/initial-track")
      .then((response) => {
        setSong(response.data[0]);

        nextSongs.nextsongs = response.data[1].tracks.items;
        nextSongs.id = response.data[1].id;
        nextSongs.type = "album";

        setNextSongs(nextSongs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home-container">
      {isExpanded && <LibraryExpanded setIsExpanded={setIsExpanded} />}
      <Library setIsExpanded={setIsExpanded}></Library>
      <Main></Main>
      {isSongExpanded && (
        <SongExpanded
          setIsSongExpanded={setIsSongExpanded}
          selectedSong={songSelected}
        ></SongExpanded>
      )}
      <Song setIsSongExpanded={setIsSongExpanded}></Song>
      <Playing selectedSong={songSelected}></Playing>
    </div>
  );
}
