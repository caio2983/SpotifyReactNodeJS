import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalContext";

import Main from "./subcomponents/Main/Main";
import Playing from "./subcomponents/Main/Playing";
import LibraryExpanded from "./subcomponents/Library/LibraryExpanded";
import Song from "./subcomponents/Song/Song";
import SongExpanded from "./subcomponents/Song/SongExpanded";
import axios from "axios";
import Library from "./subcomponents/Library/Library";
import SearchingPage from "./pages/SearchingPage/SearchingPage";

export default function Home() {
  const { songSelected, setSong, nextSongs, setNextSongs } = useGlobalContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSongExpanded, setIsSongExpanded] = useState(false);

  // valores percentuais
  const [libraryWidth, setLibraryWidth] = useState(25);
  const [songWidth, setSongWidth] = useState(25);
  const [dragging, setDragging] = useState(null);
  const { isSearching } = useGlobalContext();

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const deltaPercent = (e.movementX / window.innerWidth) * 100;

    if (dragging === "library") {
      setLibraryWidth((prev) => {
        const newWidth = Math.max(6, Math.min(25, prev + deltaPercent));
        return newWidth;
      });
    }

    if (dragging === "song") {
      setSongWidth((prev) => {
        const newWidth = Math.max(20, Math.min(26, prev - deltaPercent));
        return newWidth;
      });
    }
  };

  const handleMouseUp = () => setDragging(null);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  // Fetch initial song
  useEffect(() => {
    axios
      .get("http://localhost:3000/initial-track")
      .then((response) => {
        setSong(response.data[0]);
        nextSongs.nextsongs = response.data[1].tracks.items;
        nextSongs.id = response.data[1].id;
        nextSongs.type = "album";
        setNextSongs(nextSongs);
      })
      .catch(console.error);
  }, []);

  const mainWidth = 100 - libraryWidth - songWidth;

  return (
    <div className="home-container">
      {/* LIBRARY */}
      <div className="resizable" style={{ width: `${libraryWidth}%` }}>
        {isExpanded && <LibraryExpanded setIsExpanded={setIsExpanded} />}
        <Library setIsExpanded={setIsExpanded} currentWidth={libraryWidth} />
        {/* DRAGGER entre LIBRARY e MAIN */}
        <div className="resizer" onMouseDown={() => setDragging("library")} />
      </div>

      {/* MAIN */}
      <div className="resizable main" style={{ width: `${mainWidth}%` }}>
        <Main currentWidth={mainWidth}></Main>
      </div>

      {/* SONG */}
      <div className="resizable " style={{ width: `${songWidth}%` }}>
        {isSongExpanded && (
          <SongExpanded
            setIsSongExpanded={setIsSongExpanded}
            selectedSong={songSelected}
          />
        )}
        <Song setIsSongExpanded={setIsSongExpanded} currentWidth={songWidth} />

        {/* DRAGGER entre MAIN e SONG */}

        <div
          className="resizer resizer-song"
          onMouseDown={() => setDragging("song")}
        />
      </div>

      <Playing selectedSong={songSelected} />
    </div>
  );
}
