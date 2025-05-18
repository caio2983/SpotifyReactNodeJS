import React, { useState, useEffect } from "react";

import Main from "./subcomponents/Main/Main";
import "../App.css";
import Playing from "./subcomponents/Main/Playing";
import LibraryExpanded from "./subcomponents/Library/LibraryExpanded";
import Song from "./subcomponents/Song/Song";
import SongExpanded from "./subcomponents/Song/SongExpanded";
import axios from "axios";
import Library from "./subcomponents/Library/Library";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSongExpanded, setIsSongExpanded] = useState(false);

  const [selectedSong, setselectedSong] = useState(null);

  useEffect(() => {
    console.log("Requisição para track inicial disparada");
    axios
      .get("http://localhost:3000/initial-track")
      .then((response) => {
        setselectedSong(response.data);
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
          selectedSong={selectedSong}
        ></SongExpanded>
      )}
      <Song
        setIsSongExpanded={setIsSongExpanded}
        selectedSong={selectedSong}
      ></Song>
      <Playing selectedSong={selectedSong}></Playing>
    </div>
  );
}
