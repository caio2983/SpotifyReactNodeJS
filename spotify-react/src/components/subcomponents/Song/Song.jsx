import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRightToLine } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Song({ setIsSongExpanded, currentWidth }) {
  const handleClick = () => {
    setIsSongExpanded(true);
  };

  const textRef = useRef(null);
  const headerRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { songSelected, setSong, nextSongs } = useGlobalContext();

  useEffect(() => {
    if (textRef.current) {
      if (textRef.current.clientWidth > headerRef.current.clientWidth) {
        setShouldAnimate(true);
      } else {
        setShouldAnimate(false);
      }
    }
  }, [
    songSelected,
    currentWidth,
    textRef.current?.clientWidth,
    headerRef.current?.clientWidth,
  ]);

  return (
    <div className="song-container">
      <div
        className={`song-header ${shouldAnimate ? "song-header-animate" : ""}`}
        ref={headerRef}
      >
        <FontAwesomeIcon
          icon={faArrowsLeftRightToLine}
          onClick={handleClick}
          className={`song-expand-button ${
            shouldAnimate ? "song-expand-button-animate" : ""
          }`}
          size="xl"
        ></FontAwesomeIcon>

        <span className="song-name-header">
          {songSelected ? (
            <Link to={`/track/${songSelected.id}`}>
              <span className="marquee">
                <span
                  className={`marquee-inner ${
                    shouldAnimate ? "marquee-animate" : ""
                  }`}
                  ref={textRef}
                >
                  {songSelected?.name}
                  {shouldAnimate && <>&nbsp;&nbsp;{songSelected?.name}</>}
                </span>
              </span>
            </Link>
          ) : (
            <Skeleton
              variant="text"
              sx={{ bgcolor: "#888888", borderRadius: "6px" }}
              width={250}
            />
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
                <Link to={`/track/${songSelected.id}`}>
                  {songSelected?.name}
                </Link>
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
              nextSongs.type === "artist" ? (
                <Link to={`/artist/${songSelected?.artists?.[0]?.id}`}>
                  {songSelected?.artists?.[0]?.name}
                </Link>
              ) : (
                <span>{songSelected?.artists?.[0]?.name}</span>
              )
            ) : (
              <Skeleton
                variant="text"
                sx={{
                  bgcolor: "#888888",
                  borderRadius: "6px",
                }}
                width={100}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
