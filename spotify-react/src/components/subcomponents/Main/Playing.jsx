import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faBackwardStep,
  faForward,
  faForwardStep,
  faPlay,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Playing() {
  const { songSelected, setSong } = useGlobalContext();
  const { nextSongs, setNextSongs } = useGlobalContext();

  const [isPlaying, setIsPlaying] = useState(false);

  const duration = songSelected?.duration_ms;
  const [currentTime, setCurrentTime] = useState(0);

  const [currentNumber, setCurrentNumber] = useState(
    songSelected?.track_number
  );
  const [nextSongId, setNextSongId] = useState(
    nextSongs?.tracks?.items[currentNumber]?.id
  );

  useEffect(() => {
    const number = songSelected?.track_number;
    const next = nextSongs?.tracks?.items[number]?.id;

    setCurrentNumber(number);
    setNextSongId(next);
  }, [songSelected, nextSongs]);

  function handleSongClick(number) {
    if (!nextSongs?.type?.type || !songSelected) return;

    const isNext = number === 1;
    const songs = nextSongs.nextsongs;

    let currentIndex;

    if (nextSongs.type.type === "playlist") {
      currentIndex = songs.findIndex(
        (item) => item.track.id === songSelected.id
      );
    } else {
      currentIndex = songs.findIndex((item) => item.id === songSelected.id);
    }

    if (currentIndex === -1) return;

    let newIndex = isNext ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= songs.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = songs.length - 1;
    }

    const songItem = songs[newIndex];
    const songId =
      nextSongs.type.type === "playlist" ? songItem.track.id : songItem.id;

    axios
      .get(`http://localhost:3000/get-track/${songId}`)
      .then((response) => {
        setSong(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar a faixa:", error);
      });
  }

  return (
    <div className="playing-container">
      <div className="playing-wrapper">
        <div className="playing-details">
          <div className="playing-image">
            <img src={songSelected?.album?.images[2]?.url} alt="Image" />
          </div>
          <div className="playing-name-artist">
            <span className="playing-name text-glow">{songSelected?.name}</span>
            <span className="playing-artist">
              {songSelected?.artists?.[0]?.name}
            </span>
          </div>
        </div>

        <div className="playing-tools-center">
          <div className="playing-controls">
            <div
              className="playing-previous-wrapper"
              onClick={() => handleSongClick(0)}
            >
              <FontAwesomeIcon
                icon={faBackwardStep}
                size="2xl"
                className="playing-previous-next"
              ></FontAwesomeIcon>
            </div>
            <div className="playing-button-circle-wrapper">
              <FontAwesomeIcon icon={faPlay} style={{ color: "black" }} />
            </div>
            <div
              className="playing-next-wrapper"
              onClick={() => handleSongClick(1)}
            >
              <FontAwesomeIcon
                icon={faForwardStep}
                size="2xl"
                className="playing-previous-next"
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className="playing-slider">
            <Slider
              min={0}
              max={duration}
              value={currentTime}
              aria-labelledby="audio-progress-bar"
              size="medium"
              color="white"
              style={{
                width: "75%",
              }}
            />
          </div>
        </div>

        <div className="playing-tools-right">
          <div className="playing-volume-slider">
            <FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon>
            <Slider
              min={0}
              max={100}
              value={50}
              aria-labelledby="volume-slider"
              size="small"
              color="white"
              style={{
                width: "75%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
