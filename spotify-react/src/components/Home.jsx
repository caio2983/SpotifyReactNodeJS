import React, { useState, useEffect } from "react";
import Library from "./subcomponents/Library";
import Main from "./subcomponents/Main";
import "../App.css";
import Playing from "./subcomponents/Playing";
import LibraryExpanded from "./subcomponents/LibraryExpanded";
import Song from "./subcomponents/Song";
import SongExpanded from "./subcomponents/SongExpanded";
import axios from "axios";

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
      <Playing></Playing>
    </div>
  );
}
