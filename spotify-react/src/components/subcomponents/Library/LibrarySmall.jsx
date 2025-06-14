import {
  faArrowsLeftRightToLine,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function LibrarySmall({ setIsExpanded }) {
  function handleClick() {
    setIsExpanded(true);
  }
  return (
    <div className="library-small-container">
      <div
        style={{ width: "75px", height: "75px" }}
        onClick={handleClick}
        className="library-icon"
      >
        <FontAwesomeIcon
          icon={faBookOpen}
          size="2xl"
          className="icon-default"
        />
        <FontAwesomeIcon
          icon={faArrowsLeftRightToLine}
          size="2xl"
          className="icon-hover"
        />
      </div>

      <div
        style={{ width: "75px", height: "75px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "75px", height: "75px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "75px", height: "75px", backgroundColor: "red" }}
      ></div>
    </div>
  );
}
