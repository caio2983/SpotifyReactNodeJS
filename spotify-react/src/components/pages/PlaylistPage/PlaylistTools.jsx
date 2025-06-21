import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../../GlobalContext";
import axios from "axios";
import AddToLibrary from "../../subcomponents/AddToLibrary";

export default function PlaylistTools({
  playSongs,
  type,
  data,
  playlistDominantColor,
  scrollContainerRef,
}) {
  const { setNextSongs, setSong } = useGlobalContext();
  const [isSticky, setIsSticky] = useState(false);

  const sentinelRef = useRef(null);

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
      setSong(playSongs?.nextsongs?.[0]?.track);
      console.log("PLAYING SONGS", playSongs);
    }

    setNextSongs({
      nextsongs: playSongs.nextsongs,
      id: playSongs.id,
      type: { type },
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
        console.log("IS STICKY");
      },
      {
        root: scrollContainerRef.current,
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} style={{ height: 1, marginTop: -1 }}></div>
      <div
        className="playlist-tools-container "
        style={
          isSticky
            ? {
                backgroundColor: playlistDominantColor,
                boxShadow: "10px 10px 140px 0px rgba(0,0,0,0.5) inset",
                WebkitBoxShadow: "10px 10px 140px 0px rgba(0,0,0,0.5) inset",
                MozBoxShadow: "10px 10px 140px 0px rgba(0,0,0,0.5) inset",
              }
            : {}
        }
      >
        <div className="tools-wrapper">
          <div className="play-button-green" onClick={handleClick}>
            <span>▶</span>
          </div>
          <AddToLibrary data={data}></AddToLibrary>
        </div>
      </div>
    </>
  );
}
