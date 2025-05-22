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
} from "@fortawesome/free-solid-svg-icons";

export default function Playing() {
  const { songSelected, setSong } = useGlobalContext();
  const [isPlaying, setIsPlaying] = useState(false);

  const duration = songSelected?.duration_ms;
  const [currentTime, setCurrentTime] = useState(0);

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
            <div className="playing-next-wrapper">
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
          <button onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
