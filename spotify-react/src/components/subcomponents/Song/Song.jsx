import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRightToLine } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@mui/material";

export default function Song({ setIsSongExpanded }) {
  const handleClick = () => {
    setIsSongExpanded(true);
  };

  const { songSelected, setSong } = useGlobalContext();

  useEffect(() => {
    console.log("SONGSSS", songSelected);
  }, [songSelected]);

  return (
    <div className="song-container">
      <div className="song-header">
        <FontAwesomeIcon
          icon={faArrowsLeftRightToLine}
          onClick={handleClick}
          className="song-expand-button"
          size="xl"
        ></FontAwesomeIcon>

        <span className="song-name-header">
          {songSelected ? (
            songSelected?.name
          ) : (
            <Skeleton
              variant="text"
              sx={{
                bgcolor: "#888888",
                borderRadius: "6px",
              }}
              width={250}
            ></Skeleton>
          )}
        </span>
      </div>

      <div className="song-image-container">
        {songSelected ? (
          <img
            className="song-image"
            src={songSelected?.album?.images[0].url}
            alt="Song thumbnail"
          />
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: "#888888",
              borderRadius: "6px",
            }}
            height={500}
            width={500}
          ></Skeleton>
        )}
      </div>

      <div className="song-title-artist">
        <div className="scroll-wrapper">
          <div className="scroll-content">
            <span className="song-name-big">
              {songSelected ? (
                songSelected?.name
              ) : (
                <Skeleton
                  variant="text"
                  sx={{
                    bgcolor: "#888888",
                    borderRadius: "6px",
                  }}
                  width={275}
                ></Skeleton>
              )}
            </span>
          </div>
          <span className="song-artist-big">
            {songSelected ? (
              songSelected?.artists[0].name
            ) : (
              <Skeleton
                variant="text"
                sx={{
                  bgcolor: "#888888",
                  borderRadius: "6px",
                }}
                width={100}
              ></Skeleton>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
