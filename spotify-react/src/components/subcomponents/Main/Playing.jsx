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

    console.log("song changed");
  }, [songSelected, nextSongs]);

  function handleNextClick() {
    console.log(nextSongs);
    if (nextSongs?.type == "playlist") {
      let current_number = nextSongs.nextsongs.findIndex(
        (item) => item.track.id === songSelected.id
      );

      let next_song_index = current_number + 1;
      if (next_song_index == nextSongs.nextsongs.length) {
        next_song_index = 0;
      }
      const next_song_id = nextSongs.nextsongs[next_song_index].track.id;

      axios
        .get(`http://localhost:3000/get-track/${next_song_id}`)
        .then((response) => {
          const track = response.data;
          setSong(track);
        });
    } else if (nextSongs?.type.type == "album") {
      let current_number = nextSongs.nextsongs.findIndex(
        (item) => item.id === songSelected.id
      );
      console.log("teste album");
      const next_song_index = current_number + 1;
      const next_song_id = nextSongs.nextsongs[next_song_index].id;

      axios
        .get(`http://localhost:3000/get-track/${next_song_id}`)
        .then((response) => {
          const track = response.data;
          setSong(track);
        });
    } else if (nextSongs?.type == "artist") {
      let current_number = nextSongs.nextsongs.findIndex(
        (item) => item.id === songSelected.id
      );

      let next_song_index = current_number + 1;
      if (next_song_index == nextSongs.nextsongs.length) {
        next_song_index = 0;
      }
      const next_song_id = nextSongs.nextsongs[next_song_index].id;

      axios
        .get(`http://localhost:3000/get-track/${next_song_id}`)
        .then((response) => {
          const track = response.data;
          setSong(track);
        });
    }
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
            <div className="playing-previous-wrapper">
              <FontAwesomeIcon
                icon={faBackwardStep}
                size="2xl"
                className="playing-previous-next"
              ></FontAwesomeIcon>
            </div>
            <div className="playing-button-circle-wrapper">
              <FontAwesomeIcon icon={faPlay} style={{ color: "black" }} />
            </div>
            <div className="playing-next-wrapper" onClick={handleNextClick}>
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
